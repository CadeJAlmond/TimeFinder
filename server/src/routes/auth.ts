import { Router } from "express"
const controller = require('../controllers/auth')

const router = Router()

router.get('/', controller.authDefault)
router.post('/login', controller.loginAccount)
router.post('/logout', controller.logOut)
router.post('/createUser', controller.regAccount)

router.put('/:username', controller.changePassword)
router.put('/bio/:username', controller.updateUserBio)

export default router;