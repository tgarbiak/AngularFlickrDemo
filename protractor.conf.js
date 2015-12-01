exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/end-to-end/*.spec.js'],
    framework: 'jasmine'
};