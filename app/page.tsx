"use client"

import React from 'react';
import { Window, WindowContent, WindowHeader, Button, Toolbar, TextInput, GroupBox, List, ListItem} from 'react95';
import { createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';

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
  return (
    <>
      <GlobalStyles />
      <Window style={{ fontFamily: 'MS', width: '100%', height: '100%', boxSizing: 'border-box', margin: 0, padding: 0 }}>
        <WindowHeader>Freight Webster</WindowHeader>
        <WindowContent style={{ height: 'calc(100% - 30px)', overflow: 'auto' }}> {/* Adjust the height as per the header */}
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput placeholder="Search..." width={150} />
            <Button onClick={() => { }}>Add New Term</Button>
          </Toolbar>
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
          <div style={{ display: 'flex', height: '100%', overflow: 'auto' }}>
            {/* Content goes here */}
          </div>
        </WindowContent>
      </Window>
    </>
  );
}


