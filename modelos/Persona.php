<?php
//Incluimos inicialmente la conexion a la base de datos
require "../config/Conexion.php";

Class Persona{
	//Implementamos nuestro constructor
	public function __construct()
	{

	}

	//Implementamos un método para insertar registros
	public function insertar($tipo_persona,$nombre,$tipo_documento,$num_documento,$direccion,$telefono,$email)
	{
		$sql="INSERT INTO persona (tipo_persona,nombre,tipo_documento,num_documento, direccion,telefono,email,condicion)
		VALUES ('$tipo_persona','$nombre','$tipo_documento','$num_documento','$direccion','$telefono','$email','1')";
		return ejecutarConsulta($sql);
	}

	//Implementamos un método  para editar registros
	public function editar($idpersona,$tipo_persona,$nombre,$tipo_documento,$num_documento,$direccion,$telefono,$email){
		$sql="UPDATE persona SET tipo_persona='$tipo_persona',nombre='$nombre',tipo_documento='$tipo_documento',num_documento='$num_documento', direccion='$direccion',telefono='$telefono',email='$email'
        WHERE idpersona='$idpersona'";
		return ejecutarConsulta($sql);
	}

	//Implementamos un método para desactivar categorías
	public function desactivar($idpersona){
		$sql="UPDATE persona SET condicion = '0' WHERE idpersona='$idpersona'";
		return ejecutarConsulta($sql);
	}

	//Implementamos un método para activar categorías
	public function activar($idpersona){
		$sql="UPDATE persona SET condicion = '1' WHERE idpersona='$idpersona'";
		return ejecutarConsulta($sql);
	}

	//Implementamos un método  para mostrar los datos de un registro a modificar
	public function mostrar($idpersona){
		$sql="SELECT * FROM persona WHERE idpersona='$idpersona'";
		return ejecutarConsultaSimpleFila($sql);
	}

	//Implementamos un método para listar los registros
	public function listarp()
	{
		$sql="SELECT * FROM persona WHERE tipo_persona='Proveedor'";
		return ejecutarConsulta($sql);
	}
    
	//Implementamos un método para listar los registros
	public function listarc()
	{
		$sql="SELECT * FROM persona WHERE tipo_persona='Cliente'";
		return ejecutarConsulta($sql);
    }
}
 ?>
