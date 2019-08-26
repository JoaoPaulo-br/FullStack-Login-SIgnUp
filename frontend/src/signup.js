import React , {Component} from 'react';
import {history} from './history';
import axios from 'axios';
import './signup.css';
import {Label,Form,FormGroup,Input,Button,} from 'reactstrap';


class SignUp extends Component {
  constructor(props){
    super(props);

    this.state = {
      params : {
      username:'',
      email:'',
      password:''
  }
}}

  handleChange = (event) => {
  const params = this.state.params
  params[event.target.name] = event.target.value
  this.setState({
    params:params
  })
  }



 Signup = (e)=> {
   e.preventDefault()
   const data = this.state.params
   axios({
     method:'POST',
     url:'http://127.0.0.1:8000/signup',
     data:data})
   history.push('/login')}

render() {
  const params = Object.keys(this.state.params).map(function(key,index) {
    return (
      <FormGroup>
      <Label>
      {key}:
      <Input
        name = {key}
        type='text'
        value = {this.state.params[key]}
        onChange = {this.handleChange} />
        </Label>
      </FormGroup>
    )},this)

  return (

    <div className='signup'>
    <Form onSubmit={ this.Signup }>
    {params}

    <Button type='submit'>Sign Up</Button>
    </Form>
  </div>


  )
}
}
export default SignUp;
