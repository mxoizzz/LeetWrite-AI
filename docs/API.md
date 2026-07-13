# API — LeetWrite AI

**Base URL (Production):** `https://api.leetwrite.ai`
**Base URL (V1 path prefix):** `/api/v1`

The frontend never calls Gemini directly. All AI orchestration happens server-side in the Spring Boot backend. This keeps the Gemini API key private, allows response validation, and gives us a stable contract independent of the underlying AI provider.

---

## POST /api/v1/generate

Generates a structured, publish-ready LeetCode discussion from a problem URL, language, and accepted solution.

### Request

**Method:** `POST`
**Content-Type:** `application/json`

```json
{
  "problemUrl": "https://leetcode.com/problems/two-sum/",
  "language": "JAVA",
  "code": "class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    ...\n  }\n}"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `problemUrl` | string | Yes | Full URL to the LeetCode problem. Must match LeetCode's problem URL pattern. |
| `language` | string (enum) | Yes | One of the supported language codes. See below. |
| `code` | string | Yes | The user's accepted solution, as raw source code. |

**Supported `language` values (V1):**

`JAVA`, `PYTHON`, `CPP`, `JAVASCRIPT`, `TYPESCRIPT`, `GO`, `C`, `CSHARP`

---

### Response — 200 OK

```json
{
  "title": "Two Sum — Hash Map for O(n) Lookup",
  "intuition": "The brute-force approach checks every pair, but we can avoid the second loop entirely by remembering numbers we've already seen...",
  "approach": "1. Initialize an empty hash map to store value-to-index pairs.\n2. Iterate through the array once...",
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)",
  "formattedCode": "```java\nclass Solution {\n  public int[] twoSum(int[] nums, int target) {\n    ...\n  }\n}\n```",
  "keyTakeaways": [
    "Hash maps trade space for time when you need fast lookups.",
    "Always consider whether a second pass can be eliminated by remembering prior state.",
    "This pattern generalizes to any 'find a complement' problem."
  ]
}
```

| Field | Type | Description |
|---|---|---|
| `title` | string | A professional, specific discussion title — never generic ("My Solution"). |
| `intuition` | string | Plain-language explanation of the core insight. |
| `approach` | string | Step-by-step breakdown of the algorithm, markdown-formatted. |
| `timeComplexity` | string | Big-O time complexity with brief justification embedded where useful. |
| `spaceComplexity` | string | Big-O space complexity with brief justification embedded where useful. |
| `formattedCode` | string | The original code, cleaned and wrapped in a markdown code fence with correct language tag. |
| `keyTakeaways` | string[] | 2–4 concise, generalizable lessons from the problem. |

---

### Validation Rules

| Field | Rule |
|---|---|
| `problemUrl` | Must be a valid URL matching `https://leetcode.com/problems/{slug}/*` |
| `language` | Must be one of the supported enum values (case-insensitive, normalized server-side) |
| `code` | Must be non-empty, under 20,000 characters, and pass a basic non-empty-token check |

Validation happens both client-side (for immediate feedback) and server-side (as the source of truth).

---

### Error Responses

All errors follow a consistent shape:

```json
{
  "error": {
    "code": "INVALID_PROBLEM_URL",
    "message": "The provided URL does not look like a valid LeetCode problem link.",
    "field": "problemUrl"
  }
}
```

| HTTP Status | Code | Meaning |
|---|---|---|
| 400 | `INVALID_PROBLEM_URL` | URL missing, malformed, or not a LeetCode problem link |
| 400 | `INVALID_LANGUAGE` | Language not in supported enum |
| 400 | `EMPTY_CODE` | Code field missing or empty |
| 400 | `CODE_TOO_LONG` | Code exceeds max character limit |
| 422 | `AI_RESPONSE_INVALID` | Gemini response failed schema validation after retry |
| 429 | `RATE_LIMITED` | Too many requests from this client in a short window |
| 502 | `AI_PROVIDER_ERROR` | Gemini API returned an error or was unreachable |
| 504 | `AI_TIMEOUT` | Gemini did not respond within the allotted timeout |
| 500 | `INTERNAL_ERROR` | Unexpected server-side failure |

---

### Status Codes Summary

| Code | Meaning |
|---|---|
| 200 | Generation succeeded |
| 400 | Client sent invalid input |
| 422 | AI produced an unusable response after retry |
| 429 | Rate limit exceeded |
| 500 | Unhandled server error |
| 502 | Upstream AI provider error |
| 504 | Upstream AI provider timeout |

---

## Future APIs

These are planned for later versions (see `ROADMAP.md`) and not part of V1.

| Endpoint | Version | Purpose |
|---|---|---|
| `POST /api/v1/regenerate` | V2 | Regenerate with a different tone/style |
| `GET /api/v1/history` | V3 | Retrieve saved discussions for an authenticated user |
| `POST /api/v1/publish` | V4 | Publish directly to LeetCode on the user's behalf |
| `POST /api/v1/extension/generate` | V4 | Optimized endpoint for the Chrome Extension |

---

## API Versioning

- All routes are prefixed with `/api/v{n}`.
- Breaking changes always ship under a new version prefix; existing versions are supported for a minimum deprecation window of 6 months after a new version ships.
- Additive, non-breaking changes (new optional fields, new enum values) may ship within an existing version.
- Deprecated fields are marked in this document and returned with a `Deprecation` response header before removal.

---

## Best Practices

**For frontend integration:**
- Always handle the full error code table above with distinct UI states — never a single generic "Something went wrong."
- Treat `AI_TIMEOUT` and `AI_PROVIDER_ERROR` as retryable; surface a "Try Again" action.
- Treat `400`-level errors as non-retryable without user input changes.
- Do not cache responses — every generation is a fresh request.

**For backend implementation:**
- Never forward the raw Gemini API key, prompt, or raw model response to the client.
- Always validate Gemini's JSON output against the schema before returning it — malformed AI output must never reach the client as a 200.
- Log request metadata (language, latency, status code) without ever logging user code or full problem content, to preserve user trust despite the stateless design.