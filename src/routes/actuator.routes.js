import {Router} from 'express'
const router = Router()

import * as ledCtrl from "../controllers/actuator.controller"

router.post('/', ledCtrl.ledControl)
// router.get('/', ledCtrl.getDevices)
// router.get('/:name', ledCtrl.searchDevice)

export default router