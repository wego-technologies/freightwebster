import { OrderBy } from '@/types/general'
import { useCallback, useState } from 'react'
import getTerms, { TermData } from './get-terms'

interface UseTermsData {
  data: TermData[]
  isLoading: boolean
  isError: boolean
  fetchTerms: (orderBy: OrderBy, searchQuery?: string) => void
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

  return { data: data || [], isLoading, isError, fetchTerms }
}
