# Contributing to the Ofan VS Code extension

## Prerequisites

- **Node.js** 22 or later — install via [nodejs.org](https://nodejs.org/) or a
  version manager such as [fnm](https://github.com/Schniz/fnm)
- **Visual Studio Code** — for testing the extension locally

## Install

```sh
npm install
```

## Build

The extension ships a generated grammar file (`syntaxes/ofan.tmLanguage.json`).
The source of truth is `syntaxes/ofan.tmLanguage.yaml`. Always edit the YAML;
never edit the JSON by hand.

```sh
npm run build-grammar   # compile YAML → JSON
```

## Test

```sh
npm test   # run grammar tests (vscode-tmgrammar-test)
```

## Format & lint

```sh
npm run lint   # prettier --check on YAML, JSON, and Markdown files
```

## Run the extension locally

Press **F5** in VS Code to launch an Extension Development Host with the
extension loaded. Open any `.ofan` file to see syntax highlighting in action.

## Workflow

Feature development lifecycle → [docs/METHODOLOGY.md](docs/METHODOLOGY.md).

Extension design pillars (what every grammar PR is checked against) →
[docs/PILLARS.md](docs/PILLARS.md).

Claude Code agent rules (plan mode, automated pillars review) →
[CLAUDE.md](CLAUDE.md).

Non-agent contributors: the same conventions apply — plan before large changes,
and verify your change against [docs/PILLARS.md](docs/PILLARS.md) before opening
a PR.

Git and commit conventions → [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)

---

## Your first contribution

### 1. Choose a task

Browse issues labelled
[`good first issue`](https://github.com/ofan-lang/VSCode/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
for a starting point. Before claiming one, verify that the target spec section
is marked **Decided** — see [step 4 below](#4-confirm-a-section-is-decided).

Every bug fix, feature, refactor, or test change must start from an issue before
branching. If the work is not yet filed, open an issue with a short proposal and
wait for the maintainer to confirm scope. To claim an issue, comment to say you
are taking it; the maintainer will assign it to you. See the issue-first rule in
[docs/METHODOLOGY.md](docs/METHODOLOGY.md).

### 2. From issue to PR

**Core Team** (direct repo access):

```sh
git checkout main && git pull
git checkout -b feat/<short-name>   # other prefixes (fix/, docs/, chore/ …) → docs/GIT_WORKFLOW.md
# … make changes …
npm run build-grammar && npm run lint && npm test
```

**External contributors** (fork):

1. Fork `ofan-lang/VSCode` on GitHub.
2. Clone your fork and create a branch from `main`.
3. Run `npm install`, then the same build/lint/test commands above.

**Both** (after local changes pass):

4. If a grammar rule changed, update `CHANGELOG.md` `[Unreleased]` —
   [docs/METHODOLOGY.md §Doc update trigger rules](docs/METHODOLOGY.md#doc-update-trigger-rules).
5. Open a **draft PR** against `main`. In **What changed**, state the base
   branch and the base commit SHA (e.g. "branched from `main` at `abc1234`") —
   see the [PR template](.github/pull_request_template.md). The SYNTAX_SPEC.md
   SHA goes in the **Agent Review Summary** `SYNTAX_SPEC.md SHA checked against`
   field — these are two different SHAs.
6. If any [trigger file](docs/GIT_WORKFLOW.md#mandatory-agent-review) was
   touched, complete the five-pillar checklist in the PR template. Fill in each
   **Finding:** line ("no issues found" is a valid finding). Pillar definitions
   → [docs/PILLARS.md](docs/PILLARS.md).
7. Mark the PR **ready for review**. Core Team members may comment (advisory);
   the maintainer approves and merges.
8. After merge: click **Delete branch** on GitHub, then locally:
   `git branch -d <branch>`.

### 3. Pin the SYNTAX_SPEC.md SHA

Any PR touching `syntaxes/` must cite the `ofan-lang/Ofan` SYNTAX_SPEC.md commit
SHA it was checked against (Pillar 1 —
[docs/PILLARS.md](docs/PILLARS.md#pillar-1--grammar-scope-fidelity)).

**With GitHub CLI** (no clone needed):

```sh
gh api "repos/ofan-lang/Ofan/commits?path=docs/SYNTAX_SPEC.md&per_page=1" \
  --jq ".[0].sha"
```

**With curl** (unauthenticated; `ofan-lang/Ofan` is public):

```sh
curl -s \
  "https://api.github.com/repos/ofan-lang/Ofan/commits?path=docs/SYNTAX_SPEC.md&per_page=1" \
  | grep -m1 '"sha"' | cut -d'"' -f4
```

Record the result in the `SYNTAX_SPEC.md SHA checked against` field of the
**Agent Review Summary** section in the
[PR template](.github/pull_request_template.md).

### 4. Confirm a section is Decided

In `ofan-lang/Ofan` → `docs/SYNTAX_SPEC.md`, the status of each section is
stated as bold text at the opening of the section body:

- `**Decided: ...**` — locked; safe to implement.
- `**UNRESOLVED: ...**` or `**TENTATIVE: ...**` — do not implement yet.

Items explicitly deferred _within_ a Decided section (called out in the body
text as deferred) are also not yet implementable.

A construct with **no spec section at all** is not Decided and cannot be
implemented (Pillar 2). See the
[Not yet specified](docs/ROADMAP.md#not-yet-specified) note in the roadmap. If
the construct is missing entirely, open an issue in
[ofan-lang/Ofan](https://github.com/ofan-lang/Ofan) to get it specified first.

### 5. Write a grammar test

Every new grammar rule needs at least one test in `tests/` (Pillar 5 —
[docs/PILLARS.md](docs/PILLARS.md#pillar-5--every-new-grammar-rule-has-a-test),
enforced from M2 onward). Tests use `vscode-tmgrammar-test` format.

**File header** — every test file must start with:

```
# SYNTAX TEST "source.ofan" "description — SYNTAX_SPEC §N"
```

**`^` assertion** — the `^` points to the character directly above it on the
previous code line and asserts it has the given scope:

```
# this is a line comment
#   ^ comment.line.number-sign.ofan
```

**`<-` assertion** — asserts character(s) at the beginning of the previous code
line. Each dash covers one character (`<-` = col 0, `<--` = cols 0–1, `<---` =
cols 0–2):

```
# this is a line comment
# <- punctuation.definition.comment.ofan

###
# <--- punctuation.definition.comment.begin.ofan
```

**Negative assertion** — prefix the scope with `- ` to assert the character does
NOT have that scope:

```
# <- - comment.block.ofan
```

See [`tests/comments.ofan`](tests/comments.ofan) for a complete worked example
covering all three assertion styles against the §1 comment rules.
