import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import CharacterDash from './UI/Character/Dashboard';
import * as serviceWorker from './serviceWorker';
import { Switch, Route } from 'react-router';
import { Sidebar } from './UI/Sidebar/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import { DiceDashboard } from './UI/Charts/Dice/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar />
      <Switch>
        <Route path="/charts/dice">
          <DiceDashboard />
        </Route>
        <Route path="/">
          <CharacterDash />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
