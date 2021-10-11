import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ENTRIES,
  GET_ENTRY,
  DELETE_ENTRY,
  GET_ENTRY_ERRORED,
  CLEAR_ENTRY
} from './types';

// get all entries
export const getAllEntries = () => async dispatch => {
  // when visit an individual entry it goes to the state
  // so we need to clear it from the state to prevent flashing the past entry on the page
  dispatch({ type: CLEAR_ENTRY });

  try {
    const res = await axios.get('/api/entries');

    dispatch({
      type: GET_ENTRIES,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: GET_ENTRY_ERRORED,
      payload: {
        message: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// get entry by id
export const getEntryById = entryId => async dispatch => {
  try {
    const res = await axios.get(`/api/entries/entry/${entryId}`);

    dispatch({
      type: GET_ENTRY,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: GET_ENTRY_ERRORED,
      payload: {
        message: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// create or update entry
export const createEntry = (formData, history, edit) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/entries', formData, config);

    dispatch({
      type: GET_ENTRY,
      payload: res.data
    });

    dispatch(setAlert(`Entry ${edit ? 'Updated' : 'Created'}`));
    history.push('/entries');
  } catch(err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(
        err.message,
        'danger'
      )));
    }

    dispatch({
      type: GET_ENTRY_ERRORED,
      payload: {
        message: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// delete entry
export const deleteEntry = entryId => async dispatch => {
  try {
    await axios.delete(`/api/entries/entry/${entryId}`);

    dispatch({
      type: DELETE_ENTRY,
      payload: entryId
    });

    dispatch(setAlert('Entry deleted', 'success'));
  } catch(err) {
    dispatch({
      type: GET_ENTRY_ERRORED,
      payload: {
        message: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
