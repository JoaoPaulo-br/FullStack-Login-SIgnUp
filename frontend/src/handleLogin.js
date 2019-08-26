import React from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router';
import LoginForm from './login';
import {login} from './reducers/actions/auth';
import {isAuthenticated} from './reducers';

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state)
})
const mapDispatchToProps = (dispatch) => ({
  log :(username,password) =>{
  dispatch(login(username,password))
  }})

  const Login = (props) => {
    console.log(props.isAuthenticated)
    if(props.isAuthenticated) {
      return (
        <Redirect to='/' />
      )
    } else {
      return (
         <div>
          <LoginForm {...props}/>
          </div>
      )
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
