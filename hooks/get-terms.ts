import { useState, useEffect } from 'react';

interface TermsData {
  term: string;
  definition: string;
  views: number;
  createdAt: Date
}

export const useGetTerms = (sortby: 'term' | 'createdAt' | 'views', search?: string) => {
  const [data, setData] = useState<TermsData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let queryParams = `?sortby=${sortby}`;
        if (search) {
          queryParams += `&search=${encodeURIComponent(search)}`;
        }
        const response = await fetch(`/api/list${queryParams}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, sortby]);

  return { data, isLoading, error };
};
