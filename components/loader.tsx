import { ProgressBar } from 'react95'
import { useEffect, useState } from 'react'

export const Loader = () => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((previousPercent) => {
        if (previousPercent === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(previousPercent + diff, 100)
      })
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return <ProgressBar variant="tile" value={Math.floor(percent)} />
}
