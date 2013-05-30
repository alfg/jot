/*
 * Jot - A quick note writing and sharing app.
 * custom.js - All custom js/jquery code
 * 
 * Author: Alf http://alfg.co
 *
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

//JsLInt
/*global $, document, location, Base64*/

$(document).ready(function () {
    "use strict";

    // Autosize textarea
    $('#write-text').autosize();

    // Decode and load data if hash url exists
    if (location.hash !== '') {
        var encType = location.hash.substr(1,1); //encryption type [b = blowfish, e = base64 encoding]

        if (encType === 'e') { // If base64 encoding

            var getHash = location.hash.substr(2); // Get hash after 2nd char
            $('#write-text').val(Base64.decode(getHash)); // Decode base64 hash
            $('#share-url').val(location.href); // Load URL into share-url box
            $('#share').show(); // Show share div
            $('#write-text').trigger('autosize'); // Dynamically sizes the textarea

        } else if (encType === 'b') { // Else if Blowfish cipher

            var getHash = location.hash.substr(2); // Get hash after 2nd char
            $('#write-text').val("This message is encrypted. Enter key to decrypt message."); // Requires key note

            // Show/hide relevant buttons
            $('#key-required').show();
            $('#decrypt-button').show();
            $('#save-button').hide();
            $('#add-key-button').hide();
        }
    }

    // Add encoded hash to url on save button
    $('#save-button').click(function (e) {
        var text = $('#write-text').val(), // Message
            encoded = Base64.encode(text), // Message encoded
            key = $('#key-gen').val(); // Get key value

        if (text === '') {
            $('.alert').show().text("Jot something first!").delay(3000).fadeOut('slow');
            e.preventDefault();
        } else if (key.length === 0) { // If key is empty, use encoding method

            // Add encoded to url and show share input
            location.hash = 'e' + encoded;
            $('#share-url').val(location.href);
            $('#share').slideDown('fast');

        } else { // Else, use blowfish encryption

            // Encrypt text with blowfish
            var bf = new Blowfish({
                key: key,
            });
            var encrypted = bf.encrypt64(text);

            // Load blowfish cipher into url path and show share input
            location.hash = 'b' + encrypted;
            $('#share-url').val(location.href);
            $('#share').slideDown('fast');

        }
    });

    // Clear value of textarea element
    $('#clear-button').click(function () {
        // Resets all buttons/inputs
        
        location.hash = '';
        $('#share').slideUp('fast');
        $('#key').slideUp('fast');
        $('#key-required').slideUp('fast');
        $('#write-text').val('');
        $('#key-gen').val('');

        // Reset buttons
        $('#decrypt-button').hide();
        $('#save-button').show();
        $('#add-key-button').show();
    });

    // Add key input
    $('#add-key-button').click(function () {
        $('#key').slideDown('fast');
    });

    $('#decrypt-button').click(function () {
        // Run blowfish and output to write-text box. 
        
        var getHash = location.hash.substr(2); // Gets hash value after 2nd char
        var key = $('#key-decrypt').val(); // Grabs inputted key
        var bf = new Blowfish({ // Run blowfish against key
            key: key,
        });
        var decrypted = bf.decrypt64(getHash); //Decrypted message (if key is correct)

        $('#write-text').val(decrypted); // Output to write-text
        $('#write-text').trigger('autosize'); // Dynamically sizes the textarea
    });
});

$("#share-url").focus(function () {
    // Select all text on #share-url focus

    "use strict";
    var $this = $(this);
    $this.select();

    // Work around Chrome's little problem
    $this.mouseup(function () {
        // Prevent further mouseup intervention
        $this.unbind("mouseup");
        return false;
    });
});

