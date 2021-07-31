import { Router } from "express";
import ProductController from "../controller/ProductController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

router.post('/', ProductController.newProduct);

router.patch('/:id', ProductController.editProduct);

router.delete('/:id', ProductController.deleteProduct);

export default router;