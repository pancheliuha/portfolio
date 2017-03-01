'use strict';

    global.$ = {
        package: require('./package.json'),
        config: require('./gulp/config'),
        path: {
            task: require('./gulp/paths/tasks.js'),
            jsFoundation: require('./gulp/paths/js.foundation.js'),
            cssFoundation: require('./gulp/paths/css.foundation.js'),
            jsSvgxuse: require('./gulp/paths/svgxuse.js'),
            app: require('./gulp/paths/app.js')
        },
        gulp: require('gulp'),
        rimraf: require('rimraf'),
        browserify: require('browserify'),
        vinyl: require('vinyl-source-stream'),
        buffer: require('vinyl-buffer'),
        browserSync: require('browser-sync').create(),
        gp: require('gulp-load-plugins')()
    }

    $.path.task.forEach(function(taskPath) {
        require(taskPath)();
    });

    $.gulp.task('default', $.gulp.series(
        'clean',
        $.gulp.parallel(
            'sass',
            'pug',
            'js:foundation',
            'js:svgxuse',
            'js:process',
            'copy:image',
            'copy_fonts',
            'css:foundation',
            'sprite:svg'
        ),
        $.gulp.parallel(
            'watch',
            'serve'
        )
    ));
