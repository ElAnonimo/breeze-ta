import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteEntry } from '../../actions/entry';
import PropTypes from 'prop-types';

const EntryItem = ({ entry: { _id, name, number, user: entryUser } }) => {
  const { loading, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onEntryDelete = (_id) => {
    dispatch(deleteEntry(_id));
  };

  return (
    <div className='profile bg-light'>
      <div>
        <p>Name: {name}</p>
        <p>Phone: {number}</p>
        {!loading && entryUser === user._id && <Link to={`/edit-entry/${_id}`} className='btn btn-primary'>Update</Link>}
        {!loading && entryUser === user._id && <button onClick={() => onEntryDelete(_id)} className='btn btn-danger'>Delete</button>}
      </div>
    </div>
  );
};

EntryItem.propTypes = {
  entry: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired
};

export default EntryItem;
