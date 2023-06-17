import { Router } from "express"
const controller = require('../controllers/notes')

const router = Router()

router.post('/:username', controller.getNotes)
router.post('/create/:username', controller.addNote)

router.put('/updateNote/:username', controller.updateNote)

export default router;