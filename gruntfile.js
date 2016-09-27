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
					cwd:'<%= config.res %>/<%= config.src %>/js/',
					src:'**/*.js',
					dest: '<%= config.src %>/js/'
				}]
			},
			release: {
				files: {
					'<%= config.src %>/js/index.min.js':  ['<%= config.res %>/<%= config.src %>/js/**/*.js']
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
					cwd: '<%= config.res %>/<%= config.src %>/css/',
					src: ['**/*.css'],
					dest: '<%= config.src %>/css/'
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
				}]
			}
		},
		jshint: {
			all: [
				'<%= config.res %>/<%= config.src %>/js/**/*.js'
				 ],
			options: {
				browser: true,            // browser environment
				devel: true                // 
				}
		},
		rev:{
		    options:{
			    encoding: 'utf8',
			    algorithm: 'md5',
			    length: 8
			},
			images_fonts:{
				files: [{
				  src: [
				    'static/images/**/*.{jpg,jpeg,gif,png,ico}'
				  ]
				}] 
			},
			css_js:{
				files: [{
				  src: [
				    '<%= config.src %>/**/*.{js,css}'
				  ]
				}]
			}
		},
		useminPrepare: {
			html: 'dist/home.html'
		},
		usemin: {
            // css:{
            //     files:{
            //         src:['<%= config.src %>/css/*.css']
            //     }
            // },
            js:['<%= config.src %>/js/config.js'],
            html:['dist/home.html'],
            options:{                    //替换静态文件引地址前缀
                // filePrefixer:function(url){
                //     if(!url){
                //         return '';
                //     }
                //     return url.replace('../..','<%=request.getContextPath()%>');
                // },
                // patterns: {
                //     js: [
                //         [/(img\.png)/, 'Replacing reference to image.png']
                //     ]
                // },
				blockReplacements: {
					css: function (block) {

                        var real_path = 'dist/' + block.dest;

                        var rev_code = hash(real_path);

                        var tmp = block.dest.split('/');

                        tmp[tmp.length-1] = rev_code + '.' + tmp[tmp.length-1];

                        var final_name = tmp.join('/');

                        var media = block.media ? ' media="' + block.media + '"' : '';

                        return '<link rel="stylesheet" href="' + final_name + '"' + media + '>';//此处为css标签的定制

                    },

                    js: function (block) {

                        var real_path = 'dist/' + block.dest;

                        var rev_code = hash(real_path);

                        var tmp = block.dest.split('/');

                        tmp[tmp.length-1] = rev_code + '.' + tmp[tmp.length-1];

                        var final_name = tmp.join('/');

                        var defer = block.defer ? 'defer ' : '';

                        var async = block.async ? 'async ' : '';

                        return '<scriptd ' + defer + async + 'src="' + final_name + '"><\/scriptd>';//次处为js标签的定制

                    }
				}
            }
		}
		// ,copy: {
		// 	html: {
		// 		src: 'view/content/home.html',
		// 		dest: 'dist/home.html'
		// 	}
		// }
    });

    // 加载提供"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 默认任务
    //grunt.registerTask('default', ['rev:css_js','usemin']);
    grunt.registerTask('default', ['uglify:dist','cssmin:dist','imagemin:dist']);
}