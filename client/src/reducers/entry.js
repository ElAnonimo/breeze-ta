import {
  GET_ENTRIES,
  GET_ENTRY,
  EDIT_ENTRY,
  DELETE_ENTRY,
  GET_ENTRY_ERRORED,
  CLEAR_ENTRY
} from '../actions/types';

const initialState = {
  entry: null,
  entries: [],
  loading: true,
  error: {}
};

const entry = (state = initialState, action) => {
  switch(action.type) {
    case GET_ENTRY:
    case EDIT_ENTRY:
      return {
        ...state,
        entry: action.payload,
        loading: false
      };
    case GET_ENTRIES:
      return {
        ...state,
        entries: action.payload,
        loading: false
      };
    case GET_ENTRY_ERRORED:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_ENTRY:
      return {
        ...state,
        entry: null,
        entries: [],
        loading: false
      };
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload),
        loading: false
      };
    default:
      return state;
  }
};

export default entry;
