# ADR 0006 — No public generative AI on the v1 site

**Status:** Accepted
**Date:** 2026-06-02
**Reversibility:** two-way door — a verbatim-search-only feature can be revisited post-v1 under a fresh ADR
**Prime directive(s) served:** §1.1 (do no harm), §1.3 (integrity), §1.4 (standards conformance)

## Decision

v1 ships no chatbot, no LLM-driven search, no auto-summarisation feature, and no 'ask the auditor' interactive element on any public surface.

## Context / forces

Red Line 2. Generative paraphrase of audit language fabricates findings the OAG did not author; adversarial screenshots defeat refusal logic; the institution carries reputational risk for every LLM hallucination on its surface.

## Alternatives considered

- **A. RAG-only chatbot grounded in the corpus.** Rejected: even with grounding, the answer is a paraphrase of hedged audit text — that paraphrase is the OAG speaking with a confidence the auditor never wrote.
- **B. 'Verbatim search' (no generation, only citations).** A defensible long-term option, but the technical bar is high enough (false positives are still findings being put in the OAG's mouth) that it is OUT of v1 and gated on Unknown A resolution.
- **C. None for v1 (selected).**

## Trade-offs

Users wanting a 'how do I find X' experience must use static navigation + the site search (post-v1).

## Risks

None at the v1 scope.

## Mitigations

Doctrine reaffirmation: any future AI proposal must come back through ADR review.

## Validation method

Manual review pre-launch: no LLM, no chatbot widget, no inference endpoint exposed.
