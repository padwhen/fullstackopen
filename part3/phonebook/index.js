const express = require('express')
const app = express()
app.use(express.json())

let phonebook = 
[
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

app.get('/', (request, response) => {
  response.json("test")
})

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/info', (request, response) => {
  const length = Math.max(...phonebook.map(p => p.id))
  const now = new Date()
  response.json(`Phonebook has info for ${length} people <br /> ${now}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find(person => person.id == id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const id = Math.floor(Math.random() * 1000000)
  const person = {
    name: body.name,
    number: body.number,
    id: id
  }
  if (!person.name) {
    response.status(400).json({ error: 'name is missing'})
  }
  if (phonebook.map(existingPerson => existingPerson.name === person.name)) {
    response.status(404).json({ error: 'name must be unique'})
  }
  if (!person.number) {
    response.status(404).json({ error: 'number is missing'})
  }
  phonebook = phonebook.concat({id, ...person})
  response.json(phonebook)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(PORT)
})