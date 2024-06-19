import diagnoses from '../../data/diagnoses'

import { NoLatinDiagnoseEntry, DiagnoseEntry } from '../types'

const getEntries = (): DiagnoseEntry[] => {
    return diagnoses
}

const getNoLatinDiagnoseEntry = (): NoLatinDiagnoseEntry[] => {
    return diagnoses.map(({code, name}) => ({
        code, name
    }))
}

const getNameByCode = (code: string): string | undefined => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    return diagnosis ? diagnosis.name : undefined;
}

const addDiagnose = () => {
    return null
}

export default {
    getEntries, getNoLatinDiagnoseEntry, addDiagnose, getNameByCode
}