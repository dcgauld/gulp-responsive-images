'use strict';

var _ = require('lodash');
var async = require('async');
var gm = require('gm');
var gutil = require('gulp-util');
var path = require('path');
var rename = require('rename');

module.exports = function (file, options, callback) {
  var gmFile = gm(file.contents);

  options = _.defaults(options, {
    crop: false,
    format: null,
    gravity: 'Center',
    overwrite: true,
    quality: 100,
    rename: null,
    percentage: false,
    sharpen: false,
    upscale: false
  });

  async.waterfall([
    function (callback) {
      gmFile.size(callback);
    },

    function (size, callback) {
      if (options.filter != null) {
        gmFile = gmFile.filter(options.filter);
      }

      if (options.height !== null || options.width !== null) {
        var isPercentage = options.percentage;
        var qualifier = isPercentage ? '%' : null;
        var isUpscaled = (options.width && size.width < options.width) ||
          (options.height && size.height < options.height);

        if (options.upscale || !isUpscaled || isPercentage) {
          //Allow to specify only one "percentage" and default the other to
          //to the same value
          if (isPercentage) {
            options.height = options.height || options.width;
            options.width = options.width || options.height;
          } else if (isUpscaled) {
            if (!options.height) {
              options.height = Math.ceil((options.width / size.width) * size.height);
            }
            if (!options.width) {
              options.width = Math.ceil((options.height / size.height) * size.width);
            }
          }

          if (options.crop) {
            gmFile = gmFile.resize(options.width, options.height, '^');
            gmFile = gmFile.gravity(options.gravity);
            gmFile = gmFile.crop(options.width, options.height);
          } else {
            gmFile = gmFile.resize(options.width, options.height, qualifier);
          }
        }
      }

      if (options.format) {
        gmFile = gmFile.setFormat(options.format);
      }

      if (options.quality >= 0 && options.quality <= 100) {
        gmFile = gmFile.quality(options.quality);
      }

      if (options.samplingFactor) {
        gmFile = gmFile.samplingFactor(options.samplingFactor[0], options.samplingFactor[1]);
      }

      if (options.sharpen) {
        gmFile = gmFile.unsharp('1.5x1+0.7+0.02');
      }

      gmFile.toBuffer(function (err, buffer) {
        var filePath = file.path;

        if (options.rename) {
          filePath = path.join(file.base, rename(file.relative, options.rename));
        }

        if (options.suffix) {
          filePath = path.join(file.base, rename(file.relative, {
            suffix: options.suffix
          }));
        }

        var newFile = new gutil.File({
          cwd: file.cwd,
          base: file.base,
          path: filePath,
          contents: buffer
        });

        callback(null, newFile);
      });
    }
  ], callback);
};
