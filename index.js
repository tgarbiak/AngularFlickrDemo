/// <reference path="../typings/angularjs/angular.d.ts"/>
angular.module('flickrApp', ['ngCookies']);
(function(ng) {
    ng.module('flickrApp')
        .factory('flickrService', ['$http', flickrServiceFactory]);

    function flickrServiceFactory($http) {
        return {
            /**
             * Gets data from the "public" Flickr feed.
             * @param {Object} [params] Specific params for the feed request (optional).
             * @see https://www.flickr.com/services/feeds/docs/photos_public/
             */
            getPublicFeed: function(params) {
                // We only allow JSON(P) format.
                params = ng.extend(params || {}, {"format":"json","jsoncallback":"JSON_CALLBACK"});
                /*
                 * For full-fledged REST API support one could/should use Angular Resource,
                 * but it's not needed here so I stick to simple $http.
                 */
                return $http.jsonp(
                    'https://api.flickr.com/services/feeds/photos_public.gne',
                    {params:params, timeout: 5000}
                );
            }
        };
    }
})(angular);
(function(ng) {
    ng.module('flickrApp')
        .controller('IndexController', ['$scope', 'flickrService', '$cookies', indexController]);

    function indexController($scope, flickrService, $cookies) {
        var favourites = $cookies.getObject('favPics') || [],
            mergeFeedWithFavourites,
            isFavourite;

console.log(window.$c = $cookies);

        $scope.data = {
            "error": false,
            "loading": true,
            "feed": []
        };

        isFavourite = function(picUrl) {
            if (!favourites.length) return false;
            return 0 < favourites.filter(function(item) { return item.url === picUrl }).length;
        };

        mergeFeedWithFavourites = function(feed) {
            var items = favourites.slice();
            ng.forEach(feed, function(item) {
                if (!isFavourite(item.media.m)) {
                    items.push({url: item.media.m, selected: false});
                }
            });
            return items;
        };

        $scope.selectPic = function(pic) {
            pic.selected = !pic.selected;
            $cookies.putObject('favPics', $scope.data.feed.filter(function(pic) { return pic.selected; }));
        };

        flickrService
            .getPublicFeed()
            .then(
                function(successResponse) {
                    $scope.data.loading = false;
                    $scope.data.feed = mergeFeedWithFavourites(successResponse.data.items);
                },
                function(errorResponse) {
                    $scope.data.loading = false;
                    $scope.data.error = true;
                }
            );
    };
})(angular);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsaWNrckFwcC5tb2R1bGUuanMiLCJmbGlja3Iuc2VydmljZS5qcyIsImluZGV4LmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvYW5ndWxhcmpzL2FuZ3VsYXIuZC50c1wiLz5cclxuYW5ndWxhci5tb2R1bGUoJ2ZsaWNrckFwcCcsIFsnbmdDb29raWVzJ10pOyIsIihmdW5jdGlvbihuZykge1xuICAgIG5nLm1vZHVsZSgnZmxpY2tyQXBwJylcbiAgICAgICAgLmZhY3RvcnkoJ2ZsaWNrclNlcnZpY2UnLCBbJyRodHRwJywgZmxpY2tyU2VydmljZUZhY3RvcnldKTtcblxuICAgIGZ1bmN0aW9uIGZsaWNrclNlcnZpY2VGYWN0b3J5KCRodHRwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEdldHMgZGF0YSBmcm9tIHRoZSBcInB1YmxpY1wiIEZsaWNrciBmZWVkLlxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIFNwZWNpZmljIHBhcmFtcyBmb3IgdGhlIGZlZWQgcmVxdWVzdCAob3B0aW9uYWwpLlxuICAgICAgICAgICAgICogQHNlZSBodHRwczovL3d3dy5mbGlja3IuY29tL3NlcnZpY2VzL2ZlZWRzL2RvY3MvcGhvdG9zX3B1YmxpYy9cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ2V0UHVibGljRmVlZDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBKU09OKFApIGZvcm1hdC5cbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBuZy5leHRlbmQocGFyYW1zIHx8IHt9LCB7XCJmb3JtYXRcIjpcImpzb25cIixcImpzb25jYWxsYmFja1wiOlwiSlNPTl9DQUxMQkFDS1wifSk7XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgKiBGb3IgZnVsbC1mbGVkZ2VkIFJFU1QgQVBJIHN1cHBvcnQgb25lIGNvdWxkL3Nob3VsZCB1c2UgQW5ndWxhciBSZXNvdXJjZSxcbiAgICAgICAgICAgICAgICAgKiBidXQgaXQncyBub3QgbmVlZGVkIGhlcmUgc28gSSBzdGljayB0byBzaW1wbGUgJGh0dHAuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLmpzb25wKFxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkuZmxpY2tyLmNvbS9zZXJ2aWNlcy9mZWVkcy9waG90b3NfcHVibGljLmduZScsXG4gICAgICAgICAgICAgICAgICAgIHtwYXJhbXM6cGFyYW1zLCB0aW1lb3V0OiA1MDAwfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSkoYW5ndWxhcik7IiwiKGZ1bmN0aW9uKG5nKSB7XG4gICAgbmcubW9kdWxlKCdmbGlja3JBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignSW5kZXhDb250cm9sbGVyJywgWyckc2NvcGUnLCAnZmxpY2tyU2VydmljZScsICckY29va2llcycsIGluZGV4Q29udHJvbGxlcl0pO1xuXG4gICAgZnVuY3Rpb24gaW5kZXhDb250cm9sbGVyKCRzY29wZSwgZmxpY2tyU2VydmljZSwgJGNvb2tpZXMpIHtcbiAgICAgICAgdmFyIGZhdm91cml0ZXMgPSAkY29va2llcy5nZXRPYmplY3QoJ2ZhdlBpY3MnKSB8fCBbXSxcbiAgICAgICAgICAgIG1lcmdlRmVlZFdpdGhGYXZvdXJpdGVzLFxuICAgICAgICAgICAgaXNGYXZvdXJpdGU7XG5cbmNvbnNvbGUubG9nKHdpbmRvdy4kYyA9ICRjb29raWVzKTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIFwiZXJyb3JcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxvYWRpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmVlZFwiOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGlzRmF2b3VyaXRlID0gZnVuY3Rpb24ocGljVXJsKSB7XG4gICAgICAgICAgICBpZiAoIWZhdm91cml0ZXMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gMCA8IGZhdm91cml0ZXMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHsgcmV0dXJuIGl0ZW0udXJsID09PSBwaWNVcmwgfSkubGVuZ3RoO1xuICAgICAgICB9O1xuXG4gICAgICAgIG1lcmdlRmVlZFdpdGhGYXZvdXJpdGVzID0gZnVuY3Rpb24oZmVlZCkge1xuICAgICAgICAgICAgdmFyIGl0ZW1zID0gZmF2b3VyaXRlcy5zbGljZSgpO1xuICAgICAgICAgICAgbmcuZm9yRWFjaChmZWVkLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0Zhdm91cml0ZShpdGVtLm1lZGlhLm0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe3VybDogaXRlbS5tZWRpYS5tLCBzZWxlY3RlZDogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2VsZWN0UGljID0gZnVuY3Rpb24ocGljKSB7XG4gICAgICAgICAgICBwaWMuc2VsZWN0ZWQgPSAhcGljLnNlbGVjdGVkO1xuICAgICAgICAgICAgJGNvb2tpZXMucHV0T2JqZWN0KCdmYXZQaWNzJywgJHNjb3BlLmRhdGEuZmVlZC5maWx0ZXIoZnVuY3Rpb24ocGljKSB7IHJldHVybiBwaWMuc2VsZWN0ZWQ7IH0pKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmbGlja3JTZXJ2aWNlXG4gICAgICAgICAgICAuZ2V0UHVibGljRmVlZCgpXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihzdWNjZXNzUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5mZWVkID0gbWVyZ2VGZWVkV2l0aEZhdm91cml0ZXMoc3VjY2Vzc1Jlc3BvbnNlLmRhdGEuaXRlbXMpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH07XG59KShhbmd1bGFyKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
