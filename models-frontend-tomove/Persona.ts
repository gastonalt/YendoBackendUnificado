export class Persona{

    idPersona : number ;
    username : string ;
    nombres : string ;
    apellidos : string ;
    email : string ;
    password : string ;

	constructor($idPersona: number , $username: string , $nombres: string , $apellidos: string , $email: string , $password: string ) {
		this.idPersona = $idPersona;
		this.username = $username;
		this.nombres = $nombres;
		this.apellidos = $apellidos;
		this.email = $email;
		this.password = $password;
	}


}