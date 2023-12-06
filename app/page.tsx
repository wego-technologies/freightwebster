"use client"

import React from 'react';
import { Window, WindowContent, WindowHeader, Button, Toolbar } from 'react95';

export default function Home() {
  return (
    <>
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
        #__next {
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      <Window style={{ width: '100%', height: '100%', boxSizing: 'border-box', margin: 0, padding: 0 }}>
        <WindowHeader>Freight Webster</WindowHeader>
        <WindowContent style={{ height: 'calc(100% - 30px)', overflow: 'hidden' }}> {/* Adjust the height as per the header */}
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button onClick={() => { }}>Add New Term</Button>
          </Toolbar>
          <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
            {/* Content goes here */}
          </div>
        </WindowContent>
      </Window>
    </>
  );
}