'use client'

import { Loader } from '@/components/loader'
import RequestNewTerm from '@/components/request-new-term'
import getTerms, { TermData, groupByFirstLetter } from '@/hooks/get-terms'
import Link from 'next/link'
import React, { FormEventHandler, useCallback, useEffect, useState } from 'react' // Added useState import
import {
  Button,
  Frame,
  GroupBox,
  MenuListItem,
  Tab,
  TabBody,
  Tabs,
  TextInput,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
  styleReset,
} from 'react95'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'MS';
    font-style: regualr;
    src: url('./fonts/ms-sans-serif-1.ttf') format('truetype');
    src: url('./fonts/ms-sans-serif-1.otf') format('opentype');
  }
  body {
    background-color: #00807E;
  }
`

export default function Home() {
  const [activeTab, setActiveTab] = useState<'term' | 'createdAt' | 'views'>('term')
  const [search, setSearch] = useState<string>('')
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

  const [newTerm, setNewTerm] = useState<string>('') // Added this line

  const [data, setData] = useState<TermData[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [groupedData, setGroupedData] = useState<{ [key: string]: TermData[] } | null>(null)

  const version = 'v0.1.2-beta'

  const fetchData = useCallback(async () => {
    const response = await getTerms(activeTab, search)

    setData(response instanceof Array ? response : null)
    if (activeTab === 'term' && response) {
      setGroupedData(response instanceof Array ? groupByFirstLetter(response) : null)
    } else {
      setGroupedData(null)
    }
    setIsLoading(false)
  }, [activeTab, search])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault() // Typically you want to prevent the default form submission
    console.log(event)
  }

  return (
    <>
      <GlobalStyles />
      <Window
        style={{
          fontFamily: 'MS',
          width: '100%',
          minHeight: '100vh',
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          overflow: 'auto',
        }}
      >
        <WindowHeader>
          Freight Webster<span style={{ fontStyle: 'italic' }}> {version}</span>
        </WindowHeader>
        <WindowContent style={{ paddingTop: '10px' }}>
          <Toolbar
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <h1
              style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'rgb(132, 133, 132)',
                textShadow: 'white 2px 2px',
              }}
            >
              Glossary
            </h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => window.open('https://twitter.com/freightwebster', '_blank')}>
                𝕏
              </Button>
              <Button onClick={() => setIsFormVisible(true)}>Request New Term</Button>
            </div>
          </Toolbar>
          <div style={{ paddingTop: '10px' }}>
            <TextInput
              placeholder="Search..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ paddingTop: '20px' }}>
            <Tabs
              value={activeTab}
              onChange={(value) => {
                setIsLoading(true)
                setActiveTab(value)
              }}
            >
              {' '}
              <Tab value={'term'}>Alphabetical</Tab>
              <Tab value={'views'}>Popular</Tab>
            </Tabs>
            <TabBody style={{}}>
              {activeTab === 'term' && (
                <>
                  {isLoading ? (
                    <Loader />
                  ) : !groupedData ? (
                    <div>No results</div>
                  ) : (
                    Object.keys(groupedData).map((letter) => (
                      <GroupBox key={letter} label={letter}>
                        {groupedData[letter].map((item: TermData) => (
                          <Link href={`/${item.slug}`} key={item.term}>
                            <MenuListItem key={item.term}>{item.term}</MenuListItem>
                          </Link>
                        ))}
                      </GroupBox>
                    ))
                  )}
                </>
              )}
              {activeTab === 'views' && (
                <>
                  {isLoading ? (
                    <Loader />
                  ) : !data ? (
                    <div>No results</div>
                  ) : (
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
                  )}
                </>
              )}
            </TabBody>
          </div>
          {isFormVisible && (
            <RequestNewTerm
              handleSubmit={handleSubmit}
              newTerm={newTerm}
              setNewTerm={setNewTerm}
              setIsFormVisible={setIsFormVisible}
            />
          )}
        </WindowContent>
      </Window>
    </>
  )
}
