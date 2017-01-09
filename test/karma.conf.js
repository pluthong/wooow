module.exports = function (config) {
    config.set({

        basePath: '../',

        files: [
		  'public/bower_components/angular/angular.js',
          'public/bower_components/angular-mocks/angular-mocks.js',
		  'public/bower_components/angular-animate/angular-animate.js',
          'public/bower_components/angular-route/angular-route.js',
          'public/bower_components/angular-resource/angular-resource.js',
		  'public/bower_components/jquery/dist/jquery.min.js',
		  'public/js/app/**/*.js',
		  'test/unit/**/*.js'
        ],

        // list of files to exclude
        exclude: [
            'test/unit/**/controllersSpec.js',
            'test/unit/**/testSpec.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

        // Firefox
		browsers: ['Chrome'],

	    // karma-firefox-launcher
		plugins: [
				'karma-chrome-launcher',
                'karma-firefox-launcher',
				'karma-jasmine'
		],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}

	});
};