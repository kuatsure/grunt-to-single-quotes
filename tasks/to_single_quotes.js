/*
 * grunt-to-single-quotes
 *
 *
 * Copyright (c) 2014 Jarrett Drouillard
 * Licensed under the MIT license.
 */

'use strict';

var toSingleQuotes = require('to-single-quotes');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('to_single_quotes', 'Replaces double ( escaped or otherwise ) quotes with single quotes.', function () {
    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(' '));

      // Write the destination file.
      grunt.file.write(file.dest, toSingleQuotes(src));

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
