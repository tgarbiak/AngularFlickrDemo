"use strict";

describe("flickrService", function() {
    var $http,
        flickrService;

    beforeEach(module('flickrApp'));
    beforeEach(inject(function(_$httpBackend_, _flickrService_) {
        $http = _$httpBackend_;
        flickrService = _flickrService_;
    }));

    it("has a getPublicFeed method", () => {
        expect(flickrService.getPublicFeed).toBeDefined();
    });

    describe("flickrService.getPublicFeed", () => {
        it("calls Flickr service to get public feed", () => {
            $http.expectJSONP(/^https:\/\/api\.flickr\.com\/services\/feeds\/photos_public\.gne/)
                .respond(200);
            flickrService.getPublicFeed();
            $http.flush();
        });

        it("always uses JSON format", () => {
            $http.expectJSONP(/photos_public\.gne\?format=json/)
                .respond(200);
            flickrService.getPublicFeed({"format":"atom"});
            $http.flush();
        });

        it("sets jsoncallback to be JSON_CALLBACK", () => {
            $http.expectJSONP(/jsoncallback=JSON_CALLBACK$/)
                .respond(200);
            flickrService.getPublicFeed();
            $http.flush();
        });

        it("accepts additional parameters", () => {
            $http.expectJSONP(/lang=pl/)
                .respond(200);
            flickrService.getPublicFeed({"lang":"pl"});
            $http.flush();
        });

        it("returns promise", () => {
            $http.expectJSONP().respond(200);
            let resp = flickrService.getPublicFeed();
            expect(Object.keys(resp)).toEqual(jasmine.arrayContaining(["success","error"]));
        });
    })

    afterEach(() => {
        $http.verifyNoOutstandingRequest();
        $http.verifyNoOutstandingRequest();
    });
});