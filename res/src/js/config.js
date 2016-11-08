/*
 * 模块配置
 */
seajs.config({
    alias: { /*alias配置各模块别名，页面引入直接引入别名*/
        "jquery": "jquery",
        "common":"module/mod.common",
        "ajaxform" : "plugin/jquery.form",
        "oldajaxform" : "plugin/jquery.old.form",
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
		"pdfobject" : "plugin/pdfobject",
		"dropdownlist" : "module/md.dropdownlist",
		"md5":"module/md5.min",

		"public" : "module/md.public",
		"cus_datepicker" : "module/md.datepicker",
		"cus_datepicker_trip" : "module/md.datepicker.trip",
		"uploadfiles" : "module/md.uploadfiles",
		"addhotel" : "module/md.addhotel",
		"addtrip" : "module/md.addtrip",
		"addscenic" : "module/md.addscenic",
		"urlpath" : "module/md.urlpath.test",
		"test" : "module/md.test",
		"userdatafill" : "module/md.userdatafill",
		"eredar":"module/md.eredar.js",
		"password":"module/md.password.js",
		"merchant":"module/md.merchant.js",
        "merchant2.1":"module/md.merchant2.1.js",
        "talent":"module/md.talent.js",
		"passwordSucc":"module/md.passwordsucc.js"	,
		"review":"module/md.review.js",	
		"agreement" : "module/md.agreement",
		"businessenter":"module/md.businessenter.js",	
		"merchantinfor":"module/md.merchantinfor.js",
		"draft":"module/md.draft.js",
		"userdataca":"module/md.userdataca.js",
		"coupon":"module/md.coupon.js",
		"addcoupon":"module/md.addcoupon.js",
		"payment" : 'module/md.payment.js'
    },
    preload: ["jquery","underscore"],/*配置提取预加载模块，全局模块，所以页面都需要使用的模块*/
    debug: true // 调试模式
});


