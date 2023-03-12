import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Anecdote = ({text, selected, votes}) => {
  return (
    <div>
    <p>{text[selected]}</p>
    <p>has {votes[selected]} votes</p>
    </div>
  )
}

const AnecdoteWithMostVotes = ({text, votes}) => {
  const mostVotes = Math.max(...votes);
  const mostVotesIndex = votes.indexOf(mostVotes)
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{text[mostVotesIndex]}</p>
      <p>has {mostVotes} votes.</p>
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes); 
  }
  const [selected, setSelected] = useState(0)
  const handleNextAncedote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      <Anecdote text={anecdotes} selected={selected} votes={votes} />
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleNextAncedote} />
      <AnecdoteWithMostVotes text={anecdotes} votes={votes} />
    </div>
  )
}

export default App
