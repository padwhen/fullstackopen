import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (content) => {
    const anecdotes = await getAll()
    const anecdoteToVote = anecdotes.find(anecdote => anecdote.content === content)
    if (anecdoteToVote) {
        const updated = {
            ...anecdoteToVote,
            votes: anecdoteToVote.votes + 1
        }
        const response = await axios.put(`${baseUrl}/${anecdoteToVote.id}`, updated)
        return response.data
    }
}

export default { getAll, createNew, update }