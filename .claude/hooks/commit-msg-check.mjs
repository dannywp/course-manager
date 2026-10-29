import { readFileSync } from 'node:fs'

const input = JSON.parse(readFileSync(0, 'utf8'))
const command = input.tool_input?.command ?? ''

if (!/\bgit\s+commit\b/.test(command) || /--no-edit\b/.test(command)) process.exit(0)

const block = (reason) => {
  console.error(reason)
  process.exit(2)
}

const message = command.match(/\s(?:-[a-zA-Z]*m|--message)(?:=|\s+)([\s\S]*)/)
if (!message) block('Pass the commit message with -m so it can be checked against Conventional Commits.')

const subject = message[1]
  .replace(/^["']?\$\(cat <<-?["']?\w+["']?\s*\n/, '')
  .replace(/^["']/, '')
  .split('\n')[0]

const conventional = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9-]+\))?!?: \S/
if (!conventional.test(subject)) {
  block(
    `Commit subject "${subject.replace(/["']\s*$/, '').slice(0, 72)}" is not a Conventional Commit.\n` +
      'Use `type(scope): subject`, e.g. `feat(list): render courses in service order`.\n' +
      'Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert.',
  )
}
