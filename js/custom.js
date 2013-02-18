/*
 * Jot - A quick note writing and sharing app.
 * custom.js - All custom js/jquery code
 * 
 * Author: Alf http://alfg.co
 *
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

$(document).ready(function() {

    // Decode and load data if hash url exists
    if (location.hash != '') {
       var getHash = location.hash.substr(1);
       $('#write-text').val($.base64.decode(getHash));
       $('#share').show();
    }

    // Add encoded hash to url on save button
    $('#save-button').click(function(e) {
        var text = $('#write-text').val()
        
        if (text == '') {
            $('.alert').show().text("Jot something first!").delay(3000).fadeOut('slow');
            e.preventDefault();
        }
        else {
            var encoded = $.base64.encode(text);
            location.hash = encoded;
            $('#share-url').val(location.href);
            $('#share').slideDown('fast');
        }
    });

    // Clear value of textarea element
    $('#clear-button').click(function() {
        location.hash = '';
        $('#share').slideUp('fast');
        $('#write-text').val('');
    });
});
