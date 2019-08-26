import * as auth from './actions/auth'
import moment from 'moment'

const initialstate = {
  access : undefined,
  refresh : undefined,
  errors : {},
}

export default (state=initialstate,action)=>{
  switch(action.type) {
    case auth.LOGIN_SUCCESS:
     return{
      access: {
        token : action.payload.access_token,
        expires :  moment().add(Number(action.payload.expires_in)/600,'minutes')
      },
      refresh : {
        token : action.payload.refresh_token

    },
    errors : {}
  }
  case auth.TOKEN_RECEIVED:
    return {
      state,
      access : {
        token : action.payload.access_token,
        expires : moment().add(Number(action.payload.expires_in)/600,'minutes'),
      },
      refresh : {
        token : action.payload.refresh_token
      },
      errors : {}
    }
  case auth.LOGIN_FAILURE:
  case auth.TOKEN_FAILURE:
    return {
      access : undefined,
      refresh : undefined,
      errors : {
        'error message' : action.payload.message
      }
    }
  case auth.LOGOUT:
    return {
      access:undefined,
      refresh:undefined,
      errors: {}
    }
  default:
  return state;
}}

export function access_token(state) {
  if (state.access) {
    return state.access.token
  }
}
export function refresh_token(state){
  if (state.refresh) {
    return state.refresh.token
  }
}
export function access_token_expired(state) {
  if (state.access===undefined){
    return false
  }
  else {
    var end = moment(state.access.expires)
    var diff = moment.duration(end.diff(moment()))
    var time_left = Number(diff.asMinutes())
    console.log(time_left)

    if ( 0 < time_left && time_left < 10) {
      return 'refresh'
    }
    if (diff<=0) {
      return true
    }
    if (diff>10)
      return false
  }

}
export function IsAuthenticated(state) {
  if (state.access && !access_token_expired(state)){
    return true
  }
  return false
}
export function errors(state) {
  return state.errors
}
