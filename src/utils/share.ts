export async function shareYousayLink(url: string, onFallback: () => void) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Yousay.fun',
        url: url,
      })
    } catch {
      // User cancelled the share, do nothing
    }
  } else {
    await navigator.clipboard.writeText(url)
    onFallback()
  }
}