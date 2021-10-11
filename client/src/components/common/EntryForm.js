import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const EntryForm = ({
  entry,
  edit,
  createEntry,
  loading,
  history
}) => {
  const [entryData, setEntryData] = useState({
    name: '',
    number: ''
  });

  useEffect(() => {
    if (!loading) {
      setEntryData({
        name: entry ? entry.name : '',
        number: entry ? entry.number : ''
      });
    }
  }, [loading, entry]);

  const { name, number } = entryData;
  const dispatch = useDispatch();

  const onChange = evt => setEntryData({
    ...entryData,
    [evt.target.name]: evt.target.value
  });

  const onSubmit = evt => {
    evt.preventDefault();
    dispatch(createEntry(entryData, history, edit));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>{`${edit ? 'Update The' : 'Create An'} Entry`}</h1>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Name'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
          <small className='form-text'>please provide a name</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Number'
            name='number'
            value={number}
            onChange={onChange}
            required
          />
          <small className='form-text'>please provide a number</small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/'>Go Back</Link>
      </form>
    </Fragment>
  );
};

EntryForm.propTypes = {
  entry: PropTypes.object,
  loading: PropTypes.bool,
  createEntry: PropTypes.func,
  history: PropTypes.object,
  edit: PropTypes.bool
};

export default EntryForm;
