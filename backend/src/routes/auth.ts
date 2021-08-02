import { Router } from "express";
import AuthController  from '../controller/AuthController';
import { checkJwt } from "../middlewares/jwt";

const router = Router();

//login
router.post('/login', AuthController.login);

//forgot password
router.put('/forgot-password', AuthController.forgotPassword);

//create new password
router.put('/new-password', AuthController.createNewPassword);

//refresh token
router.post('/refresh-token', AuthController.refreshToken);

//change password
router.post('/change-password', checkJwt, AuthController.changePassword);
export default router;
