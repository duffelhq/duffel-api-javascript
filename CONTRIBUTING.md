# Contribution guide

## Setup

1. Make sure you have the correct version of Node installed. If you use [`nvm`](https://github.com/nvm-sh/nvm), run `nvm use`. If you use [`asdf`](https://github.com/asdf-vm/asdf), run `asdf install`.
1. Make sure you have `yarn ^1.0.0` installed: `npm install --global yarn`
1. Install dependencies with `yarn`

## Run locally

Use `yarn dev` to run in dev mode.

See `package.json` for other scripts that can be run (e.g. linters).

## Committing code

We use [commitlint](https://github.com/conventional-changelog/commitlint) to lint our commit messages. If your commit message doesn't fit this format, it'll be rejected by a pre-commit hook.

## Renovate

We use [Renovate](https://www.mend.io/free-developer-tools/renovate/) to manage dependencies. The config file is at `.github/renovate.json`.

We seek to maintain a balance between thoroughly checking each dependency and spending too much time maintaining dependencies, so our settings are designed to **safely** reduce noise reduction from dependency updates, like scheduling updates outside of working hours, combining some PRs, and automatically merging dependencies where we can be 100% confident in our CI's ability to catch problems. For example, we automerge linter PRs because it's virtually impossible for them to break something in production as they only check code, they don't affect any functionality.
