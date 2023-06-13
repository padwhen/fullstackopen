const express = require('express')
const app = express()
const morgan = require('morgan')

require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())


const cors = require('cors')
app.use(cors())


morgan.token('type', (request, response) => JSON.stringify(request.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :type"));

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const page = `Phonebook has info for ${persons.length} people <br>${newDate()}`
        response.send(page)
    })
})

app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body
    if (!name) {
        return response.status(404).json({
            error: 'the name is missing'
        })
    }
    if (!number) {
        return response.status(404).json({
            error: 'the number is missing'
        })
    }
    const person = new Person({ name, number })
    person
    .save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    .catch(error => next(error))
})

const mongoose = require('mongoose')
const url = `mongodb+srv://phattrongwork:Phat1812@cluster0.hvdby6m.mongodb.net/people?retryWrites=true&w=majority`
mongoose.connect(url)
.then(() => {
    console.log('Connected to MongoDB Server')
})
.catch(error => {
    console.log('Cannot connect')
}) 

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    .catch(error => {
        console.log('error')
    })
})

app.get("/api/persons", (request, response) => {
    Person.find({}).then((person) => {
      response.json(person);
    });
  });
  

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).end()
      })
      .catch(error => next(error))
  })



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})