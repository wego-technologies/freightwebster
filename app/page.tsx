"use client"

import React, { useState } from 'react'; // Added useState import
import { Window, WindowContent, WindowHeader, Button, Toolbar, TextInput, GroupBox, List, ListItem, Tabs, Tab, TabBody, MenuListItem, Frame} from 'react95';
import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';
import { padding, width } from '@xstyled/styled-components';

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
  const [activeTab, setActiveTab] = useState(0); // Added this line

  return (
    <>
      <GlobalStyles />
      <Window style={{ fontFamily: 'MS', width: '100%', height: '100%', boxSizing: 'border-box', margin: 0, padding: 0 }}>
        <WindowHeader>Freight Webster</WindowHeader>
        <WindowContent>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput placeholder="Search..." width={150} />
            <Button onClick={() => { }}>Add New Term</Button>
          </Toolbar>
          <div style={{ paddingTop: '20px'}}>
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}> {/* Updated this line */}
              <Tab value={0}>Alphabetical</Tab>
              <Tab value={1}>Popular</Tab>
              <Tab value={2}>Category</Tab>
              <Tab value={3}>Recent</Tab>
            </Tabs>
            <TabBody style={{ }}>
              {activeTab === 0 && (
                <div style={{ overflow: 'auto' }}>
                  <GroupBox label='A'>
                    <ListItem onClick={() => { }}>Accessorial Charges</ListItem>
                    <ListItem onClick={() => { }}>Authority</ListItem>
                  </GroupBox>
                  <GroupBox label='B'>
                    <ListItem onClick={() => { }}>Bill of Lading (BOL)</ListItem>
                    <ListItem onClick={() => { }}>Bobtail</ListItem>
                  </GroupBox>
                  <GroupBox label='C'>
                    <ListItem onClick={() => { }}>Carrier</ListItem>
                    <ListItem onClick={() => { }}>Carrier Liability</ListItem>
                    <ListItem onClick={() => { }}>Consignee</ListItem>
                    <ListItem onClick={() => { }}>Consignor</ListItem>
                  </GroupBox>
              </div>
              )}
              {activeTab === 1 && (
                <div style={{ overflow: 'auto' }}>
                  <ListItem onClick={() => { }}>Double Brokering<div>18 views</div></ListItem>
                  <ListItem onClick={() => { }}>Authority<div>6 views</div></ListItem>
                </div>
              )}
              {activeTab === 2 && (
                <div style={{ overflow: 'auto' }}>
                  <Frame variant='well' style={{ width:'100%', padding: '10px' }}>
                  <ListItem onClick={() => { }}>Double Brokering<div>18 views</div></ListItem>
                  <ListItem onClick={() => { }}>Authority<div>6 views</div></ListItem>
                  </Frame>
                </div>
              )}
            </TabBody>
          </div>
          {/*<div style={{ padding: '20px'}}>
            
          </div>
          <div style={{ display: 'flex', height: '100%', overflow: 'auto' }}>

          </div>
          */}
        </WindowContent>
      </Window>
    </>
  );
}
