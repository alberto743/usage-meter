<!--
SPDX-FileCopyrightText: 2026 Alberto P

SPDX-License-Identifier: MPL-2.0
-->

# usage-meter

Claude Code plugin that shows rate-limit usage and context fill in the status line, e.g. `5h 42% · 7d 18% · ctx 63%`.

## Install

Add this repo as a marketplace, then install `usage-meter` from it.

## Layout

- `hooks/format.ts` – pure formatter (clamps to 0–100, ignores non-finite values)
- `hooks/register.ts` – updates the status line on `session.start` and `session.measure`
- `hooks/format.test.ts` – formatter tests

`tsconfig.json` extends `.claude-plugin/types/tsconfig.json`, which is provided by the host and not tracked here.
