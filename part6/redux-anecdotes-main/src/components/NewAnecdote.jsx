import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

const NewAnecdote = () => {
    const dispatch = useDispatch()
    const addAnecdote = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const action = add(content)
        dispatch(action)
        dispatch(setNotification(`'${content}' just added!`))
        setTimeout(() => {
            dispatch(clearNotification)
        }, 5000)
    }
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
        </div>
    )
}

export default NewAnecdote