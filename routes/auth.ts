import {Op} from "sequelize";

const jwt = require('jsonwebtoken');
const router = require('express').Router();
import { Request, Response } from 'express';
const Persona = require("../models").Persona;
// const Cliente = require("../models").Cliente;
const {registerValidation, loginValidation} = require("./Auth.validation");
const bcript = require("bcrypt");

//REGISTRAR
router.post('/register', async (req: Request, res: Response)=>{
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checkear si el Username/Email existen
    const PersonaExiste = Persona.findOne({
        where: {
            [Op.or]: [{email: req.body.email}, {username: req.body.username}]
        }
    })

    if(await PersonaExiste !== null) return res.status(400).send("El mail y/o nombre de usuario ya existe.");

    // Hash la contraseña
    const salt = await bcript.genSalt(10);
    const hashPassword = await bcript.hash(req.body.password,salt);

    Persona.create({
        username: req.body.username,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: hashPassword,
    },
/*     {
        include: Cliente
    } */
    )
    //

    res.send('Exito');

});

router.put('new-password', async (req:Request, res:Response)=>{
    const {newPassword} = req.body;
    const resetToken = req.headers['reset'] as string;
    if(!(resetToken && newPassword)){
        res.status(400).send('Todos los campos son requeridos');
    }

    let usuarioDB = await Persona.findOne({where: {resetToken}});
    let jwtPayload;

    if(!usuarioDB){
        res.status(401).send('Algo salió mal.');
    }

    // jwtPayload = jwt.verify(resetToken, process.env.TOKEN_SECRET);

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        // Hash la contraseña
        const salt = await bcript.genSalt(10);
        const hashPassword = await bcript.hash(req.body.password,salt);
        usuarioDB.password = hashPassword;
        Persona.save(usuarioDB);
    }catch (e) {
        res.status(401).send('Algo salió mal.');
    }

    res.send('Se cambió la contraseña');

});

router.put('forgot-password', async (req:Request, res:Response)=>{
    const {username} = req.body
    if(!(username)) {
        res.status(400).send('El usuario es requerido.');
    }
    const message = 'Chequeá tu mail para encontrar un link para reiniciar el password.';
    let verificationLink;
    let emailStatus = "Ok";

    let usuarioDB = await Persona.findOne({where: {username}});
    if(usuarioDB){
        const token = jwt.sign({idPersona: usuarioDB.idPersona, username: usuarioDB.username},
            process.env.TOKEN_SECRET,
            {
                expiresIn: '40m',
            });
        verificationLink = `http://localhost:3000/api/auth/new-password/${token}`;
        usuarioDB.resetToken = token;
    }else{
        res.status(400).send('Error');
    }
    // Enviar mail

    // https://www.youtube.com/watch?v=KjheexBLY4A&ab_channel=DominiCode

    try{

    }catch (e) {
        emailStatus = e;
        res.status(400).send('Algo no fue bien');
    }


    try{
       await Persona.save(usuarioDB);
    }catch (e) {
        emailStatus = e;
        res.status(400).send('Algo salió mal.');
    }

    res.json({message, info: emailStatus, verificationLink});


})

//LOGIN
router.post('/login', async (req: Request, res: Response)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checkear si el Username/Email existen
    const PersonaExiste = await Persona.findOne({
        where: {
            email: req.body.email
        }
    })
    if(!PersonaExiste) return res.status(400).send("Email y/o contraseña incorrecto.");

    // Verificar contraseña
    const validPassword = await bcript.compare(req.body.password,PersonaExiste.password);
    if(!validPassword) return res.status(400).send("Email y/o contraseña incorrecto.");

    // Crear y asignar un token
    const token = jwt.sign({id: PersonaExiste.id},process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

})

module.exports = router;