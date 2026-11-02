import { describe, expect, it } from 'vitest'
import { validateImageFile } from './image-file'

const typeMessage = 'Only JPG, PNG or WebP images are allowed'
const sizeMessage = 'Keep the image to 5 MB or less'
const maxSize = 5 * 1024 * 1024

function file(name: string, type: string, size = 1) {
  return new File([new Uint8Array(size)], name, { type })
}

describe('validateImageFile', () => {
  it.each([
    ['course.jpg', 'image/jpeg'],
    ['course.JPEG', 'image/jpeg'],
    ['course.png', 'image/png'],
    ['course.webp', 'image/webp'],
  ])('accepts %s', (name, type) => {
    expect(validateImageFile(file(name, type))).toBeNull()
  })

  it.each([
    ['animation.gif', 'image/gif'],
    ['scorecard.pdf', 'application/pdf'],
    ['renamed.gif', 'image/png'],
    ['renamed.png', 'application/pdf'],
    ['no-extension', 'image/png'],
    ['unknown-type.png', ''],
  ])('rejects %s (%s)', (name, type) => {
    expect(validateImageFile(file(name, type))).toBe(typeMessage)
  })

  it('accepts a 5 MB image and rejects one byte more', () => {
    expect(validateImageFile(file('course.jpg', 'image/jpeg', maxSize))).toBeNull()
    expect(validateImageFile(file('course.jpg', 'image/jpeg', maxSize + 1))).toBe(sizeMessage)
  })
})
