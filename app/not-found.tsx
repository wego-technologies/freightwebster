'use client'

import RequestNewTerm from '@/components/request-new-term'
import Link from 'next/link'
import { useState } from 'react'
import {
  Button,
  Frame,
  GroupBox,
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

const Page = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

  return (
    <>
      <GlobalStyles />
      <Window
        style={{
          fontFamily: 'MS',
          position: 'absolute',
          zIndex: 1,
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -20%)',
        }}
      >
        <WindowHeader
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>404 Error</span>
          <Link href="/">
            <Button>
              <img src="/close.svg" alt="Close icon" style={{ width: '12px' }} />{' '}
            </Button>
          </Link>
        </WindowHeader>
        <WindowContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/error-icon.png"
              alt="Error icon"
              style={{ height: '50px', marginRight: '1rem' }}
            />
            <span>The term you are looking for does not exist.</span>
          </div>
          <Toolbar style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/">
              <Button>Back to Glossary</Button>
            </Link>
            <div style={{ width: '10px' }}></div>
            <Button onClick={() => setIsFormVisible(true)}>Request New Term</Button>{' '}
          </Toolbar>
        </WindowContent>
      </Window>
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
        <WindowHeader>Freight Webster</WindowHeader>
        <WindowContent>
          <Toolbar
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Link href="/">
              <Button>Back to Glossary</Button>
            </Link>
            <Frame variant="well" className="footer" style={{ padding: '6px' }}>
              Page Views: 404
            </Frame>
          </Toolbar>
          <div style={{ paddingTop: '20px' }}>
            <h1
              style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'rgb(132, 133, 132)',
                textShadow: 'white 2px 2px',
              }}
            >
              Page Not Found
            </h1>
            <GroupBox>
              <p>
                An error message or status displayed when a web browser is unable to locate the
                webpage or content that a user has requested.{' '}
              </p>
            </GroupBox>
          </div>
        </WindowContent>
        {isFormVisible && (
          <RequestNewTerm onClose={() => setIsFormVisible(false)} />
        )}
      </Window>
    </>
  )
}

export default Page
