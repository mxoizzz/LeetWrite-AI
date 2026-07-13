# ROADMAP — LeetWrite AI

This roadmap describes the intended evolution of LeetWrite AI from a single-purpose generation tool into a complete writing companion for competitive programmers. Each version is scoped to ship independently and deliver standalone value.

---

## V1 — The Generator

**Theme:** Prove the core loop. Zero friction, zero setup.

**Goal:** Paste a solution, get a publish-ready discussion, copy it, done.

| Milestone | Deliverable |
|---|---|
| M1.1 | Input flow: URL, language, code |
| M1.2 | Backend `/api/v1/generate` endpoint live on Railway |
| M1.3 | Gemini structured-output integration with schema validation |
| M1.4 | Preview + Copy Markdown UI |
| M1.5 | Loading, error, and empty states polished |
| M1.6 | Public launch |

**Explicitly excluded:** accounts, database, payments, extension, analytics.

---

## V2 — The Refiner

**Theme:** Give users control over the output, not just a single result.

| Milestone | Deliverable |
|---|---|
| M2.1 | Regenerate with a different tone (concise / detailed / interview-style) |
| M2.2 | Manual edit mode on the generated preview before copying |
| M2.3 | Multiple output language support for explanations (e.g. English, Hindi, Spanish) |
| M2.4 | Improved prompt versioning system (see `PROMPTS.md`) |
| M2.5 | Support for multi-file / multi-function solutions |

**Non-goals still hold:** no auth, no persistence yet.

---

## V3 — The Companion

**Theme:** Introduce identity and memory — the point where accounts become justified.

| Milestone | Deliverable |
|---|---|
| M3.1 | Optional sign-in (not required to use core tool) |
| M3.2 | History of generated discussions, tied to account |
| M3.3 | Personal writing style learned from edits over time |
| M3.4 | Export to personal blog / Notion / GitHub Gist |
| M3.5 | Database and storage layer introduced |

Accounts remain **optional** — the stateless V1 flow continues to exist for users who don't want to sign up.

---

## V4 — The Ecosystem

**Theme:** Meet developers where they already are.

| Milestone | Deliverable |
|---|---|
| M4.1 | Chrome Extension: generate directly from the LeetCode submission page |
| M4.2 | One-click publish directly to LeetCode (where API/ToS allows) |
| M4.3 | VS Code extension for local solution files |
| M4.4 | Public API for third-party integrations |
| M4.5 | Team workspaces for bootcamps and interview-prep cohorts |

---

## Future Vision

**Theme:** LeetWrite AI as the writing layer for technical growth — not just LeetCode.

- Support for Codeforces, HackerRank, and other competitive platforms
- AI-assisted technical blog writing from any codebase or PR
- Interview-readiness insights: how well can you *explain* what you can *solve*
- A public, curated feed of the best AI-assisted explanations, opt-in and community-moderated

This tier is intentionally directional, not committed. It defines the north star that V1–V4 are built toward, without locking in scope years in advance.

---

## Guiding Principle Across All Versions

Every new version must justify its added complexity. Features are added only when they meaningfully increase speed, quality, or trust — never to appear feature-complete. See `VISION.md` for the full reasoning behind this discipline.