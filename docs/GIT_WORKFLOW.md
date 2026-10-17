# Git workflow — Ofan VSCode

## Commit message format

Conventional Commits: `<type>(<scope>): <subject>`

**Types:**

- `feat` — new extension capability (new grammar rules, new editor
  configuration)
- `fix` — bug fix in grammar or configuration
- `docs` — documentation only
- `chore` — tooling, config, CI, dependencies (no grammar or behavior change)
- `refactor` — internal restructuring without behavior change
- `test` — test additions or corrections

**Scope** is optional but encouraged: `grammar`, `config`, `ci`, `tooling`,
`docs`.

**Subject:** imperative mood, lowercase, no trailing period, ≤50 chars.

**Body** (optional): explain the _why_, not the _what_. Wrap at 72 chars.

Examples:

```
chore: init repo
docs(git_workflow): record merge-commit-only policy and rationale
feat(grammar): add syntax highlighting for function declarations
fix(grammar): correct scope for block comment delimiter
```

## Branching model

**Direct-to-main** is acceptable for `docs:` and `chore:` commits. This applies
to the maintainer only — Core Team members and external contributors always use
branch + PR, including for `docs:` and `chore:`.

**Branch + PR is required for:**

- Any `feat:`, `fix:`, or `refactor:` change
- Any change that touches `syntaxes/`, `language-configuration.json`,
  `package.json` (contributes section), or `.github/workflows/`

Branch naming: `<type>/<short-name>` where `<type>` mirrors the commit type —
for example `feat/<short-name>`, `fix/<short-name>`, `fix/issue-<N>`,
`docs/<short-name>`, `chore/<short-name>`.

## Access model

**Maintainer:** @MYS158.

**Core Team** members have direct push access to `ofan-lang/VSCode` — create
branches directly in the repo and open PRs from there.

**External contributors** fork `ofan-lang/VSCode` on GitHub, create a branch in
the fork, and open a PR targeting `main` in the upstream repo.

**`main` is protected** — a PR is required and CI must pass before merge. The
maintainer may bypass this protection only for `docs:` and `chore:` commits that
are not covered by the "Branch + PR is required" list above (i.e., commits that
do not touch the trigger files). Branch protection settings are maintained by
the maintainer.

## Claude Code git permissions — what is intentionally absent

`.claude/settings.json` (maintainer-local, not tracked in the repo) allowlists
`git status`, `git log`, `git diff`, `git show` — read-only operations only.

`git commit` and `git push` are **deliberately not allowlisted**.

**Why omission, not convention:** a permission prompt is enforced by the tool
regardless of session state; a documented convention can be forgotten
mid-session. These operations are irreversible and visible outside the local
repo — they warrant a friction point every time, independent of what was
discussed earlier in a session.

Do not add `git commit*` or `git push*` to the allowlist. Require explicit
in-chat confirmation before Claude Code runs either command.

## PR conventions

PRs are required for all changes except `docs:` and `chore:` commits by the
maintainer. Before opening:

1. Verify the base branch explicitly: `git log --oneline -3 <base>` and confirm
   you are branching from the intended point. Never assume the base — state it
   in the PR description.
2. Run a pillars review (per [docs/PILLARS.md](../docs/PILLARS.md)) on the diff
   if any of the trigger files (see §Mandatory agent review) are touched. Claude
   Code users: the agent definition that automates this is in
   `.claude/agents/extension-pillars-reviewer.md` (maintainer-local, not tracked
   in the repo). Without the local agent: use the manual five-pillar checklist
   in the [PR template](../.github/pull_request_template.md).
3. Write a PR description that explains _why_ — it becomes the permanent record
   when `git log` is read months later.

### Mandatory agent review

Any PR that touches any of the following must include a pillars review (per
[docs/PILLARS.md](../docs/PILLARS.md)) before merge. This is not optional and
not a judgment call.

**Trigger files:**

- `syntaxes/` (any file)
- `language-configuration.json`
- `package.json`
- `tests/` (any file)
- `.github/workflows/` (any file)

PRs that only touch `docs/` or `scripts/` are exempt.

**When `src/` exists:** any PR that touches files under `src/` must additionally
run a TypeScript reviewer (to be defined when that milestone is approved) before
merge. The pillars review remains required for its own trigger files.

### PR description requirements

Every PR description must include, at minimum:

1. **What changed** — one or two sentences explaining the _why_ at a high level.
   Include the base branch and confirm it is correct (e.g., "branched from
   `main` at `abc1234`").
2. **Build status** — explicit confirmation that `npm run build-grammar`,
   `npm run lint`, and `npm test` all pass on the branch.
3. **Agent Review Summary** (required if any trigger file was touched) —
   findings against each of the five pillars in
   [docs/PILLARS.md](../docs/PILLARS.md), including "no issues found" if
   applicable. Silence is not an acceptable substitute for confirmation.

### Review and merge

Any Core Team member may review a PR and leave comments — all reviews are
advisory. Only the maintainer approves PRs for merge and performs the merge
commit.

### Merge method

Always use **"Create a merge commit"** on GitHub — not "Squash and merge" or
"Rebase and merge".

Reason: merge commits preserve branch structure and per-commit history within a
PR. This makes it possible to trace which PR introduced a given change
(`git log --merges`, `git log --first-parent`) without reconstructing history.

This applies even to single-commit PRs for consistency.

**Repo settings:** squash and rebase merging are disabled in repo settings,
enforcing this by the UI rather than just by convention.

### Branch cleanup after merge

After a PR is merged, delete the feature branch:

- On GitHub: click **"Delete branch"** in the PR after merging.
- Locally: `git branch -d <branch>` (safe delete — refuses if unmerged).

## Labels

**Type** (one required per issue): `bug`, `enhancement`, `documentation`,
`chore`, `question`.

**Priority** (required on `bug`/`enhancement`): `priority-high`,
`priority-medium`, `priority-low`.

**Component** (optional, combinable): `grammar`, `config`, `ci`, `tooling`,
`docs-infra` — add a new component label only once an issue genuinely needs it.

**Descriptive tags** (optional): `investigate`, `cleanup`, `dx` — use when the
extra signal is warranted; don't invent new ones ad hoc without updating this
list.

**Special:** `good first issue` — reserve for genuinely entry-level issues.

## Issue linking

- Branch naming: `fix/issue-<N>` for a single issue.
- Every PR description must include `Closes #N` (or `Fixes #N`) for each issue
  it resolves — this is what GitHub parses to auto-close on merge to `main`.
