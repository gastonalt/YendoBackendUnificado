import { Request, Response } from "express";
import { FieldInfo, MysqlError } from "mysql";
const pool = require("../mysql");
const api = require('express').Router();
var limit = 0;

api.get('/getAllReservas/:bolicheId',async (req: Request, res: Response)=>{
    pool.query('SELECT * FROM reservas WHERE boliche_id = ? GROUP BY fecha', [req.params.bolicheId] , async (error: MysqlError, results: any, fields: FieldInfo)=>{
        if (error) throw error;
        res.json(results);
    });
});

api.post('/get_reservas_especificas', async (req: Request, res: Response)=>{
    pool.query('SELECT * FROM reservas r RIGHT JOIN boliches b ON r.boliche_id = b.id LEFT JOIN users u ON r.reservado_por_id = u.id WHERE r.fecha = ? AND r.boliche_id = ?', [new Date(req.body.fecha), req.body.idBoliche], async (error: MysqlError, results: any, fields: FieldInfo)=>{
        if (error) throw error;
        res.json(await results);
    });
});

api.post('/count_fechas_reservas', async (req: Request, res: Response)=>{
    pool.query('SELECT COUNT(*) FROM reservas WHERE boliche_id = ? AND reservado_por_id IS NULL GROUP BY fecha', [req.body.idBoliche,new Date(req.body.fecha)] , async (error: MysqlError, results: any, fields: FieldInfo)=>{
        if (error) throw error;
        res.json(JSON.stringify(await results));
        console.log(results);
    });
});

api.post('/count_all_fechas_reservas', async (req: Request, res: Response)=>{
    pool.query('SELECT COUNT(*) FROM reservas WHERE boliche_id = ? GROUP BY fecha', [req.body.idBoliche,new Date(req.body.fecha)] , async (error: MysqlError, results: any, fields: FieldInfo)=>{
        if (error) throw error;
        res.json(JSON.stringify(await results));
        console.log(results);
    });
});

api.post('/cls/reservas', (req: Request, res: Response)=>{
    pool.query('UPDATE reservas SET reservado_por_id = NULL', (error: MysqlError, results: any, fields: FieldInfo)  => {
        if (error) throw error;
        res.json('Drop de los values rpi ejecutado correctamente');
})});


api.get('/fechas_reservas/:idBoliche', async (req: Request, res: Response)=>{
    pool.query('SELECT r.*, b.username FROM reservas as r LEFT JOIN boliches as b ON r.boliche_id = b.id WHERE b.id = ? GROUP BY r.fecha', [req.params.idBoliche] , async (error: MysqlError, results: any, fields: FieldInfo)=>{
        console.log(req.params.idBoliche);
        if (error) throw error;
        res.json(await results);
    });
});

api.post('/reservas/agregar',async (req: Request, res: Response)=>{
    let query = `INSERT INTO reservas (fecha,boliche_id) VALUES `;
    if(req.body.cantidad){
        limit = parseInt(req.body.cantidad);    
    }
    for (let index = 0; index < limit + 1; index++) {
        query = query.concat(`('${new Date(req.body.fecha).toISOString().slice(0, 19).replace('T', ' ')}', ${req.body.bolicheId}), `);
    }
    query = query.substring(0,query.length-2);
    pool.query(query, (error: MysqlError, results: any, fields: FieldInfo)  => {
        if (error) throw error;
        res.json({response: 'Reservas insertadas correctamente.'});
    });
});

api.post('/get_mis_reserva', async (req: Request, res: Response)=>{
    pool.query('SELECT * FROM reservas r JOIN boliches b ON r.boliche_id = b.id WHERE r.reservado_por_id = ?', [req.body.idUser] , async (error: MysqlError, results: any, fields: FieldInfo)=>{
        if (error) throw error;
        res.json(await results);
    });
});

api.post('/reservar', (req: Request, res: Response)=>{
    pool.query('UPDATE reservas SET reservado_por_id = ? WHERE reservado_por_id IS NULL AND boliche_id = ? AND fecha = ? LIMIT 1',[req.body.idUser, req.body.idBoliche, new Date(req.body.fecha)], (error: MysqlError, results: any, fields: FieldInfo)  => {
        if (error) throw error;
        res.json('Reservado correctamente');
})});

module.exports = api;