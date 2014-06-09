Profeonline.module('Entidades', function(Entidades, Profeonline, Backbone, Marionette, $, _){

    Entidades.SedeModelo = Backbone.Model.extend({
        idAttribute: "codigo_sede"
    });

    Entidades.SedesColeccion = Backbone.Collection.extend({
        model: Entidades.SedeModelo,
        comparator: 'codigo_sede'
    });

    // coleccion global accesible desde cualquier vista que lo necesite
    Entidades.Sedes = new Profeonline.Entidades.SedesColeccion();

    // "controlador interno", accesible solo a travez de las REQUEST a Profeonline
    var API = {
        pedirSedes: function(){
            var def = $.Deferred();
            // creamos una "promesa" de que entregaremos los datos
            $.ajax({
                url: "server/api-v1/sede",
                type: "GET",
            }).done(function(datos){

                // actualizamos la coleccion con los nuevos datos
                Entidades.Sedes.reset();
                $.each(datos, function(index, json){
                    var modelo = new Entidades.SedeModelo(json);
                    Entidades.Sedes.add( modelo );
                });

                // retornamos la promesa cuando la coleccion esta actualizada
                def.resolve();
            }).fail(function(){
                // ocurrio un error
                def.reject();
            });
            return def;
        },

        agregarSede: function(datos){
            var def = $.Deferred();
            $.ajax({
                url: "server/api-v1/sede",
                type: "POST",
                // validaciones de los datos con html5 en cliente
                data: datos
              })
              .done(function(nuevoElemento){
                // si el servidor acepto la solicitud, retorna el elemento creado
                var modelo = new Entidades.SedeModelo( nuevoElemento[0] );
                // entonces agregamos el nuevo elemento a la coleccion
                Entidades.Sedes.add( modelo );

                def.resolve();
              })
              .fail(function(){
                def.reject();
              });
              return def;
        }

    };

    Profeonline.reqres.setHandler("sedes:actualizar", function(){
        return API.pedirSedes();
    });
    Profeonline.reqres.setHandler("entidades:sede:nueva", function(datos){
        return API.agregarSede(datos);
    });

});