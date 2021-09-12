import dayjs from 'dayjs'

function getTextValue(v: any): string {
  if (typeof v === 'string') {
    return v
  }
  return v['#text']
}

function calcNextDate(now: dayjs.Dayjs, dt: dayjs.Dayjs): dayjs.Dayjs {
  const nextDate = dt.set('year', now.year())
  if (nextDate.isBefore(now)) {
    return nextDate.add(1, 'year')
  }
  return nextDate
}

export { calcNextDate, getTextValue }
