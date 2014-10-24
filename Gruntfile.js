/*
 * grunt-remove-duplicates
 * https://github.com/komlev/grunt-remove-duplicates
 *
 * Copyright (c) 2014 komlev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    remove_duplicates: {
      main: {
        src: './test/fixtures/simple.html',
        dest: './tmp/example.html'
      },
      default_options: {
        options: {
          //keeps only first entry
          keepLast: false
        },
        files: [
          {cwd: './test/fixtures/', src: './*', dest: 'tmp/', expand: true}
        ]
      },
      custom_options: {
        options: {
          //removes duplications except last entry
          keepLast: true
        },
        files: [
          {src: './test/fixtures/simple.html', dest: './tmp/keeplast.html'}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'remove_duplicates', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
