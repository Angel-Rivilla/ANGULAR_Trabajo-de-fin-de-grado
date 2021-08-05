import { getRepository } from "typeorm";
import {Request, Response} from 'express';
import {User} from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';
import { transporter } from './../config/mailer';


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
        const refreshToken = jwt.sign({userId: user.id, username: user.username}, config.jwtSecretRefresh, { expiresIn: '1h'});
        const role = user.role;
        
        user.refreshToken = refreshToken;
        try{
            await userRepository.save(user);
        } catch (error){
            return res.status(400).json({message:'something goes wrong'});
        }
        res.json({message: 'OK', token, role, refreshToken});
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
            verificationLink= `http://localhost:4200/new-password/${token}`;
            user.resetToken = token;
        } catch (error) {
            return res.json({message});
        }

        try{
            await transporter.sendMail({
                from: '"Forgot password 👻" <angelrivillaarre@gmail.com>', // sender address
                to: user.username, // list of receivers
                subject: "Forgot password ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `
                    <b>Please click on the following link, or paste this into your browser to complete the process:</b>
                    <a href="${verificationLink}">${verificationLink}</a>
                `, // html body
              });
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

        res.json({message, info: emailStatus,user});
    }

    static createNewPassword = async (req: Request, res: Response) => {
        const {newPassword} = req.body;
        const resetToken = req.headers.reset as string;

        if(!(newPassword)){
            res.status(400).json({message: 'Password is required'});
        }

        if(!(resetToken)){
            res.status(400).json({message: 'Token is required'});
        }

        const userRepository = getRepository(User);
        let jwtPayload;
        let user: User;

        try {
            jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
            user = await userRepository.findOneOrFail({where: {resetToken}});
        } catch (error) {
            return res.status(401).json({message:'Something goes wrong1'});
        }
        user.password = newPassword;
        const validationOps={validationError: {target:false, value:false}};
        const errors = await validate(user,validationOps);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        try{
            user.hashPassword();
            await userRepository.save(user);
        } catch{
            return res.status(401).json({message: 'Something goes wrong2'});
        }
        res.json({message: 'Password changed!'});
    }

    static refreshToken = async (req: Request, res: Response) => {
        const refreshToken = req.headers.refresh as string;
        if(!(refreshToken)){
            res.status(400).json({message: 'Something goes wrong!'});
        }

        const userRepository = getRepository(User);
        let user: User;

        try{
            const verifyResult = jwt.verify(refreshToken, config.jwtSecretRefresh);
            const {username} = verifyResult as User;
            user = await userRepository.findOneOrFail({where: {username}});

        } catch (error) {
            return res.status(400).json({message:'Something is wrong!'});
        }
        
        const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret, {expiresIn:'1h'});
        res.json({message: 'OK', token});
    }
}

export default AuthController;

