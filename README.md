# gulp-responsive-images

A simple Gulp plugin that allows the resizing and renaming of images, primarily for responsive applications. It uses GraphicsMagick to allow simple resizing, cropping, quality control and more.

## Install

Install with [npm](https://npmjs.org/package/gulp-responsive-images).

```
npm install --save-dev gulp-responsive-images
```

### GraphicsMagick

gulp-responsive-images requires GraphicsMagick to function. Installation is simple:

#### Ubuntu:

```shell
apt-get install graphicsmagick
```

#### Mac OS X (using [Homebrew](http://brew.sh/)):

```shell
brew install graphicsmagick
```

#### Windows (XP, Vista, 7, 8, and 10) 32- or 64-bit:

Decide upon [Q8 or Q16](http://www.graphicsmagick.org/INSTALL-windows.html#retrieve-install-package):
> A Q8 version is fine for processing typical photos intended for viewing on a computer screen. If you are dealing with film, scientific, or medical images, use ICC color profiles, or deal with images that have limited contrast, then the Q16 version is recommended.

[Download](http://www.graphicsmagick.org/download.html/) and Install, be sure that "Update executable search path" is checked  during installation.

## Options

```js
// Image.js

var images = {
  'hero.png': [
      {
      crop: false,
      format: null,
      gravity: 'Center',
      height: 100,
      overwrite: true,
      quality: 100,
      rename: null,
      percentage: false,
      sharpen: false,
      suffix: '-100'
      upscale: false,
      width: 100
    }
  ]
};
module.exports = images;      
});
```

Can also be used within the pipe to overwrite specific file configurations.

## Example

```js
var gulp = require('gulp');
var responsive = require('gulp-responsive-images');

gulp.task('default', function () {
  gulp.src('source/images/**/*')
    .pipe(responsive({
      'hero.png': [{
        width: 100,
        suffix: '-100'
      }, {
        width: 100 * 2,
        suffix: '-100-2x'
      }],
      '*.png': [{
        width: 600,
        crop: true,
        gravity: 'Center'
      }]
    }))
    .pipe(gulp.dest('dist/images'));
});
```
