// SPDX-FileCopyrightText: 2026 Alberto P
//
// SPDX-License-Identifier: MPL-2.0

import type { Register } from 'claude-code'
import { format } from './format'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    try {
      $.ui.status(format(await $.session.usage()))
    } catch {
      // usage unavailable; leave the status line alone and keep the chain going
    }
    return next(e)
  })

  on('session.measure', ($, e, next) => {
    $.ui.status(format(e))
    return next(e)
  })
}
