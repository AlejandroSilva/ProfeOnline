
Profeonline.module('Modulos.Admin.Vistas', function(Vistas, Profeonline, Backbone, Marionette, $, _){

    Vistas.MenuLateral = Marionette.ItemView.extend({
        template: 'Profeonline.Modulos.Admin.Templates.MenuLateral',

        events: {
            "click li": function(evt){
                window.evt = evt;
                evt.preventDefault();
                $(evt.target.parentElement).addClass("active");
            }
        }
    });

    Vistas.Sede = Marionette.ItemView.extend({
        template: "Profeonline.Modulos.Admin.Templates.Sede",
        tagName: "tr"
    });

    Vistas.Sedes = Marionette.CompositeView.extend({
        template: "Profeonline.Modulos.Admin.Templates.Sedes",

        itemView: Vistas.Sede,
        itemViewContainer: 'tbody',

        events: {
            // "click button[type=submit]": "submitClick"
            // al atrapar el submit, no el click, se puede validar con html5
            "submit": "submitClick"
        },

        onRender: function(){
            this.cargarDatos();
        },

        submitClick: function(evt){
            // capturar el evento
            evt.preventDefault();
            evt.stopPropagation();

            // serializamos los datos
            var data = {
                nombre:    this.$el.find("#in-nombre").val(),
                ciudad:    this.$el.find("#in-ciudad").val(),
                direccion: this.$el.find("#in-direccion").val(),
                telefono:  this.$el.find("#in-telefono").val()
            };
            // le enviamos un evento a nuestro "controlador" para que lo procese
            this.trigger("form:submit", data);
        },

        cargarDatos: function(){
            var self = this;
            // pedir los nuevos datos al servidor
            var sedesRequest = Profeonline.request("entidades:sedes");
            $.when(sedesRequest).done(function( sedesCollection ){
                self.collection.reset();
                // actualizar los datos y renderizar nuevamente la vista
                sedesCollection.each(function(sede){
                    self.collection.add(sede);
                });
            });
        }
    });

    
    Vistas.Carrera = Marionette.ItemView.extend({
        template: "Profeonline.Modulos.Admin.Templates.Carrera",
        tagName: "tr"
    });

    Vistas.Carreras = Marionette.CompositeView.extend({
        template: "Profeonline.Modulos.Admin.Templates.Carreras",

        itemView: Vistas.Carrera,
        itemViewContainer: 'tbody',

        events: {
            // "click button[type=submit]": "submitClick"
            // al atrapar el submit, no el click, se puede validar con html5
            "submit": "submitClick"
        },

        onRender: function(){
            // cargar Datos de la tabla
            this.cargarDatos();
            // pedir las sedes para agregarla al combobox del formulario
            this.cargarSedes();
        },

        submitClick: function(evt){
            // capturar el evento
            evt.preventDefault();
            evt.stopPropagation();

            // serializamos los datos
            var data = {
                nombre:    this.$el.find("#in-nombre").val(),
                titulo:    this.$el.find("#in-titulo").val(),
                jornada: this.$el.find("#in-jornada").val(),
                codigo_sede:  this.$el.find("#in-sede").val()
            };
            console.log(data);
            // le enviamos un evento a nuestro "controlador" para que lo procese
            this.trigger("form:submit", data);
        },

        cargarSedes: function(){
            var self = this;
            var requestSedes = Profeonline.request("entidades:sedes");
            $.when(requestSedes).done(function(datos){
                // obtener el elemento donde guardaremos las opciones
                var $select = self.$el.find("#in-sede").empty();
                // recorrer los datos, y agregar cada elemento en el DOM
                datos.each( function(sede){
                    $select.append('<option value="'+sede.get("codigo_sede")+'">'+sede.get("nombre")+'</option>' );
                });
            });
        },

        cargarDatos: function(){
            var self = this;
            // pedir los nuevos datos al servidor
            var dataRequest = Profeonline.request("entidades:carreras");
            $.when(dataRequest).done(function( carrerasColeccion ){
                self.collection.reset();
                // actualizar los datos y renderizar nuevamente la vista
                carrerasColeccion.each(function(carrera){
                    self.collection.add(carrera);
                });
            });
        }
    });
});