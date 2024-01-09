'use client'

import { Loader } from '@/components/loader'
import RequestNewTerm from '@/components/request-new-term'
import { RequestedTab } from '@/components/tabs/RequestedTab'
import { TermsTab } from '@/components/tabs/TermsTab'
import { ViewsTab } from '@/components/tabs/ViewsTab'
import { requestTerm } from '@/hooks/request-term'
import { useTermsData } from '@/hooks/useTermsData'
import { PageTab, tabToOrderMap } from '@/types/general'
import React, { FormEventHandler, useCallback, useEffect, useState } from 'react'
import {
  Button,
  Tab,
  TabBody,
  Tabs,
  TextInput,
  Toolbar,
  Tooltip,
  Window,
  WindowContent,
  WindowHeader,
  styleReset,
} from 'react95'
import { createGlobalStyle } from 'styled-components'
//import { notFound } from 'next/navigation' //comment out after finishin with page not found

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
  const [activeTab, setActiveTab] = useState<PageTab>('term')
  const [search, setSearch] = useState<string>('')
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

  const [newTerm, setNewTerm] = useState<string>('')
  const [loadingNewTerm, setLoadingNewTerm] = useState<boolean>(false)

  const version = 'v0.1.3-beta'

  const { data, isLoading, fetchTerms } = useTermsData()

  useEffect(() => {
    fetchTerms(tabToOrderMap[activeTab], search)
  }, [fetchTerms, activeTab, search])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    setLoadingNewTerm(true)
    event.preventDefault() // Typically you want to prevent the default form submission

    await requestTerm(newTerm).then((res) => {
      if (res.status === 201) {
        alert('Your request has been submitted!')
        setNewTerm('')
        setIsFormVisible(false)
      } else {
        const errorMessage = res?.message || 'There was an error submitting your request. Please try again.';
        alert(errorMessage);
      }
    }
    )
  }
  //return notFound() //comment out after finishin with page not found
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
              <Tooltip text="Follow us!" enterDelay={100} leaveDelay={100}>
                <Button onClick={() => window.open('https://twitter.com/freightwebster', '_blank')}>
                  𝕏
                </Button>
              </Tooltip>
              <div style={{ width: '10px' }}></div>
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
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tab value={'term'}>Alphabetical</Tab>
              <Tab value={'views'}>Popular</Tab>
              <Tab value={'requested'}>Requested</Tab>
            </Tabs>
            <TabBody style={{}}>
              {isLoading ? (
                <Loader />
              ) : !data || data.length === 0 ? (
                <div>No Results</div>
              ) : (
                <>
                  {activeTab === 'term' && <TermsTab data={data} />}
                  {activeTab === 'views' && <ViewsTab data={data} />}
                  {activeTab === 'requested' && <RequestedTab />}
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
