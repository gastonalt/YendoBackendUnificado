import { Request, Response } from "express";
const api = require('express').Router();
const verify = require("./verifyToken");
const Persona = require("../models").Persona;
const multer = require('multer');
const bodyParser = require('body-parser');

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({
    extended: false
}));

api.get('/getData', verify, async (req: any, res: Response)=>{
    const persona = await Persona.findOne({where: {
        idPersona: req.user.id
    }})
    res.send(persona)
    
}) 
  // File upload settings  
const PATH = './uploads/user-profile-pic';
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

api.post('/profileImage', verify, upload.single('image'), async(req: any, res:Response)=>{
    if (!req.file) {
    console.log("No file is available!");
    return res.send({
        success: false
    });
    } else {
        Persona.update(
            {imgURL : 'http://localhost:3000/' + req.file.path.toString()},
            { where: { idPersona: req.user.id } }
        ).then(
            res.send('http://localhost:3000/' + req.file.path.toString())
        )
    }
})

module.exports = api;