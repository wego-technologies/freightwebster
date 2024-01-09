
export const requestTerm = async (term: string) => {
    try {
        const body = JSON.stringify({ newTerm: term })
        console.log('body', body)
      const response = await fetch(`/api/request`, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error requesting term:', error)
      return null
    }
  }
  