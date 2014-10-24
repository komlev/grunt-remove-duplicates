/*
* grunt-remove-duplicates
* https://github.com/komlev/grunt-remove-duplicates
*
* Copyright (c) 2014 komlev
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {
  var _ = require('lodash');
  var path = require('path');

  var detectDestType = function(dest) {
    if (grunt.util._.endsWith(dest, '/')) {
      return 'directory';
    } else {
      return 'file';
    }
  };

  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };

  var removeDups = function(content, options) {
    var match,
      dup,
      tmp,
      ind,
      map={},
      dups = [],
      srcs=[],
      regexp = /\s*<script[^>]+src="?([^"\s]+)"?\s*>\s*<\/script>/gm;
    while (match = regexp.exec(content)) {
      srcs.push(match[1]);
    }

    _.each(srcs, function(item) {
      if (map[item] !== undefined) {
         map[item] = map[item] + 1;
         if (dups.indexOf(item) === -1) {
          dups.push(item);
         }
      } else {
        map[item] = 0;
      }
    });
    for (var i = 0; i < dups.length; i++) {
      dup = dups[i];
      tmp = 'REMOVE_DUPLICATES_PLACEHOLDER_' + i;

      if (options.keepLast) {
        ind = content.lastIndexOf(dup);
        content = content.substr(0, ind) + tmp + content.substr(ind + dup.length);
      } else {
        content = content.replace(dup, tmp);
      }
      regexp = new RegExp('\\s*<script[^>]+src="' + dup + '"?\\s*>\\s*<\/script>', 'gm');
      content = content.replace(regexp, '');
      content = content.replace(tmp, dup);
      grunt.log.writeln('Duplications of "' + dup + '": ' + map[dup]);
    }

    return content;
    };

  //runs removes on files
  var runDups = function(files, options) {
    var isExpandedPair, dest, filepath;

    files.forEach(function(filePair) {
      isExpandedPair = filePair.orig.expand || false;

      filePair.src.forEach(function(src) {
        if (detectDestType(filePair.dest) === 'directory') {
          dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
        } else {
          dest = filePair.dest;
        }

        if (grunt.file.isDir(src)) {
          return;
        }

        if (!grunt.file.exists(src)) {
          grunt.log.warn('Source file "' + src + '" not found.');
          return false;
        }

        var content = removeDups(grunt.file.read(src), options);
        grunt.log.writeln('Processing "' + src + '" -> "' + dest + '"');
        grunt.file.write(dest, content);
      });
    });
  };

  grunt.registerMultiTask('remove_duplicates', 'Removes scripts duplicates from HTML files', function() {
    var options = this.options({
      keepLast: false,
    });
    runDups(this.files, options);
  });
};