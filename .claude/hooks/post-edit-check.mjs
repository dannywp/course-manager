import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd()
const input = JSON.parse(readFileSync(0, 'utf8'))
const filePath = input.tool_input?.file_path ?? ''

if (!existsSync(join(projectDir, 'package.json'))) process.exit(0)
if (!/\.(ts|tsx|js|jsx|mjs|cjs|json)$/.test(filePath)) process.exit(0)

const failures = []
for (const script of ['typecheck', 'lint']) {
  const result = spawnSync('npm', ['run', '--silent', '--if-present', script], {
    cwd: projectDir,
    encoding: 'utf8',
  })
  if (result.status !== 0) {
    const output = `${result.stdout}${result.stderr}`.trim()
    failures.push(`npm run ${script} failed:\n${output.slice(-4000)}`)
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n\n'))
  process.exit(2)
}
