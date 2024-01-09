'use client'

import { TermData } from '@/hooks/get-terms'
import Link from 'next/link'
import React from 'react'
import { Frame, MenuListItem } from 'react95'

interface Props {
  data: TermData[]
}

export const ViewsTab: React.FC<Props> = ({ data }) => {
  return (
    <div style={{ overflow: 'auto' }}>
      <Frame variant="well" style={{ width: '100%', padding: '10px' }}>
        {data &&
          [...data]
            .sort((a, b) => b.views - a.views)
            .map((termData) => (
              <Link href={`/${termData.slug}`} key={termData.term}>
                <MenuListItem key={termData.term} onClick={() => {}}>
                  {termData.term}
                  <div>
                    {termData.views} view{termData.views !== 1 ? 's' : ''}
                  </div>
                </MenuListItem>
              </Link>
            ))}
      </Frame>
    </div>
  )
}
