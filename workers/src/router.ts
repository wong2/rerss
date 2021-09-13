import _ from 'lodash'
import { Router } from 'itty-router'
import parser, { j2xParser } from 'fast-xml-parser'
import dayjs from 'dayjs'
import he from 'he'
import { FeedType, feedTypeProcessorMap } from './consts'
import * as model from './model'

const builder = new j2xParser({
  ignoreAttributes: false,
  cdataTagName: '#cdata',
})

function jsonResponse(data: any) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

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
    cdataTagName: '#cdata',
  })

  let feedType: FeedType
  if (data.feed) {
    feedType = FeedType.Atom
  } else if (data.rss) {
    feedType = FeedType.RSS
  } else {
    throw new Error(`Unknown feed type: ${source}`)
  }

  const processor = feedTypeProcessorMap[feedType]
  const { data: jsonData, items } = processor.transform(data)

  const id = await model.createFeed(source, feedType, jsonData)

  const upcomming = _.sortBy(items, (item) => item.scheduledAt)
    .slice(0, 5)
    .map((item) => ({
      title: he.decode(item.title),
      date: dayjs(item.scheduledAt).format('YYYY-MM-DD'),
    }))

  return jsonResponse({ id, upcomming })
})

router.get('/f/:id', async (request) => {
  const id = request.params!.id
  const date = request.query?.date

  const feed = await model.getFeed(id)
  if (!feed) {
    return new Response('Not Found', { status: 404 })
  }

  const processor = feedTypeProcessorMap[feed.type]
  const data = processor.generate(feed.jsonData as any, dayjs(date))

  const xml = builder.parse(data)
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
})

export default router
