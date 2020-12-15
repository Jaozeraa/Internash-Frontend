import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import PrivateRoute from './Routes'
import AppProvider from '../hooks'

import Login from '../pages/Login'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'

const Routes: React.FC = () => {

  return (
      <BrowserRouter>
        <AppProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Login}/>
            <PrivateRoute exact path='/signin' component={SignIn}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard} isPrivate={true}/>
          </Switch>
        </AppProvider>
      </BrowserRouter>
  )
}

export default Routes;
