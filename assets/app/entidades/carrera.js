Profeonline.module('Entidades', function(Entidades, Profeonline, Backbone, Marionette, $, _){

    Entidades.Carrera = Backbone.Model.extend({
        idAttribute: "codigo_carrera"
    });

    Entidades.CarreraColleccion = Backbone.Collection.extend({
        model: Entidades.Carrera,
        comparator: 'codigo_carrera'
    });


    // "controlador interno", accesible solo a travez de las REQUEST a Profeonline
    var API = {
        getCarreras: function(){
            var def = $.Deferred();
            // creamos una "promesa" de que entregaremos los datos
            $.ajax({
                url: "server/api-v1/carrera",
                type: "GET",
            }).done(function(carreras){
                // creamos la coleccion con la respuesta del servidor y la retornamos en la promesa
                var coleccion = new Profeonline.Entidades.CarreraColleccion(carreras);
                def.resolve( coleccion );
            }).fail(function(){
                // ocurrio un error
                def.reject();
            });
            return def;
        },

        postCarrera: function(datos){
            var def = $.Deferred();
            $.ajax({
                url: "server/api-v1/carrera",
                type: "POST",
                // validaciones de los datos con html5 en cliente
                data: datos
              })
              .done(function(){
                def.resolve();
              })
              .fail(function(){
                def.reject();
              });
              return def;
        }

    };

    Profeonline.reqres.setHandler("entidades:carreras", function(){
        return API.getCarreras();
    });
    Profeonline.reqres.setHandler("entidades:carrera:nueva", function(datos){
        return API.postCarrera(datos);
    });

});