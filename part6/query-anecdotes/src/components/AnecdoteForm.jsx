import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../requests"
import { useCounterDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const dispatch = useCounterDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length > 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({type: 'SHOW_NOTIFICATION', message: `you just created '${content}'`})
    } else {
      dispatch({type: 'SHOW_NOTIFICATION', message: 'too short anecdote, must have length 5 or more'})
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
