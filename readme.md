# Angular demo
Simple app to show some Angular skills. Includes tests in Karma and Protractor.
Functionality is simple: feed of public Flickr photos is loaded and user can mark some photos to be her "favourites".
Info about that is stored in the cookies (TODO: use local storage instead).

## Installation
- `npm install`
- `gulp build`

## Tested under
- Firefox 42
- MS Edge
- MS Internet Explorer 11
- Opera 33*
- Chrome 46*

\*) In Chrome and Opera setting cookies doesn't work when accessing index.html like this: `file://(path)/AngularFlickrDemo/index.html`, you must serve that page via some server.
If you have PHP installed you can use its' built-it one: open the console, go to the NgFlickr directory and run `php -S localhost:4000` and then go to "localhost:8000" in the browser.
Should work now.

## Running tests
- run the app on a `http://localhost:4000` (see the above note about the server)
- start the webdriver: `webdriver-manager start`
- run `npm run-script end-to-end` to run `protractor` tests
- run `npm run-script unit-tests` to run `karma` tests

## Legal
Copyright (C) 2015 Tomasz Garbiak

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

License can be read at <http://www.gnu.org/licenses/>.
