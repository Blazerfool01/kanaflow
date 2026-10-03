# Project Kickstart

A tiny Windows bootstrapper for disposable/experimental Codex projects.

## What it does

Run it from the root of a new project folder. It can:

- create `README.md`
- create `PROJECT.md`
- create `AGENTS.md`
- create `TODO.md`
- create `.editorconfig`
- create a stack-aware `.gitignore`
- initialise Git
- use `main` as the branch
- make an initial commit
- optionally create and push a GitHub repository with the GitHub CLI

Existing scaffold files are never overwritten.

The bootstrap files themselves are excluded from Git.

## Fastest use

Copy these two files into a new project folder:

- `ProjectKickstart.ps1`
- `start-project.cmd`

Then run:

```text
start-project.cmd
```

For a web project:

```text
start-project.cmd -Type web
```

For a private GitHub repo:

```text
start-project.cmd -Type web -GitHub -Private
```

## Options

`-Type generic|web|node|python|android`

Adds stack-specific ignore rules. Default: `generic`.

`-Name "Project Name"`

Overrides the folder name used in the generated docs and GitHub repository name.

`-GitHub`

Creates an `origin` repository using GitHub CLI (`gh`) if it is installed and authenticated.

`-Private`

Makes the GitHub repository private. Without this switch, `-GitHub` creates a public repository.

`-NoCommit`

Creates/stages the project structure but skips the initial commit.

## Requirements

For local Git setup:

- Git

For optional GitHub creation:

- GitHub CLI (`gh`)
- `gh auth login` completed once

## Suggested next upgrade

Instead of copying the bootstrap files into every project, put the script in a permanent tools folder and expose it as a PowerShell command such as:

```text
kickstart -Type web -GitHub -Private
```

That gives you the same workflow without leaving bootstrap files in every project directory.
