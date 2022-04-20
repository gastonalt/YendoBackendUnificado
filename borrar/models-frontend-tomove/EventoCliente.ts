import { Evento } from './Evento';

export class EventoCliente{

    idEventoCliente: number;
    Evento : Evento;
    Usuario : string;
    fechaHoraReserva : Date;
    activa : boolean;


	constructor($idEventoCliente: number, $Evento: Evento, $Usuario: string, $fechaHoraReserva: Date, $activa: boolean) {
		this.idEventoCliente = $idEventoCliente;
		this.Evento = $Evento;
		this.Usuario = $Usuario;
		this.fechaHoraReserva = $fechaHoraReserva;
		this.activa = $activa;
	}


}