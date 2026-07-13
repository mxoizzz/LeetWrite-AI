# PROMPTS — AI Strategy & Philosophy

This document explains the *strategy* behind how LeetWrite AI prompts and constrains Gemini. It intentionally does not include the production prompt text itself — prompts are treated as a versioned, internal implementation detail that evolves independently of this documentation.

---

## Prompt Philosophy

The AI's job is narrow: transform a known problem + a working solution into a structured explanation. It is not asked to solve anything, verify correctness, or be creative beyond clear technical writing.

Core beliefs that shape every prompt decision:

1. **Constrain hard, then let the model write well within the constraint.** A tightly scoped structured task produces far more reliable output than an open-ended one.
2. **The model should sound like a strong engineer explaining their own solution — not an AI describing someone else's.** First-person-adjacent, confident, precise language; no hedging, no "As an AI..." framing.
3. **Never let the model guess when it can be told.** Where possible, the backend supplies known facts (problem title, constraints, difficulty) rather than asking the model to infer them.
4. **Consistency over creativity.** Two runs on the same input should produce discussions that are structurally identical and substantively similar, even if wording varies.

---

## Prompt Engineering Strategy

- **Structured output only.** The model is instructed to return a single JSON object matching a fixed schema — never free-form prose that needs to be parsed with regex or heuristics.
- **Role framing.** The model is framed as a senior engineer writing a discussion post, not as an assistant responding to a user — this materially changes tone and confidence in the output.
- **Explicit non-goals in the prompt.** The prompt tells the model what *not* to do (no filler language, no restating the problem statement verbatim, no apologizing, no meta-commentary about being an AI).
- **Grounding in the actual code.** The prompt requires the model to reference specific elements of the submitted code (variable names, structure) rather than producing a generic explanation that could apply to any solution to the problem.
- **Complexity analysis is derived, not assumed.** The model is instructed to reason about the actual loops/recursion/data structures present in the submitted code, not to recall a "typical" complexity for the problem type.

---

## Prompt Versioning

Prompts are versioned independently of the API version (`API.md`), since prompt quality improves on a much faster cadence than the API contract.

| Prompt Version | Scope of Change |
|---|---|
| `v1.0` | Initial production prompt — core structure, tone, and schema |
| `v1.x` | Non-breaking refinements: tone adjustments, edge-case handling, few-shot example updates |
| `v2.0` | Structural schema changes (new fields, changed field semantics) — always paired with an API version bump |

Every prompt version is logged internally with: the change made, the reason, and before/after output samples for a fixed evaluation set of problems. No prompt ships to production without being run against this fixed evaluation set first.

---

## AI Behaviour

Expected behavior boundaries the model is held to:

- Always returns valid, complete JSON matching the schema — never partial output, never prose wrapped around the JSON.
- Never fabricates a complexity analysis that doesn't match the actual code provided.
- Never refuses or produces a meta-response ("I can't help with that") for legitimate LeetCode solutions — the task is narrow enough that refusals should not occur in normal operation.
- If the submitted code is ambiguous, incomplete, or doesn't clearly match the stated problem, the model is instructed to note this plainly within the `approach` field rather than silently inventing an explanation that doesn't match reality.
- Never includes personal opinions, humor, or filler ("Great job solving this!") — the output is a technical document, not a chat response.

---

## Output Structure

The output schema (fully specified in `API.md`) is deliberately flat and fixed:

`title`, `intuition`, `approach`, `timeComplexity`, `spaceComplexity`, `formattedCode`, `keyTakeaways`

Each field has a single, unambiguous responsibility. This flatness is intentional — it keeps backend parsing simple, keeps frontend rendering predictable, and keeps the model focused on one concern per field rather than blending explanation and analysis together.

---

## JSON Schema Philosophy

- **Strict typing.** Every field has a defined type (string, string array) and the backend rejects any response that doesn't conform, triggering a single retry with a stricter reminder appended to the prompt.
- **No optional fields in V1.** Every field in the schema is required in every response — optionality is a source of frontend edge cases, and V1's scope is narrow enough to avoid it entirely.
- **No nested objects.** A flat schema is easier to validate, easier to retry against, and easier to render without conditional logic.
- **Field names are stable across prompt versions** wherever possible — schema-breaking changes are treated as a deliberate, versioned event (see Prompt Versioning above), not an incidental side effect of a wording tweak.

---

## Prompt Rules

A non-exhaustive summary of hard rules encoded into the production prompt (without reproducing its exact text):

- Output must be valid JSON and nothing else — no markdown fences around the JSON itself, no preamble, no sign-off.
- Code in `formattedCode` must preserve the user's actual logic — the model may clean up formatting and whitespace, but must not alter behavior or "fix" bugs silently.
- `keyTakeaways` must be generalizable lessons, not a restatement of the approach.
- Explanations must be grounded in the specific submitted code, not a generic textbook description of the problem.

---

## Future Prompt Improvements

Planned directions, aligned with the roadmap:

- **Tone presets (V2):** concise / detailed / interview-style variants of the same underlying prompt structure.
- **Few-shot grounding by problem category (V2/V3):** category-specific examples (DP, graph, greedy) to improve intuition quality for harder problem types.
- **Multi-language explanation output (V2):** the same schema, populated in the user's chosen human language.
- **Style learning (V3):** incorporating a user's own edit history into future generations, once accounts exist.

---

## AI Safety

- The model is never given access to any user identity, account data, or history in V1 — each request is fully isolated and stateless.
- The prompt explicitly constrains the model to the technical-writing task; it is not exposed to open-ended user input beyond the problem URL, language, and code fields, which limits the surface area for prompt injection.
- All AI output is treated as untrusted until it passes schema validation — no AI output reaches the client without passing through the backend's validation layer described in `ARCHITECTURE.md`.
- No user code or problem content is logged or retained after the request completes, consistent with the product's stateless, no-persistence design in V1.