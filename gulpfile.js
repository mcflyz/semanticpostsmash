const gulp = require('gulp'),
concat = require('gulp-concat'),
cleanCSS = require('gulp-clean-css'),
sass = require('gulp-sass'),
browserSync = require('browser-sync').create(),
uglify = require('gulp-uglify-es').default;

//all files are moved to dist
//html -> update user html
//css -> update user css
//js -> update user js
//js-lib -> update js libs
//css-lib -> update css libs
//default -> update user html, css, js
//full -> update everything

//single tasks
gulp.task('sass', () => gulp.src('app/scss/**/*.scss')
                            .pipe(sass())
                            .pipe(gulp.dest('app/css/'))
                            .pipe(browserSync.reload({
                                stream: true
                              }))
);

gulp.task('htm', () => gulp.src('app/*.htm*')
                            .pipe(concat('index.htm'))
                            .pipe(gulp.dest('dist/'))
);

gulp.task('css', () => gulp.src('app/css/*.css')
                            .pipe(concat('style.css'))
                            .pipe(cleanCSS())
                            .pipe(gulp.dest('dist/css'))
);

gulp.task('js', () => gulp.src('app/js/*.js')
                            .pipe(concat('script.js'))
                            .pipe(uglify())
                            .pipe(gulp.dest('dist/js'))
);

gulp.task('js-lib', () => gulp.src('node_modules/jquery/dist/jquery.min.js')
                                .pipe(concat('lib.js'))
                                .pipe(uglify())
                                .pipe(gulp.dest('dist/js/lib'))
);

//watch
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.series('sass')); 
})

//short tasks
gulp.task('dev', gulp.series('sass','htm', 'css', 'js'));
gulp.task('prod', gulp.series('dev', 'js-lib'));