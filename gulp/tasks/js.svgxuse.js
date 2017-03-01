'use strict';

module.exports = function() {
    $.gulp.task('js:svgxuse', function() {
        return $.gulp.src($.path.jsSvgxuse)
            .pipe($.gp.concat('svgxuse.js'))
            .pipe($.gulp.dest($.config.root + '/assets/js'))
    })
};
