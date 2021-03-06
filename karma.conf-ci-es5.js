/* eslint-disable func-names */
module.exports = function (config) {
  // Browsers to run on Sauce Labs
  // eslint-disable-next-line no-var
  var customLaunchers = {
    SL_IE_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11',
    },
  };

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/*/*/*.js',
      'tests/*/*.js',
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],

    // web server port
    port: 9899,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN
    // || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    sauceLabs: {
      testName: 'Web App Unit Tests',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      startConnect: true,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log',
      },
    },

    captureTimeout: 120000,
    customLaunchers,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Object.keys(customLaunchers),
    singleRun: true,
  });
};
