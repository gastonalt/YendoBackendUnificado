import { Boliche } from './Boliche';

export class Evento{
    
    idEvento : number;
    fechaHora : Date;
    titulo : string;
    coverImg : string;
    descripcion : string;
    Boliche : Boliche;
	cantidadTotal : number;
	cantidadDisponible : number;

	constructor($idEvento: number, $fechaHora: Date, $titulo: string, $coverImg: string, $descripcion: string, $Boliche: Boliche, $cantidadTotal : number, $cantidadDisponible : number) {
		this.idEvento = $idEvento;
		this.fechaHora = $fechaHora;
		this.titulo = $titulo;
		this.coverImg = $coverImg;
		this.descripcion = $descripcion;
		this.Boliche = $Boliche;
		this.cantidadTotal = $cantidadTotal;
		this.cantidadDisponible = $cantidadDisponible;
	}
    
}