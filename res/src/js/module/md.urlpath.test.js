define(function(require,exports,module){
	module.exports = {
		//上传文件路径
		fileuploadURL : 'http://filegw.test.jiuxiulvxing.com/filegw/file/upload_string',
		//手动设置domain
		c_domain : 'jiuxiulvxing.com',
		//域名
		site_path : $('#root_path').val(),
		//静态资源服务器域名;获取（css/js/img）资源
		static_source : 'http://s0.test.jiuxiulvxing.com/PC_JX/src/',
		//图片预览域名
		img_domain : 'http://img.test.yimayholiday.com/v1/tfs/'
	};	
	
});