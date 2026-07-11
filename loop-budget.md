# Loop Budget

> Token and runtime budget for autonomous runs against `lingua`.

## Daily caps

- Total token estimate per day: **500,000 tokens**
- Sub-agent spawns per run: **max 5**
- Fix attempts per issue: **max 3**

## Pattern budgets

| Pattern | Cadence | Max tokens/run | Max spawns/run |
|--------|---------|----------------|----------------|
| Triage | Every run | 10,000 | 2 |
| Issue creation | Per planning session | 15,000 | 3 |
| Implementation | Per issue | 50,000 | 5 |
| Verification | Per PR | 20,000 | 3 |

## Kill switches

- `loop-pause-all`: set to `true` to halt all autonomous runs.

## Alerts This Period

_None yet._
