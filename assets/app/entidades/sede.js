Profeonline.module('Entidades', function(Entidades, Profeonline, Backbone, Marionette, $, _){

    Entidades.Sede = Backbone.Model.extend({
        idAttribute: "codigo_sede"
    });

    Entidades.SedesColleccion = Backbone.Collection.extend({
        model: Entidades.Sede,
        comparator: 'codigo_sede'
    });


    // "controlador interno", accesible solo a travez de las REQUEST a Profeonline
    var API = {
        getSedes: function(){
            var def = $.Deferred();
            // creamos una "promesa" de que entregaremos los datos
            $.ajax({
                url: "server/api-v1/sede",
                type: "GET",
            }).done(function(sedes){
                // creamos la coleccion con la respuesta del servidor y la retornamos en la promesa
                var coleccion = new Profeonline.Entidades.SedesColleccion(sedes);
                def.resolve( coleccion );
            }).fail(function(){
                // ocurrio un error
                def.reject();
            });
            return def;
        },

        postSede: function(datos){
            var def = $.Deferred();
            $.ajax({
                url: "server/api-v1/sede",
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

    Profeonline.reqres.setHandler("entidades:sedes", function(){
        return API.getSedes();
    });
    Profeonline.reqres.setHandler("entidades:sede:nueva", function(datos){
        return API.postSede(datos);
    });

});