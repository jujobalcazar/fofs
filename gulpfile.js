// Gulpfile.js 
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
 
gulp.task('lint', function () {
	console.log("lint started");
	
	gulp.src('./**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default', { verbose: false }));
});
 
gulp.task('develop', ['lint'], function () {
	console.log("develop started");
	
	var stream = nodemon({ script: 'server.js',
          ext: 'html js vash',
          ignore: ['ignored.js']  });  //, tasks: ['lint']
 
	stream
      .on('restart', function () {
        console.log('restarted!');
      })
      .on('crash', function() {
        console.error('Application has crashed!\n');
         stream.emit('restart', 10); // restart the server in 10 seconds 
      });
});