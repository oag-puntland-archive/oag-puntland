# ADR 0009 — SSH-based commit signing (no GPG); project-scoped signing key for v1

**Status:** Accepted
**Date:** 2026-06-02
**Reversibility:** two-way door — key rotation or upgrade to a hardware-backed key requires only ssh-keygen + host UI changes
**Prime directive(s) served:** §1.3 (record integrity)

## Decision

Commits to the canonical repository are signed using SSH key-based signing (git 2.34+). A project-scoped ED25519 key is generated locally at `~/.ssh/oag-puntland_signing_ed25519`, with no passphrase, used only for this project. The corresponding public key is registered as a SIGNING key (not an SSH access key) on both GitHub and Codeberg.

## Context / forces

Framework §3 says signed commits + distributed custody. GPG generation is interactive (requires passphrase + entropy) and the user has no existing GPG key. SSH signing is industry-current, supported by GitHub and Codeberg, and works with the same key material the user uses for SSH push.

## Alternatives considered

- **A. GPG-signed commits.** Rejected for v1: interactive setup, no existing key. Acceptable post-v1.
- **B. Unsigned commits.** Rejected: violates §3 baseline.
- **C. SSH-signed commits with a project-scoped key (selected).**

## Trade-offs

Project-scoped key has no passphrase — convenient but lower individual-key security. Acceptable because the corpus integrity does not depend on individual-key secrecy (content-addressed Git + multiple mirrors + archive snapshots provide tamper-evidence at a different layer).

## Risks

Key compromise. Mitigation: rotation is trivial (replace public key on hosts; regenerate; re-push). Mirrors + archive snapshots make detection independent of key trust.

## Mitigations

Public key is registered as a Signing key (not push-credential) on both hosts; users verifying commits use the hosts' verification UI; the `allowed_signers` file in `governance/` makes local verification reproducible.

## Validation method

Pre-launch: commit verification UI shows 'Verified' on both GitHub and Codeberg for at least one commit.
