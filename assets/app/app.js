var Profeonline = new Marionette.Application();

Profeonline.addRegions({
    headerRegion: '#header-region',
    mainRegion: '#main-region'    
    /*dialogRegion: Marionette.Region.Dialog.extend({
        el: '#dialog-region'
    })*/
});

Profeonline.on('initialize:after', function(){
    // iniciar el historial de navegacion
    if(Backbone.history){
        Backbone.history.start();
        // mostar "inicio" si llegamos al home
        // if( this.getCurrentRoute() === "")
        //     Profeonline.trigger("inicio");
    }
});