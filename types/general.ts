export interface NextUrl {
  term: string
  slug: string
}

export interface IndividualTermData {
  term: string
  definition: string
  views: number
  createdAt: Date
  nextTerm?: NextUrl
  prevTerm?: NextUrl
}

export type PageTab = 'term' | 'views' | 'requested'
export type OrderBy = 'term' | 'createdAt' | 'views'

export const tabToOrderMap: Record<PageTab, OrderBy> = {
  term: 'term',
  views: 'views',
  requested: 'createdAt',
}
