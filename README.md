# gulp-responsive-images

## Install

Install with [npm](https://npmjs.org/package/gulp-image-resize)

```
npm install --save-dev gulp-responsive-images
```

### GraphicsMagick

gulp-responsive-images requires GraphicsMagick to function. Installation is simple:

Ubuntu:

```shell
apt-get install graphicsmagick
```

Mac OS X (using [Homebrew](http://brew.sh/)):

```shell
brew install graphicsmagick
```

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
        crop: true
      }]
    }))
    .pipe(gulp.dest('dist/images'));
});
```
