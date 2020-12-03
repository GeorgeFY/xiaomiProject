const gulp = require("gulp");
const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
const connect = require("gulp-connect");

//sacc处理
gulp.task("scss",function(){
	
	return gulp.src("stylesheet/index.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

//处理所以sass文件
gulp.task("scssAll",function(){
	return gulp.src("stylesheet/*.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

//处理所有js文件
gulp.task("scripts",function(){
	return gulp.src(["*.js","!gulpfile.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

//处理所有html页面
gulp.task("copy-html",function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("dist/"))
	.pipe(connect.reload());
})

//处理所有json数据
gulp.task("data",function(){
	return gulp.src(["*.json","!package.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})

//处理所有iamge
gulp.task("images",function(){
	return gulp.src("images/**/*")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

//处理所有php页面
gulp.task("php",function(){
	return gulp.src("*.php")
	.pipe(gulp.dest("dist/php"))
	.pipe(connect.reload());
})
//Build任务
gulp.task("build",["scss","scssAll","scripts","copy-html","data","images","php"],function(){
	console.log("the item is build ok!")
})

//建立监听
gulp.task("watch",function(){
	gulp.watch("stylesheet/index.scss",["scss"]);
	gulp.watch("stylesheet/*.scss",["scssAll"]);
	gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
	gulp.watch("*.html",["copy-html"]);
	gulp.watch(["*.json","!package.json"],["data"]);
	gulp.watch("images/**/*",["images"]);
	gulp.watch("*.php",["php"]);
})

//启动服务
gulp.task("server",function(){
	connect.server({
		root:"dist",
		port:8082,
		livereload:true
	})
})

//同时监听和服务
gulp.task("default",["watch","server"]);