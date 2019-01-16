"use strict";

import gulp from 'gulp';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';


const reload = browserSync.reload;

const paths = {
    css: {
        src: 'src/*.css',
        dest: './dist/',
        watch: 'src/*.css',
        demo: 'demo/'
    },
    js: {
        src: 'src/guinguette.js',
        dest: './dist/',
        watch: 'src/*.js',
        demo: 'demo/'
    },
    html: {
        watch: 'demo/**/*.html'
    }
};

/* config
---------------------------------------------------- */

gulp.task('css', () => {
    return gulp.src(paths.css.src)
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 3 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.css.dest))
        .pipe(gulp.dest(paths.css.demo))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('js', () => {
    return browserify({
        entries: [paths.js.src],
        standalone: 'Guinguette'
    })
        .transform('babelify', {
            presets: ['env'],
            global: true,
            ignore: /node_modules/
        })
        .bundle()
        .pipe(source('guinguette.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(gulp.dest(paths.js.demo))
        .pipe(reload({
            stream: true
        }));
});

/**
 * Watch files for changes
 */

gulp.task('browser-sync', () => {
    browserSync({
        open: false,
        server: {
            baseDir: "demo",
            index: "index.html",
        }
    });
});

gulp.task('bs-reload', () => {
    browserSync.reload();
});

gulp.task('watch', gulp.series('browser-sync', () => {
    gulp.watch(paths.css.watch, ['css']);
    gulp.watch(paths.js.watch, ['js']);
    gulp.watch(paths.html.watch, ['bs-reload']);
}));


gulp.task('default', gulp.series('css', 'js'));
