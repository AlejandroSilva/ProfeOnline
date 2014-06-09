
Profeonline.module('Controlador', function(Controlador, Profeonline, Backbone, Marionette, $, _){

    Profeonline.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "inicio",
            "admin/sedes": "administrarSedes",
            "admin/carreras": "administrarCarreras",
            "admin/asignaturas": "administrarAsignaturas",
            // "admin/sede/:id/editar": "editarSede"
        },
    });

    // metodos de ayuda, para actualizar la ruta en la que nos encontramos en el browser
    Profeonline.Router.navegar = function(route, options){
        if(!!typeof(options))
            options = {};
        Backbone.history.navigate(route, options);
    };
    Profeonline.getCurrentRoute = function(){
        return Backbone.history.fragment;
    };

    // API que controlara las acciones de la pagina
    var API = {
        inicio: function(){
            // cargar menu
            var headerView = new Profeonline.Modulos.Comunes.Vistas.cabeceraGenerica();
            Profeonline.headerRegion.show( headerView );

            // cargar la vista
            var inicioView = new Profeonline.Modulos.Comunes.Vistas.InicioTemporal();
            Profeonline.mainRegion.show( inicioView );
        },

        administrarSedes: function(){
            // cargar cabecera
            var headerView = new Profeonline.Modulos.Comunes.Vistas.cabeceraGenerica();
            Profeonline.headerRegion.show( headerView );

            // cargar cuerpo
            Profeonline.Modulos.Admin.Controller.mostrarVistaSedes();
        },
        administrarCarreras: function(){
            // cargar cabecera
            var headerView = new Profeonline.Modulos.Comunes.Vistas.cabeceraGenerica();
            Profeonline.headerRegion.show( headerView );

            // cargar el cuerpo
            Profeonline.Modulos.Admin.Controller.mostrarVistaCarreras();
        },
        administrarAsignaturas: function(){
            alert("asignaturas!");
        }
    };

    // al iniciar la aplicacion, instanciar el router y entregarle el controlador
    Profeonline.addInitializer(function(){
        new Profeonline.Router({
            controller: API
        });
    });


    // EVENTOS que activan las rutas (casos en donde no se llega directamente)
    // para navegar por la aplicacion, se deben lanzar estos eventos

    // En todos los casos se cambia la direccion, y luego hace un llamado a la API
    Profeonline.on("inicio", function(){
        Profeonline.Router.navegar("");
        API.inicio();
    });

    Profeonline.on("administrar:sedes", function(){
        // cambiar la direccion, y luego activar la API
        Profeonline.Router.navegar("admin/sedes");
        API.administrarSedes();
    });

});