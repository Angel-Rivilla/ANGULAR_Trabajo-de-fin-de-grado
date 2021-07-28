import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

//router.get('/', [checkJwt, checkRole(['admin'])], UserController.getAll);

router.get('/', UserController.getAll);

router.get('/:id', UserController.getById);

router.post('/', UserController.newUser);

router.post('/register',UserController.registerUser);

router.patch('/:id', UserController.editUser);

router.delete('/:id', UserController.deleteUser);

export default router;


