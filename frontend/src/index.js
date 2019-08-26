import React from 'react';
import ReactDOM from 'react-dom';
import {Provider}  from 'react-redux';
import './index.css';
import SignUp from './signup';
import Login from './handleLogin.js';
import {Route, Switch,Router} from 'react-router-dom'
import configurestore from './store'
import {history} from './history'
import PrivateRoute from './containers/PrivateRoute';
import Home from './home'


const store = configurestore(history)


ReactDOM.render(
<Provider store={store}>
<Router history={history} >
  <Switch>
  <Route path='/signup' component={SignUp}/>
     <Route exact path="/login" component={Login}/>
     <PrivateRoute path='/' component={Home}/>

  </Switch>
</Router>
</Provider>
  ,document.getElementById('root'));
