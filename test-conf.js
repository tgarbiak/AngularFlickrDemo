exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/index-spec.js'],
    framework: 'jasmine'
};