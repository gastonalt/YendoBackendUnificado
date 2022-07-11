// @ts-ignore
import express, { Request, Response } from 'express';
const bolicheAuth = require('./routes/boliche');
const clienteAuth = require('./routes/clienteAuth');
const boliche = require('./routes/boliche');
const reserva = require('./routes/reserva');
const evento = require('./routes/evento');
const auth = require('./routes/auth');
const persona = require('./routes/persona');
var cors = require('cors');
const app = express();
const PORT = 3000;
const sequelize = require("./models/index").sequelize;
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/api/persona', persona);
app.use('/api/boliche/auth', bolicheAuth);
app.use('/api/cliente/auth', clienteAuth);
app.use('/api/boliche', boliche);
app.use('/api/evento', evento);
app.use('/api/reserva', reserva);
app.use('/api/auth', auth);
app.use(express.static(__dirname + '/assets'));
app.use('/uploads/user-profile-pic', express.static( __dirname + '/uploads/user-profile-pic'));
app.use('/uploads/boliche-event-cover-pic', express.static( __dirname + '/uploads/boliche-event-cover-pic'));

sequelize.sync({force: false})

app.get('/',(req: Request, res: Response)=>{
    res.json('Backend funcionando');
});

app.listen(PORT, () => {
    console.log(`Aplicación escuchando en el puerto ${process.env.PORT || PORT}`);
})