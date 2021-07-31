import { Router } from "express";
import ProductController from "../controller/ProductController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

router.post('/', checkJwt, ProductController.newProduct);

router.patch('/:id', checkJwt, ProductController.editProduct);

router.delete('/:id', checkJwt, ProductController.deleteProduct);

export default router;