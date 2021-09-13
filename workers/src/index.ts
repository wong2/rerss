import Toucan from 'toucan-js'
import router from './router'

addEventListener('fetch', (event) => {
  const sentry = new Toucan({
    dsn: 'https://39bed9af61c8413e93f5a46fcc6d2a69@o23546.ingest.sentry.io/5956337',
    context: event,
    allowedHeaders: ['user-agent'],
    allowedSearchParams: /(.*)/,
  })
  event.respondWith(
    router.handle(event.request).catch((err: any) => {
      console.error(err.stack)
      sentry.captureException(err)
      return new Response(err.message || 'Server Error', {
        status: err.status || 500,
      })
    }),
  )
})
