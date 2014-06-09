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
            <form action="post" id="form-sedes" class="form form-horizontal"> \
                <div class="form-group"> \
                    <label for="in-nombre" class="col-sm-2">Nombre</label> \
                    <div class="col-sm-10"> \
                        <input type="text" id="in-nombre" class="form-control" required maxlength="40" pattern=".{5,40}" title="Entre 5 y 40 letras"> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <label for="in-ciudad" class="col-sm-2">Ciudad</label> \
                    <div class="col-sm-10"> \
                        <input type="text" id="in-ciudad" class="form-control" required maxlength="20" pattern=".{5,20}" title="Entre 5 y 20 letras"> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <label for="in-direccion" class="col-sm-2">Dirección</label> \
                    <div class="col-sm-10"> \
                        <input type="text" id="in-direccion" class="form-control" maxlength="45">\
                    </div> \
                </div> \
                <div class="form-group"> \
                    <label for="in-telefono" class="col-sm-2">Telefono</label> \
                    <div class="col-sm-10"> \
                        <input type="text" id="in-telefono" class="form-control" maxlength="15"> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-offset-2 col-sm-10"> \
                        <button type="submit" class="btn btn-primary">Crear</button> \
                    </div> \
                </div> \
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
            <form action="post" id="form-carrera" class="form form-horizontal"> \
                <div class="form-group"> \
                    <label for="in-nombre" class="col-sm-2">Nombre</label> \
                    <div class="col-sm-10"> \
                        <input type="text" id="in-nombre" class="form-control" required maxlength="40" pattern=".{5,40}" title="Entre 5 y 40 letras"> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <label for="in-titulo" class="col-sm-2">Titulo</label> \
                    <div class="col-sm-10"> \
                        <input type="text" id="in-titulo" class="form-control" required maxlength="45" pattern=".{5,45}" title="Entre 5 y 45 letras"> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <label for="in-jornada" class="col-sm-2">Jornada</label> \
                    <div class="col-sm-10"> \
                        <input type="text" id="in-jornada" class="form-control" required maxlength="12" pattern=".{5,12}" title="Entre 5 y 12 letras"> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <label for="in-sede" class="col-sm-2">Sede</label> \
                    <div class="col-sm-10"> \
                        <select name="" id="in-sede" class="form-control" required></select> \
                    </div> \
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-offset-2 col-sm-10"> \
                        <button type="submit" class="btn btn-primary">Crear</button> \
                    </div> \
                </div> \
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

    Templates.Asignatura = ' \
        <td><%= codigo_asignatura %></td> \
        <td><%= nombre %></td> \
        <td><%= anno %></td> \
        <td><%= nombre_carrera %></td> \
    ';

    Templates.Asignaturas = ' \
        <section> \
            <div class="encabezado"> \
                <h1 class="titulo">Asignaturas</h1> \
                <p>Estas son las Carreras existentes.... (continuar con la descripción)</p> \
            </div> \
        </section> \
        <section> \
            <h2>Crear nueva Asignatura</h2> \
            <form action="post" id="form-asignatura" class="form form-horizontal"> \
                <div class="form-group"> \
                    <label for="in-nombre" class="col-sm-2">Nombre</label> \
                    <div class="col-sm-10"> \
                        <input type="text" id="in-nombre" class="form-control" required maxlength="45" pattern=".{5,45}" title="Entre 5 y 45 letras"> \
                    </div>\
                </div> \
                <div class="form-group"> \
                    <label for="in-carrera" class="col-sm-2">Carrera</label> \
                    <div class="col-sm-10"> \
                        <select name="" id="in-carrera" class="form-control" required></select> \
                    </div>\
                </div> \
                <div class="form-group"> \
                    <label for="in-anno" class="col-sm-2">Año</label> \
                    <div class="col-sm-10"> \
                        <input type="text" id="in-anno" class="form-control" value="2014" disabled required> \
                    </div>\
                </div> \
                <div class="form-group"> \
                    <div class="col-sm-offset-2 col-sm-10"> \
                        <button type="submit" class="btn btn-primary">Crear</button> \
                    </div> \
                </div> \
            </form> \
        </section> \
        <section> \
            <h2>Asignaturas Existentes</h2> \
            <table id="tabla-asignaturas" class="table"> \
                <thead> \
                <tr> \
                    <td>Codigo Asignatura</td> \
                    <td>Nombre</td> \
                    <td>Año</td> \
                    <td>Carrera</td> \
                </tr> \
                </thead> \
                <tbody> \
                </tbody> \
            </table> \
        </section> \
    ';
});
