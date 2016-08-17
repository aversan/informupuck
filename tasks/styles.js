import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import rupture from 'rupture';
import stylint from 'gulp-stylint';
import stylus from 'gulp-stylus';
import importIfExist from 'stylus-import-if-exist';
import autoprefixer from 'autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';
import postcss from 'gulp-postcss';
import responsiveType from 'postcss-responsive-type';

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => (
	gulp.src('app/styles/*.styl')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
		.pipe(stylus({
			use: [
				importIfExist(),
				rupture()
			],
			'include css': true
		}))
		.pipe(postcss([
	        responsiveType(),
	        autoprefixer({ browsers: ['last 1 version'] })
    	]))
		.pipe(gulpIf(!isDebug, gcmq()))
		.pipe(gulpIf(!isDebug, nano({zindex: false})))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(isDebug, sourcemaps.write()))
		.pipe(gulp.dest('dist/assets/styles'))
));


gulp.task('styles:lint', () => (
	gulp.src(['app/**/*.styl', '!app/styles/**'])
		//.pipe(stylint({
			//reporter: 'stylint-stylish',
			//reporterOptions: {verbose: true}
		//}))
		//.pipe(stylint.reporter())
));
