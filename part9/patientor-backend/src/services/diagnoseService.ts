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

const addDiagnose = () => {
    return null
}

export default {
    getEntries, getNoLatinDiagnoseEntry, addDiagnose
}