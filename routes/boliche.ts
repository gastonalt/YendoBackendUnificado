import { Request, Response } from "express";
import { MysqlError, FieldInfo } from 'mysql';
import {Op} from "sequelize";
const {registerBolicheValidation, loginBolicheValidation} = require("./Auth.validation");
const mysql = require("../mysql");
const api = require('express').Router();
const Boliche = require("../models").Boliche;
const verify = require("./verifyToken");
const jwt = require('jsonwebtoken');
const Persona = require("../models").Persona;
const bcript = require("bcrypt");
const multer = require('multer');

//REGISTRAR
api.post('/register', async (req: Request, res: Response)=>{
    const {error} = registerBolicheValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checkear si el Username/Email existen
    const BolicheExiste = Persona.findOne({
        where: {
            email: req.body.email
        }
    })

    if(await BolicheExiste !== null) return res.status(400).send({mensaje: "El mail y/o nombre de usuario ya existe."});

    // Hash la contraseña
    const salt = await bcript.genSalt(10);
    const hashPassword = await bcript.hash(req.body.password,salt);

    Boliche.create({
        email: req.body.email,
        password: hashPassword,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        descripcion: req.body.descripcion,
        profilePic: 'http://localhost:3000/default-boliche-picture.jpg',
        coverPic: 'http://localhost:3000/default-cover-picture.jpg',
    },
/*     {
        include: Cliente
    } */
    )
    //

    res.status(200).send({mensaje: 'Exito'});

});

//LOGIN
api.post('/login', async (req: Request, res: Response)=>{
    const {error} = loginBolicheValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checkear si el Username/Email existen
    const BolicheExiste = await Boliche.findOne({
        where: {
            email: req.body.email
        }
    })
    if(!BolicheExiste) return res.status(400).send("Email y/o contraseña incorrecto.");

    // Verificar contraseña
    const validPassword = await bcript.compare(req.body.password,BolicheExiste.password);
    if(!validPassword) return res.status(400).send("Email y/o contraseña incorrecto.");

    // Crear y asignar un token
    const token = jwt.sign({id: BolicheExiste.idBoliche},process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token});

});

api.get('/getInfo', verify, async (req: any, res: Response)=>{
    const boliche = await Boliche.findOne({where: {
        idBoliche: req.user.id
    }})
    res.send(boliche)
});

api.put('/updateBoliche', verify, async (req: any, res: Response)=>{
    let bolicheModificado = await Boliche.update({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        direccion: req.body.direccion,
        profilePic: req.body.profilePic,
        coverPic: req.body.coverPic,
        },{ where: { idBoliche: req.body.idBoliche } }
        )
    let bolicheModificadoCurrentState = await Boliche.findOne({where: {
        idBoliche: req.body.idBoliche
    }})
    res.send(bolicheModificadoCurrentState); 
});

api.get('/boliches', verify, async (req: any, res: Response)=>{
    //const boliches = Boliche.findAll();
    //console.log(req.user)

    //ASÍ HACEMOS QUE LEA USERS A PARTIR DE UN TOKEN =D
    const boliches = await Boliche.findAll()
    res.send(boliches)
    /* mysql.query('SELECT username,direccion,biografia FROM boliches', async (error: any, results: any, fields: any)=>{
        if (error) throw error;
        res.json(await results);
    }) */
})

api.get('/boliches_con_reservas', async (req: Request, res: Response)=>{
    mysql.query('SELECT * FROM reservas r JOIN boliches b ON r.boliche_id = b.id GROUP BY r.boliche_id', async (error: MysqlError, results: any, fields: FieldInfo)=>{
        if (error) throw error;
        res.json(await results);
        // res.json(await results);
    });
});

// File upload settings para el COVERPIC
const PATHCOVER = './uploads/boliche-cover-pic';
let storageCover = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
    cb(null, PATHCOVER);
    },
    filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split("/")[1])
    }
});
let uploadCover = multer({
    storage: storageCover
});

api.post('/coverImage', verify, uploadCover.single('image'), async(req: any, res:Response)=>{
    if (!req.file) {
    console.log("No file is available!");
    return res.send('http://localhost:3000/default-cover-picture.jpg');
    } else {
            res.send('http://localhost:3000/' + req.file.path.toString())
    }
})

///

// File upload settings  
const PATH = './uploads/boliche-profile-pic';
let storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
    cb(null, PATH);
    },
    filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split("/")[1])
    }
});
let upload = multer({
    storage: storage
});

api.post('/profilePicImage', verify, upload.single('image'), async(req: any, res:Response)=>{
    if (!req.file) {
    console.log("No file is available!");
    return res.send('http://localhost:3000/default-cover-picture.jpg');
    } else {
            res.send('http://localhost:3000/' + req.file.path.toString())
    }
})

///

module.exports = api;