import React, { Fragment } from 'react';
import './App.css';
import NavbarComponent from './components/layout/NavbarComponent';
import Home from './components/pages/Home';
import About from './components/pages/About';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AlertState from './context/alert/AlertState';
import ExerciseState from './context/exercise/ExerciseState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ExerciseState>
        <AlertState>
          <Router>
            <Fragment>
              <NavbarComponent />
              <div className='App container mt-4'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={RegisterForm} />
                  <Route exact path='/login' component={LoginForm} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ExerciseState>
    </AuthState>
  );
};

export default App;
