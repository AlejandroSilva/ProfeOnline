/* global $, window */
// https://github.com/blueimp/jQuery-File-Upload/wiki/How-to-submit-additional-form-data
// evento para cuando terina de enviar TODOS los archivos
// https://github.com/blueimp/jQuery-File-Upload/issues/966

$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        maxFileSize: 5000000, // 5 MB
        formData: {folder: 'JUAN_PERES'},                                    /****/
        url: 'server/php/',
        autoUpload: true
    }).on('fileuploadstart', function(e){
        $('#div-publicar').hide();
        $('.fileupload-progress').show();
    }).on('fileuploadstop', function(e){
        $('.fileupload-progress').hide();
        $('#div-publicar').show();
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    // Load existing files:
    $('#fileupload').addClass('fileupload-processing');
    $.ajax({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: $('#fileupload').fileupload('option', 'url'),

        formData: {folder: 'JUAN_PERES'},                                    /****/

        dataType: 'json',
        context: $('#fileupload')[0]
    }).always(function(){
        $(this).removeClass('fileupload-processing');
    }).done(function (result) {
        $(this).fileupload('option', 'done')
            .call(this, $.Event('done'), {result: result});
    });

});

/*
.on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                console.log("fileuploaddone: index:"+index+" url:"+file.url);
            } else if (file.error) {
                console.log("fileuploaddone:"+file.error);
            }
        });
    }).on('fileuploadfail', function (e, data) {
        console.log("fileuploadfail:");
        $.each(data.files, function (index, file) {
            console.log("fileuploadfail:" + data.context.children()[index]);
        });
    })
*/