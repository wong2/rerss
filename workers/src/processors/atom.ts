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
  upcomming: {
    title: string
    scheduledAt: Date
  }[]
} {
  const now = dayjs()
  const feed = data.feed

  feed.title = `rerss - ${getTextValue(feed.title).trim()}`

  feed.entry.forEach((entry) => {
    const pubDate = dayjs(entry.published)
    entry.title = `(${pubDate.year()}) ${getTextValue(entry.title).trim()}`
    const nextDate = calcNextDate(now, pubDate)
    entry.scheduledAt = nextDate.toDate()
  })
  feed.entry.sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime())

  const upcomming = feed.entry.slice(0, 3).map((entry) => {
    return {
      title: entry.title,
      scheduledAt: entry.scheduledAt,
    }
  })

  feed.entry.reverse()

  return { data, upcomming }
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
