Profeonline.module('Entidades', function(Entidades, Profeonline, Backbone, Marionette, $, _){

    Entidades.CarreraModelo = Backbone.Model.extend({
        idAttribute: "codigo_carrera"
    });

    Entidades.CarreraColleccion = Backbone.Collection.extend({
        model: Entidades.CarreraModelo,
        comparator: 'codigo_carrera'
    });

    // coleccion global accesible desde cualquier vista que lo necesite
    Entidades.Carreras = new Profeonline.Entidades.CarreraColleccion();


    // "controlador interno", accesible solo a travez de las REQUEST a Profeonline
    var API = {
        pedirCarreras: function(){
            var def = $.Deferred();
            // creamos una "promesa" de que entregaremos los datos
            $.ajax({
                url: "server/api-v1/carrera",
                type: "GET",
            }).done(function(datos){
                
                // actualizamos la coleccion con los nuevos datos
                Entidades.Carreras.reset();
                $.each(datos, function(index, json){
                    var modelo = new Entidades.CarreraModelo(json);
                    Entidades.Carreras.add( modelo );
                });
                
                // retornamos la promesa cuando la coleccion esta actualizada
                def.resolve();
            }).fail(function(){
                // ocurrio un error
                def.reject();
            });
            return def;
        },

        agregarCarrera: function(datos){
            var def = $.Deferred();
            $.ajax({
                url: "server/api-v1/carrera",
                type: "POST",
                // validaciones de los datos con html5 en cliente
                data: datos
              })
              .done(function(nuevoElemento){
                    // si el servidor acepto la solicitud, retorna el elemento creado
                    var modelo = new Entidades.CarreraModelo( nuevoElemento[0] );
                    // entonces agregamos el nuevo elemento a la coleccion
                    Entidades.Carreras.add( modelo );

                    def.resolve();
              })
              .fail(function(){
                def.reject();
              });
              return def;
        }

    };

    Profeonline.reqres.setHandler("entidades:carreras:actualizar", function(){
        return API.pedirCarreras();
    });
    Profeonline.reqres.setHandler("entidades:carrera:nueva", function(datos){
        return API.agregarCarrera(datos);
    });

});