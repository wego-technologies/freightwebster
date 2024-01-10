'use client'

import { TermData, groupByFirstLetter } from '@/hooks/get-terms'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GroupBox, MenuListItem } from 'react95'

interface Props {
  data: TermData[]
}

export const TermsTab: React.FC<Props> = ({ data }) => {
  const [groupedData, setGroupedData] = useState<{ [key: string]: TermData[] } | null>(null)

  useEffect(() => {
    if (data) setGroupedData(groupByFirstLetter(data))
  }, [data])

  if (!groupedData || !data || data.length === 0) return <div>No Results</div>

  return Object.keys(groupedData).map((letter) => (
    <GroupBox key={letter} label={letter}>
      {groupedData[letter].map((item: TermData) => (
        <Link href={`/${item.slug}`} key={item.term}>
          <MenuListItem key={item.term}>{item.term}</MenuListItem>
        </Link>
      ))}
    </GroupBox>
  ))
}
