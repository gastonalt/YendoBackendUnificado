import { Request, Response } from "express";

// CONFIG //

const app = require('express').Router();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
	cors: {
		origin: '*',
	}
});
const cors = require('cors');
const jsonParser = bodyParser.json();
const mysql = require("../mysql");
const PORT = 5000;

// FIN DE CONFIG //

app.use(cors());

app.get('/checkExistsUser/:uuid', (req : Request, res: Response)=>{
	mysql.query('SELECT * FROM users WHERE uuid = ?', [req.params.uuid], (error : any, results : any, fields : any)=>{
		if (error) throw error;
		res.send(results.length > 0);
	});
})

app.get('/getUser/:uuid', (req : Request, res: Response)=>{
	mysql.query('SELECT * FROM users WHERE uuid = ?', [req.params.uuid], (error : any, results : any, fields : any)=>{
		if (error) throw error;
		res.send(results[0]);
	});
})

app.post('/addUser', jsonParser,(req: Request, res: Response)=>{
	res.send(req.body);
	mysql.query('INSERT INTO users (email,uuid) VALUES (?, ?)', [req.body.email, req.body.uuid], (error : any, results : any, fields : any)=>{
		if (error) throw error;
		console.log('USUARIO INSERTADO EN NUESTRA CUSTOM DB');
	});
	//connection.end();
})

io.on('connection', (socket:any) => {
	console.log('Un usuario se ha conectado por socket: ' + socket.id);

	io.emit('conectado', "Usuario conectado");
});
server.listen(PORT,()=>{
	console.log(`Servidor con sockets corriendo en el puerto ${PORT}`)
});

module.exports = app;