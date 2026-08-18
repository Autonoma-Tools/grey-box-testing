# Why Grey Box Testing Was Never a Compromise

Two implementations of the same promo-code eligibility rule, plus the behavioral test that survives the refactor between them. The blog post derives equivalence partitions from the validator's actual branches, then verifies them through the interface instead of the internals.

> Companion code for the Autonoma blog post: **[Why Grey Box Testing Was Never a Compromise](https://getautonoma.com/blog/grey-box-testing)**

## Requirements

Node 18+ (no dependencies needed for verify.js). The Playwright test additionally needs @playwright/test and a running checkout page.

## Quickstart

```bash
git clone https://github.com/Autonoma-Tools/grey-box-testing.git
cd grey-box-testing
node verify.js
```

## Project structure

```
src/promoCode.js            The original validator: five sequential if-checks
src/promoCodeRefactored.js  The same rule restructured as a rules table
tests/promoCode.e2e.spec.js A behavioral Playwright test that goes through the checkout UI
verify.js                   Runs both validators across all six partitions and compares
```

- `src/` — primary source files for the snippets referenced in the blog post.
- `examples/` — runnable examples you can execute as-is.
- `docs/` — extended notes, diagrams, or supporting material (when present).

## About

This repository is maintained by [Autonoma](https://getautonoma.com) as reference material for the linked blog post. Autonoma builds autonomous AI agents that plan, execute, and maintain end-to-end tests directly from your codebase.

If something here is wrong, out of date, or unclear, please [open an issue](https://github.com/Autonoma-Tools/grey-box-testing/issues/new).

## License

Released under the [MIT License](./LICENSE) © 2026 Autonoma Labs.
