import { Request, Response } from "express";
import { FieldInfo, MysqlError } from "mysql";
const mysql = require("../mysql");
const bcrypt = require('bcrypt');
const api = require('express').Router();
const sequelize = require ("../sequelize/config");

/* sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch((err:any) => {
        console.log('No se conecto')
    }) */

api.post('/getUserInfo', (req: Request, res: Response)=>{
    mysql.query('SELECT id, username, direccion, biografia FROM boliches WHERE password = ?', [req.body.token], async (error: MysqlError, results: any, fields: FieldInfo)=>{
        if (error) throw error;
        res.json(await results[0]);
    });
});

api.put('/modificar', (req: Request, res: Response)=>{
    mysql.query('UPDATE boliches SET username = ?, direccion = ?, biografia = ? WHERE password = ?',[req.body.username,req.body.direccion,req.body.biografia,req.body.token], (error: MysqlError, results: any, fields: FieldInfo)  => {
        if (error) throw error;
        res.json({username: req.body.username,direccion: req.body.direccion, biografia: req.body.biografia});
    })
})

api.post('/register', async (req: Request, res: Response) => {
    try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
        username: req.body.username,
        password: hashedPassword,
        direccion: req.body.direccion,
        biografia: req.body.biografia
    };
    mysql.query('SELECT * FROM boliches WHERE username = ?',[req.body.username],async function (error: MysqlError, results: any, fields: FieldInfo) {
        if (error) throw error;
        const userRepetido : any = await results[0]
        if(userRepetido == null){
            mysql.query('INSERT INTO boliches (username,password,direccion,biografia) VALUES (?, ?, ?, ?)',[user.username,user.password,user.direccion,user.biografia], function (error: MysqlError, results: any, fields: FieldInfo) {
                if (error) throw error;
                res.json(true);
            });
        }else{
            res.json(false);
        }
    })} catch (err:any) {
        throw new Error(err);
    }
})

api.post('/login', async (req: Request, res: Response) => {
    mysql.query('SELECT * FROM boliches WHERE username = ?',[req.body.username],async function (error: MysqlError, results: any, fields: FieldInfo) {
        if (error) throw error;
        const user : any = await results[0]
        if(user == null){
            return res.status(200).json('Usuario no encontrado');
        }
        try{
            console.log(user)
            if(await bcrypt.compare(req.body.password, user.password)){
                res.status(200).json(user);
            }else{
                res.status(500).send('Error');
            }
        } catch {
            res.status(500).send();
        }
    });
})

module.exports = api;