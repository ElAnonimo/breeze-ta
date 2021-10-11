import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { createEntry, getEntryById } from '../../actions/entry';
import EntryForm from '../common/EntryForm';

const EditEntry = () => {
  const history = useHistory();
  const { id } = useParams();
  const { entry, loading } = useSelector(state => state.entry);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntryById(id));
  }, [dispatch, id]);

  return (
    <EntryForm
      history={history}
      createEntry={createEntry}
      edit
      entry={entry}
      loading={loading}
    />
  );
};

export default EditEntry;
