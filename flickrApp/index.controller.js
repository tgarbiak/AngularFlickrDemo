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
                function(errorResponse) {
                    $scope.data.loading = false;
                    $scope.data.error = true;
                }
            );
    };
})(angular);