require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./modules/Person')

morgan.token('person', (request) => {
    console.log(request.body)
    return JSON.stringify(request.body)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))



app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    let startTime = new Date()
    Person.find({})
        .then(persons => {
            //let endTime = new Date()
            response.send(
                `<p>
                Phonebook currently has ${persons.length} persons! 
                </br>
                Request start datetime - ${startTime}
            </p>`
            )
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    //const person = persons.find(p => p.id === id)
    Person.findById(id)
        .then(person => {
            if (!person) {
                response.status(404).end()
            }
            response.json(person)
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then( () => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        console.log('Error : name and number must be present!')
        const error = {
            error: 'name and number must be present!'
        }
        response.status(400).json(error)
    }
    else {
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save()
            .then(savedPerson => {
                console.log('Saved person to the database!')
                response.json(savedPerson)
            })
            .catch(error => next(error))
    }
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number
    }
    //console.log(request.params.id, request.body)
    Person.findByIdAndUpdate(request.params.id, person,
        {
            new: true,
            runValidators: true,
            context: 'query'
        })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
//console.log('running on port', PORT)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})