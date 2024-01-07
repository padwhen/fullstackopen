import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const createNew = anecdote => 
    axios.post(baseUrl, anecdote).then(res => res.data)

export const vote = updated =>
    axios.put(`${baseUrl}/${updated.id}`, updated).then(res => res.data)