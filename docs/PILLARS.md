# Extension design pillars — Ofan VSCode

These are the five non-negotiable properties of this extension. Every PR that
touches `syntaxes/`, `language-configuration.json`, `package.json`, `tests/`, or
`.github/workflows/` must be verified against all five before merge.

The pillars are the public source of truth. The automated review agent
(`.claude/agents/extension-pillars-reviewer.md`, maintainer-local) implements
them as yes/no checks against a diff.

---

## Pillar 1 — Grammar scope fidelity

Every TextMate scope name used in the grammar must either come from the
[standard TextMate naming conventions](https://macromates.com/manual/en/language_grammars#naming_conventions)
or be explicitly justified in the PR description with a reason it cannot be
expressed by a standard name.

In addition, every PR that adds or modifies grammar rules must cite the exact
commit SHA of `ofan-lang/Ofan docs/SYNTAX_SPEC.md` it was checked against (e.g.,
"checked against `ofan-lang/Ofan@<sha>`"). A grammar rule checked against a
moving spec can silently diverge from what the compiler accepts.

**Why:** The VS Code marketplace surfaces scope names to theme authors and
tooling. Non-standard scopes reduce portability and theme coverage. Pinning to a
SYNTAX_SPEC SHA creates a traceable audit trail between what the editor
highlights and what the compiler accepts.

**Check question:** Are all new or changed scope names either from the standard
TextMate vocabulary or explicitly justified in the PR description? Does the PR
cite the `ofan-lang/Ofan` SYNTAX_SPEC.md commit SHA it was checked against?

---

## Pillar 2 — No speculative grammar

No grammar rule may target a construct that is marked **UNRESOLVED** or
**TENTATIVE** in `ofan-lang/Ofan docs/SYNTAX_SPEC.md`, or that appears only in
§24 (deferred — never formally designed).

**Why:** Highlighting a construct before its syntax is decided forces a
retroactive fix when the spec settles. That fix silently invalidates existing
`.ofan` files that were highlighted "correctly" under the interim rule. Grammar
rules are a commitment; the spec section must be **Decided** first.

**Check question:** Does any new or changed rule in this diff match a construct
whose SYNTAX_SPEC.md section is not marked **Decided**?

---

## Pillar 3 — Source/generated consistency

The committed `syntaxes/ofan.tmLanguage.json` must always be the exact output of
running `npm run build-grammar` against the current
`syntaxes/ofan.tmLanguage.yaml`. CI enforces this with
`git diff --exit-code syntaxes/ofan.tmLanguage.json` after the build step.

The YAML is the source of truth; the JSON is generated. Never edit the JSON by
hand. Any PR that modifies the YAML must regenerate and commit the JSON in the
same PR.

**Why:** Two sources of truth diverge. If the JSON is hand-edited, the build
script is no longer authoritative and the CI diff check loses meaning.

**Check question:** After running `npm run build-grammar` locally, does
`git diff syntaxes/ofan.tmLanguage.json` show any changes? (Do not infer
consistency from the diff alone — run the build and check.)

---

## Pillar 4 — Zero ceremony, no unscoped extension code

The extension must work after install with no user setup, no required settings,
and no extra tools beyond VS Code itself. `package.json` must not gain any of
the following unless the milestone that introduces them was explicitly approved
in a design conversation first:

- `main` — TypeScript entry point
- `activationEvents` — any activation event
- `contributes.commands` — command palette entries
- `contributes.taskDefinitions` — task providers
- `contributes.debuggers` — debug adapters
- Any other `contributes.*` key beyond `languages`, `grammars`, and `snippets`

When TypeScript does arrive (LSP milestone), it must land together with its
tests and its ESLint configuration in the same PR. TypeScript without tests and
lint is not acceptable regardless of how small it is.

**Why:** A grammar-only extension has zero runtime attack surface and zero
activation latency. Incremental additions of code-backed contributions before
their scope is defined create maintenance debt and increase the extension's
footprint without clear user benefit.

**Check question:** Does `package.json` gain `main`, `activationEvents`, or any
code-backed `contributes.*` key without a cited approved milestone? Does any new
TypeScript file arrive without tests and an ESLint configuration?

---

## Pillar 5 — Every new grammar rule has a test

**Before the first grammar rule is merged (M0/M1):** informational. The absence
of tests is noted but not blocking.

**From the first PR that adds a grammar rule (M2 onward):** blocking. Every new
`match`, `begin`/`end`, or `include` pattern added to the grammar must have at
least one corresponding test assertion in `tests/` using `vscode-tmgrammar-test`
syntax before the PR merges.

**Why:** A grammar rule with no test is invisible breakage. Future edits can
silently drop or change a scope and no automated check will catch it. The test
is the only machine-readable specification of what the rule is supposed to do.

**Check question:** Does every new grammar rule in this diff have at least one
test assertion in `tests/`? (Informational if no grammar rules exist yet;
blocking from the first PR that adds one.)
