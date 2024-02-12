export interface DiagnoseEntry {
    code: string
    name: string
    latin?: string
}

export type Gender = 'male' | 'female' | 'other'

export interface PatientEntry {
    id: string
    name: string
    dateOfBirth: string
    gender: Gender
    occupation: string
    ssn: string
}

export type NoSsnPatientEntry = Omit<PatientEntry, 'ssn'>

export type NoLatinDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>

export type NewPatient = Omit<PatientEntry, 'id'>