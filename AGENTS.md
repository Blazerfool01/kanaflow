# AGENTS.md

## Start here

1. Read `PROJECT.md` before making changes.
2. Identify the active milestone and its acceptance criteria.
3. Inspect the existing implementation before proposing a replacement.

## Working rules

- Make the smallest coherent change that satisfies the active milestone.
- Do not redesign or restructure unrelated areas.
- Do not delete or rename files unless the task requires it; explain why first when the change is consequential.
- Preserve working behaviour unless the requested milestone explicitly changes it.
- Compare a proposed approach with the current approach using practical evidence where possible.
- Sandboxed experiments are welcome; keep them isolated from the live build until they prove useful.
- If two approaches converge on the same result, say so rather than inventing a difference.
- Run relevant tests, builds, linters, or checks after changes.
- Do not silently fix unrelated problems. Record them under discoveries for the next milestone.

## End-of-task report

Keep the summary concise:

- **Milestone:** what was completed.
- **Proof:** tests/checks/manual verification performed.
- **Changed:** important files or behaviour changed.
- **Found:** unrelated issues or opportunities worth revisiting.
- **Next:** one sensible next step and why.
