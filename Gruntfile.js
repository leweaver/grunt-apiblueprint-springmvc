/*
 * grunt-apiblueprint-springmvc
 * https://github.com/ransico/apiblueprint-springmvc
 *
 * Copyright (c) 2015 Lewis Weaver
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    apibspringmvc: {
      tests: {
        options: {
          includePath: 'test/fixtures',
          packagePrefix: 'my.package'
        },
        files: {
          './tmp': ['test/fixtures/test*.apib']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'apibspringmvc:tests', 'nodeunit:tests']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
