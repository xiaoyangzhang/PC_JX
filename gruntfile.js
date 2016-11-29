module.exports = function (grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  var config={
	  res:'res',
	  src:'src'
  }
  grunt.initConfig({
	config:config,
    pkg: grunt.file.readJSON('package.json'),
		uglify: {	
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
			},
			dist: {//不混淆变量名，保留注释，添加banner和footer
				options: {
					mangle: {
						except: ['jQuery','md5','require','exports','module']
					},
					preserveComments: false, //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
					footer:'\n/*! <%= pkg.name %> xiongzhaoling 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
				},
				files: [{
					expand:true,
					cwd:'<%= config.res %>/<%= config.src %>/',
					src:'**/*.js',
					dest: '<%= config.src %>/'
				}]
			},
			release: {
				files: {
					'<%= config.src %>/js/index.min.js':  ['<%= config.src %>/js/**/*.js']
				}
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.res %>/<%= config.src %>/',
					src: ['**/*.css'],
					dest: '<%= config.src %>/'
				}]
			}
		},
		imagemin: {
			options: {
				optimizationLevel: 3 //定义 PNG 图片优化水平
			},		
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.res %>/img/',   // 图片在imagemin目录下
					src: ['**/*.{png,jpg,gif,jpeg,ico}'], // 优化 imagemin 目录下所有 png/jpg/gif/jpeg/ico 图片
					dest: 'img/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
				},{
					expand: true,
					cwd: '<%= config.res %>/images/',
					src: ['**/*.{png,jpg,gif,jpeg,ico}'],
					dest: 'images/'
				},{
					expand: true,
					cwd: '<%= config.res %>/<%= config.src %>/',
					src: ['**/*.{png,jpg,gif,jpeg,ico}'],
					dest: '<%= config.src %>/'
				}]
			}
		},
		jshint: {
			all: [
				'<%= config.dist %>/<%= config.src %>/js/**/*.js'
				 ],
			options: {
				browser: true,
				devel: true 
				}
		}
    });

    // 加载提供"uglify"任务的插件
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 默认任务
    grunt.registerTask('default', ['uglify:dist', 'cssmin:dist', 'imagemin:dist']);
}