import { Request, Response } from "express";
const api = require('express').Router();
const verify = require("./verifyToken");
const Persona = require("../models").Persona;

api.get('/getData', verify, async (req: any, res: Response)=>{
    const persona = await Persona.findOne({where: {
        idPersona: req.user.id
    }})
    res.send(persona)
})

module.exports = api;