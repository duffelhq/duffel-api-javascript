# Duffel API JavaScript Client

A JavaScript client library for the Duffel API.

**Content**

- [Prerequisites](##prerequisites)
- [Install](##install)
- [Continuous Integration](##client-ci)
- [Contributing](../docs/CONTRIBUTING.md)
- [How to test](##test)
- [Documentation](##documentation)

## Prerequisites

- Node >= 14.17.6

## Install

You can install the dependencies for this library by executing the following command:

```
yarn install
```

## Test

You can run the test suite for this library by executing the following command:

```
yarn test
```

## Lint

You can run the linters configured for this library by executing the following command:

```
yarn lint
```

## Installation

You can install this library into your current project by executing the following command:

```
yarn add @duffel/api
```

If you need to create a new API operation class, just type `yarn generate:operation` and you will be prompted with a few questions. This script will create the relevant operation folder and files for you.

## Committing to the repository

To be able to publish the correct version to [npm](https://www.npmjs.com), this project is currently following [Angular conventional commit message guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type) which is based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). This commit message guideline allows the [semantic-release GitHub action](##client-ci) to be triggered.

### CommitLint to the rescue

Before creating a commit you should run a [husky hook](https://www.npmjs.com/package/husky) which will check if the commit structure is valid or not. If you don't want to create the commit manually, you can use `yarn commit` which will use `commitzen` to help you out creating the message.

## Client CI

Every time a commit is merged to main, a GitHub Action is run to analyse the commit messages with [`semantic-release`](https://github.com/semantic-release/semantic-release) and automatically update the current version to be deployed by following semantic versioning. When the deployment is complete, the action updates the package version, using Duffel's machine user (`@duffel-bot`) as the author, and this change will be automatically approved by the GitHub Action via the [`autoapprove` workflow] (../.github/workflows/autoapprove.yml).

### Continuous Integration

1. Developer opens pull request to main
2. Pull request is merged
3. GitHub Actions are triggered and the commits are analysed
   - if there's a breaking change, bump the major version
   - if there's a feature commit, bump the minor version
   - if there's a fix, bump the patch version
4. Deploy the new version
   a. Publish to npm
   b. Create and push a git tag
   c. Publish a GitHub release with the relevant commits and descriptions
5. After the releasen is published then a pull request is automatically created and approved via a GitHub Action to bump the package version

## Documentation

You can learn more about the Duffel API and this library in our [documentation](https://duffel.com/docs).
