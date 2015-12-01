"use strict";

describe("IndexController", function() {
    var flickrService,
        indexController,
        $cookies,
        scope,
        $controller,
        $q;

    beforeEach(module('flickrApp'));
    beforeEach(inject(function(_flickrService_, _$cookies_, _$controller_, $rootScope, _$q_) {
        flickrService = _flickrService_;
        $cookies = _$cookies_;
        scope = $rootScope.$new();
        $controller = _$controller_;
        $q = _$q_;
    }));

    describe("in its initial state", () => {

        beforeEach(() => {
            indexController = $controller('IndexController', {$scope: scope});
        });

        it("should have data property in its scope", () => {
            expect(scope.data).toBeDefined();
        });

        it("should have 3 keys in the scope.data: 'error', 'loading', 'feed'", () => {
            expect(scope.data).toEqual(jasmine.objectContaining({
                error: false,
                loading: true
            }));
        });
    });

    describe("with no favourite pics in the cookies", () => {
        var defer;

        beforeEach(() => {
            defer =  $q.defer();
            spyOn($cookies, 'getObject').and.returnValue([]);
            spyOn(flickrService, 'getPublicFeed').and.returnValue(defer.promise);
            indexController = $controller('IndexController', {$scope: scope});
        });

        it("should read the data from Flickr service, store it in the scope and change 'loading' to false", () => {
             defer.resolve({
                data: {
                    items:[
                        {media: {m: "url to the picture"}},
                    ]
                }
            });
            scope.$apply();
            expect(scope.data.feed.length).toBe(1);
            expect(scope.data.feed[0]).toEqual(jasmine.objectContaining({
                url:"url to the picture",
                selected: false
            }));
            expect(scope.data.loading).toBe(false);
        });

        it("should set error to true when Flick service respond with an error", () => {
            defer.reject();
            scope.$apply();
            expect(scope.data.error).toBe(true);
        });
    });

    describe("with some favourite pics stored in the cookies", () => {
        var defer,
            cookieDataToStore,
            items = [
                {media: {m: "url to the picture"}},
                {media: {m: "cookie"}},
            ],
            findSelectedImage = (items) => {
                return items.filter((item) => item.selected)[0];
            },
            findNotSelectedImage = (items) => {
                return items.filter((item) => !item.selected)[0];
            }

        beforeEach(() => {
            defer =  $q.defer();
            spyOn($cookies, 'getObject').and.returnValue([{url:"cookie",selected:true}]);
            spyOn($cookies, 'putObject').and.callFake((key, val) => {
                cookieDataToStore = val;
            });
            spyOn(flickrService, 'getPublicFeed').and.returnValue(defer.promise);
            indexController = $controller('IndexController', {$scope: scope});
            defer.resolve({ data: { items: items } });
            scope.$apply();
        });

        it("should read the data from Flickr service and mix it with the favourites stored in the cookie (avoiding duplicates)", () => {
            expect(scope.data.feed.length).toBe(2);
            expect(scope.data.feed[0]).toEqual(jasmine.objectContaining({
                url:"cookie",
                selected: true
            }));
            expect(scope.data.feed[1]).toEqual(jasmine.objectContaining({
                url:"url to the picture",
                selected: false
            }));
            expect(scope.data.loading).toBe(false);
        });

        describe("when user clicks on a picture that wasn't yet marked as favourite", () => {
            it("should mark that image as selected and store it in the cookie", () => {
                scope.selectPic(findNotSelectedImage(scope.data.feed));
                scope.$apply();
                expect(cookieDataToStore.length).toBe(2);
                expect(cookieDataToStore[0]).toEqual(jasmine.objectContaining(scope.data.feed[0]));
                expect(cookieDataToStore[1]).toEqual(jasmine.objectContaining(scope.data.feed[1]));
            })
        });

        describe("when user clicks on a picture that is a favourite", () => {
            it("should remove that picture from the favourites", () => {
                scope.selectPic(findSelectedImage(scope.data.feed));
                scope.$apply();
                expect(cookieDataToStore.length).toBe(0);
            })
        });
    });
});