// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('karma-selenium-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    customLaunchers: {
      selenium_chrome: {
        base: 'Selenium',
        config: {
          desiredCapabilities: {
            'browserName': 'chrome'
          },
          host: 'selenium',
          port: 4444,
          path: '/wd/hub'
        },
        name: 'Karma Test',
        browserName: 'chrome'
      },
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-translate',
          '--disable-extensions',
          '--disable-dev-shm-usage'
        ]
      }
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['spec', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO, // Can also be LOG_DEBUG, LOG_DISABLE or LOG_ERROR
    autoWatch: true,
    specReporter: {
      suppressSkipped: true, // do not print information about skipped tests
    },
    hostname: 'client',
    browsers: ['selenium_chrome'],
    singleRun: true,
    restartOnFileChange: true,
    browserNoActivityTimeout: 60000
  });
};
