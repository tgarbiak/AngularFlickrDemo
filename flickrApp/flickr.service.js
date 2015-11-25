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