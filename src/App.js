import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Login from './components/Login';
import Certificado from './components/Certificado'
import Registro from './components/Registro';
import RegistroCertificado from './components/RegistroCertificado';
import Home from './components/Home';


const App = () =>{
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/certificado/:id" component={Certificado} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/registro-certificado" component={RegistroCertificado} />
      </Switch>

    </Router>
  );
}

export default App;
