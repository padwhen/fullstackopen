import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {
  const notification = useSelector(state => state.notification)
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