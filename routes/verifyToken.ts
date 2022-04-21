import {NextFunction, Response} from "express";

const jwt = require('jsonwebtoken');

module.exports = function (req: any, res: Response, next: NextFunction){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Acceso prohibido.');

    try{
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    }catch (err){
        res.status(400).send('Token inválido.');
    }
}