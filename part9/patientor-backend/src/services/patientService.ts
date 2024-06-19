import patients from '../../data/patients'
import { v1 as uuid } from 'uuid'

import { NoSsnPatientEntry, PatientEntry, NewPatient, Patient } from '../types'

const getEntries = (): PatientEntry[] => {
    return patients
}

const getNoSsnPatientEntry = (): NoSsnPatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }))
}

const addPatient = (entry: NewPatient): PatientEntry => {
    const id = uuid()
    const newPatient = {
        id,
        ...entry,
        entries: []
    }
    patients.push(newPatient)
    return newPatient
}

const patientsWithEntries: Patient[] = patients.map(patient => ({
    ...patient,
    entries: patient.entries
}));

const getPatientById = (id: string): Patient | undefined => {
    const foundPatient = patientsWithEntries.find(patient => patient.id === id);
    return foundPatient;
};



export default {
    getEntries, getNoSsnPatientEntry, addPatient, getPatientById
}
