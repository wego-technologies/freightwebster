import { IndividualTermData, OrderBy } from '@/types/general'

export interface TermData {
  term: string
  slug: string
  views: number
  createdAt: Date
}

const getTerms = async (sortBy: OrderBy, search?: string) => {
  try {
    let queryParams = `?sortBy=${sortBy}`
    if (search && search.length > 0) {
      queryParams += `&search=${encodeURIComponent(search)}`
    }
    const response = await fetch(`/api/list${queryParams}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    return data as TermData[]
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getIndividualTerm = async (
  slug: string,
  orderBy: string
): Promise<IndividualTermData | null> => {
  try {
    const queryParams = `orderBy=${orderBy}`
    console.log('queryParams', queryParams)
    const response = await fetch(`/api/define/${slug}?${queryParams}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = (await response.json()) as IndividualTermData
    console.log('data: ', data)
    return data
  } catch (error) {
    console.error('Error fetching individual term data:', error)
    return null
  }
}

export const groupByFirstLetter = (terms: TermData[] | null) => {
  if (!terms || !Array.isArray(terms)) return []

  // Group by first letter and sort terms within each group
  const grouped = terms.reduce((groups, term) => {
    const letter = term.term[0].toUpperCase()
    groups[letter] = groups[letter] || []
    groups[letter].push(term)
    groups[letter].sort((a, b) => a.term.localeCompare(b.term)) // Sort terms alphabetically
    return groups
  }, {})

  // Sort the groups by their keys (letters)
  return Object.keys(grouped)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = grouped[key]
      return sorted
    }, {})
}

export const addTerm = async (term: string) => {
  try {
    const response = await fetch('/api/terms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ term }),
    })

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  } catch (error) {
    console.error('Error adding term:', error)
    return null
  }
}

export default getTerms
