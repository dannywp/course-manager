import { readFile } from 'node:fs/promises'
import { expect, test, type Locator } from '@playwright/test'

const seedOrder = [
  'Pebble Beach Golf Links',
  'St Andrews Old Course',
  'Quinta do Lago',
  'Hidden Canyon',
  'Valderrama',
  'Kawana Fuji Course',
]
const name = 'Royal Copenhagen Golf Club'

async function expectStoredImage(card: Locator) {
  const image = card.locator('img')
  await expect(image).toHaveAttribute('src', /^blob:/)
  await expect.poll(() => image.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0)
}

test('creates a featured course with an image, keeps it after a reload, and deletes it', async ({ page }) => {
  await page.clock.install()
  await page.goto('/')
  const titles = page.getByRole('list').getByRole('heading', { level: 2 })
  await expect(titles).toHaveText(seedOrder)

  await page.getByRole('link', { name: 'Create a course' }).click()
  await page.getByLabel('Title*').fill(name)
  await page.getByLabel('Difficulty*').selectOption('3')
  await page.getByLabel('Par*').fill('71')
  await page.getByLabel('Featured course').check()
  await page.getByLabel('City/State*').fill('Klampenborg')
  await page.getByLabel('Country*').selectOption('Denmark')
  const fileChooser = page.waitForEvent('filechooser')
  await page.getByRole('button', { name: /^Drag & Drop/ }).click()
  await (await fileChooser).setFiles({
    name: 'royal-copenhagen.jpg',
    mimeType: 'image/jpeg',
    buffer: await readFile(new URL('../public/seed/valderrama.jpg', import.meta.url)),
  })
  await expect(page.getByText('royal-copenhagen.jpg')).toBeVisible()
  await page.getByRole('button', { name: 'Save' }).click()

  const withNewCourse = [...seedOrder.slice(0, 2), name, ...seedOrder.slice(2)]
  await expect(titles).toHaveText(withNewCourse)
  const card = page.getByRole('listitem').filter({ has: page.getByRole('heading', { name }) })
  await expect(card.getByText('Featured')).toBeVisible()
  await expectStoredImage(card)

  await page.reload()
  await expect(titles).toHaveText(withNewCourse)
  await expectStoredImage(card)

  await card.getByRole('button', { name: `Actions for ${name}` }).click()
  await page.getByRole('menuitem', { name: 'Delete' }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Delete' }).click()
  await expect(card).toHaveCount(0)

  await page.clock.runFor(1000)
  await page.reload()
  await expect(titles).toHaveText(seedOrder)
})
