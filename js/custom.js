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
    // Autosize textarea
    $('#write-text').autosize();

    // Decode and load data if hash url exists
    if (location.hash != '') {
       var getHash = location.hash.substr(1);
       $('#write-text').val(Base64.decode(getHash));
       $('#share-url').val(location.href);
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
            var encoded = Base64.encode(text);
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

// Select all text on #share-url focus
$("#share-url").focus(function() {
    var $this = $(this);
    $this.select();

    // Work around Chrome's little problem
    $this.mouseup(function() {
        // Prevent further mouseup intervention
        $this.unbind("mouseup");
        return false;
    });
});
