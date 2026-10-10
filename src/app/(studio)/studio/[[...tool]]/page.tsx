import {NextStudio} from 'next-sanity/studio'
import config from '@/sanity/config'

// The Studio is a client-side app: render it statically and let it handle routing under /studio.
export const dynamic = 'force-static'

// Sets noindex, a safe referrer policy and the mobile viewport for the Studio
export {metadata, viewport} from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
