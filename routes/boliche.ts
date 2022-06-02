import { Request, Response } from "express";
import { MysqlError, FieldInfo } from 'mysql';
const mysql = require("../mysql");
const api = require('express').Router();
const Boliche = require("../models").Boliche;
const verify = require("./verifyToken");
const jwt = require('jsonwebtoken');
const Persona = require("../models").Persona;

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

module.exports = api;