import { useState } from 'react'
import { readFailureSwitches, writeFailureSwitch, type FailureSwitches } from '../services/failure-switches'
import styles from './demo-controls.module.css'

const switches: { name: keyof FailureSwitches; label: string }[] = [
  { name: 'list', label: 'Fail list' },
  { name: 'saves', label: 'Fail saves' },
  { name: 'deletes', label: 'Fail deletes' },
]

export function DemoControls() {
  const [failures, setFailures] = useState(readFailureSwitches)

  function toggle(name: keyof FailureSwitches, on: boolean) {
    writeFailureSwitch(name, on)
    setFailures(readFailureSwitches())
  }

  return (
    <details className={styles.panel}>
      <summary className={styles.summary}>Demo controls</summary>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Simulate failures</legend>
        {switches.map(({ name, label }) => (
          <label key={name} className={styles.option}>
            <input type="checkbox" checked={failures[name]} onChange={(event) => toggle(name, event.target.checked)} />
            {label}
          </label>
        ))}
      </fieldset>
    </details>
  )
}
