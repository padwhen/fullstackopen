import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, vote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useCounterDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useCounterDispatch()
  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  const voteAnecdote = anecdote => {
    updateMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SHOW_NOTIFICATION', message: `You voted for '${anecdote.content}'`})
  }
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
