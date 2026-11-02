import { NotFoundMessage } from '../components/not-found-message'
import { PageHeader } from '../components/page-header'

export function Component() {
  return (
    <>
      <PageHeader title="Page not found" />
      <NotFoundMessage message="There's no page at this address" />
    </>
  )
}
