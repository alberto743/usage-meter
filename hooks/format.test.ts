// SPDX-FileCopyrightText: 2026 Alberto P
//
// SPDX-License-Identifier: MPL-2.0

import { test, expect } from 'claude-code/testing'
import { format } from './format'

test('both windows and context', () => {
  expect(
    format({
      context: { percent: 62.6 },
      rateLimits: [
        { kind: 'five_hour', percentUsed: 42 },
        { kind: 'seven_day', percentUsed: 18 },
      ],
    }),
  ).toBe('5h 42% · 7d 18% · ctx 63%')
})

test('no rate limits', () => {
  expect(format({ context: { percent: 10 }, rateLimits: [] })).toBe('ctx 10%')
})

test('nothing known clears the line', () => {
  expect(format({ context: {}, rateLimits: [] })).toBeUndefined()
})

test('clamps and drops non-finite values', () => {
  expect(
    format({
      context: { percent: Number.NaN },
      rateLimits: [
        { kind: 'five_hour', percentUsed: 120 },
        { kind: 'seven_day', percentUsed: Number.NaN },
      ],
    }),
  ).toBe('5h 100%')
})

test('unknown kinds are prettified', () => {
  expect(format({ context: {}, rateLimits: [{ kind: 'seven_day_opus', percentUsed: 5 }] })).toBe('seven day opus 5%')
})
