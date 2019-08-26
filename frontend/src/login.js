import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import {Form,FormGroup,Label,Button,Input} from 'reactstrap';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password :'',
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }
  Login = (event) => {
   event.preventDefault()
   this.props.log(this.state.username, this.state.password)
 }


  render()
  {
    return (

   <div className='login'>
      <Form onSubmit={this.Login}>
      <FormGroup>
      <Label>
      Username:
      <Input
         name = 'username'
         type='text'
         value={this.state.username}
         onChange={this.handleChange}
      />
      </Label>
      </FormGroup>
      <FormGroup>
      <Label>
      Password:
      <Input
         name='password'
         type='text'
         value={this.state.email}
         onChange={this.handleChange}
      />
      </Label>
      </FormGroup>
      <Button type='submit'  color='danger'>
      Login
      </Button>
      </Form>
  </div>
    )
  }
}
export default LoginForm;
