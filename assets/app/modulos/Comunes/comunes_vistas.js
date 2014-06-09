
Profeonline.module("Modulos.Comunes.Vistas", function(Vistas, Profeonline, Backbone, Marionette, $, _){

    Vistas.cabeceraGenerica = Marionette.ItemView.extend({
        template: 'Profeonline.Modulos.Comunes.Templates.cabeceraGenerica',
    });

    Vistas.InicioTemporal = Marionette.ItemView.extend({
        template: 'Profeonline.Modulos.Comunes.Templates.inicio_temporal',
    });

});

Profeonline.module("Modulos.Comunes.Layouts", function(Layouts, Profeonline, Backbone, Marionette, $, _){

    Layouts.mainLayout = Marionette.Layout.extend({
        template: 'Profeonline.Modulos.Comunes.Templates.mainLayout',

        regions: {
            "menuRegion" : "#menu-region",
            "bodyRegion": "#body-region"
        }
    });
});