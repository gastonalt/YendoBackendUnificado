import { Request, Response } from "express";
const multer = require('multer');
const api = require('express').Router();
const verify = require("./verifyToken");
const Evento = require("../models").Evento;

// File upload settings  
const PATH = './uploads/boliche-event-cover-pic';
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

api.post('/coverImage', verify, upload.single('image'), async(req: any, res:Response)=>{
    if (!req.file) {
    console.log("No file is available!");
    return res.send('http://localhost:3000/default-cover-picture.jpg');
    } else {
            res.send('http://localhost:3000/' + req.file.path.toString())
    }
})

///

api.post('/crearEvento', verify, async (req: Request, res: Response)=>{
    Evento.create({
        FechaHora: req.body.fechaHora,
        titulo: req.body.titulo,
        coverImg: req.body.coverImg ,
        descripcion: req.body.descripcion,
        cantidadTotal: req.body.cantidadTotal,
        cantidadDisponible: req.body.cantidadTotal
    })
})

module.exports = api;