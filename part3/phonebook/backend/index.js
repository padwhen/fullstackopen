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
  const id = request.params.id
  Person.findByIdAndRemove(id)
  .then(() => {
    response.status(204).end()
  })
  .catch(error => response.status(404).send({error: 'invalid id'}))
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

app.put('/api/notes:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson => {
    if (updatedPerson) { response.json(updatedPerson)}
    else {response.status(404).end()}
  })
  .catch(error => {
    response.status(400).send({ error: 'Invalid ID'})
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'Cast Error') {
    return response.status(404).send({ error: 'malformatted id'})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(PORT)
})