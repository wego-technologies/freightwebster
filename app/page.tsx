"use client"

import Image from 'next/image'
import styles from './page.module.css'
import React, { useState } from 'react';
import { Window, WindowContent, WindowHeader, Button, Toolbar } from 'react95';

export default function Home() {
  {/*const [terms, setTerms] = useState([]); // Replace with actual data fetching logic
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTerm, setNewTerm] = useState({ term: '', definition: '', sentence: '' });

 const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the new term
    setIsFormVisible(false);
  };

  const filteredTerms = searchTerm.length === 0
    ? terms
: terms.filter(term => term.term.toLowerCase().includes(searchTerm.toLowerCase()));*/}


  return (
    <main className={styles.main}>


      <Window style={{ width: '100%', height: '100vh' }}>
        <WindowHeader>Freight Webster</WindowHeader>
        <WindowContent>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/*<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />*/}
            <Button onClick={() => { }}>Add New Term</Button>
          </Toolbar>
          <div style={{ display: 'flex', height: '100%' }}>
            {/*<TermList terms={filteredTerms} selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
            <TermDetailPage selectedTerm={selectedTerm} />*/}
          </div>
          {/*{isFormVisible && <AddTermForm handleSubmit={handleSubmit} newTerm={newTerm} setNewTerm={setNewTerm} setIsFormVisible={setIsFormVisible} />*/}
        </WindowContent>
      </Window>
    </main>
  )
}
