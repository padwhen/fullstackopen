import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Notification from './components/Notification'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/AnecdoteForm'
import Filter from './components/Filter'
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])
  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      <Anecdotes />
      <Filter />
      <NewAnecdote />
    </div>
  )
}

export default App