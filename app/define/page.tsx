"use client"

import React, { useCallback, useEffect, useState } from 'react'; // Added useState import
import { Window, WindowContent, WindowHeader, Button, Toolbar, TextInput, GroupBox, List, ListItem, Tabs, Tab, TabBody, MenuList, MenuListItem, Separator, Frame, Select} from 'react95';
import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';
import { padding, width } from '@xstyled/styled-components';
import getTerms, {groupByFirstLetter, TermData} from '@/hooks/get-terms';

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<'term' | 'createdAt' | 'views'>('term');
  const [search, setSearch] = useState<string>('');

  const [data, setData] = useState<TermData[] | null>(null);
  const [groupedData, setGroupedData] = useState<{ [key: string]: TermData[] } | null>(null);

  const fetchData = useCallback(async () => {
    const response = await getTerms(activeTab, search);
    setData(response);
    if (activeTab === "term" && response) {
      setGroupedData(groupByFirstLetter(response));
    } else {
      setGroupedData(null);
    }
  }, [activeTab, search]); // Dependencies array
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <GlobalStyles />
      <Window style={{ fontFamily: 'MS', width: '100%', minHeight: '100vh', boxSizing: 'border-box', margin: 0, padding: 0, overflow: 'auto' }}>
        <WindowHeader>Freight Webster</WindowHeader>
        <WindowContent>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button onClick={() => { }}>Back to Glossary</Button>
            <Frame variant='well' className='footer' style={{ padding: '6px' }}>Page Views: 3</Frame>
          </Toolbar>
          <div style={{ paddingTop: '20px'}}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', fontStyle: 'italic', color: 'rgb(132, 133, 132)', textShadow: 'white 2px 2px' }}>Bill of Lading (BOL)</h1>
            <GroupBox>
              <p>A document issued by a carrier to a shipper, signed by the captain, agent, or owner of a vessel, furnishing written evidence regarding receipt of the goods (cargo), the conditions on which transportation is made (contract of carriage), and the engagement to deliver goods at the prescribed port of destination to the lawful holder of the bill of lading.</p>
            </GroupBox>
          </div>
        </WindowContent>
        <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <MenuList style={{ display: 'flex', justifyContent: 'space-between' }}>
              <MenuListItem style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { }}>Previous Term: Term Name</MenuListItem>
              <Separator orientation='vertical' size='43px' />
              <MenuListItem style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { }}>Next Term: Term Name</MenuListItem>
          </MenuList>
        </div>
      </Window>
    </>
  );
}



