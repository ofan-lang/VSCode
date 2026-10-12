# Ofan VSCode — Project instructions for Claude Code

VS Code language support for Ofan: syntax highlighting, snippets, and editor
configuration for `.ofan` files.

- Grammar source: `syntaxes/ofan.tmLanguage.yaml` (YAML → compiled to JSON)
- Ofan syntax reference: `ofan-lang/Ofan` → `docs/SYNTAX_SPEC.md`
- No LSP, no extension activation code until the language is stable enough

No need to read SYNTAX_SPEC for purely mechanical tasks (CI config, tooling,
formatting). Read it before touching `syntaxes/` or
`language-configuration.json`.

## Project commands

- Build grammar: `npm run build-grammar`
- Test: `npm test`
- Lint: `npm run lint`
- Run locally: F5 in VS Code (Extension Development Host)

## Conventions

- Grammar rules trace to constructs documented in
  `ofan-lang/Ofan docs/SYNTAX_SPEC.md`. If a construct is marked UNRESOLVED
  (§24-deferred), no grammar rule covers it.
- The committed `syntaxes/ofan.tmLanguage.json` is always the output of
  `npm run build-grammar` applied to the current YAML. Never edit the JSON by
  hand.
- Commits: imperative mood, explain the _why_. Full format and types →
  [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)
- Never mark a task complete without showing evidence (real test output or a
  working F5 session).

## Expected workflow

1. Plan mode first for any non-trivial change — no files written until the plan
   is approved.
2. Small steps with checkpoints ("do X, stop, show me") on larger pieces.
3. Before any PR that touches `syntaxes/`, `language-configuration.json`,
   `package.json`, `tests/`, or `.github/workflows/`, run a pillars review
   against the diff. The five pillars are in [docs/PILLARS.md](docs/PILLARS.md).
   The agent definition that automates this review is in
   `.claude/agents/extension-pillars-reviewer.md` (maintainer-local, not tracked
   in the repo).
4. Never commit if lint or tests are failing.
