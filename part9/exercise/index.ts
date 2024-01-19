import express from 'express'
import calculatorBmi from './bmi'

const app = express()
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        return res.status(400).send({ error: 'malformatted parameters '})
    }
    const bmiData = calculatorBmi(weight, height)
    res.send(bmiData)
})

const PORT = 3000
app.listen(PORT)
console.log(`Is running on ${PORT}`)