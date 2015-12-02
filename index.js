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
                function() {
                    $scope.data.loading = false;
                    $scope.data.error = true;
                }
            );
    };
})(angular);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsaWNrckFwcC5tb2R1bGUuanMiLCJmbGlja3Iuc2VydmljZS5qcyIsImluZGV4LmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9hbmd1bGFyanMvYW5ndWxhci5kLnRzXCIvPlxyXG5hbmd1bGFyLm1vZHVsZSgnZmxpY2tyQXBwJywgWyduZ0Nvb2tpZXMnXSk7IiwiKGZ1bmN0aW9uKG5nKSB7XG4gICAgbmcubW9kdWxlKCdmbGlja3JBcHAnKVxuICAgICAgICAuZmFjdG9yeSgnZmxpY2tyU2VydmljZScsIFsnJGh0dHAnLCBmbGlja3JTZXJ2aWNlRmFjdG9yeV0pO1xuXG4gICAgZnVuY3Rpb24gZmxpY2tyU2VydmljZUZhY3RvcnkoJGh0dHApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogR2V0cyBkYXRhIGZyb20gdGhlIFwicHVibGljXCIgRmxpY2tyIGZlZWQuXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gU3BlY2lmaWMgcGFyYW1zIGZvciB0aGUgZmVlZCByZXF1ZXN0IChvcHRpb25hbCkuXG4gICAgICAgICAgICAgKiBAc2VlIGh0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvZmVlZHMvZG9jcy9waG90b3NfcHVibGljL1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBnZXRQdWJsaWNGZWVkOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBvbmx5IGFsbG93IEpTT04oUCkgZm9ybWF0LlxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IG5nLmV4dGVuZChwYXJhbXMgfHwge30sIHtcImZvcm1hdFwiOlwianNvblwiLFwianNvbmNhbGxiYWNrXCI6XCJKU09OX0NBTExCQUNLXCJ9KTtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAqIEZvciBmdWxsLWZsZWRnZWQgUkVTVCBBUEkgc3VwcG9ydCBvbmUgY291bGQvc2hvdWxkIHVzZSBBbmd1bGFyIFJlc291cmNlLFxuICAgICAgICAgICAgICAgICAqIGJ1dCBpdCdzIG5vdCBuZWVkZWQgaGVyZSBzbyBJIHN0aWNrIHRvIHNpbXBsZSAkaHR0cC5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAuanNvbnAoXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL2FwaS5mbGlja3IuY29tL3NlcnZpY2VzL2ZlZWRzL3Bob3Rvc19wdWJsaWMuZ25lJyxcbiAgICAgICAgICAgICAgICAgICAge3BhcmFtczpwYXJhbXMsIHRpbWVvdXQ6IDUwMDB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59KShhbmd1bGFyKTsiLCIoZnVuY3Rpb24obmcpIHtcbiAgICBuZy5tb2R1bGUoJ2ZsaWNrckFwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdJbmRleENvbnRyb2xsZXInLCBbJyRzY29wZScsICdmbGlja3JTZXJ2aWNlJywgJyRjb29raWVzJywgaW5kZXhDb250cm9sbGVyXSk7XG5cbiAgICBmdW5jdGlvbiBpbmRleENvbnRyb2xsZXIoJHNjb3BlLCBmbGlja3JTZXJ2aWNlLCAkY29va2llcykge1xuICAgICAgICB2YXIgZmF2b3VyaXRlcyA9ICRjb29raWVzLmdldE9iamVjdCgnZmF2UGljcycpIHx8IFtdLFxuICAgICAgICAgICAgbWVyZ2VGZWVkV2l0aEZhdm91cml0ZXMsXG4gICAgICAgICAgICBpc0Zhdm91cml0ZTtcblxuICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgIFwiZXJyb3JcIjogZmFsc2UsXG4gICAgICAgICAgICBcImxvYWRpbmdcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmVlZFwiOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGlzRmF2b3VyaXRlID0gZnVuY3Rpb24ocGljVXJsKSB7XG4gICAgICAgICAgICBpZiAoIWZhdm91cml0ZXMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gMCA8IGZhdm91cml0ZXMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHsgcmV0dXJuIGl0ZW0udXJsID09PSBwaWNVcmwgfSkubGVuZ3RoO1xuICAgICAgICB9O1xuXG4gICAgICAgIG1lcmdlRmVlZFdpdGhGYXZvdXJpdGVzID0gZnVuY3Rpb24oZmVlZCkge1xuICAgICAgICAgICAgdmFyIGl0ZW1zID0gZmF2b3VyaXRlcy5zbGljZSgpO1xuICAgICAgICAgICAgbmcuZm9yRWFjaChmZWVkLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0Zhdm91cml0ZShpdGVtLm1lZGlhLm0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe3VybDogaXRlbS5tZWRpYS5tLCBzZWxlY3RlZDogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuc2VsZWN0UGljID0gZnVuY3Rpb24ocGljKSB7XG4gICAgICAgICAgICBwaWMuc2VsZWN0ZWQgPSAhcGljLnNlbGVjdGVkO1xuICAgICAgICAgICAgJGNvb2tpZXMucHV0T2JqZWN0KCdmYXZQaWNzJywgJHNjb3BlLmRhdGEuZmVlZC5maWx0ZXIoZnVuY3Rpb24ocGljKSB7IHJldHVybiBwaWMuc2VsZWN0ZWQ7IH0pKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmbGlja3JTZXJ2aWNlXG4gICAgICAgICAgICAuZ2V0UHVibGljRmVlZCgpXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihzdWNjZXNzUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5mZWVkID0gbWVyZ2VGZWVkV2l0aEZhdm91cml0ZXMoc3VjY2Vzc1Jlc3BvbnNlLmRhdGEuaXRlbXMpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfTtcbn0pKGFuZ3VsYXIpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
