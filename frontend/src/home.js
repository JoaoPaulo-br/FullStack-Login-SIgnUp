import React , {Component} from 'react';
import { connect } from 'react-redux';
class Home extends Component {

render(){
  console.log(this.props.state)


return(
  <div>
  <h1>You are logged in</h1>
  </div>

)}
}



const mapStateToProps = (state) => ({
  state:state
})


const Res = (props) =>{
  return (
    <div>
    <Home {...props}/>
    </div>
)}

export default connect(mapStateToProps,null
)(Home);
