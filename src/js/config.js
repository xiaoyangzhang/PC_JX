/*
 * 模块配置
 */
seajs.config({
    alias: { /*alias配置各模块别名，页面引入直接引入别名*/
        "jquery": "jquery",
        "common":"module/mod.common",
        "ajaxform" : "plugin/jquery.form",
		"validform" : "plugin/jquery.validform.js",
		"cookie" : "plugin/jquery.cookie.js",
		"json" : "plugin/jquery.json.js",
		"jsonp" : "plugin/jquery.jsonp.js",
		"tmpl" : "plugin/jquery.tmpl.js",
		'upload': 'plugin/ajaxfileupload',
		'editer': 'module/mod.editer',
		"servicevali":"module/mod.validate.js",
		"servicecode":"module/mod.servicecode.js",
		"login":"module/mod.login.js",
		"message" : "module/mod.message.js",
		"md5" :"plugin/md5.min.js",
		
		"core" : "plugin/jquery.ui.core",
		"widget" : "plugin/jquery.ui.widget",
		"datepicker" : "plugin/jquery.ui.datepicker",
		"jqueryui" : "plugin/jquery-ui-1.10.4.custom",
		"underscore" : "plugin/underscore-min",
		"dropdownlist" : "module/md.dropdownlist",
		"uploadfiles" : "module/md.uploadfiles",
		"public" : "module/md.public",
		"urlpath" : "module/md.urlpath",
		//"urlpath" : "module/md.urlpath.pre",
		"test" : "module/md.test",
		"userdatafill" : "module/md.userdatafill",
		"md5":"module/md5.min",
		"eredar":"module/md.eredar.js",
		"password":"module/md.password.js",
		"merchant":"module/md.merchant.js",	
		"passwordSucc":"module/md.passwordsucc.js"	,
		"review":"module/md.review.js"	
			
			
    },
    preload: ["jquery","underscore"],/*配置提取预加载模块，全局模块，所以页面都需要使用的模块*/
    debug: true // 调试模式
});


