<?php 

    include_once "db.php";

    class Sede{
        public static function crear($nombre, $ciudad, $direccion, $telefono){
            $db = DB::connect();
            $statement = $db->prepare(
                'INSERT INTO sede(nombre, ciudad, direccion, telefono) values (:nombre, :ciudad, :direccion, :telefono)'
            );
            $statement->bindParam('nombre', $nombre);
            $statement->bindParam('ciudad', $ciudad);
            $statement->bindParam('direccion', $direccion);
            $statement->bindParam('telefono', $telefono);
            $success = $statement->execute();
            
            // retorna el id de la tabla en caso de ser creado, 0 o -1 en caso de error
            if( $success )
                return $db->lastInsertId('codigo_sede'); 
            else
                return -1;
        }

        public static function obtenerTodo(){
            $db = DB::connect();
            $statement = $db->prepare(
                'SELECT codigo_sede, nombre, ciudad, direccion, telefono FROM sede'
            );
            $statement->execute();

            // retornar todo los datos existentes en la tabla, o un arreglo vacio en caso de no haber datos
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function obtener($codigo_sede){
            $db = DB::connect();
            $statement = $db->prepare(
                'SELECT codigo_sede, nombre, ciudad, direccion, telefono FROM sede WHERE codigo_sede=:codigo_sede'
            );
            $statement->bindParam('codigo_sede', $codigo_sede);
            $result = $statement->execute();

            // retornar la sede buscada, o un arreglo vacio en caso de no encontrarla
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }
    }

 ?>