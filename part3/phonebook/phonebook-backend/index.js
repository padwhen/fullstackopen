const express = require('express')
const app = express()
app.use(express.json())
 
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const id = persons.length > 0 
    ? Math.max(...persons.map(n => n.id))
    : 0
    const date = new Date();
    const message = `Phonebook has info of ${id} people\n${date}`
    response.send(`<pre>${message}</pre>`)
})

app.delete('api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id === id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
    return maxId + 1
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(404).json({
            error: 'the name is missing'
        })
    }
    if (!body.number) {
        return response.status(404).json({
            error: 'the number is missing'
        })
    }
    const nameExists = persons.some(person => person.name === body.name)
    if (nameExists) {
        return response.status(404).json({
            error: 'name must be unique'
        })
    } else {
        const person = {
            "name": body.name,
            "number": body.number,
            id: generateId()
        }
        persons = persons.concat(person)
        response.json(persons)
    }
})
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})