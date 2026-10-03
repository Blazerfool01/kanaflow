# KanaFlow Codex Cloud status trial (v0.1)

This is an isolated experiment on `experiment/codex-cloud-status-v0.1`. It does not change the default branch or the live site.

## Run in Codex Cloud

Open this repository and select the trial branch in a Codex Cloud environment. Ask Codex:

> Read AGENTS.md and PROJECT.md. Inspect this branch and run `node scripts/project-status.mjs`. Verify the generated `.ai/project-status.json` against the repository facts. Do not edit application files, PROJECT.md, or AGENTS.md. Do not invent a test result: this repository currently has no package.json or test script. If the report is accurate, commit only `.ai/project-status.json` on this trial branch with message `Add Codex Cloud status trial result`. Report the environment setup, commands run, files changed, and any blockers.

The script only reads Git metadata, `PROJECT.md`, and `package.json`, then writes `.ai/project-status.json`. It never runs tests or changes application code.

## What this test proves

- Can the cloud environment open the repository and run a small deterministic script?
- Does the produced JSON reflect the actual checked-out branch and project brief?
- Can the artifact be committed on an isolated branch and reviewed before merging?

It does not set up an always-on environment or dashboard. If the environment cannot commit, keep the generated JSON as run output and report that limitation.
