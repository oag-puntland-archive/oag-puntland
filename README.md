# OAG Puntland — Public Accountability Platform (v1)

The verifiable public record of the Office of the Auditor General, Puntland State of Somalia.

This repository is the source of truth. The deployed website is a static derivative built from the contents of [`corpus/`](./corpus/). The history of this Git repository is the audit trail of the public record itself.

## What you can do here

- **Read the [doctrine](./governance/doctrine.md)** — the 10-point operating contract that governs every artifact, render, and copy decision.
- **Read the [Assumptions Register](./governance/assumptions-register.md) and [Risk Register](./governance/risk-register.md)** — the load-bearing assumptions of v1, with blast radius and validation plans.
- **Read the [locked report matrix](./governance/matrix.csv)** — every audit report in the public record, with masthead-verified year/language and sha256.
- **Read the [provenance ledger](./governance/provenance.csv)** — every binary artifact and the `oag.pl.so` URL it was sourced from on 2026-06-02.
- **Browse the [corpus](./CORPUS.md)** — structured report metadata and the PDFs themselves.
- **Read the [Architecture Decision Records](./governance/adr/)** — every load-bearing v1 decision with rationale and rejected alternatives.

## Verifying integrity

Every PDF in `corpus/` has a `sha256` recorded in `governance/provenance.csv`. To verify:

```bash
cd corpus && find . -name '*.pdf' -exec shasum -a 256 {} \; | sort
```

Compare against `governance/provenance.csv`. Any deviation is either (a) a corruption to investigate, (b) a deliberate update that should be a fresh commit, or (c) tampering.

## Reproducing the public site

```bash
cd site && pnpm install && pnpm run build
# output: site/dist/  — deploy or compare against the live build
```

The build is designed to be deterministic. CI verifies this on every commit.

## Mirrors

The canonical public record is mirrored to GitHub and Codeberg (URLs published on the deployed site's `/custody` page and the v1 footer). Origin takedown does not destroy the record.

## What v1 deliberately does **not** do

See [`governance/doctrine.md`](./governance/doctrine.md). Short list: no machine translation, no whistleblower intake, no recommendation tracker, no public generative AI, no entity scoring. These are restraints, not omissions; their absence is a feature of the design.

## License

The corpus is republished under the OAG's own publication terms. The site source code is MIT. See [`LICENSE-source.txt`](./LICENSE-source.txt) and [`LICENSE-corpus.txt`](./LICENSE-corpus.txt).

---

