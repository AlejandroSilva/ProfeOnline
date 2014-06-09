/*jshint multistr: true */  

Profeonline.module("Modulos.Comunes.Templates", function(Templates, Profeonline, Backbone, Marionette, $, _){

    Templates.cabeceraGenerica = '\
    <div class="navbar navbar-inverse " role="navigation"> \
        <div class="container"> \
            <div class="navbar-header"> \
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"> \
                <span class="sr-only">Toggle navigation</span> \
                <span class="icon-bar"></span> \
                <span class="icon-bar"></span> \
                <span class="icon-bar"></span> \
                </button> \
                <a class="navbar-brand" href="#">ProfeOnline</a> \
            </div> \
            <div class="collapse navbar-collapse"> \
                <ul class="nav navbar-nav"> \
                    <li><a href="#">Inicio</a></li> \
                    <li><a href="#">Buscar</a></li> \
                    <li><a href="#">Mis Asignaturas</a></li> \
                </ul> \
            </div><!--/.nav-collapse --> \
        </div> \
    </div> \
    ';

    Templates.inicio_temporal = '\
        <h1>Bienvenido</h1> \
        <br> \
        <h3>seleccione un link a visitar</h3> \
        <br><br> \
        <a href="#admin/sedes">Link 1</a> \
    ';

    Templates.mainLayout = ' \
        <div class="row margin-top-2"> \
            <!-- menu --> \
            <div id="menu-region" class="col-md-3"></div> \
            <!-- columna central --> \
            <div id="body-region" class="col-md-9"></div> \
        </div> \
    ';
});