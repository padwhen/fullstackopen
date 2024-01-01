import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import App from './App'
import { setAnecdotes } from './reducers/anecdoteReducer'


import anecdoteService from './services/anecdotes'
import store from './store'

anecdoteService.getAll().then(anecdotes => 
  store.dispatch(setAnecdotes(anecdotes))  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)