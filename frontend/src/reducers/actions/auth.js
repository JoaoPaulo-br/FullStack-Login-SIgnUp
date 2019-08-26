import { RSAA } from 'redux-api-middleware';

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED'
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';
export const LOGOUT = '@@auth/LOGOUT';

var client_id = ''
var client_secret = ''
export  const login = (username,password) => {
  return {
  [RSAA]: {
    types : [LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,],
    endpoint: 'http://127.0.0.1:8000/o/token/',
    method: 'POST',
    body: 'grant_type=password&client_id='+client_id+'&client_secret='+client_secret+'&username='+username+'&password='+password,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
  }
}}

export  const refresh_token = (token) => ({
  [RSAA]: {
    endpoint : 'http://127.0.0.1:8000/o/token/',
    method : 'POST',
    body: 'grant_type=refresh_token&client_id='+client_id+'&client_secret='+client_secret+'&refresh_token='+token,
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    types : [TOKEN_REQUEST,TOKEN_RECEIVED,TOKEN_FAILURE]

  }
})

export const logout = () => ({
  type: LOGOUT
})
