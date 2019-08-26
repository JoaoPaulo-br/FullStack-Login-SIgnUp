import { persistReducer, persistStore } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux';
import apiMiddleware from './middleware';
import { routerMiddleware } from 'react-router-redux'
import { createFilter   } from 'redux-persist-transform-filter';
import storage from 'redux-persist/es/storage'
import rootreducer from './reducers/index'

export default (history) => {
  const persistedFilter = createFilter(
  'auth', ['access', 'refresh']);

  const reducer = persistReducer(
    {
      key: 'polls',
      storage: storage,
      whitelist: ['auth'],
      transform:[persistedFilter]
    },
    rootreducer)

  const store = createStore(
    reducer, {},
    applyMiddleware(
      apiMiddleware,routerMiddleware(history)
  )
)
  persistStore(store)
  return store
}
