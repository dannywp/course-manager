import { expect, test } from '@playwright/test'

test('the list page renders the top nav and page header', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('banner').getByText('FACILITY PORTAL')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1, name: 'Courses' })).toBeVisible()
})
