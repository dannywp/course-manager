import { useState } from 'react'

export function useImageFallback(url: string | null) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null)

  return {
    src: url === null || url === failedUrl ? '/placeholder.png' : url,
    onError: () => setFailedUrl(url),
  }
}
