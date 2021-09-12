import dayjs from 'dayjs'
import he from 'he'

function getTextValue(v: any): string {
  if (typeof v === 'string') {
    return v.trim()
  }
  if (v['#text']) {
    return v['#text'].trim()
  }
  if (v['#cdata']) {
    return he.decode(v['#cdata']).trim()
  }
  throw new Error('text value not found')
}

function calcNextDate(now: dayjs.Dayjs, dt: dayjs.Dayjs): dayjs.Dayjs {
  const nextDate = dt.set('year', now.year())
  if (nextDate.isBefore(now)) {
    return nextDate.add(1, 'year')
  }
  return nextDate
}

export { calcNextDate, getTextValue }
