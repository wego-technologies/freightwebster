import { IndividualTermData } from '@/types/terms';

export interface TermData {
  term: string;
  views: number;
  createdAt: Date
}

const getTerms = async (
  sortBy: 'term' | 'createdAt' | 'views', 
  search?: string, 
) => {
  try {
    let queryParams = `?sortBy=${sortBy}`;
    if (search && search.length > 0) {
      queryParams += `&search=${encodeURIComponent(search)}`;
    }
    const response = await fetch(`/api/list${queryParams}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data =  await response.json();
    return data as TermData[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getIndividualTerm = async (term: string, orderBy: string): Promise<IndividualTermData | null> => {
  try {    
    const queryParams = `?term=${encodeURIComponent(term)}&orderBy=${orderBy}`;
    console.log('queryParams', queryParams);
    const response = await fetch(`/api/define${queryParams}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as IndividualTermData;

    return data;
  } catch (error) {
    console.error('Error fetching individual term data:', error);
    return null;
  }
};


export const groupByFirstLetter = (terms: TermData[] | null) => {
    if (!terms) return {};
    
    // Group by first letter and sort terms within each group
    const grouped = terms.reduce((groups, term) => {
      const letter = term.term[0].toUpperCase();
      groups[letter] = groups[letter] || [];
      groups[letter].push(term);
      groups[letter].sort((a, b) => a.term.localeCompare(b.term)); // Sort terms alphabetically
      return groups;
    }, {});
  
    // Sort the groups by their keys (letters)
    return Object.keys(grouped).sort().reduce((sorted, key) => {
      sorted[key] = grouped[key];
      return sorted;
    }, {});
  };
    
export default getTerms;