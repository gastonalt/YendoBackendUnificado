import { Persona } from './Persona';
import { TipoDni } from './TipoDni.enum';

export class Cliente extends Persona {

	fechaNacimiento: Date;
	tipoDni: TipoDni;
	numeroDni: number;

	constructor($idPersona: number, $username: string, $nombres: string, $apellidos: string, $email: string, $password: string, $fechaNacimiento: Date, $tipoDni: TipoDni, $numeroDni: number) {
		super($idPersona, $username, $nombres, $apellidos, $email, $password);
		this.fechaNacimiento = $fechaNacimiento;
		this.tipoDni = $tipoDni;
		this.numeroDni = $numeroDni;
	}


}