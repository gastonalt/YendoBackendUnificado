export class Boliche{
    
    idBoliche : number;
    nombre : string;
    descripcion : string;
    direccion : string;
    profilePic : string;
    coverPic : string;
    passwordBoliche : string;

	constructor($idBoliche: number, $nombre: string, $descripcion: string, $direccion: string, $profilePic: string, $coverPic: string, $passwordBoliche: string) {
		this.idBoliche = $idBoliche;
		this.nombre = $nombre;
		this.descripcion = $descripcion;
		this.direccion = $direccion;
		this.profilePic = $profilePic;
		this.coverPic = $coverPic;
		this.passwordBoliche = $passwordBoliche;
	}

}