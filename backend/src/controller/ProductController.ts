import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {validate} from "class-validator";
import { Product } from "../entity/Product";

export class ProductController {
    static getAll = async (req: Request, res: Response) => {
        const productRepository = getRepository(Product);
        
        let products;
        try{
            products = await productRepository.find()
        } catch (err) {
            res.status(404).json({message: 'Something wrong!'});
        }

        if(products.length > 0){
            res.send(products);
        } else {
            res.status(404).json({message: 'Not result'});
        }
    };

    static getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        const productRepository = getRepository(Product);
        try{
            const product = await productRepository.findOneOrFail(id);
            res.send(product);
        } catch (err){
            res.status(404).json({message: 'Not result'});
        }
    };

    static newProduct = async (req: Request, res: Response) => {
        const {title, description, price, count, image, createdUser} = req.body;
        const product = new Product();

        product.title = title;
        product.description = description;
        product.price = price;
        product.count = count;
        product.image = image;
        product.createdUser = createdUser;

        const validationOpt = { validationError: { target: false, value: false }};
        const errors = await validate(product, validationOpt);
        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        const productRepository = getRepository(Product);
        try{
            await productRepository.save(product);
        }
        catch(err){
            return res.status(409).json({message: 'Product already exist!'});
        }
        res.status(201).json({message: 'Product created'});
    };

    static editProduct = async (req: Request, res: Response) => {
        let product;
        const {id} = req.params;
        const {title, description, price, count, image} = req.body;

        const productRepository = getRepository(Product);

        try{
            product = await productRepository.findOneOrFail(id);
            product.title = title;
            product.description = description;
            product.price = price;
            product.count = count;
            product.image = image;

        } catch (err) {
            return res.status(404).json({message: 'Product not found'});
        }
        
        const validationOpt = { validationError: { target: false, value: false }};
        const errors = await validate(product, validationOpt);
        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        try{
            await productRepository.save(product);
        } catch (err){
           return res.status(409).json({message: 'Username already in use'});
        }

        res.status(201).json({message: 'User update'});
    };

    static deleteProduct = async (req: Request, res: Response) => {
        const {id} = req.params;
        const productRepository = getRepository(Product);
        let product: Product;

        try{
            product = await productRepository.findOneOrFail(id);
        } catch (err) {
            return res.status(404).json({message:'Product not found'});
        }

        productRepository.delete(id);
        res.status(201).json({message: 'Product deleted'});
    };
}

export default ProductController;