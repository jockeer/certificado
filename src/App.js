import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Login from './components/Login';
import Certificado from './components/Certificado'
import Registro from './components/Registro';


const App = () =>{
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/certificado" component={Certificado} />
        <Route exact path="/registro" component={Registro} />
      </Switch>

    </Router>
  );
}

export default App;
