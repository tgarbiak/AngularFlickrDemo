"use strict";

describe("simple flickr app", function() {
    beforeEach(() => {
        browser.get("http://localhost:4000");
    });

    it("should load at least 20 photos from flickr", () => {
        let feedItems = element.all(by.css('.feed > li img'));
        expect(feedItems.count()).toBeGreaterThan(19);
        feedItems.then((elements) => {
            for (let i = 0; i < elements.length; i++) {
                expect(elements[i].getAttribute('src')).toMatch(/staticflickr.com/);
            }
        })
    });

    it("should change the class of the photo when user clicks on it", () => {
        let firstPhoto = element(by.css('.feed > li:first-child a'));
        firstPhoto.click(() => firstPhoto.getAttribute('class')
            .then((className) => expect(className).toBe('selected'))
        ).click(() => firstPhoto.getAttribute('class')
            .then((className) => expect(className).not.toBe('selected'))
        );
    });

    it("should remember photos marked as favourite", () => {
        let firstPhoto = element(by.css('.feed > li:first-child a'));
        firstPhoto.click().then(() => {
            browser.refresh().then(() => {
                let firstPhoto = element(by.css('.feed > li:first-child a'));
                firstPhoto.getAttribute('class').then(
                    (className) => expect(className).toBe('selected')
                );
            });
        });
    });
});