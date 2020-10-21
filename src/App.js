import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Login from './components/Login';
import Certificado from './components/Certificado'

function App() {

  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/certificado" component={Certificado} />
      </Switch>

    </Router>
  );
}

export default App;
