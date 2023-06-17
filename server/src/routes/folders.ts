import { Router } from "express"
const controller = require('../controllers/folders')

const router = Router()

router.post('/addNote/:username', controller.addFolderNote)
router.post('/addEvent/:username', controller.addFolderEvent)
router.post('/createFolder/:username', controller.createFolder)

router.get('/:username', controller.getFolders)
router.get('/getNotes/:username', controller.getUserFolderNotes)
router.get('/getEvents/:username', controller.getUserFolderEvents)

router.delete('/folder/:username')
router.delete('/note/:username')
router.delete('/event/:username')

export default router
