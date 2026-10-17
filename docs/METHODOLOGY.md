# Methodology — Ofan VSCode

## Feature development lifecycle

Every non-trivial change follows this sequence:

1. **Plan mode first** — no files written until the plan is approved. Use
   `EnterPlanMode` in Claude Code. For human contributors: write a short
   proposal in the PR description before opening a draft PR. Every `feat:`,
   `fix:`, or `refactor:` change — from any contributor, including Core Team —
   starts from an issue before branching: use an existing one, or open a new one
   with a short proposal and wait for the maintainer to confirm scope. `docs:`
   and `chore:` changes and the maintainer's direct-to-main commits are exempt
   from the issue-first requirement.
2. **Small steps with checkpoints** — break larger work into slices with a named
   stop at each milestone. Example: "add keyword rules, stop, show output." Do
   not open a PR that covers two independent slices.
3. **Pillars review before merge** — any PR touching the trigger files listed in
   [GIT_WORKFLOW.md](GIT_WORKFLOW.md) §Mandatory agent review must be verified
   against the five pillars in [PILLARS.md](PILLARS.md) before merge.
4. **Never commit failing checks** — `npm run build-grammar`, `npm run lint`,
   and `npm test` must all pass on the branch before any commit lands on main.

---

## Documentation ownership

Each doc owns one topic. It does not restate content owned by another doc — it
links.

| Doc                                | Owns                                                                                                                                                                                              | Does not duplicate                                                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`                        | First impression: what the extension provides, requirements, links                                                                                                                                | Setup details → CONTRIBUTING; syntax reference → ofan-lang/Ofan SYNTAX_SPEC                                                        |
| `CONTRIBUTING.md`                  | Dev setup, build/test/lint commands, F5 workflow, first-contribution guide (task selection, issue-to-PR path, SHA pinning, how to write a grammar test), pointers to METHODOLOGY and GIT_WORKFLOW | Commit format → GIT_WORKFLOW; lifecycle → METHODOLOGY                                                                              |
| `CLAUDE.md`                        | Agent-specific rules: project commands, reviewer invocation, plan-mode requirement                                                                                                                | Commit format → GIT_WORKFLOW; lifecycle → METHODOLOGY                                                                              |
| `docs/METHODOLOGY.md`              | Feature development lifecycle, doc ownership table, doc update-trigger rules                                                                                                                      | Git mechanics → GIT_WORKFLOW                                                                                                       |
| `docs/GIT_WORKFLOW.md`             | Git mechanics: commit format, branching, access model, PR conventions, review/merge policy, merge method, mandatory review, branch cleanup                                                        | Lifecycle → METHODOLOGY                                                                                                            |
| `docs/PILLARS.md`                  | The five extension design pillars — public source of truth for what every grammar PR is reviewed against                                                                                          | Agent impl → `.claude/agents/` (maintainer-local)                                                                                  |
| `docs/ROADMAP.md`                  | Milestone definitions, scope mapping to spec sections, and done criteria                                                                                                                          | git mechanics → GIT_WORKFLOW; contributor steps → CONTRIBUTING; section status → SYNTAX_SPEC (ROADMAP keeps a dated snapshot only) |
| `.github/pull_request_template.md` | PR description structure and manual five-pillar checklist                                                                                                                                         | PR conventions prose → GIT_WORKFLOW; pillar definitions → PILLARS.md                                                               |
| `CHANGELOG.md`                     | Release notes in Keep a Changelog format                                                                                                                                                          | Design decisions → GIT_WORKFLOW/METHODOLOGY                                                                                        |
| `SECURITY.md`                      | Vulnerability reporting policy                                                                                                                                                                    | Standalone                                                                                                                         |
| `CODE_OF_CONDUCT.md`               | Community standards (Contributor Covenant)                                                                                                                                                        | Standalone                                                                                                                         |

**The anti-drift rule for README:** README links to authoritative docs rather
than restating their content. When README content duplicates a doc, the README
version is the one to trim.

---

## Doc update trigger rules

These are not optional — they are part of the definition of "done" for a PR:

| What changed in the PR                               | Must also update                                       |
| ---------------------------------------------------- | ------------------------------------------------------ |
| Branch/merge policy, PR conventions, required checks | `docs/GIT_WORKFLOW.md` in the same PR                  |
| Grammar rule added, removed, or revised              | `CHANGELOG.md` under `[Unreleased]` in the same PR     |
| New extension feature released                       | `CHANGELOG.md` with a new version entry in the same PR |
| Milestone closed or SYNTAX_SPEC snapshot re-pinned   | `docs/ROADMAP.md` in the same PR                       |

Updating docs in a follow-up PR is not acceptable — it creates a window where
code and docs disagree, and follow-up PRs have a well-documented habit of never
landing.

---

## Direct-to-main vs. branch + PR for doc-only changes

GIT_WORKFLOW.md allows `docs:` and `chore:` commits to go direct-to-main. This
applies to:

- Typos and broken links
- Stale notes (e.g., a parenthetical about a file "not yet created" after it
  exists)
- Formatting and reordering with no semantic change

**Branch + PR is required for doc-only changes that:**

- Alter a stated policy (e.g., change a trigger rule in this file)
- Add or remove a doc from the ownership table above
- Change who owns a topic (re-scope a doc's authority)
- Revise the branching model or CI requirements in GIT_WORKFLOW.md

The criterion is: would a future contributor read this and reach a different
conclusion about how to work? If yes, it warrants a PR description as a
permanent record of why the policy changed.
