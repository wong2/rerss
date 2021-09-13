import dayjs from 'dayjs'
import { calcNextDate, getTextValue } from './utils'

interface AtomData {
  feed: {
    title: string
    updated: string
    entry: {
      title: string
      published: string
      updated: string
      scheduledAt: Date
    }[]
  }
}

function transform(data: AtomData): {
  data: AtomData
  items: {
    title: string
    scheduledAt: Date
  }[]
} {
  const now = dayjs()
  const feed = data.feed

  feed.title = `rerss - ${getTextValue(feed.title)}`

  feed.entry.forEach((entry) => {
    const pubDate = dayjs(entry.published || entry.updated)
    entry.title = `(${pubDate.year()}) ${getTextValue(entry.title)}`
    const nextDate = calcNextDate(now, pubDate)
    entry.scheduledAt = nextDate.toDate()
  })
  feed.entry.sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime())

  const items = feed.entry.map((entry) => {
    return {
      title: entry.title,
      scheduledAt: entry.scheduledAt,
    }
  })

  return { data, items }
}

function generate(data: AtomData, maxDate: dayjs.Dayjs): AtomData {
  const { feed } = data
  feed.entry = feed.entry.filter((item) => {
    const pubDate = dayjs(item.scheduledAt)
    item.published = item.updated = pubDate.format()
    return pubDate.isBefore(maxDate)
  })
  feed.updated = maxDate.format()
  return data
}

export { transform, generate }
