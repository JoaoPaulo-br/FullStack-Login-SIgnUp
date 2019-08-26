import auth, * as fromAuth from './auth'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  auth:auth,
  router:routerReducer
})

export const isAuthenticated =
 state => fromAuth.IsAuthenticated(state.auth)
export const accessToken =
  state => fromAuth.access_token(state.auth)
export const isAccessTokenExpired =
  state => fromAuth.access_token_expired(state.auth)
export const refreshToken =
  state => fromAuth.refresh_token(state.auth)
//use that to make call to the api
export function withAuth(headers={}) {
    return (state) => ({
      ...headers,
      'Authorization': `Bearer ${accessToken(state)}`
    })
  }
//export const authErrors =
  //state => fromAuth.errors(state.auth)
