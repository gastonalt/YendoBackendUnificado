import express, { Request, Response } from 'express';
const bolicheAuth = require('./routes/boliche');
const clienteAuth = require('./routes/clienteAuth');
const boliche = require('./routes/boliche');
const reserva = require('./routes/reserva');
var cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/api/boliche/auth', bolicheAuth);
app.use('/api/cliente/auth', clienteAuth);
app.use('/api/boliche', boliche);
app.use('/api/reserva', reserva);

app.get('/',(req: Request, res: Response)=>{
    res.json('Backend funcionando');
});

app.listen(PORT, () => {
    console.log(`Aplicación escuchando en el puerto ${PORT || 5000}`);
})