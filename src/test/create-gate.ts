export function createGate() {
  let open = () => {}
  const passed = new Promise<void>((resolve) => {
    open = resolve
  })
  return { open, passed }
}
