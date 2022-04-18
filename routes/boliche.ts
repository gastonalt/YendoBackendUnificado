import { Request, Response } from "express";
import { MysqlError, FieldInfo } from 'mysql';
const mysql = require("../mysql");
const api = require('express').Router();
const sequelize = require('../sequelize/config');

sequelize.sync({force:false}).then(()=>{
    console.log('Conectado')
})

api.get('/boliches', async (req: Request, res: Response)=>{
    const boliches = await models.boliches.findAll();
/*     mysql.query('SELECT username, direccion, biografia FROM boliches', async (error: any, results: any, fields: any)=>{
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