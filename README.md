Jot
=======

A server-less pastebin-esque note-taking app.

**Demo**: http://alfg.github.com/jot

### Features
* A simple, elegant design
* Retains formatting of messages
* Data is base64 encoded into the URL hash, so no data is stored on a server
* Easy to share via encoded URL
* Simple to deploy. Just a few static files.
* Add a secret key with encryption support via Blowfish

### Notes
* Most modern browsers limit the URL to 2000 characters. Messages can easily generate a long URL depending
on the content. So it is best to keep messages minimal (TODO lists, short snippets of code, etc...).
* Use a URL shortening service to shorten the URL when sharing. Jot URLs can typically be very long
depending on the content.

### Examples
http://alfg.co/jot/#eTWF5IHRoZSBzb3VyY2UgYmUgd2l0aCB5b3Uu
http://alfg.co/jot/#eVGhlIGtleSB0byBoYXBwaW5lc3M6CgoqIEVhdAoqIFNsZWVwCiogQ29kZQ==
http://alfg.co/jot/#btU/VJBS+XgS/Qjs6YPI7lRVCUSA1E/OxMDm1z+ZC9R8 (key is foobar)

### License

`jot` is open-source under the [MIT License][1].

[1]: http://opensource.org/licenses/MIT
