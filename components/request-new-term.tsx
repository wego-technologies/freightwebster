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
        width: '300px',
      }}
    >
      <WindowHeader>
        <span>Request New Term</span>
      </WindowHeader>
      <WindowContent>
        <form onSubmit={handleSubmit}>
          <GroupBox label="Word">
            <TextInput name="term" value={newTerm} onChange={handleNewTermChange} />
          </GroupBox>
          <Toolbar>
            <Button type="disabled" disabled>
              Add
            </Button>
            <Button onClick={() => setIsFormVisible(false)}>Cancel</Button>
          </Toolbar>
        </form>
      </WindowContent>
    </Window>
  )
}

export default AddTermForm
