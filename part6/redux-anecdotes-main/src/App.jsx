import { useSelector, useDispatch } from 'react-redux'
import { vote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/AnecdoteForm'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App