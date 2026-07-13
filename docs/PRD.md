# PRD — LeetWrite AI

**Status:** Draft v1.0
**Owner:** Product
**Last Updated:** 2026

---

## 1. Product Vision

LeetWrite AI turns an accepted LeetCode solution into a publish-ready discussion post in seconds. The product removes the friction between *solving* a problem and *sharing* the solution well — without touching the part engineers actually enjoy: problem solving itself.

We are not building a code generator. We are not building a tutor. We are building the fastest, most polished way to go from "Accepted" to a discussion post you're proud to publish.

---

## 2. Mission

Give every developer who solves a problem the ability to explain it beautifully, in the time it takes to make coffee.

---

## 3. Problem Statement

LeetCode's discussion system rewards clear writing — a good title, a crisp explanation of intuition, a clean complexity breakdown, and well-formatted code. Most users are strong problem solvers but reluctant or slow writers under time pressure.

The result:

| Symptom | Consequence |
|---|---|
| Solving takes 15–40 minutes, writing takes another 15–20 | Most users skip publishing entirely |
| No structured template for a "good" post | Inconsistent, low-quality discussions |
| Complexity analysis is skipped or wrong | Lower-value posts, less community trust |
| Formatting code/markdown by hand is tedious | Posts look unpolished |

LeetWrite AI collapses the writing step from ~15–20 minutes to under 30 seconds, while raising the quality bar above what most users would write unaided.

---

## 4. Goals

- Convert a problem URL + accepted solution into a complete, structured discussion in under 10 seconds of AI processing time.
- Produce writing quality that reads as if written by a thoughtful senior engineer — not generic AI filler.
- Make the experience feel instant, minimal, and premium — closer to Raycast or Linear than a typical "AI wrapper."
- Ship a V1 that requires zero setup: no login, no config, no onboarding.

## 5. Non-Goals (V1)

- No authentication or user accounts
- No database or persistence layer
- No saved history of past discussions
- No payments or billing
- No browser extension
- No collaboration or team features
- No community or social features
- No analytics dashboard for end users

V1 is a single-session, stateless tool. The user's data lives only in the browser tab.

---

## 6. User Personas

### 6.1 The Interview Grinder
Preparing for FAANG-style interviews, solving 3–5 problems a day. Wants to publish for spaced-repetition value and public accountability, but has no time to write.

### 6.2 The Student
Learning DSA fundamentals. Publishes to reinforce understanding and build a public portfolio of problem-solving. Needs the AI's explanation to actually teach, not just decorate.

### 6.3 The Working Engineer
Solves LeetCode casually to stay sharp. Values speed above all — wants to solve, generate, publish, and move on with their day.

### 6.4 The Competitive Programmer
Solves problems fast, often with terse or unconventional code. Wants the AI to still produce a clean explanation even from minimal, uncommented code.

---

## 7. User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-01 | User | Paste a LeetCode problem URL | The AI has full context of the problem |
| US-02 | User | Select the language of my solution | The code is parsed and formatted correctly |
| US-03 | User | Paste my accepted solution | The AI can analyze and explain it |
| US-04 | User | Click one button to generate | I don't have to configure anything |
| US-05 | User | See a live preview of the discussion | I can review before publishing |
| US-06 | User | Copy the output as Markdown | I can paste it directly into LeetCode |
| US-07 | User | See a polished title suggestion | My post stands out and reads professionally |
| US-08 | User | See correct time/space complexity | I don't have to verify it myself |
| User | User | Get an error if my input is invalid | I know what to fix without guessing |

---

## 8. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Accept a LeetCode problem URL as input | P0 |
| FR-02 | Accept a language selection from a fixed supported list | P0 |
| FR-03 | Accept raw solution code as plain text | P0 |
| FR-04 | Validate inputs client-side before submission | P0 |
| FR-05 | Send a single request to the backend `/api/v1/generate` endpoint | P0 |
| FR-06 | Backend constructs a structured prompt and calls Gemini | P0 |
| FR-07 | Backend parses and validates Gemini's structured JSON response | P0 |
| FR-08 | Frontend renders: Title, Intuition, Approach, Time Complexity, Space Complexity, Formatted Code, Key Takeaways | P0 |
| FR-09 | User can preview the rendered discussion | P0 |
| FR-10 | User can copy the full output as Markdown to clipboard | P0 |
| FR-11 | Frontend displays a loading state during generation | P0 |
| FR-12 | Frontend displays a clear error state on failure | P0 |
| FR-13 | Generation must be idempotent per request — no side effects, no storage | P0 |

---

## 9. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | P95 end-to-end generation time under 10 seconds |
| NFR-02 | Frontend Lighthouse performance score ≥ 95 |
| NFR-03 | No user data persisted anywhere, on frontend or backend, beyond the request lifecycle |
| NFR-04 | Backend must never expose the Gemini API key or raw prompt to the client |
| NFR-05 | System must degrade gracefully on Gemini timeouts or malformed responses |
| NFR-06 | UI must be fully responsive down to 375px width |
| NFR-07 | Application must be usable with keyboard only |
| NFR-08 | Zero layout shift (CLS) during state transitions |

---

## 10. MVP Scope

**In scope:**
Single-page flow — Input → Generate → Preview → Copy. Stateless. No accounts.

**Out of scope:**
Everything listed in Non-Goals (Section 5) and in `ROADMAP.md` under V2+.

---

## 11. Future Scope

See `ROADMAP.md` for the full multi-version plan. Highlights:

- Saved history (requires auth + database)
- Chrome Extension for in-page generation on LeetCode
- Multiple tone/style presets (concise, detailed, interview-style)
- Multi-language solution comparison
- Team/workspace features for coding bootcamps and interview prep groups

---

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Gemini output quality varies across problem types | Medium | Strict structured-output schema, strong prompt constraints, output validation |
| Gemini latency spikes | Medium | Backend timeout + graceful error state, retry-once strategy |
| Users paste incorrect/broken code | Low | Client-side validation, clear error messaging, AI asked to note ambiguity rather than fail silently |
| Users paste non-LeetCode URLs | Low | URL pattern validation before submission |
| Perceived as "just another AI wrapper" | High | Obsessive focus on product polish, speed, and output quality — see `DESIGN.md` and `VISION.md` |

---

## 13. Success Metrics

| Metric | Target (V1) |
|---|---|
| Time from page load to copied output | < 60 seconds median |
| Generation success rate | > 98% |
| P95 generation latency | < 10 seconds |
| Bounce rate on landing | < 40% |
| Qualitative: "would this pass as human-written" | Majority yes, in informal testing |

V1 has no accounts and no analytics dashboard, so success metrics are measured via backend request logs and manual/qualitative review — not a user-facing dashboard.