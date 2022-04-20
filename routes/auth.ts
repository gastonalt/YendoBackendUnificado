import {Op} from "sequelize";

const router = require('express').Router();
import { Request, Response } from 'express';
const Persona = require("../models").Persona;
const Cliente = require("../models").Cliente;
const {registerValidation, loginValidation} = require("./Auth.validation");

router.post('/register', (req: Request, res: Response)=>{
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checkear si el Username/Email existen
    const PersonaExiste = Persona.findOne({
        where: {
            [Op.or]: [{email: req.body.email}, {username: req.body.username}]
        }
    })

    if(PersonaExiste) return res.status(400).send("El mail y/o nombre de usuario ya existe.");

    Persona.create({
        username: req.body.username,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.password,
        Cliente: req.body.cliente
    },{
        include: Cliente
    })
    //
})

router.post('/login', (req: Request, res: Response)=>{
    res.send('Login');
})

module.exports = router;