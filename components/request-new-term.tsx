import React from 'react';
import { Window, WindowContent, WindowHeader, Fieldset, TextField, Toolbar, Button } from 'react95';

const AddTermForm = ({ handleSubmit, newTerm, setNewTerm, setIsFormVisible }) => {
  const handleNewTermChange = (e) => {
    setNewTerm({ ...newTerm, [e.target.name]: e.target.value });
  };

  return (
    <Window style={{ position: 'absolute', zIndex: 1, top: '20%', left: '50%', transform: 'translate(-50%, -20%)', width: '300px' }}>
      <WindowHeader>
        <span>Request New Term</span>
      </WindowHeader>
      <WindowContent>
        <form onSubmit={handleSubmit}>
          <Fieldset label="Word">
            <TextField
              name="term"
              value={newTerm.term}
              onChange={handleNewTermChange}
            />
          </Fieldset>
          <Toolbar>
            <Button type="disabled" disabled>Add</Button>
            <Button onClick={() => setIsFormVisible(false)}>Cancel</Button>
          </Toolbar>
        </form>
      </WindowContent>
    </Window>
  );
};

export default AddTermForm;
