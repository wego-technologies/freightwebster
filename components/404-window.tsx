import React, { ChangeEvent, FormEventHandler } from 'react'
import { Button, GroupBox, TextInput, Toolbar, Window, WindowContent, WindowHeader } from 'react95'

const TermNotFound: React.FC = () => {
  return (
    <Window style={{ position: 'absolute', zIndex: 1, top: '20%', left: '50%', transform: 'translate(-50%, -20%)' }}>
      <WindowHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>404 Error</span>
        <Button></Button>
      </WindowHeader>
      <WindowContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/error-icon.png" alt="Error icon" style={{height: "50px", marginRight: '1rem' }} />
          <span>The term you are looking for does not exist.</span>
        </div>
        <Toolbar style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <Button>Back to Glossary</Button>
            <div style={{ width: '10px' }}></div>
          <Button>Request New Term</Button>
        </Toolbar>
      </WindowContent>
    </Window>
  )
}

export default TermNotFound