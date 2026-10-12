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
