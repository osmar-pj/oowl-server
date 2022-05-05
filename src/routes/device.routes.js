import { Router } from "express";
const router = Router();

import * as deviceCtrl from "../controllers/device.controller";
import { authJwt } from "../middlewares";

router.post('/', [authJwt.verifyToken], deviceCtrl.getDeviceControl)

export default router;
