# Roadmap — Ofan VSCode

Milestones track the extension from initial repo setup through a complete
grammar and, eventually, language server support. Grammar milestones (M2 onward)
are gated by the corresponding sections in `ofan-lang/Ofan` →
`docs/SYNTAX_SPEC.md` being marked **Decided**. Each grammar milestone is tied
to a pinned `SYNTAX_SPEC.md` commit SHA. That SHA is recorded below when the
milestone opens and in each PR description (Pillar 1 — see
[PILLARS.md](PILLARS.md)).

---

## Summary

| Milestone | Status        | Scope                                |
| --------- | ------------- | ------------------------------------ |
| M0        | Done          | Repo init                            |
| M1        | Done          | Extension scaffold                   |
| M2        | In progress   | Grammar — core syntax                |
| M3        | Pending       | Grammar — expressions                |
| M4        | Pending       | Grammar — declarations & type system |
| M5        | Not scheduled | LSP                                  |

---

## Not yet specified

The following constructs have no usable spec section at `cc3049f` and cannot be
implemented until the spec defines or reconciles them (Pillar 2):

- **§24** — entire section is "Not yet decided — deferred"; out of scope for all
  grammar milestones until individual items graduate to a Decided section.
- **Closures** — the word "closure" does not appear anywhere in SYNTAX_SPEC.md
  at `cc3049f`; no spec section exists. Tracked:
  [ofan-lang/Ofan#68](https://github.com/ofan-lang/Ofan/issues/68).
- **Function-call syntax** — no standalone call-expression section; §23 mentions
  trailing `()` only to disambiguate method calls from field access. Tracked:
  [ofan-lang/Ofan#69](https://github.com/ofan-lang/Ofan/issues/69).

---

## M0 — Repo init (Done)

**Closing commit:** `3073c82`

LICENSE, `.gitignore` (`.claude/` excluded from day one), `.editorconfig`,
`.gitattributes`, initial documentation (README, CHANGELOG skeleton, CLAUDE.md,
`docs/`).

---

## M1 — Extension scaffold (Done)

**Closing commit:** `fe9e1b8`

`package.json` with grammar contribution, empty `syntaxes/ofan.tmLanguage.yaml`,
build pipeline (`npm run build-grammar`), lint, test, Prettier config,
`.vscode/` launch configuration, CI workflow.

---

## M2 — Grammar: core syntax (In progress)

**SYNTAX_SPEC.md SHA (pinned at milestone open):**
`be5875705e0a7650b2c0e8390d58be114205b7d2` (`ofan-lang/Ofan@be58757`)

**Scope** (spec status snapshot at `ofan-lang/Ofan@be58757` — the spec is
authoritative; verify against the SHA you pin for each PR):

| Section | Topic                                          | Spec status at `be58757`         |
| ------- | ---------------------------------------------- | -------------------------------- |
| §1      | Comments                                       | Decided                          |
| §2      | Identifiers & casing (incl. reserved keywords) | Decided                          |
| §3      | Statement termination                          | Decided                          |
| §4      | Block delimiters                               | Decided                          |
| §12     | Operators                                      | Decided                          |
| §14     | Numeric literals                               | Decided                          |
| §15     | String and character literals                  | Decided (core); 2 items deferred |

§3 and §4 are in M2 because every higher-level grammar rule depends on knowing
how statements terminate and how blocks are delimited.

<a id="m2-done-criterion"></a>

**Done when:**

The closing PR pins the `SYNTAX_SPEC.md` SHA current at that time (per Pillar
1). At that SHA, every in-scope section marked **Decided** has both:

- a grammar rule in `syntaxes/ofan.tmLanguage.yaml`, and
- at least one `vscode-tmgrammar-test` assertion in `tests/`.

Additionally:

- Every in-scope section not yet marked **Decided** is listed explicitly as
  excluded in the closing PR description.
- Items explicitly deferred within a Decided section (for example, the two
  string-literal extensions deferred within §15, and nested sub-patterns within
  §21) are excluded from the rule requirement and listed in the closing PR
  description the same way.
- `CHANGELOG.md` `[Unreleased]` is updated to reflect all new rules.
- CI is green on the closing PR.
- A manual F5 check on a representative `.ofan` file is recorded in the closing
  PR description.

---

## M3 — Grammar: expressions (Pending)

**SYNTAX_SPEC.md SHA:** TBD — pinned when milestone opens.

**Scope** (spec status snapshot at `ofan-lang/Ofan@cc3049f`; verify at the SHA
pinned when milestone opens):

| Section | Topic                    | Spec status at `cc3049f`                     |
| ------- | ------------------------ | -------------------------------------------- |
| §8      | Casting                  | Decided                                      |
| §16     | Loop syntax              | Decided                                      |
| §21     | Match / pattern matching | Decided (core); nested sub-patterns deferred |
| §23     | Struct field access      | Decided                                      |

§8 (casting) and §23 (struct field access) are in M3 because both are
expression-level constructs that appear inside function bodies, not
declarations.

Closures and general function-call syntax have no spec section at `cc3049f` and
cannot be implemented until the spec adds them (Pillar 2).

**Done when:** same pattern as [M2 — Done when](#m2-done-criterion), applied to
this milestone's scope.

---

## M4 — Grammar: declarations & type system (Pending)

**SYNTAX_SPEC.md SHA:** TBD — pinned when milestone opens.

**Scope** (spec status snapshot at `ofan-lang/Ofan@cc3049f`; verify at the SHA
pinned when milestone opens):

| Section | Topic                                       | Spec status at `cc3049f` |
| ------- | ------------------------------------------- | ------------------------ |
| §5      | Variable declarations                       | Decided                  |
| §6      | Function declarations                       | Decided                  |
| §7      | Lifetime / region inference & escape hatch  | Decided                  |
| §9      | Type annotation `:` — resolved overload     | Decided                  |
| §10     | Struct literal fields                       | Decided                  |
| §11     | Type aliasing                               | Decided                  |
| §13     | Pointers and raw memory                     | Decided                  |
| §17     | Copy/Move semantics                         | Decided                  |
| §18     | Method receiver — `self` and `Self`         | Decided                  |
| §19     | `Option` and `Checked` — types and variants | Decided                  |
| §20     | Enum declaration syntax                     | Decided                  |
| §22     | `impl` block syntax                         | Decided                  |
| §25     | Traits                                      | Decided                  |

§9 (type annotation) is in M4 rather than M3 because `: T` is used primarily in
function parameters, `let` bindings with type ascription, and struct fields —
all declaration contexts, not expression contexts.

Modules (module/import syntax) are in §24 "Not yet decided — deferred" at
`cc3049f`; excluded until their spec sections are marked **Decided**.

**Done when:** same pattern as [M2 — Done when](#m2-done-criterion), applied to
this milestone's scope.

---

## M5 — LSP (Not scheduled)

**Status: closed to contributors.** Do not open issues or PRs targeting this
milestone without explicit maintainer approval in a design conversation.

**Entry conditions (all must be met before work begins):**

1. Explicit approval in a design conversation (per [PILLARS.md](PILLARS.md)
   Pillar 4).
2. Spec stable and Ofan v0.3 reached.
3. TypeScript reviewer (referenced in [GIT_WORKFLOW.md](GIT_WORKFLOW.md)
   §Mandatory agent review) is defined.
4. The TypeScript entry point, its tests, and its ESLint configuration must land
   in the same PR — no TypeScript without tests and lint (Pillar 4).

**Scope (when approved):** TypeScript language server entry point, activation
event, ESLint configuration, full test suite.

---

## Unscheduled

No milestone assigned. Consider only if and when scope and maintenance cost are
justified.

- **Snippets** — `.ofan` code snippets contributed to `package.json`.
- **Marketplace publishing** — `vsce package` / `vsce publish`, CI release
  workflow, publisher account setup.
