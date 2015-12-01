"use strict";
describe("simple flickr app", function() {
    it("should load at least 20 photos from flickr", () => {
        browser.get("http://localhost:4000");
        let feedItems = element.all(by.css('.feed > li img'));
        expect(feedItems.count()).toBeGreaterThan(19);
        feedItems.then(function(elements) {
            for (let i = 0; i < elements.length; i++) {
                expect(elements[i].getAttribute('src')).toMatch(/staticflickr.com/);
            }
        })
    });
});