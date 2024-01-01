import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const updated = action.payload
      return state.map(anecdote => anecdote.id !== updated.id ? anecdote : updated)
    },
    add(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes)) 
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(add(newAnecdote))
  }
}

export const updateVote = content => {
  return async dispatch => {
    const updated = await anecdoteService.update(content)
    dispatch(vote(updated))
  }
}

export const { vote, add, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer