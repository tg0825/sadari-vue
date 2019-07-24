var gulp = require('gulp');
var bs = require('browser-sync').create();
var php = require('gulp-connect-php');
var pkg = require('./package.json');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var projectPath = {
    src: './resources/src',
    dev: './resources/dev',
    public: './resources/dist'
};

var entryFile = {
    scss: projectPath.src + '/css/autoload.scss'
};

// 파일명
var fileNames = {
    vendor: 'vendor.client',
    jsFile: 'idus.web',
    cssFile: 'idus.web'
};

// js concat 순서
var clientJS = [
    !projectPath.src + '/js/ignore/**', // ignore
    projectPath.src + '/js/modules/_init.js', // init script
    projectPath.src + '/js/modules/**.js', // load modules
    projectPath.src + '/js/**.js'
];

var vendorJS = [
    './resources/src/vendor/polyfills/dataset.js',
    './node_modules/es6-promise/dist/es6-promise.auto.min.js',
    './node_modules/html5shiv/dist/html5shiv.min.js',
    './node_modules/axios/dist/axios.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery-validation/dist/jquery.validate.min.js',
    './node_modules/jquery-validation/dist/localization/messages_ko.js'
];

// DEV TASKS /////////////////////////////////////////////////////////////////////////

gulp.task('SCSS', function() {
    return gulp.src(entryFile.scss);
});

// projectPath.dev경로 SCSS 처리
gulp.task('devSCSS', function() {
    return gulp
        .src(entryFile.scss)
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                errLogToConsole: false,
                outputStyle: 'expanded'
            }).on('error', sass.logError)
        )
        .pipe(rename(fileNames.cssFile + '.css'))
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions', 'ie 8', '> 5%'],
                cascade: false
            })
        )
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(projectPath.dev + '/css'))
        .pipe(bs.stream());
});

// projectPath.dev경로 JS 처리
gulp.task('devJS', function() {
    return gulp
        .src(clientJS)
        .pipe(sourcemaps.init())
        .pipe(
            concat({
                path: fileNames.jsFile + '.js'
            })
        )
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(projectPath.dev + '/js'))
        .pipe(bs.stream());
});

// 이미지 스프라이트 옵션
var spOpt = {
    img: projectPath.src + '/images/sp/**/*.png',
    css: projectPath.src + '/css/sp',
    devImg: projectPath.dev + '/images',
    devCss: projectPath.dev + '/css',
    distImg: projectPath.public + '/images',
    distCss: projectPath.public + '/css',
    bgPath: '../images/sp/',
    addTheme: function(data) {
        var info = data.spritesheet_info;
        var match = info.name.match(/hover--(\w+)/);
        data.theme = match && match[1];
    }
};

// DEV 이미지 스프라이트 생성
gulp.task('devSprite', function() {
    var util = spritesmith.util;
    var themeTemplate = util.createTemplate(
        path.join(
            __dirname + '/resources/src/css',
            'sp-template',
            'sp-css.hbs'
        ),
        [spOpt.addTheme, util.addPseudoClass]
    );

    var opts = {
        spritesmith: function(options, sprite, icons) {
            options.retinaImgPath = spOpt.bgPath + options.imgName;
            options.imgPath = spOpt.bgPath + options.imgName;
            options.cssTemplate = themeTemplate;
            options.cssSpritesheetName = sprite;
            options.padding = 15;
            options.cssName = sprite + '.scss';
            options.cssVarMap = function(sp) {
                sp.name = sp.name;
            };
            return options;
        }
    };

    var spriteData = gulp
        .src(spOpt.img)
        .pipe(spritesmith(opts))
        .on('error', function(err) {
            console.log(err);
        });

    del([spOpt.devCss + '/*', spOpt.devImg + '/*']);
    spriteData.img.pipe(gulp.dest(spOpt.devImg + '/sp'));
    spriteData.css.pipe(gulp.dest(spOpt.css));
});

/**
 * browserSync
 * 1. php 실행
 */
gulp.task('browser-sync', function() {
    php.server({
        port: 8001
    });
    bs.init({
        baseDir: './',
        proxy: '0.0.0.0:8001',
        port: 8080,
        open: true,
        notify: false,
        browser: ['google chrome']
    });
});

/**
 * 개발용 task (frontend 개발용)
 * 1. browser-sync 실행
 * 2. sass 실행
 * 3. css, js 파일 감시
 */
gulp.task(
    'default',
    ['browser-sync', 'devSCSS', 'devJS', 'devSprite'],
    function() {
        gulp.watch(projectPath.src + '/**/*.scss', ['devSCSS']);
        gulp.watch(projectPath.src + '/**/*.js', ['devJS']);
        gulp.watch(['./**/*.php'], bs.reload);
    }
);

gulp.task('bs', ['browser-sync'], function() {
    gulp.watch(['./**/*.php', './**/*.css', './**/*.js'], bs.reload);
});
