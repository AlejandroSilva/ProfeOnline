/*jshint multistr: true */  

Profeonline.module('Modulos.Admin.Templates', function(Templates, Profeonline, Backbone, Marionette, $, _){

    Templates.MenuLateral = ' \
        <h3>Administración</h3> \
        <ul class="nav nav-pills nav-stacked"> \
            <li><a href="#admin/asignaturas">Asignaturas</a></li> \
            <li><a href="#admin/carreras">Carreras</a></li> \
            <li><a href="#admin/sedes">Sedes</a></li> \
        </ul> \
    ';

    Templates.Sede = ' \
        <td><%= codigo_sede %></td> \
        <td><%= nombre %></td> \
        <td><%= ciudad %></td> \
        <td><%= direccion %></td> \
        <td><%= telefono %></p> \
    ';

    Templates.Sedes = ' \
        <section> \
            <div class="encabezado"> \
                <h1 class="titulo">Sedes</h1> \
                <p>Estas son las sedes existentes.... (continuar con la descripción)</p> \
            </div> \
        </section> \
        <section> \
            <h2>Crear nueva Sede</h2> \
            <!-- TODO: modificar el formulario utilizando Bootstrap --> \
            <form action="post" id="form-sedes"> \
                <label for="in-nombre">Nombre</label> \
                <input type="text" id="in-nombre" required maxlength="40" pattern=".{5,40}" title="Entre 5 y 40 letras"> \
                <br> \
                <label for="in-ciudad">Ciudad</label> \
                <input type="text" id="in-ciudad" required maxlength="20" pattern=".{5,20}" title="Entre 5 y 20 letras"> \
                <br> \
                <label for="in-direccion">Dirección</label> \
                <input type="text" id="in-direccion" maxlength="45">\
                <br> \
                <label for="in-telefono">Telefono</lfabel> \
                <input type="text" id="in-telefono" maxlength="15"> \
                <br> \
                <button type="submit" class="btn btn-primary">Crear</button> \
            </form> \
        </section> \
        <section> \
            <h2>Sedes existentes</h2> \
            <table id="tabla-sedes" class="table"> \
                <thead> \
                <tr> \
                    <td>Codigo Sede</td><td>Nombre</td><td>Ciudad</td><td>Dirección</td><td>Telefono</td> \
                </tr> \
                </thead> \
                <tbody> \
                </tbody> \
            </table> \
        </section> \
    ';

    Templates.Carrera = ' \
        <td><%= codigo_carrera %></td> \
        <td><%= nombre %></td> \
        <td><%= titulo %></td> \
        <td><%= jornada %></td> \
        <td><%= nombre_sede %></td> \
    ';

    Templates.Carreras = ' \
        <section> \
            <div class="encabezado"> \
                <h1 class="titulo">Carreras</h1> \
                <p>Estas son las Carreras existentes.... (continuar con la descripción)</p> \
            </div> \
        </section> \
        <section> \
            <h2>Crear nueva Carrera</h2> \
            <!-- TODO: modificar el formulario utilizando Bootstrap --> \
            <form action="post" id="form-carrera"> \
                <label for="in-nombre">Nombre</label> \
                <input type="text" id="in-nombre" required maxlength="40" pattern=".{5,40}" title="Entre 5 y 40 letras"> \
                <br> \
                <label for="in-titulo">Titulo</label> \
                <input type="text" id="in-titulo" required maxlength="45" pattern=".{5,45}" title="Entre 5 y 45 letras"> \
                <br> \
                <label for="in-jornada">Jornada</label> \
                <input type="text" id="in-jornada" required maxlength="12" pattern=".{5,12}" title="Entre 5 y 12 letras"> \
                <br> \
                <label for="in-sede">Sede</lfabel> \
                <select name="" id="in-sede" required></select> \
                <br> \
                <button type="submit" class="btn btn-primary">Crear</button> \
            </form> \
        </section> \
        <section> \
            <h2>Carreras Existentes</h2> \
            <!-- TODO: modificar la tabla utilizando Bootstrap --> \
            <table id="tabla-carreras" class="table"> \
                <thead> \
                <tr> \
                    <td>Codigo Carrera</td> \
                    <td>Nombre</td> \
                    <td>Titulo</td> \
                    <td>Jornada</td> \
                    <td>Sede</td> \
                </tr> \
                </thead> \
                <tbody> \
                </tbody> \
            </table> \
        </section> \
    ';
});
