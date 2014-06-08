/*jshint multistr: true */  
/*jshint evil: true*/


Backbone.Marionette.TemplateCache.prototype.loadTemplate = function( templateId ) {
    var template;
    if(templateId.charAt( 0 ) == "#"){
         // If we request the template by providing a jQuery selector,
        // behave as usual
        template = Backbone.Marionette.$(templateId).html();
    }
    else{
        template = eval(templateId);
    }
    
    if (!template || template.length === 0){
        errorMessage = "Could not find template: '" + templateId + "'";
        alert(errorMessage, "NoTemplateError");
    }
    return template;
};