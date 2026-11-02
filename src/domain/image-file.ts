const allowedTypes: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
}

export const imageFileAccept = Object.entries(allowedTypes).flat(2).join(',')

export function validateImageFile(file: File): string | null {
  const name = file.name.toLowerCase()
  if (!allowedTypes[file.type]?.some((extension) => name.endsWith(extension))) {
    return 'Only JPG, PNG or WebP images are allowed'
  }
  if (file.size > 5 * 1024 * 1024) {
    return 'Keep the image to 5 MB or less'
  }
  return null
}
