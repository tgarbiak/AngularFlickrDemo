Installation:
- npm install
- gulp build

Tested under:
- Firefox 42
- MS Edge
- MS Internet Explorer 11
- Opera 33*
- Chrome 46*

\*) In Chrome and Opera setting cookies doesn't work when accessing index.html like this: "file://(path)/NgFlickr/index.html", you must serve that page via some server.
If you have PHP installed you can use its' built-it one: open the console, go to the NgFlickr directory and run "php -S localhost:4000" and then go to "localhost:8000" in the browser.
Should work now.

Note: server must also run if one wants to run protractor tests.