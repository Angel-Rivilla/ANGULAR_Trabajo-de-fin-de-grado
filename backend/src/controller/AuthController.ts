import { getRepository } from "typeorm";
import {Request, Response} from 'express';
import {User} from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from "class-validator";


class AuthController {
    static login = async(req: Request, res: Response) =>{
        const {username, password} = req.body;

        if(!(username && password)){
            res.status(400).json({message: 'Username & Password are required!'});
        }

        const userRepository = getRepository(User);
        let user:User;

        try{
            user = await userRepository.findOneOrFail({where:{username}});
        } catch (err){
            return res.status(400).json({message:'Username or password incorrect!'});
        }

        if(!user.checkPassword(password)){
            return res.status(400).json({message:'Username or password are incorrect'});
        }
        
        const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret, { expiresIn: '1h'});
        const role = user.role;
        
        res.json({message: 'OK', token, role});
    };

    static changePassword = async (req: Request, res: Response) => {
        const {userId} = res.locals.jwtPayload;
        const {oldPassword, newPassword} = req.body;

        if(!(oldPassword && newPassword)){
            res.status(400).json({message:'Old password & new pasword are required'});
        }

        const userRepository = getRepository(User);
        let user:User;

        try{ 
            user = await userRepository.findOneOrFail(userId);
        } catch (err){
            res.status(400).json({message: 'Something goes wrong!'});
        }

        if(!user.checkPassword(oldPassword)){
            return res.status(401).json({message: 'Check your old Password'});
        }
        user.password = newPassword;
        const validationOps = { validationError: { target: false, value: false}};
        const errors = await validate(user, validationOps);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        user.hashPassword();
        userRepository.save(user);

        res.json({message: 'Password change!'});
    };


    static forgotPassword = async (req: Request, res: Response) => {
        const {username} = req.body;
        if(!(username)){
            return res.status(400).json({message:'Username is required!'});
        }

        const message = 'Check your email for a link to reset your password';
        let verificationLink;
        let emailStatus = 'OK';
        const userRepository = getRepository(User);

        let user: User;
        try{
            user = await userRepository.findOneOrFail({where: {username}});
            const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecretReset,{expiresIn: '10m'});
            verificationLink= `http://localhost:3000/new-password/${token}`;
            user.resetToken = token;
        } catch (error) {
            return res.json({message});
        }

        try{
            
        } catch (error){
            emailStatus = error;
            return res.status(400).json({message:'Something goes wrong'});
        }

        try{
            await userRepository.save(user);
        } catch (error){
            emailStatus = error;
            return res.status(400).json({message: 'Something goes wrong!'});
        }

        res.json({message, info: emailStatus, test: verificationLink});
    }

    static createNewPassword = async (req: Request, res: Response) => {
        const {newPassword} = req.body;
        const resetToken = req.headers.reset as string;

        if(!(resetToken && newPassword)){
            res.status(400).json({message: 'All the fields are required'});
        }

        const userRepository = getRepository(User);
        let jwtPayload;
        let user: User;

        try {
            jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
            user = await userRepository.findOneOrFail({where: {resetToken}});
        } catch (error) {
            return res.status(401).json({message:'Something goes wrong'});
        }
        user.password = newPassword;
        const validationOps={validationError: {target:false,value:false}};
        const errors = await validate(user,validationOps);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        try{
            user.hashPassword();
            await userRepository.save(user);
        } catch{
            return res.status(401).json({message: 'Something goes wrong'});
        }
        res.json({message: 'Password changed!'});
    }
}

export default AuthController;

