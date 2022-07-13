import { Request, Response } from "express";
const multer = require('multer');
const api = require('express').Router();
const verify = require("./verifyToken");
const Evento = require("../models").Evento;
const Boliche = require("../models").Boliche;
import {Op} from "sequelize";

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

api.post('/crearEvento', verify, async (req: any, res: Response)=>{
    Evento.create({
        FechaHora: req.body.FechaHora,
        titulo: req.body.titulo,
        coverImg: req.body.coverImg ,
        descripcion: req.body.descripcion,
        cantidadTotal: req.body.cantidadTotal,
        cantidadDisponible: req.body.cantidadTotal,
        BolicheIdBoliche: req.user.id,
    },{
        include: Boliche
    })
})

api.put('/updateEvento', verify, async (req: any, res: Response)=>{
    Evento.update({
        FechaHora: req.body.FechaHora,
        titulo: req.body.titulo,
        coverImg: req.body.coverImg ,
        descripcion: req.body.descripcion,
        cantidadTotal: req.body.cantidadTotal
        },{ where: { idEvento: req.body.idEvento } }
        )
});

api.get('/getEventos', verify, async (req: any, res: Response)=>{
    let eventos = Evento.findAll({where: { BolicheIdBoliche: req.user.id } })
    .then((value:any)=>res.send(value))
})


api.get('/getEventosFrontEnd', verify, async (req: any, res: Response)=>{
    let eventos = await Evento.findAll({ include: Boliche })
    res.send(eventos);
})

api.get('/getEventosFrontEnd/:id', verify, async (req: any, res: Response)=>{
    let eventos = await Evento.findAll({where: { BolicheIdBoliche: req.params.id } })
    res.send(eventos);
})

api.get('/search/:criteria', verify, async (req: any, res: Response)=>{
    let eventos = await Evento.findAll({
        where: {
            [Op.or]: [
                {titulo: {[Op.like]: `%${req.params.criteria}%`}},
                {descripcion: {[Op.like]: `%${req.params.criteria}%`}},
            ]
        },
        include: Boliche}
    )
    res.send(eventos);
})

api.delete('/deleteEvento/:id', verify, async (req: any, res: Response)=>{
    Evento.destroy({
        where: {
            IdEvento: req.params.id
        }
    })
})

module.exports = api;