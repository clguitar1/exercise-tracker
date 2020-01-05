import React, { Fragment } from 'react';
import './App.css';
import NavbarComponent from './components/layout/NavbarComponent';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ExerciseState from './context/exercise/ExerciseState';

const App = () => {
  return (
    <ExerciseState>
      <Router>
        <Fragment>
          <NavbarComponent />
          <div className='App container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ExerciseState>
  );
};

export default App;
