import { Router } from "express"
const controller = require('../controllers/events')

const router = Router()

router.get('/:username', controller.getAllUserEvents)
router.post('/updatePost/:id', controller.updatePost)
router.post('/create/:username', controller.addEvent)

export default router