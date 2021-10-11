import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogoutClick = evt => {
    evt.preventDefault();
    dispatch(logout(history));
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/entries'>Entries</Link>
      </li>
      <li>
        <Link to='/create-entry'>
          <i className='far fa-address-book' /> <span className='hide-sm'>Add Entry</span>
        </Link>
      </li>
      <li>
        <Link to='#!' onClick={onLogoutClick}>
          <i className='fas fa-sign-out-alt' /> <span className='hide-sm'>Log Out</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to='/entries'>Entries</Link></li>
      <li><Link to='/register'>Sign Up</Link></li>
      <li><Link to='/login'>Sign In</Link></li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'><i className='fas fa-code' /> Entries</Link>
      </h1>
      {!loading && <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>}
    </nav>
  );
};

export default Navbar;
