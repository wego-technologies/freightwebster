import { addTerm } from '@/hooks/get-terms'
import React, { useState } from 'react'
import { Button, GroupBox, TextInput, Toolbar, Window, WindowContent, WindowHeader } from 'react95'

interface AddTermFormProps {
  onClose: () => void
}

const AddTermForm: React.FC<AddTermFormProps> = ({ onClose }) => {
  const [value, setValue] = useState<string>('')

  const handleAdd = () => {
    addTerm(value)

    onClose()
  }

  return (
    <Window
      style={{
        position: 'absolute',
        zIndex: 1,
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        //width: '300px',
      }}
    >
      <WindowHeader
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span>Request New Term</span>
        <Button onClick={onClose}>
          <img src="/close.svg" alt="Close icon" style={{ width: '12px' }} />
        </Button>
      </WindowHeader>
      <WindowContent>
        <GroupBox label="Term">
          <TextInput name="term" value={value} onChange={(e) => setValue(e.target.value)} />
        </GroupBox>
        <Toolbar style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>
          <Button onClick={handleAdd}>Add</Button>
          <div style={{ width: '10px' }}></div>
          <Button onClick={onClose}>Cancel</Button>
        </Toolbar>
      </WindowContent>
    </Window>
  )
}

export default AddTermForm
