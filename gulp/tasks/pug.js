'use strict';

module.exports = function() {

  $.gulp.task('pug', function() {
    //var YOUR_LOCALS = require('content.json');

    return $.gulp.src('./source/template/pages/*.pug')
      .pipe($.gp.pug({
        pretty: '\t'
        //locals: YOUR_LOCALS
      }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        }
       }))
      .pipe($.gulp.dest($.config.root));
  });
};
