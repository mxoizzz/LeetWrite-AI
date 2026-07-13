# ARCHITECTURE — LeetWrite AI

## Guiding Principle

The frontend never talks to Gemini. All AI orchestration, prompt construction, and response validation happen in a single backend service. This keeps the AI provider swappable, the API key private, and the contract with the client stable regardless of what happens upstream.

---

## High-Level Architecture

```
┌──────────────────────┐
│    Next.js Frontend    │
│  (Vercel, Edge/CDN)    │
└───────────┬───────────┘
            │  HTTPS (JSON)
            ▼
┌──────────────────────┐
│  Spring Boot REST API  │
│  (Railway, Java 21)    │
└───────────┬───────────┘
            │  HTTPS (Prompt + Schema)
            ▼
┌──────────────────────┐
│      Gemini API        │
│   (Google AI Platform) │
└───────────┬───────────┘
            │  Structured JSON
            ▼
┌──────────────────────┐
│   Backend Validation    │
│  (Schema check, retry)  │
└───────────┬───────────┘
            │  Clean JSON
            ▼
┌──────────────────────┐
│   Frontend Rendering    │
│ (Preview + Copy Markdown)│
└──────────────────────┘
```

There is no database and no persistence layer anywhere in this diagram for V1. Every request is self-contained: input in, structured discussion out, nothing stored.

---

## Frontend Responsibilities

The Next.js application owns everything the user directly perceives.

- Render the input form: problem URL, language selector, code textarea.
- Perform client-side validation for fast feedback (see `API.md` validation rules).
- Manage UI state machine: `idle → validating → generating → success | error`.
- Call the single backend endpoint, `POST /api/v1/generate`, and nothing else.
- Render the structured response into a live preview matching the eventual LeetCode discussion layout.
- Provide one-click "Copy as Markdown."
- Own all loading, empty, and error states — see `DESIGN.md` for exact specifications.
- Never store any request or response beyond the current browser session/tab memory (in-memory React state only — no `localStorage`, no cookies of user content).

The frontend has **zero knowledge** of Gemini, prompts, or AI orchestration. It only knows the `/api/v1/generate` contract.

---

## Backend Responsibilities

The Spring Boot service is the single source of truth for AI orchestration.

- Expose the versioned REST API (`/api/v1/...`) documented in `API.md`.
- Validate all incoming requests server-side, independent of client-side checks.
- Construct the Gemini prompt from a versioned, internal prompt template (see `PROMPTS.md`) — the prompt itself is never exposed to the client.
- Call Gemini with a bounded timeout and a single retry on transient failure.
- Validate Gemini's response against a strict internal schema before it ever leaves the backend.
- Normalize and sanitize the response (consistent Markdown formatting, code fence language tags, whitespace cleanup).
- Return a clean, stable JSON contract to the frontend — the client should never need to know that Gemini is the underlying provider.
- Log operational metadata (latency, status, language) without logging user code or problem content.

The backend holds the Gemini API key as a server-side secret (environment variable on Railway) and it is never transmitted to the client under any circumstance.

---

## Gemini Responsibilities

Gemini's job is narrow and well-defined: given a problem context, a language, and code, produce a structured explanation matching a fixed JSON schema.

- Receives a single, carefully constructed prompt per request (see `PROMPTS.md` for philosophy).
- Returns structured JSON matching the schema defined in `API.md`.
- Is treated as an untrusted, occasionally-unreliable component — its output is always validated, never trusted blindly.
- Has no memory across requests. Each call is stateless and independent.

If Gemini is ever swapped for a different provider, only the backend's AI-integration layer changes — the API contract with the frontend remains identical.

---

## Folder Philosophy

This section describes the intended organization philosophy, not literal code (no code is included in this documentation set).

**Frontend (`apps/web`):**
- `app/` — route-level pages, following Next.js App Router conventions.
- `components/` — presentational and interactive UI components, organized by feature (`generate/`, `preview/`, `shared/`).
- `lib/` — API client, validation schemas, formatting utilities.
- `styles/` — design tokens and global styles (see `DESIGN.md`).

**Backend (`apps/api`):**
- `controller/` — REST endpoint definitions, thin and declarative.
- `service/` — orchestration logic: request validation → prompt construction → Gemini call → response validation.
- `ai/` — Gemini client, prompt templates, schema definitions, response parsers.
- `dto/` — request/response data contracts, matching `API.md` exactly.
- `exception/` — centralized error handling, mapped to the error codes in `API.md`.

The philosophy: **the controller layer should be boring.** All meaningful logic — validation, prompt construction, retries, schema enforcement — lives in `service/` and `ai/`, where it can be tested independently of HTTP concerns.

---

## Scalability

V1 is intentionally stateless, which makes horizontal scaling straightforward:

- The backend holds no session state — any instance can serve any request.
- Railway can scale backend instances horizontally behind a load balancer with no coordination required.
- The frontend is static/edge-rendered on Vercel's CDN, scaling independently of the backend.
- The only shared external dependency is the Gemini API itself; backend-level rate limiting and timeouts protect against upstream throttling cascading into user-facing failures.

Because there is no database in V1, there is no data-layer scaling concern at all — the architecture's simplicity is itself a scalability strategy.

---

## Future Architecture

As the roadmap introduces accounts, history, and integrations (see `ROADMAP.md`), the architecture evolves additively rather than through a rewrite:

```
Next.js Frontend
      │
      ▼
Spring Boot REST API ──────► Gemini API
      │
      ├──► Auth Service (V3)
      │
      ├──► Database / Storage (V3)
      │
      └──► Extension Gateway (V4)
```

Principles for future evolution:

- The core `/api/v1/generate` contract remains stable even as new endpoints are added around it.
- Authentication, when introduced, is additive and optional — the stateless flow continues to work without an account.
- Any persistence layer is scoped strictly to what a signed-in user opts into; anonymous usage never touches the database.
- New client surfaces (Chrome Extension, VS Code Extension) consume the same backend API rather than duplicating orchestration logic.