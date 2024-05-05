import express from 'express'
import patientService from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getNoSsnPatientEntry())
})

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const addedEntry = patientService.addPatient(
        {name, dateOfBirth, ssn, gender, occupation}
    )
    res.json(addedEntry)
})

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id)
    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' })
    }
    res.json(patient)
    return;
})

export default router