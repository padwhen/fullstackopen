import express from 'express'
import diagnoseService from '../services/diagnoseService'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(diagnoseService.getNoLatinDiagnoseEntry())
})

router.post('/', (_req, res)  => {
    res.send('Saving a diagnose')
})

router.get('/:code', (req, res) => {
    const { code } = req.params;
    const name = diagnoseService.getNameByCode(code);
    if (!name) {
        return res.status(404).json({ error: 'Diagnosis code not found' });
    }
    return res.json({ name });
});


export default router;