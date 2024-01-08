import React, { ChangeEvent, FormEventHandler } from 'react'
import { Button, GroupBox, TextInput, Toolbar, Window, WindowContent, WindowHeader } from 'react95'

interface AddTermFormProps {
  handleSubmit: FormEventHandler<HTMLFormElement>
  newTerm: string
  setNewTerm: React.Dispatch<React.SetStateAction<string>>
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTermForm: React.FC<AddTermFormProps> = ({
  handleSubmit,
  newTerm,
  setNewTerm,
  setIsFormVisible,
}) => {
  const handleNewTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTerm(e.target.value)
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
      <WindowHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Request New Term</span>
        <Button onClick={() => setIsFormVisible(false)}></Button>
      </WindowHeader>
      <WindowContent>
        <form onSubmit={handleSubmit}>
          <GroupBox label="Term">
            <TextInput name="term" value={newTerm} onChange={handleNewTermChange} />
          </GroupBox>
          <Toolbar style={{ marginTop: "1rem", justifyContent: 'flex-end' }}>
            <Button type="disabled" disabled>Add</Button>
            <div style={{ width: '10px' }}></div>
            <Button onClick={() => setIsFormVisible(false)}>Cancel</Button>
          </Toolbar>
        </form>
      </WindowContent>
    </Window>
  )
}

export default AddTermForm
