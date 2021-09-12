import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import router from './router'

addEventListener('fetch', (event) => {
  if (event.request.url === '/') {
    return getAssetFromKV(event)
  }
  event.respondWith(router.handle(event.request))
})
