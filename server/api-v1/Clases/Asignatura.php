    <?php 

    include_once "db.php";

    class Asignatura{
        private static $LARGO_MINIMO = 2;

        public static function crear($codigo_carrera, $nombre, $anno){
            if( strlen($nombre)<self::$LARGO_MINIMO)
                return -2;

            $db = DB::connect();
            $statement = $db->prepare(
                'INSERT into Asignatura(codigo_carrera, nombre, anno) values (:codigo_carrera, :nombre, :anno)'
            );
            $statement->bindParam('codigo_carrera', $codigo_carrera);
            $statement->bindParam('nombre', $nombre);
            $statement->bindParam('anno', $anno);
            $success = $statement->execute();
            
            // retorna el id de la tabla en caso de ser creado, 0 o -1 en caso de error
            if( $success )
                return $db->lastInsertId('codigo_asignatura');
            else
                return -1;
        }

        public static function obtenerTodo(){
            $db = DB::connect();
            $statement = $db->prepare(
                'SELECT a.codigo_asignatura, a.codigo_carrera, c.nombre as nombre_carrera, a.nombre, a.anno from asignatura a JOIN carrera c ON a.codigo_carrera=c.codigo_carrera'
            );
            $statement->execute();

            // retornar todo los datos existentes en la tabla, o un arreglo vacio en caso de no haber datos
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function obtenerTodoDeCarrera($codigo_carrera){
            $db = DB::connect();
            $statement = $db->prepare(
                'SELECT a.codigo_asignatura, a.codigo_carrera, c.nombre AS nombre_carrera, a.nombre, a.anno FROM asignatura a JOIN carrera c ON a.codigo_carrera=c.codigo_carrera WHERE a.codigo_carrera=:codigo_carrera'
            );
            $statement->bindParam('codigo_carrera', $codigo_carrera);
            $statement->execute();

            // retornar todo los datos existentes en la tabla, o un arreglo vacio en caso de no haber datos
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }

        public static function obtener($codigo_asignatura){
            $db = DB::connect();
            $statement = $db->prepare(
                'SELECT a.codigo_asignatura, a.codigo_carrera, c.nombre AS nombre_carrera, a.nombre, a.anno FROM asignatura a JOIN carrera c ON a.codigo_carrera=c.codigo_carrera WHERE a.codigo_asignatura=:codigo_asignatura'
            );
            $statement->bindParam('codigo_asignatura', $codigo_asignatura);
            $result = $statement->execute();

            // retornar la Asignatura buscada, o un arreglo vacio en caso de no encontrarla
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }
    }

 ?>