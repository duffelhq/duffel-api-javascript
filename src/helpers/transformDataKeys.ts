#!/usr/bin/env node

/**
 * This function will transform `mock.json` API response copied from the docs into camelCase
 * And copy straight into your clipboard
 * Copy the API response which you want to transform and replace the content inside mock.json
 */

import { transformDataKeys } from '../lib'
import camelCase from 'lodash/camelCase'
import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'

fs.readFile(path.resolve('helpers/mock.json'), 'utf8', (err, value) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err)
  const transformedBody = transformDataKeys(JSON.parse(value), camelCase)
  const proc = childProcess.spawn('pbcopy')
  proc.stdin.write(JSON.stringify(transformedBody))
  return proc.stdin.end()
})
