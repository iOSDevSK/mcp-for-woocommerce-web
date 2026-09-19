import { Changelog } from '@/components/Changelog'
import { CHANGELOG_URL } from '@/lib/changelog'

// Server component: reads the changelog while the site is built, so the static
// page already contains it. If GitHub is unreachable at build time, the client
// component falls back to loading it in the browser.
export async function ChangelogFromGitHub() {
  let text = ''
  try {
    const response = await fetch(CHANGELOG_URL)
    if (response.ok) text = await response.text()
  } catch {}
  return <Changelog initialText={text} />
}
