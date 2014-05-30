<?php
/**
 * Step 1: Require the Slim Framework
 */
require 'Slim/Slim.php';
require_once 'Clases/Sede.php';
require_once 'Clases/Carrera.php';
require_once 'Clases/Asignatura.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();
// todas las respuestas son json
$app->response->headers->set('Content-Type', 'application/json');

/**
 * Step 3: Define the Slim application routes
 *   GET route        $app->get('/', function (){...});
 *   POST route       $app->post('/post', function(){...});
 *   PUT route        $app->put('/put', function(){...});
 *   PATCH route      $app->patch('/patch', function(){...});
 *   DELETE route     $app->delete('/delete', function(){...});
 */

// Ruta al "home" de la api
$app->get('/', function (){
    echo "esta url corresponde a la API de la aplicacion";
});

/***************
 *    SEDE     *
 ***************/
// Obtener todas las Sedes
$app->get('/sede/', function(){
    echo json_encode( Sede::obtenerTodo() );
});

// Obtener los datos de una sola Sede
$app->get('/sede/:codigo_sede', function($codigo_sede){
    echo json_encode( Sede::obtener($codigo_sede) );
});

// Crear una Sede
$app->post('/sede/', function() use ($app){
    $nombre    = $app->request->post('nombre');
    $ciudad    = $app->request->post('ciudad');
    $direccion = $app->request->post('direccion');
    $telefono  = $app->request->post('telefono');
    
    $nuevo_id = Sede::crear($nombre, $ciudad, $direccion, $telefono);
    if( $nuevo_id>0 )
        echo json_encode( Sede::obtener($nuevo_id) );
    else{
        $app->response->status(400);    // Bad Request
        echo json_encode( "no se pudo crear la sede" );
    }
});

/***************
 *   CARRERA   *
 ***************/
// Crear una carrera en una sede en particular
$app->post('/carrera/', function() use ($app){
    $codigo_sede  = $app->request->post('codigo_sede');
    $nombre       = $app->request->post('nombre');
    $titulo       = $app->request->post('titulo');
    $jornada      = $app->request->post('jornada');
    
    // TODO: validar el codigo de sede
    $nuevo_id = Carrera::crear($codigo_sede, $nombre, $titulo, $jornada);
    if( $nuevo_id>0 )
        echo json_encode( Carrera::obtener($nuevo_id) );
    else{
        $app->response->status(400);    // Bad Request
        echo json_encode( "no se pudo crear la carrera" );
    }
});

// Obtener todas las carreras
$app->get('/carrera/', function(){
    echo json_encode( Carrera::obtenerTodo() );
});

// TODO: Obtener todas las Carreras de una Sede

// Obtener los datos de una carrera
$app->get('/carrera/:codigo_carrera', function($codigo_carrera){
    echo json_encode( Carrera::obtener($codigo_carrera) );
});

// Obtener las asignaturas de una carrera
$app->get('/carrera/:codigo_carrera/asignatura', function($codigo_carrera){
    // TODO: validar el codigo de carrera
    echo json_encode( Asignatura::obtenerTodoDeCarrera($codigo_carrera) );
});

/***************
 *  ASIGNATURA *
 ***************/
// Crear una Asignatura
$app->post('/asignatura/', function() use ($app){
    $codigo_carrera = $app->request->post('codigo_carrera');
    $nombre    = $app->request->post('nombre');
    $anno = $app->request->post('anno');
    
    // TODO: validar el codigo carrera
    // TODO: validar el año
    $nuevo_id = Asignatura::crear($codigo_carrera, $nombre, $anno);
    if( $nuevo_id>0 )
        echo json_encode( Asignatura::obtener($nuevo_id) );
    else{
        $app->response->status(400);    // Bad Request
        echo json_encode("no se pudo crear la Asignatura");
    }
});

// Obtener todas las Asignaturas del sistema
$app->get('/asignatura/', function(){
    echo json_encode( Asignatura::obtenerTodo() );
});

// Obtener los datos de una Asignatura
$app->get('/asignatura/:codigo_asignatura', function($codigo_asignatura){
    echo json_encode( Asignatura::obtener($codigo_asignatura));
});

// TODO: obtener las suscripciones de una asignatura
$app->get('/asignatura/:codigo_asignatura/suscripciones', function(){
    echo "por implementar...";
});

/***************
 *   USUARIO   *
 ***************/

/***************
 * SUSCRIPCION *
 ***************/

/***************
 * PUBLICACION *
 ***************/

/***************
 *  DOCUMENTO  *
 ***************/

/**********************
 * ESTADO_PUBLICACION *
 **********************/


/**
 * Observaciones de la BD y la API:
 * Las tablas TipoUsuario y TipoSuscripcion no seran accesibles por la API, sus
 * datos son "estaticos", y estos se deben crear directamente en el DBMS.
 */



/**
 * Step 4: Run the Slim application
 */
$app->run();
