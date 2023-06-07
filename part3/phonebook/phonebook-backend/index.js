const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.static('build'))
app.use(express.json())


const cors = require('cors')
app.use(cors())


// app.use(morgan('tiny'))
morgan.token('type', (request, response) => JSON.stringify(request.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :type"));
// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = persons.find(note => note.id === id)
//     if (note) {
//         response.json(note)
//     } else {
//         response.status(404).end()
//     }
// })



app.get('/api/people/:id', (request, response) => {
    Person.findById(request.params.id).then(note => {
        response.json(note)
    })
})
const mongoose = require('mongoose')
const url = `mongodb+srv://phattrongwork:Phat1812@cluster0.hvdby6m.mongodb.net/people?retryWrites=true&w=majority`
// mongoose.set('StrictQuery',false)

require('dotenv').config()
const Person = require('./models/person')


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

// const Person = mongoose.model('person', personSchema) (already declared => dont need to do it again)

app.get('/api/people', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    .catch(error => {
        console.log('error')
    })
})

// app.get('/api/people', (request, response) => {
//     response.json(people)
// })

// app.get('/info', (request, response) => {
//     const id = people.length > 0 
//     ? Math.max(...people.map(n => n.id))
//     : 0
//     const date = new Date();
//     const message = `Phonebook has info of ${id} people\n${date}`
//     response.send(`<pre>${message}</pre>`)
// })

app.get("/api/people", (request, response) => {
    Person.find({}).then((person) => {
      response.json(person);
    });
  });
  
app.get('/info', (request, response) => {
    Person.countDocument({})
        .then(count => {
            const date = new Date();
            const message = `Phonebook has info of ${count} people\n${date}`;
            response.send(`<pre>${message}</pre>`);
        })
        .catch(error => {
            console.log(error)
            response.status(500).send('Internal Server Error');
        })
})

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id);
    Person.deleteOne({_id: id})
    .then( () => {
        response.status(204).end();
    })
    .catch(error => {
        console.log('Error deleting person: ', error);
        response.status(500).json({
            error: 'Something went wrong'
        })
    })
})

// const generateId = () => {
//     const maxId = people.length > 0
//     ? Math.max(...people.map(n => n.id))
//     : 0
//     return maxId + 1
// }
app.post('/api/people', (request, response) => {
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
    // if (body.content === undefined) {
    //     return response.status(400).json({
    //         error: 'content missing'
    //     })
    // }
    Person.findOne({ name: body.name })
    .then((person) => {
        const nameExists = person !== null
        if (nameExists) {
            return response.status(404).json({
                error: 'name must be unique'
            })
        } else {
            const person = new Person({
                "name": body.name,
                "number": body.number,
            })
            person.save().then(savedPerson => {
                response.json(savedPerson)
            })
        }
    })
    .catch((error) => console.log('Error', error))
    
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})