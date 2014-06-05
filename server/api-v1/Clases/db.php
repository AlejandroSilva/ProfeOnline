<?php

    class DB{
        public static $host   = "localhost";
        public static $dbname = "profe_online";
        public static $dbuser = "root";
        public static $dbpass = "pass";

        public static function connect(){
            return new PDO("mysql:host=".self::$host.";dbname=".self::$dbname.";charset=utf8", self::$dbuser, self::$dbpass);
        }
    }

?>