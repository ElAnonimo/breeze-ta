import React from 'react';
import { useHistory } from 'react-router-dom';
import { createEntry } from '../../actions/entry';
import EntryForm from '../common/EntryForm';

const CreateEntry = () => {
  const history = useHistory();

  return (
    <EntryForm
      history={history}
      createEntry={createEntry}
    />
  );

};

export default CreateEntry;
