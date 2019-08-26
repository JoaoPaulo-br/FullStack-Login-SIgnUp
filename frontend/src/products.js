import React , {Component} from 'react';
import axios from 'axios';
import './products.css'
import {
  Form,
  FormGroup,
  Label,
  Collapse,
  NavDropdown,
  Input,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,} from 'reactstrap';

class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
      product:'',
      results:[]
    }
}
handleChange = event => {
  this.setState({
    [event.target.name]:event.target.value
  })
}
get_data = (e)=>{
  e.preventDefault()
  const url = "http://127.0.0.1:8000/get_results?product="+this.state.product
  axios.get(url)
  .then(response=>{
    this.setState({
      results:response.data
    })
})}

render(){
  console.log(this.state.results)
  const results = this.props.location.state.result.map((res,key)=>{
    return (
      <div key={key} className='row'>
      <a  href={res[0]}>{res[1]}<br/>
      <img src={res[2]}/>  </a>
      </div>

    )
  })



  return (
    <div>
    <Navbar color="light" light>
    <Nav>
          <NavbarBrand   href="/" className="mr-auto">Marketclaw</NavbarBrand>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/home">Home</NavLink>
              </NavItem>
            </Nav>
            <div className='small-search'>
            <Form inline onSubmit={this.get_data}>
            <FormGroup>

            <Input
            placeholder="Search"
            name = 'product'
            type='text'
            value={this.state.product}
            onChange={this.handleChange}
         />
         </FormGroup>
         <Button type='submit' >Search</Button>

         </Form>
         </div>
        </Navbar>
      <div className='box'>
    {results}
    </div>
    </div>
  )
}
}


export default Products;
