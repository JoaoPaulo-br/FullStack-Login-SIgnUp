import { isRSAA, apiMiddleware } from 'redux-api-middleware';
import { TOKEN_RECEIVED} from './reducers/actions/auth'
import{isAccessTokenExpired,refreshToken} from './reducers'
import {refresh_token} from './reducers/actions/auth'

export function createApiMiddleware() {
  let postponedRSAAs = []

  return (store) =>{
    const rsaaMiddleware = apiMiddleware(store)
    return (next) => (action) => {


    const nextCheckPostoned = (nextAction) => {
        // Run postponed actions after token refresh
        if (nextAction.type === TOKEN_RECEIVED) {
          next(nextAction);
          postponedRSAAs.forEach((postponed) => {
            rsaaMiddleware(next)(postponed)
          })
          postponedRSAAs = []
        } else {
          next(nextAction)
        }
      }
    if (isRSAA(action)) {
      console.log(store.getState())
      const state = store.getState(),
              token = refreshToken(store.getState())
        if(token && isAccessTokenExpired(state)==='refresh') {
          console.log('yes')
          postponedRSAAs.push(action)
          if(postponedRSAAs.length === 1) {
            const action = refresh_token(token)
            return rsaaMiddleware(nextCheckPostoned)(action)
          } else {
            return
          }
        }
        return rsaaMiddleware(next)(action);
      }

  return next(action)
}}}
export default createApiMiddleware();
