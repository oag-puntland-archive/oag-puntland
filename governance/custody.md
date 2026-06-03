# Custody & Mirrors — v1

The verifiable public record must survive seizure of any single host. This file documents the custody arrangement *as it exists*, not as we wish it existed.

---

## 1. Origin

- **Public URL:** https://oag.pl.so/
- **Hosting VM:** `vps.qarandevelopers.so` (operated by Qaran Developers, Somalia)
- **VM physical location:** UK — netblock UK-AMITO-20120726, Amito Ltd, AS60610 (GB jurisdiction)
- **TLS:** Let's Encrypt wildcard `*.oag.pl.so` (valid Apr–Jul 2026)
- **Stack:** WordPress (Elementor + Header-Footer Elementor + several Astra-family plugins)

## 2. Namespace authority (the real seizure vector)

`pl.so` is a *Somalia ccTLD subordinate* — the `.so` registry is operated by **soNIC** under the **Federal Somali Ministry of Post & Telecommunications** (Mogadishu). WHOIS of `pl.so` on 2026-06-02 shows the registry-side controls held by FGS:

```
Domain Status: inactive
Domain Status: serverRenewProhibited
Domain Status: serverTransferProhibited
Domain Status: serverDeleteProhibited
Domain Status: clientRenewProhibited
Domain Status: clientTransferProhibited
Domain Status: clientDeleteProhibited
```

There is **no intermediate `pl.so` zone** — `oag.pl.so` resolves directly via the `.so` parent. A single soNIC instruction can therefore terminate name resolution. **The Puntland State of Somalia does not control this namespace at the registry level.**

This is the seizure model the v1 architecture is designed against. See [[ADR-0007]] (Mirror on a non-`.so` namespace).

## 3. Mirrors (non-`.so` namespace)

The corpus is pushed to two off-`.so` Git mirrors on every release. Both are public. Either, on its own, contains the complete signed corpus + the deterministic site source. A fresh clone of either reproduces the deployed site byte-for-byte (verified by `scripts/reproducibility-check.sh`).

| Name | URL | Jurisdiction | Status |
|---|---|---|---|
| GitHub | _to be filled in once pushed_ | US | pending |
| Codeberg | _to be filled in once pushed_ | DE (non-profit) | pending |

The site's footer and `/{lang}/custody/` page publish these URLs on every page so that origin takedown is **externally detectable** — if you can't reach this site, a mirror should still work.

## 4. Archive snapshots

In addition to the Git mirrors, every release submits a snapshot to two public archive services:

| Service | URL | Status |
|---|---|---|
| Internet Archive (Wayback) | _to be filled in once captured_ | pending |
| archive.today | _to be filled in once captured_ | pending |

Archive snapshots are immutable point-in-time copies that survive even if both Git mirrors are compelled offline. They are the third layer.

## 5. Peer custodian — **not yet secured**

ASSUMPTION-E-01 in [[governance/assumptions-register.md]] is in force: no AFROSAI-E / IDI / academic / CSO peer custodian has a written commitment on file as of the v1 snapshot date. The v1 custody page states this honestly and does not claim peer custody we do not have.

Engagement targets for post-v1:

- **AFROSAI-E** (the African Organization of English-speaking Supreme Audit Institutions) — the natural peer custodian for an East-African SAI.
- **IDI** (INTOSAI Development Initiative) — supports SAI capacity-building and operates institutional archives.
- An academic library (e.g., a Somali-studies department of a non-Somali university) — for ultra-long-term curation outside any political theatre.
- A civil-society legal-aid or transparency organisation that is established outside Federal Somali / Puntland State jurisdiction.

## 6. Trust anchor — SSH signing key

The canonical signing identity for v1 commits is the ED25519 key registered in [[governance/allowed_signers]]. Public key:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPadrpW3G5mCtcZlgUCpVEoHt9BjBaLGjzqZS+GreuM2 oag-puntland-v1-signing-key-2026
```

To register on a Git host: SSH and GPG keys → **New SSH key** (or "Signing key" where the host distinguishes), paste the above, save. GitHub and Codeberg both verify SSH-signed commits this way.

Key rotation procedure (post-v1): generate a new key, add it to the `allowed_signers` file (alongside the old one, with a `valid-until` annotation), commit, revoke the old key on hosts. The mirror history continues to verify under the previous trust anchor.

## 7. What "tamper-evident" means here

Tamper detection in v1 stacks four mutually reinforcing mechanisms:

1. **Content addressing.** Every artifact's `sha256` is published in `governance/provenance.csv` and in the corresponding `report.yaml` / `statute.yaml`. A reader can verify any PDF locally with a one-liner: `shasum -a 256 corpus/reports/fy-2024-annual-audit-report/en/full.pdf | grep 170d5138e3b8…`. Any byte-level change is detectable without trusting a third party.
2. **Signed commits.** Every change to the corpus or governance is in a commit signed by the project's trust anchor (§6). An unsigned or unknown-signer commit on any mirror is anomalous and an immediate red flag.
3. **Diverse mirrors.** Two Git hosts in different jurisdictions, neither under FGS or PSS control. Divergence between mirrors (one shows commit X, the other does not) is detectable by simple `git log` comparison.
4. **External archive snapshots.** Wayback Machine and archive.today hold immutable, third-party copies. If all Git mirrors are compelled to revert a published artifact, the archive layer preserves the original record.

No single layer is sufficient. Together they make silent alteration of the public record meaningfully harder.

## 8. What this does NOT protect against

Honest about limits:

- **Court order to all four layers simultaneously.** If FGS, soNIC, GitHub (US compulsion), Codeberg (DE compulsion), Internet Archive, and archive.today all comply with the same order, the record can be erased everywhere. The architecture raises the cost of suppression; it does not make it impossible.
- **Compromise of the signing key.** If the trust anchor is compromised, an attacker can backdate and re-publish a corrupted corpus that *appears* legitimate. Mitigation: key rotation (§6) and the diversity of mirrors (a re-signed history would have to be force-pushed everywhere simultaneously, which would be externally noticed).
- **Out-of-band content suppression.** This architecture protects what is in the corpus. It cannot compel the OAG to *put* something in the corpus that the OAG has decided not to publish.

These limits are by design. Compounding them is post-v1 work and gated on peer custodian recruitment.
