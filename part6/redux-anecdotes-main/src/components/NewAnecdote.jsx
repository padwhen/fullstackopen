import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";

const NewAnecdote = () => {
    const dispatch = useDispatch()
    const addAnecdote = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const action = add(content)
        console.log(action)
        dispatch(action)
    }
    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

export default NewAnecdote