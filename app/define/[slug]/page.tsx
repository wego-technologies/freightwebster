'use client'

import React, { useState, useEffect } from 'react';
import { Window, WindowContent, WindowHeader, Button, Toolbar, GroupBox, MenuList, MenuListItem, Separator, Frame} from 'react95';
import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';
import { IndividualTermData } from '@/types/terms';
import { getIndividualTerm } from '@/hooks/get-terms';

import Link from 'next/link';
import Head from 'next/head';

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
`;

interface PageProps {
  searchParams: { term: string, orderBy: string},
  params: { slug: string }
}

const Page = ({ searchParams, params }: PageProps) => {
  
  const [data, setData] = useState<IndividualTermData | null>(null);
  const [validOrderBy, setValidOrderBy] = useState<'term' | 'views'>(searchParams?.orderBy === 'views' ? 'views' : 'term')

  useEffect(() => {
    const validOrderBy = searchParams?.orderBy === 'views' ? 'views' : 'term'
    setValidOrderBy(validOrderBy);

    const fetchData = async () => {
      const termData = await getIndividualTerm(params.slug, validOrderBy);
      setData(termData);
    };

    fetchData();
  }, [params.slug, searchParams]);

  return (
    <>
      <Head>
        <title>Freight Webster - {data?.term}</title>
        <meta name="description" content={data?.definition} />
        <meta name="keywords" content={data?.term} />
      </Head>
      <GlobalStyles />
      <Window style={{ fontFamily: 'MS', width: '100%', minHeight: '100vh', boxSizing: 'border-box', margin: 0, padding: 0, overflow: 'auto' }}>
        <WindowHeader>Freight Webster</WindowHeader>
        {data && (
          <>
            <WindowContent>
              <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href='/'>
                <Button>Back to Glossary</Button>
              </Link>
                <Frame variant='well' className='footer' style={{ padding: '6px' }}>Page Views: {data.views}</Frame>
              </Toolbar>
              <div style={{ paddingTop: '20px'}}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', fontStyle: 'italic', color: 'rgb(132, 133, 132)', textShadow: 'white 2px 2px' }}>{data.term}</h1>
                <GroupBox>
                  <p>{data.definition}</p>
                </GroupBox>
              </div>
            </WindowContent>
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
              <MenuList style={{ display: 'flex', justifyContent: 'space-between' }}>
                 {data.prevTerm && (
                  <Link style={{width: '50%'}} href={`/define/${data.prevTerm.slug}?orderBy=${validOrderBy}`} key={data.prevTerm.slug}>
                    <MenuListItem style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>Previous Term: {data.prevTerm.term}</MenuListItem>
                  </Link>
                )}
                  <Separator orientation='vertical' size='43px' />
                {data.nextTerm && (
                  <Link style={{width: '50%'}} href={`/define/${data.nextTerm.slug}?orderBy=${validOrderBy}`} key={data.nextTerm.slug}>
                    <MenuListItem style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>Next Term: {data.nextTerm.term}</MenuListItem>
                  </Link>
                )}
              </MenuList>
            </div>
          </>
          )}

      </Window>
    </>
  );
}


export default Page