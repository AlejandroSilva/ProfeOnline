
Profeonline.module('Modulos.Admin', function(Admin, Profeonline, Backbone, Marionette, $, _){

    // metodos "internos"
    var cargarLayout = function(){
        Admin.mainLayout = new Profeonline.Modulos.Comunes.Layouts.mainLayout();
        Profeonline.mainRegion.show(Admin.mainLayout);
    };

    var mostrarMenu = function(){
        // cargar menu de administracion
        var menu = new Profeonline.Modulos.Admin.Vistas.MenuLateral();
        Admin.mainLayout.menuRegion.show(menu);
    };

    Admin.Controller = {
        mostrarVistaSedes: function(){
            cargarLayout();
            mostrarMenu();

            // iniciar la vista con una coleccion global ya existente en la aplicacion
            var vistaSedes = new Profeonline.Modulos.Admin.Vistas.Sedes({
                collection: Profeonline.Entidades.Sedes
            });
            // actualizar la coleccion desde el servidor
            Profeonline.request("entidades:sedes:actualizar");

            // si el formulario fue enviado correctamente, volver a cargar los datos de las sedes
            vistaSedes.on("form:submit", function(datos){
                // hacer la peticion al servidor
                var requestNueva = Profeonline.request("entidades:sede:nueva", datos);
                $.when(requestNueva).done(function(){
                    // limpiar el formulario
                    vistaSedes.limpiarCampos();
                }).fail(function(){
                    // no deberia llegar aca por la validacion en html5
                    alert("problemas creando la sede");
                });
            });

            // mostrar la vista en "bodyRegion"
            Profeonline.Modulos.Admin.mainLayout.bodyRegion.show( vistaSedes );
        },

        mostrarVistaCarreras: function(){
            cargarLayout();
            mostrarMenu();

            // iniciar la vista con una coleccion global ya existente en la aplicacion
            var vistaCarreras = new Profeonline.Modulos.Admin.Vistas.Carreras({
                collection: Profeonline.Entidades.Carreras
            });
            // actualizar la coleccion desde el servidor
            Profeonline.request("entidades:carreras:actualizar");
            // obtener las sedes para ser mostradas en el formulario
            var sedesRequest = Profeonline.request("entidades:sedes:actualizar");
            $.when(sedesRequest).done(function(){
                vistaCarreras.mostrarSedesEnFormulario();
            });

            // si el formulario fue enviado correctamente, volver a cargar los datos de las sedes
            vistaCarreras.on("form:submit", function(datos){
                // hacer la peticion al servidor
                var requestNueva = Profeonline.request("entidades:carrera:nueva", datos);
                $.when(requestNueva).done(function(){
                    // limpiar el formulario
                    vistaCarreras.limpiarCampos();
                }).fail(function(){
                    // no deberia llegar aca por la validacion en html5
                    alert("problemas creando la sede");
                });
            });

            // mostrar la vista en "bodyRegion"
            Profeonline.Modulos.Admin.mainLayout.bodyRegion.show( vistaCarreras );
        },

        mostrarVistaAsignaturas: function(){
            cargarLayout();
            mostrarMenu();

            // iniciar la vista con una coleccion global ya existente en la aplicacion
            window.vistaAsignaturas = new Profeonline.Modulos.Admin.Vistas.Asignaturas({
                collection: Profeonline.Entidades.Asignaturas
            });
            // actualizar la coleccion desde el servidor
            Profeonline.request("entidades:asignaturas:actualizar");
            // obtener las carreras para ser mostradas en el formulario
            var sedesRequest = Profeonline.request("entidades:carreras:actualizar");
            $.when(sedesRequest).done(function(){
                vistaAsignaturas.mostrarCarrerasEnFormulario();
            });

            // si el formulario fue enviado correctamente, volver a cargar los datos de las sedes
            vistaAsignaturas.on("form:submit", function(datos){
                // hacer la peticion al servidor
                var requestNueva = Profeonline.request("entidades:asignatura:nueva", datos);
                $.when(requestNueva).done(function(){
                    // limpiar el formulario
                    vistaAsignaturas.limpiarCampos();
                }).fail(function(){
                    // no deberia llegar aca por la validacion en html5
                    alert("problemas creando la asignatura");
                });
            });

            // mostrar la vista en "bodyRegion"
            Profeonline.Modulos.Admin.mainLayout.bodyRegion.show( vistaAsignaturas );
        },
    };
});