import dayjs from 'dayjs'
import { calcNextDate, getTextValue } from './utils'

interface RSSData {
  rss: {
    channel: {
      title: string
      pubDate: string
      item: {
        title: string
        pubDate: string
        scheduledAt: Date
      }[]
    }
  }
}

function transform(data: RSSData): {
  data: RSSData
  items: {
    title: string
    scheduledAt: Date
  }[]
} {
  const now = dayjs()
  const channel = data.rss.channel
  channel.title = `rerss - ${getTextValue(channel.title)}`
  channel.item.forEach((item) => {
    const pubDate = dayjs(item.pubDate)
    item.title = `(${pubDate.year()}) ${getTextValue(item.title)}`
    const nextDate = calcNextDate(now, pubDate)
    item.scheduledAt = nextDate.toDate()
  })
  channel.item.sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime())

  const items = channel.item.map((item) => {
    return {
      title: item.title,
      scheduledAt: item.scheduledAt,
    }
  })

  return { data, items }
}

function generate(data: RSSData, maxDate: dayjs.Dayjs): RSSData {
  const { channel } = data.rss
  channel.item = channel.item.filter((item) => {
    const scheduledAt = dayjs(item.scheduledAt)
    item.pubDate = scheduledAt.format('ddd, DD MMM YYYY HH:mm:ss ZZ')
    return scheduledAt.isBefore(maxDate)
  })
  channel.pubDate = maxDate.format('ddd, DD MMM YYYY HH:mm:ss ZZ')
  return data
}

export { transform, generate }
