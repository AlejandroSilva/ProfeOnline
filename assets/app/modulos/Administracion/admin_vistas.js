
Profeonline.module('Modulos.Admin.Vistas', function(Vistas, Profeonline, Backbone, Marionette, $, _){

    Vistas.MenuLateral = Marionette.ItemView.extend({
        template: 'Profeonline.Modulos.Admin.Templates.MenuLateral',
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

        limpiarCampos: function(){
            this.$el.find("#in-nombre").val("");
            this.$el.find("#in-ciudad").val("");
            this.$el.find("#in-direccion").val("");
            this.$el.find("#in-telefono").val("");
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

        limpiarCampos: function(){
            this.$el.find("#in-nombre").val("");
            this.$el.find("#in-titulo").val("");
            this.$el.find("#in-jornada").val("");
            this.$el.find("#in-sede").val("");
        },

        submitClick: function(evt){
            // capturar el evento
            evt.preventDefault();
            evt.stopPropagation();

            // serializamos los datos
            var data = {
                nombre: this.$el.find("#in-nombre").val(),
                titulo: this.$el.find("#in-titulo").val(),
                jornada: this.$el.find("#in-jornada").val(),
                codigo_sede: this.$el.find("#in-sede").val()
            };
            // enviamos un evento a nuestro "controlador" para que lo procese
            this.trigger("form:submit", data);
        },

        // workaround para no tener que crear una vista de formulario, y setear un modelo
        mostrarSedesEnFormulario: function(){            
            // obtener el elemento donde guardaremos las opciones
            var $select = this.$el.find("#in-sede").empty();
            // usamos la coleccion global de la aplicacion, creamos las opciones del formulario con jquery
            Profeonline.Entidades.Sedes.each( function(sede){
                $select.append('<option value="'+sede.get("codigo_sede")+'">'+sede.get("nombre")+'</option>' );
            });
        },
    });

    
    Vistas.Asignatura = Marionette.ItemView.extend({
        template: "Profeonline.Modulos.Admin.Templates.Asignatura",
        tagName: "tr"
    });

    Vistas.Asignaturas = Marionette.CompositeView.extend({
        template: "Profeonline.Modulos.Admin.Templates.Asignaturas",

        itemView: Vistas.Asignatura,
        itemViewContainer: 'tbody',

        events: {
            "submit": "submitClick"
        },

        limpiarCampos: function(){
            this.$el.find("#in-nombre").val("");
            this.$el.find("#in-carrera").val("");
        },

        submitClick: function(evt){
            // capturar el evento
            evt.preventDefault();
            evt.stopPropagation();

            // serializamos los datos
            var data = {
                nombre: this.$el.find("#in-nombre").val(),
                anno: this.$el.find("#in-anno").val(),
                codigo_carrera: this.$el.find("#in-carrera").val()
            };
            // enviamos un evento a nuestro "controlador" para que lo procese
            this.trigger("form:submit", data);
        },

        // workaround para no tener que crear una vista de formulario, y setear un modelo
        mostrarCarrerasEnFormulario: function(){            
            // obtener el elemento donde guardaremos las opciones
            var $select = this.$el.find("#in-carrera").empty();
            // usamos la coleccion global de la aplicacion, creamos las opciones del formulario con jquery
            Profeonline.Entidades.Carreras.each( function(carrera){
                $select.append('<option value="'+carrera.get("codigo_carrera")+'">'+carrera.get("nombre")+'</option>' );
            });
        },
    });
});