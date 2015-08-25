'use strict';

var _ = require('lodash');
var async = require('async');
var gm = require('./gm');
var minimatch = require('minimatch');
var through2 = require('through2');

var PLUGIN_NAME = require('../package.json').name;

module.exports = function (config) {
  return through2.obj(function (file, enc, done) {
    var _this = this;
    var files = [];

    for (var name in config) {
      if (config.hasOwnProperty(name)) {
        var match = minimatch(file.relative, name);
        if (match) {
          files.push(config[name]);
        }
      }
    }

    async.each(files, function (fileOptions, callback) {
      async.each(fileOptions, function (options, callback) {
        return gm(file, options, function (err, newFile) {
          if (newFile) {
            _this.push(newFile);
          }
          callback();
        });
      }, callback);
    }, done);
  });
};
