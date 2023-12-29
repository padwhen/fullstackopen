import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { clearNotification, setNotification } from "../reducers/notificationReducer";

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
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => {
      const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      );
      return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
    });
  
    return (
      <ul>
        {anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            vote={() => {
              dispatch(vote(anecdote.id))
              dispatch(setNotification(`You voted for '${anecdote.content}' !`))
              setTimeout(() => {
                dispatch(clearNotification())
              }, 5000)
            }}
          />
        ))}
      </ul>
    );
  };
  
  export default Anecdotes;
  