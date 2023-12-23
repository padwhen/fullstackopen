import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, vote }) => {
    return (
        <li>
            <div>
            {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </li>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => 
    state.slice().sort((a,b) => b.votes - a.votes))
    return (
        <ul>
            {anecdotes.map(anecdote => <Anecdote key={anecdote.id}
            anecdote={anecdote} vote={() => dispatch(vote(anecdote.id))} />
            )}
        </ul>
    )
}

export default Anecdotes