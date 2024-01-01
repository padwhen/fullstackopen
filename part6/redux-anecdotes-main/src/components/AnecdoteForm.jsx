import { useDispatch, useSelector } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";
import { clearNotification, setNotification, showNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, vote }) => {
    return (
        <li>
            <div>
            {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.content)}>vote</button>
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
              dispatch(updateVote(anecdote.content))
              dispatch(showNotification(`You voted for '${anecdote.content}'`, 5))
            }}
          />
        ))}
      </ul>
    );
  };
  
  export default Anecdotes;
  