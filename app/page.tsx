"use client"

import React, { useState } from 'react'; // Added useState import
import { Window, WindowContent, WindowHeader, Button, Toolbar, TextInput, GroupBox, List, ListItem, Tabs, Tab, TabBody, MenuListItem, Frame, Select} from 'react95';
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
              {/*<Tab value={3}>Recent</Tab>*/}
            </Tabs>
            <TabBody style={{ }}>
              {activeTab === 0 && (
                <div style={{ overflow: 'auto', padding: '10px' }}>
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
                <div style={{ overflow: 'auto'}}>
                  <Frame variant='well' style={{ width:'100%', padding: '10px' }}>
                    <ListItem onClick={() => { }}>Double Brokering<div>18 views</div></ListItem>
                    <ListItem onClick={() => { }}>Authority<div>6 views</div></ListItem>
                    <ListItem onClick={() => { }}>Carrier<div>4 views</div></ListItem>
                    <ListItem onClick={() => { }}>Consignee<div>3 views</div></ListItem>
                    <ListItem onClick={() => { }}>Consignor<div>2 views</div></ListItem>
                    <ListItem onClick={() => { }}>Bill of Lading (BOL)<div>1 views</div></ListItem>
                    <ListItem onClick={() => { }}>Bobtail<div>1 views</div></ListItem>
                    <ListItem onClick={() => { }}>Carrier Liability<div>1 views</div></ListItem>
                    <ListItem onClick={() => { }}>Accessorial Charges<div>1 views</div></ListItem>
                  </Frame>
                </div>
              )}
              {activeTab === 2 && (
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
            </TabBody>
          </div>
        </WindowContent>
      </Window>
    </>
  );
}
