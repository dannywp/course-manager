import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

async function expectNoAxeViolations(page: Page) {
  // The Figma colours fail contrast and are kept by choice (ASSUMPTIONS.md #69).
  const { violations } = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze()
  expect(violations).toEqual([])
}

test('the course list with a card menu open', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Actions for Pebble Beach Golf Links' }).click()
  await expect(page.getByRole('menu')).toBeVisible()

  await expectNoAxeViolations(page)
})

test('the delete confirmation', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Actions for Pebble Beach Golf Links' }).click()
  await page.getByRole('menuitem', { name: 'Delete' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()

  await expectNoAxeViolations(page)
})

test('the create form with validation errors', async ({ page }) => {
  await page.goto('/courses/new')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByLabel('Title*')).toHaveAccessibleDescription('Enter a title')

  await expectNoAxeViolations(page)
})

test('the edit form with an image', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Actions for Valderrama' }).click()
  await page.getByRole('menuitem', { name: 'Edit' }).click()
  await expect(page.getByRole('button', { name: 'Change image' })).toBeVisible()

  await expectNoAxeViolations(page)
})
