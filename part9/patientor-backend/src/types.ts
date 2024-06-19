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


export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital',
    discharge: {
        date: string;
        criteria: string;
    }
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;