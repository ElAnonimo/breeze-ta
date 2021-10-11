import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';

const Landing = () => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onLogoutClick = evt => {
    evt.preventDefault();
    dispatch(logout());
  };

  const guestLinks = (
    <div className='buttons'>
      <Link to='/register' className='btn btn-primary'>Sign Up</Link>
      <Link to='/login' className='btn btn-light'>Sign In</Link>
      <Link to='/entries' className='btn btn-light'>See Entries</Link>
    </div>
  );

  const authLinks = (
    <div className='buttons'>
      <Link to='#!' className='btn btn-danger' onClick={onLogoutClick}>Log Out</Link>
      <Link to='/entries' className='btn btn-light'>See Entries</Link>
    </div>
  );

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Entries</h1>
          <p className='lead'>
            Access the phone book entries to get connected or sign in to update/delete
          </p>
          {!loading && <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>}
        </div>
      </div>
    </section>
  );
};

export default Landing;
