// Runs after `next build` (npm "postbuild").
//
// Puts the site's stylesheet inline in every exported page, so the first paint
// does not wait for a separate CSS request. Next's own `experimental.inlineCss`
// does the same but also copies the whole stylesheet into the RSC payload,
// which doubles the HTML (about 280 KB instead of 190 KB for the home page).
//
// The original <link> stays, switched to media="print": React still finds the
// stylesheet it expects when it hydrates, and the browser fetches it at low
// priority without blocking rendering.
import { readFile, writeFile } from 'node:fs/promises'
import glob from 'fast-glob'

const OUT = 'out'
const LINK = /<link rel="stylesheet" href="(\/_next\/static\/css\/[^"]+\.css)" data-precedence="next"\/>/g

// The page is complete HTML, so nothing has to run before the first paint.
// Next.js scripts are requested only after that paint: the content
// shows at once and React hydrates one frame later. Without this, Lighthouse's
// mobile simulation counts all ~225 KB of JavaScript into the LCP.
const SCRIPT = /<script ([^>]*?src="\/_next\/[^"]+"[^>]*?)(?:\/>|><\/script>)/g
const PRELOAD = /<link rel="preload" as="script"[^>]*\/>/g
function deferScripts(html) {
  const scripts = []
  let out = html.replace(PRELOAD, '').replace(SCRIPT, (tag, attrs) => {
    if (/noModule/.test(attrs)) return tag // legacy polyfills, ignored by modern browsers
    const a = Object.fromEntries([...attrs.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]))
    delete a.async
    delete a.defer
    scripts.push(a)
    return ''
  })
  if (!scripts.length) return html
  // Runs the callback once the browser reports its first paint; a hidden tab
  // never paints, so it also runs straight away there and after 2 s at most.
  const loader =
    `<script>(function(){var d=0;function go(){if(d)return;d=1;` +
    `${JSON.stringify(scripts)}.forEach(function(a){var s=document.createElement('script');` +
    `for(var k in a)s.setAttribute(k,a[k]);s.async=true;document.head.appendChild(s)})}` +
    `if(document.hidden)return go();setTimeout(go,2000);` +
    `try{new PerformanceObserver(function(){setTimeout(go,0)}).observe({type:'paint',buffered:true})}catch(e){go()}})()</script>`
  return out.replace('</body>', loader + '</body>')
}

const cache = new Map()
const css = async (href) => {
  if (!cache.has(href)) {
    cache.set(href, (await readFile(OUT + href, 'utf8')).replaceAll('</style', '<\\/style'))
  }
  return cache.get(href)
}

let pages = 0
for (const file of await glob('**/*.html', { cwd: OUT })) {
  const path = `${OUT}/${file}`
  const html = await readFile(path, 'utf8')
  const hrefs = [...html.matchAll(LINK)].map((m) => m[1])
  if (!hrefs.length) continue

  let out = deferScripts(html)
  for (const href of hrefs) {
    const tag = `<link rel="stylesheet" href="${href}" data-precedence="next"/>`
    out = out.replace(
      tag,
      `<style>${await css(href)}</style><link rel="stylesheet" href="${href}" data-precedence="next" media="print"/>`,
    )
  }
  await writeFile(path, out)
  pages++
}
console.log(`inline-css: stylesheet inlined, scripts deferred in ${pages} pages`)
