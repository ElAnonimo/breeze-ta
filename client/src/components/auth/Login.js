import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {
    email,
    password
  } = formData;

  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onChange = evt => setFormData({
    ...formData,
    [evt.target.name]: evt.target.value
  });

  const onSubmit = async evt => {
    evt.preventDefault();
    dispatch(login(email, password));
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/entries' />
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'><i className='fas fa-user' /> Sign Into Your Account</p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Sign In' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
