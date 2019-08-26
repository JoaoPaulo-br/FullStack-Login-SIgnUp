import React from 'react'
import {Route,Redirect} from 'react-router'
import {connect} from 'react-redux'
import {isAuthenticated} from '../reducers'

const PrivateRoute = ({component:Component,IsAuthenticated,
...rest})=> (
  <Route{...rest} render={props=>(
    IsAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname:'/login',
        state : {from:props.location}
      }}/>
    )
  )}/>
)

const mapStateToProps= (state) => ({
  IsAuthenticated : isAuthenticated(state)
})

export default connect(mapStateToProps,null)(PrivateRoute)
