import { OrderBy } from '@/types/general'
import { useCallback, useState } from 'react'
import getTerms, { TermData } from './get-terms'

interface UseTermsData {
  activeTerms: TermData[]
  requestedTerms: TermData[]
  isLoading: boolean
  isError: boolean
  fetchTerms: (orderBy: OrderBy, searchQuery?: string) => void
}

const handleData = (
  data: TermData[] | null
): Pick<UseTermsData, 'activeTerms' | 'requestedTerms'> => {
  if (!data) return { activeTerms: [], requestedTerms: [] }

  const activeTerms = data.filter((term) => !!term.definition)
  const requestedTerms = data.filter((term) => !term.definition)

  return { activeTerms, requestedTerms }
}

export const useTermsData = (): UseTermsData => {
  const [data, setData] = useState<TermData[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  // TODO: handle errors
  const [isError, setIsError] = useState(false)

  const fetchTerms: UseTermsData['fetchTerms'] = useCallback((orderBy, searchQuery) => {
    setIsLoading(true)

    getTerms(orderBy, searchQuery)
      .then((response) => setData(response instanceof Array ? response : null))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [])

  return { ...handleData(data), isLoading, isError, fetchTerms }
}
