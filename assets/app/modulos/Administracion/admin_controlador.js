
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

            // iniciar la vista con una coleccion vacia, al iniciar cargara los datos
            var vistaSedes = new Profeonline.Modulos.Admin.Vistas.Sedes({
                collection: new Profeonline.Entidades.SedesColleccion()
            });

            // si el formulario fue enviado correctamente, volver a cargar los datos de las sedes
            vistaSedes.on("form:submit", function(datos){
                // hacer la peticion al servidor
                var requestNueva = Profeonline.request("entidades:sede:nueva", datos);
                $.when(requestNueva).done(function(){
                    // limpiar el formulario
                    vistaSedes.render();
                    // obtener el nuevo listado de sedes
                    vistaSedes.cargarDatos();
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

            // iniciar la vista con una coleccion vacia, al iniciar cargara los datos
            var vistaCarreras = new Profeonline.Modulos.Admin.Vistas.Carreras({
                collection: new Profeonline.Entidades.CarreraColleccion()
            });

            // si el formulario fue enviado correctamente, volver a cargar los datos de las sedes
            vistaCarreras.on("form:submit", function(datos){
                // hacer la peticion al servidor
                var requestNueva = Profeonline.request("entidades:carrera:nueva", datos);
                $.when(requestNueva).done(function(){
                    // limpiar el formulario
                    vistaCarreras.render();
                    // obtener el nuevo listado de sedes
                    vistaCarreras.cargarDatos();
                }).fail(function(){
                    // no deberia llegar aca por la validacion en html5
                    alert("problemas creando la sede");
                });
            });

            // mostrar la vista en "bodyRegion"
            Profeonline.Modulos.Admin.mainLayout.bodyRegion.show( vistaCarreras );
        }

    };
});