<!--
Full PR requirements: docs/GIT_WORKFLOW.md §PR conventions
Trigger files that require a pillars review:
  syntaxes/, language-configuration.json, package.json,
  tests/, .github/workflows/
See docs/GIT_WORKFLOW.md §Mandatory agent review for details.
-->

## What changed

<!--
One or two sentences on the *why*.
State the base branch and confirm the SHA. Example:
"Branched from `main` at `abc1234`."
-->

## Build status

- [ ] `npm run build-grammar` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] [Docs updated per METHODOLOGY.md §Doc update trigger rules](https://github.com/ofan-lang/VSCode/blob/main/docs/METHODOLOGY.md#doc-update-trigger-rules)
      (e.g. `CHANGELOG.md [Unreleased]` for grammar changes)

## Agent Review Summary

<!--
Required when any trigger file is touched (syntaxes/,
language-configuration.json, package.json, tests/, .github/workflows/).

If no trigger files changed: write "N/A — no trigger files touched" and
delete the SHA field and checklist below.

Claude Code: run .claude/agents/extension-pillars-reviewer.md and paste
its output here.

Without the agent: fill in the SYNTAX_SPEC SHA and complete the
five-pillar checklist below.
-->

**SYNTAX_SPEC.md SHA checked against:** `ofan-lang/Ofan@<sha>`

<!-- Required when syntaxes/ is touched (Pillar 1). -->

**Five-pillar checklist** (complete manually when the local agent is not
available; links go to
[docs/PILLARS.md](https://github.com/ofan-lang/VSCode/blob/main/docs/PILLARS.md)
— do not restate pillar text here):

- [ ] [Pillar 1 — Grammar scope fidelity](https://github.com/ofan-lang/VSCode/blob/main/docs/PILLARS.md#pillar-1--grammar-scope-fidelity)
  - Finding:
- [ ] [Pillar 2 — No speculative grammar](https://github.com/ofan-lang/VSCode/blob/main/docs/PILLARS.md#pillar-2--no-speculative-grammar)
  - Finding:
- [ ] [Pillar 3 — Source/generated consistency](https://github.com/ofan-lang/VSCode/blob/main/docs/PILLARS.md#pillar-3--sourcegenerated-consistency)
  - Finding:
- [ ] [Pillar 4 — Zero ceremony, no unscoped extension code](https://github.com/ofan-lang/VSCode/blob/main/docs/PILLARS.md#pillar-4--zero-ceremony-no-unscoped-extension-code)
  - Finding:
- [ ] [Pillar 5 — Every new grammar rule has a test](https://github.com/ofan-lang/VSCode/blob/main/docs/PILLARS.md#pillar-5--every-new-grammar-rule-has-a-test)
  - Finding:

---

Closes # <!-- remove this line if the PR closes no issue -->
