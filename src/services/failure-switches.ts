export type FailureSwitches = {
  list: boolean
  saves: boolean
  deletes: boolean
}

const storageKey = 'course-manager:failures'

export function readFailureSwitches(): FailureSwitches {
  const stored: Partial<FailureSwitches> = JSON.parse(localStorage.getItem(storageKey) ?? '{}')
  return { list: stored.list === true, saves: stored.saves === true, deletes: stored.deletes === true }
}

export function writeFailureSwitch(name: keyof FailureSwitches, on: boolean) {
  localStorage.setItem(storageKey, JSON.stringify({ ...readFailureSwitches(), [name]: on }))
}
