;(function(){
	/*
	 *==============================================
	 *Gulp 插件
	 *==============================================
	 *gulp-sass : 将scss编译成css
	 *gulp-cssnano: 压缩css
	 *gulp-autoprefixer: 通过生成浏览器前缀兼容css3特性
	 *gulp-postcss: 主要结合postcss-px2rem插件动态将css的px的单位转换成rem单位
	 *postcss-px2rem:  同上
	 *gulp-sourcemaps: gulp.js source map support
	 *gulp-jshint:  javascript代码语法合法性检测
	 *map-stream:   construct pipes of streams of events
	 *gulp-uglify:  压缩javascript
	 *gulp-imagemin: 压缩图片
	 *gulp-useref: 优化HTML文件里面的引用的js或者css文件
	 *gulp-if:     条件运行任务
	 *gulp-cache: gulp中的缓存代理
	 *del:    删除文件和目录
	 *gulp-changed: 只让修改的文件通过
	 *run-sequence:顺序执行任务
	 *browser-sync: 浏览器同步&重新加载
	 *gulp-plumber:阻止发生错误时导致中断
	 *
	 */
	var gulp = require('gulp'),
		sass = require('gulp-sass'),
		cssnano = require('gulp-cssnano'),
		autoprefixer = require('gulp-autoprefixer'),
		postcss = require('gulp-postcss'),
		px2rem = require('postcss-px2rem'),
		sourcemaps = require('gulp-sourcemaps'),
		jshint = require('gulp-jshint'),
		stylish = require('jshint-stylish'),
		map = require('map-stream'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		useref = require('gulp-useref'),
		gulpIf = require('gulp-if'),
		cache = require('gulp-cache'),
		del = require('del'),
		changed = require('gulp-changed'),
		runSequence = require('run-sequence'),
		browserSync = require('browser-sync').create(),
		plumber = require('gulp-plumber'),
		paths = {
			root:'./',
			source:{
				root:'src/',
				scss:'src/assets/scss/',
				styles:'src/assets/css/',
				scripts:'src/assets/js/',
				images:'src/assets/imgs/',
				fonts:'src/assets/fonts/',
				plugins:'src/assets/plugins/'
			},
			build:{
				root:'build/',
				styles:'build/assets/css/',
				scripts:'build/assets/js/',
				images:'build/assets/imgs/',
				fonts:'build/assets/fonts/',
				plugins:'build/assets/plugins/'
			}
		},
		config = {
			remUnit: 75
		};

		/*
		 *===========================================
		 *开发阶段Tasks
		 *==========================================
		 */
		//将scss编译成CSS Task
		gulp.task('sass', function() {
	        var processors = [px2rem({ remUnit: config.remUnit })];
	        return gulp.src(paths.source.scss + '*.scss')
	            .pipe(changed(paths.source.root, { extension: '.scss' }))
	            .pipe(plumber())
	            .pipe(sass())
	            .pipe(sourcemaps.init())
	            .pipe(autoprefixer({
	                browsers: ['last 3 versions'],
	                cascade: false
	            }))
	            .pipe(postcss(processors))
	            .pipe(sourcemaps.write(paths.root))
	            .pipe(gulp.dest(paths.source.styles))
	            .pipe(browserSync.reload({
	                stream: true
	            }));
	    });
		//js语法检测 Task
		gulp.task('hint',function(){
			return gulp.src(paths.source.scripts+'**/*.js')
				.pipe(jshint())
				.pipe(jshint.reporter(stylish));
		});
		//浏览器同步 Task
		gulp.task('liveload',function(){
			browserSync.init({
				server:{
					baseDir:paths.source.root
				},
				open:"external"  //自己浏览器的IP
			});
		});
		//清理src/assets/css文件夹 Task
		gulp.task('clean:css',function(){
			return del.sync(paths.source.styles);
		});
		//文件修改监听 Task
		gulp.task('watch',['liveload','sass','hint'],function(){
			gulp.watch(paths.source.scss+'**/*.scss',['sass']);
			gulp.watch(paths.source.root+'**/*.html',browserSync.reload);
			gulp.watch(paths.source.scripts+'**/*.js',browserSync.reload);
		});

		/*
		 *===================================
		 *构建阶段 Tasks
		 *===================================
		 */

		//压缩js和css Task
		gulp.task('useref',function(){
			return gulp.src(paths.source.root+'**/*.html')
				.pipe(useref())
				.pipe(gulpIf('*.js', uglify()))
				.pipe(gulpIf('*.css', cssnano()))
				.pipe(gulp.dest(paths.build.root));
		});
		//拷贝html Task
		gulp.task('buildHtml',function(){
			return gulp.src(paths.source.root+'**/*.html')
				.pipe(gulp.dest(paths.build.root));
		});
		//拷贝 plugins Task
		gulp.task('buildPlugins',function(){
			return gulp.src(paths.source.plugins+'**/*')
				.pipe(gulp.dest(paths.build.plugins));
		});
		//拷贝 css Task
		gulp.task('buildStyles',function(){
			return gulp.src(paths.source.styles+'**/*.css')
				.pipe(sourcemaps.init())
				.pipe(cssnano({
					zindex: false
				}))
				.pipe(sourcemaps.write(paths.root))
				.pipe(gulp.dest(paths.build.styles));
		});
		//拷贝js Task
		gulp.task('buildScripts',function(){
			return gulp.src(paths.source.scripts+'**/*.js')
				//.pipe(uglify())
				.pipe(gulp.dest(paths.build.scripts));
		});
		//压缩图片 Task
		gulp.task('buildImages',function(){
			return gulp.src(paths.source.images+'**/*.+(png|jpg|jpeg|gif|svg)')
				.pipe(cache(imagemin({
					interlaced: true
				})))
				.pipe(gulp.dest(paths.build.images));
		});
		//拷贝字体文件 Task
		gulp.task('buildFonts',function(){
			return gulp.src(paths.source.fonts+'**/*')
				.pipe(gulp.dest(paths.build.fonts));
		});
		//清理build文件夹 Task
		gulp.task('clean:build',function(){
			return del.sync(paths.build.root);
		});
		gulp.task('build',function(callback){
			runSequence(
				'clean:build',
				['buildHtml','buildPlugins','buildStyles','buildScripts','buildImages','buildFonts'],
				callback
			);
		});
		/*
		 *==========================================
		 * 默认Task
		 *==========================================
		 */
		gulp.task('default',function(cb){
			runSequence(['sass','hint','liveload','watch'],cb);
		});


})();
