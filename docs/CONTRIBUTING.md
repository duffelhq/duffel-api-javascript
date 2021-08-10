# Contributing to this repository

## Committing to the repository

To be able to publish the correct version to NPM, we are currently following [Angular conventional commit message guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type) which is based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). The previous commit message guideline allow us to trigger [semantic-release GitHub action](##client-ci).

### CommitLint to the rescue

Before creating a commit we will run a husky hook which will check if the commit structure is valid or not. If you don't want to create the commit manually, you can use `yarn commit` which will use [`commitzen`](https://github.com/commitizen/cz-cli) to help you out creating the message.

## Client CI

Every time we merge to `main`, GitHub will run the action by checking the commit messages with [semantic-release](https://github.com/semantic-release/semantic-release) and automatically bump the correct version to be deployed by following [semver](https://semver.org). When the deployment is done it will create a bump in our package version, using our `duffel-bot`, and will be auto-approved by the GitHub action via our auto approve workflow (`autoapprove.yml`).

### CI flow

1. Developer opens PR to `main`
2. PR is merged to `main`
3. Our GitHub action triggers and we analyse the commits
   a. if there's a breaking change bump major
   b. if there's a feat commit bump minor version
   c. if there's a fix only bump patch version
4. Deployment is done
   a. Publish to NPM
   b. Publish Git Tag release with relevant commits and descriptions
5. After it's published, a GitHub action creates a PR with `duffel-bot` via a personal access token, bumping the version inside `package.json`
6. Ideally we want to auto-merge this PR since it's just a chore bumping our version inside package.json
   a. If PR is from duffel-bot, then auto approve/auto-merge
