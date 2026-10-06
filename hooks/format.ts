// SPDX-FileCopyrightText: 2026 Alberto P
//
// SPDX-License-Identifier: MPL-2.0

export type Usage = {
  context: { percent?: number }
  rateLimits: { kind: string; percentUsed: number }[]
}

const LABELS: Record<string, string> = { five_hour: '5h', seven_day: '7d' }

const pct = (n: number): string => `${Math.min(100, Math.max(0, Math.round(n)))}%`

export const format = ({ context, rateLimits }: Usage): string | undefined => {
  const parts = rateLimits
    .filter(r => Number.isFinite(r.percentUsed))
    .map(r => `${LABELS[r.kind] ?? r.kind.replace(/_/g, ' ')} ${pct(r.percentUsed)}`)
  if (typeof context.percent === 'number' && Number.isFinite(context.percent)) {
    parts.push(`ctx ${pct(context.percent)}`)
  }
  return parts.length ? parts.join(' · ') : undefined
}
