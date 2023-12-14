"use client"

import React, { useCallback, useEffect, useState } from 'react'; // Added useState import
import { Window, WindowContent, WindowHeader, Button, Toolbar, TextInput, GroupBox, List, ListItem, Tabs, Tab, TabBody, MenuListItem, Frame, Select} from 'react95';
import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';
import { padding, width } from '@xstyled/styled-components';
import getTerms, {groupByFirstLetter, TermData} from '@/hooks/get-terms';
import RequestNewTerm from '@/components/request-new-term';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'MS';
    font-style: regualr;
    src: url('./fonts/ms-sans-serif-1.ttf') format('truetype');
    src: url('./fonts/ms-sans-serif-1.otf') format('opentype');
  }
`;

export default function Home() {
  const [activeTab, setActiveTab] = useState<'term' | 'createdAt' | 'views'>('term');
  const [search, setSearch] = useState<string>('');
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const [newTerm, setNewTerm] = useState<string>(''); // Added this line

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

  const handleSubmit = (newTerm: string) => {
    console.log(newTerm);
  };

  return (
    <>
      <GlobalStyles />
      <Window style={{ fontFamily: 'MS', width: '100%', minHeight: '100vh', boxSizing: 'border-box', margin: 0, padding: 0, overflow: 'auto' }}>
        <WindowHeader>Freight Webster</WindowHeader>
        <WindowContent>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput
              placeholder="Search..."
              width={150}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <Button onClick={() => setIsFormVisible(true)}>Request New Term</Button> {/* Updated this line */}
          </Toolbar>
          <div style={{ paddingTop: '20px'}}>
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}> {/* Updated this line */}
              <Tab value={"term"}>Alphabetical</Tab>
              <Tab value={"views"}>Popular</Tab>
              {/*<Tab value={"createdAt"}>Category</Tab>*/}
              {/*<Tab value={3}>Recent</Tab>*/}
            </Tabs>
            <TabBody style={{ }}>
              {activeTab === "term" && groupedData && Object.keys(groupedData).map(letter => (
                <GroupBox key={letter} label={letter}>
                  {groupedData[letter].map((item: TermData) => (
                    <ListItem key={item.term} onClick={() => { /* your click handler */ }}>
                      {item.term}
                    </ListItem>
                  ))}
                </GroupBox>
              ))
              }
              {activeTab === "views" && (
                <div style={{ overflow: 'auto'}}>
                  <Frame variant='well' style={{ width:'100%', padding: '10px' }}>
                    {data && data.map((termData) => (
                      <ListItem key={termData.term} onClick={() => { }}>
                        {termData.term}<div>{termData.views} view{termData.views !== 1 ? 's' : ''}</div>
                      </ListItem>
                    ))}
                  </Frame>
                </div>
              )}
              {/*
              {activeTab === "createdAt" && (
                <div style={{ overflow: 'auto' }}>
                  <div>
                    <Select defaultValue="Carriers" width={"100%"} options={[
                      { value: "Carriers", label: "Carriers" },
                      { value: "Shippers", label: "Shippers" },
                      { value: "Brokers", label: "Brokers" },
                      { value: "Customs", label: "Customs" },
                      { value: "Warehousing", label: "Warehousing" },
                      { value: "Intermodal", label: "Intermodal" },
                      { value: "Compliance", label: "Compliance" },
                    ]} />
                  </div>
                  <div>
                    <ListItem onClick={() => { }}>Authority</ListItem>
                    <ListItem onClick={() => { }}>Backhaul</ListItem>
                    <ListItem onClick={() => { }}>Cargo Weight</ListItem>
                    <ListItem onClick={() => { }}>Deadhead</ListItem>
                    <ListItem onClick={() => { }}>Dispatcher</ListItem>
                    <ListItem onClick={() => { }}>DOT Number</ListItem>
                    <ListItem onClick={() => { }}>Dry Van</ListItem>
                    <ListItem onClick={() => { }}>Fuel Surcharge</ListItem>
                    <ListItem onClick={() => { }}>Hours of Service (HOS)</ListItem>
                    <ListItem onClick={() => { }}>IFTA</ListItem>
                    <ListItem onClick={() => { }}>Load Assignment</ListItem>
                    <ListItem onClick={() => { }}>MC Number</ListItem>
                    <ListItem onClick={() => { }}>Owner-Operator</ListItem>
                    <ListItem onClick={() => { }}>P&D</ListItem>
                    <ListItem onClick={() => { }}>Tare Weight</ListItem>
                    <ListItem onClick={() => { }}>Trailer Interchange Agreement</ListItem>
                  </div>
                </div>
              )}
              */}
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
  );
}
