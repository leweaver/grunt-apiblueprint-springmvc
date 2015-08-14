/*
 * grunt-apiblueprint-springmvc
 * https://github.com/ransico/apiblueprint-springmvc
 *
 * Copyright (c) 2015 Lewis Weaver
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var generator = require('apiblueprint-springmvc');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('apibspringmvc', 'Allows execution of the apiblueprint-springmvc task, to generate SpringMVC source files from an apiblueprint specification.', function () {

    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      includePath: null,
      filterInput: true,
      encoding: 'utf8',
      packagePrefix: null
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      var filepaths = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        return filepath;
      });

      // Process files
      filepaths.forEach(function(filepath) {
        grunt.log.writeln('parsing file "' + filepath + '"');
        generator.render(filepath, file.dest + '', options, function(err) {
          if (err) {
            grunt.log.error(err.message || err);
            done(false);
          } else {
            // Print a success message.
            grunt.log.writeln('Files created in "' + file.dest + '".');
            done(true);
          }
        });
      });
    });
  });

};
