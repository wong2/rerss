import * as RSSProcessor from './processors/rss'
import * as AtomProcessor from './processors/atom'

export enum FeedType {
  RSS = 'RSS',
  Atom = 'ATOM',
}

export const feedTypeProcessorMap = {
  [FeedType.Atom]: AtomProcessor,
  [FeedType.RSS]: RSSProcessor,
}
