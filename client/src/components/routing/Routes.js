import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import CreateEntry from '../entry-form/CreateEntry';
import EditEntry from '../entry-form/EditEntry';
import Entries from '../entries/Entries';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => (
  <div className='container'>
    <Alert />
    <Switch>
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/entries' component={Entries} />
      <PrivateRoute path='/create-entry' component={CreateEntry} />
      <PrivateRoute path='/edit-entry/:id' component={EditEntry} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
