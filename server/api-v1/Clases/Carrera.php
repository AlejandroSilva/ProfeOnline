<?php 

    include_once "db.php";

    class Carrera{
        private static $LARGO_MINIMO = 2;

        public static function crear($codigo_sede, $nombre, $titulo, $jornada){
            if( strlen($nombre)<self::$LARGO_MINIMO || strlen($titulo)<self::$LARGO_MINIMO || strlen($jornada)<self::$LARGO_MINIMO)
                return -2;

            $db = DB::connect();
            $statement = $db->prepare(
                'INSERT into carrera(codigo_sede, nombre, titulo, jornada) values (:codigo_sede, :nombre, :titulo, :jornada)'
            );
            $statement->bindParam('codigo_sede', $codigo_sede);
            $statement->bindParam('nombre', $nombre);
            $statement->bindParam('titulo', $titulo);
            $statement->bindParam('jornada', $jornada);
            $success = $statement->execute();
            
            // retorna el id de la tabla en caso de ser creado, 0 o -1 en caso de error
            if( $success )
                return $db->lastInsertId('codigo_carrera'); 
            else
                return -1;
        }

        public static function obtenerTodo(){
            $db = DB::connect();
            $statement = $db->prepare(
                'SELECT c.codigo_carrera, c.codigo_sede, s.nombre as nombre_sede, c.nombre, c.titulo, c.jornada FROM carrera c JOIN sede s ON c.codigo_sede=s.codigo_sede'
            );
            $statement->execute();

            // retornar todo los datos existentes en la tabla, o un arreglo vacio en caso de no haber datos
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function obtener($codigo_carrera){
            $db = DB::connect();
            $statement = $db->prepare(
                'SELECT c.codigo_carrera, c.codigo_sede, s.nombre as nombre_sede, c.nombre, c.titulo, c.jornada FROM carrera c JOIN sede s ON c.codigo_sede=s.codigo_sede WHERE c.codigo_carrera=:codigo_carrera'
            );
            $statement->bindParam('codigo_carrera', $codigo_carrera);
            $result = $statement->execute();

            // retornar la carrera buscada, o un arreglo vacio en caso de no encontrarla
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }
    }

 ?>