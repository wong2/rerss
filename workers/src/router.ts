import { Router } from 'itty-router'
import parser, { j2xParser } from 'fast-xml-parser'
import dayjs from 'dayjs'
import { FeedType, feedTypeProcessorMap } from './consts'
import * as model from './model'

const builder = new j2xParser({
  ignoreAttributes: false,
})

const router = Router()

router.post('/create', async (request) => {
  const body = await request.json?.()
  const source: string | undefined = body?.source
  if (!source) {
    return new Response('source is required', { status: 400 })
  }

  const xml = await fetch(source).then((r) => r.text())
  const data = parser.parse(xml, {
    ignoreAttributes: false,
    parseNodeValue: false,
  })

  let feedType: FeedType
  if (data.feed) {
    feedType = FeedType.Atom
  } else if (data.rss) {
    feedType = FeedType.RSS
  } else {
    throw new Error('Unknown feed type')
  }

  const processor = feedTypeProcessorMap[feedType]
  const { data: jsonData, upcomming } = processor.transform(data)

  const id = await model.createFeed(source, feedType, jsonData)

  const resp = {
    id,
    upcomming: upcomming.map((item) => {
      return {
        title: item.title,
        date: dayjs(item.scheduledAt).format('YYYY-MM-DD'),
      }
    }),
  }

  return new Response(JSON.stringify(resp), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
})

router.get('/f/:id', async ({ params }: { params: { id: string } }) => {
  const id = params.id

  const feed = await model.getFeed(id)
  if (!feed) {
    return new Response('Not Found', { status: 404 })
  }

  const processor = feedTypeProcessorMap[feed.type]
  const data = processor.generate(feed.jsonData as any, dayjs())

  const xml = builder.parse(data)
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
})

export default router
