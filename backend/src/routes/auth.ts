import { Router } from "express";
import AuthController  from '../controller/AuthController';
import { checkJwt } from "../middlewares/jwt";

const router = Router();


router.post('/login', AuthController.login);

router.put('/forgot-password', AuthController.forgotPassword);

router.put('/new-password', AuthController.createNewPassword);

router.post('/refresh-token', AuthController.refreshToken);

router.post('/change-password', checkJwt, AuthController.changePassword);

export default router;
