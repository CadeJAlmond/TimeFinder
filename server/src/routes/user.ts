import { Router } from "express"
const controller = require('../controllers/user')

const router = Router()

// router.get('/', controller.userDefault).post(controller.getUser)
router.post('/:username', controller.updateColorTheme)
router.post('/friends/:username1&:username2', controller.acceptFriend)
router.put('/friends/:username1&:username2',controller.addFriend)

router.get('/search/:profilename', controller.searchUsers)
router.get('/friends/:username', controller.getFriends)
router.get(`/pending/:username`, controller.getPending)

export default router;