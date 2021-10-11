import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import EntryItem from './EntryItem';
import { getAllEntries } from '../../actions/entry';

const Entries = () => {
  const { entries, loading } = useSelector(state => state.entry);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEntries());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? <Spinner /> : (
        <Fragment>
          <h1 className='large text-primary'>Entries</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse entries and connect
          </p>
          <div className='profiles'>
            {entries?.length > 0
              ? entries.map(entry => <EntryItem key={entry._id} entry={entry} />)
              : <h4>No entries found</h4>
            }
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Entries;
