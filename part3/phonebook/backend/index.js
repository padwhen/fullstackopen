require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

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
    Person.find({}).then((persons) => {
      response.json(persons)
    })
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
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Name and number are required'})
  }
  Person.findOne({name: body.name})
  .then((existingPerson) => {
    if (existingPerson) {
      existingPerson.number = body.number
      existingPerson.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    } else {
      const person = new Person({
        name: body.name,
        number: body.number
      })
      person.save().then((savedPerson) => {
        response.json(savedPerson)
      })
    }
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(PORT)
})