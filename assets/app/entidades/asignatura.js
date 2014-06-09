Profeonline.module('Entidades', function(Entidades, Profeonline, Backbone, Marionette, $, _){

    Entidades.AsignaturaModelo = Backbone.Model.extend({
        idAttribute: "codigo_asignatura"
    });

    Entidades.AsignaturaColeccion = Backbone.Collection.extend({
        model: Entidades.AsignaturaModelo,
        comparator: 'codigo_asignatura'
    });

    // coleccion global accesible desde cualquier vista que lo necesite
    Entidades.Asignaturas = new Profeonline.Entidades.AsignaturaColeccion();

    // "controlador interno", accesible solo a travez de las REQUEST a Profeonline
    var API = {
        pedirAsignaturas: function(){
            var def = $.Deferred();
            // creamos una "promesa" de que entregaremos los datos
            $.ajax({
                url: "server/api-v1/asignatura",
                type: "GET",
                dataType: "json",
            }).done(function(datos){

                // actualizamos la coleccion con los nuevos datos
                Entidades.Asignaturas.reset();
                $.each(datos, function(index, json){
                    var modelo = new Entidades.AsignaturaModelo(json);
                    Entidades.Asignaturas.add( modelo );
                });

                // retornamos la promesa cuando la coleccion esta actualizada
                def.resolve();
            }).fail(function(){
                // ocurrio un error
                def.reject();
            });
            return def;
        },

        agregarAsignatura: function(datos){
            var def = $.Deferred();
            $.ajax({
                url: "server/api-v1/asignatura",
                type: "POST",
                dataType: "json",
                // validaciones de los datos con html5 en cliente
                data: datos
              })
              .done(function(nuevoElemento){
                // si el servidor acepto la solicitud, retorna el elemento creado
                var modelo = new Entidades.SedeModelo( nuevoElemento[0] );
                // entonces agregamos el nuevo elemento a la coleccion
                Entidades.Asignaturas.add( modelo );

                def.resolve();
              })
              .fail(function(){
                def.reject();
              });
              return def;
        }

    };

    Profeonline.reqres.setHandler("entidades:asignaturas:actualizar", function(){
        return API.pedirAsignaturas();
    });
    Profeonline.reqres.setHandler("entidades:asignatura:nueva", function(datos){
        return API.agregarAsignatura(datos);
    });

});