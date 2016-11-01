define(function (require, exports, module) {
	require("core"),
	require("widget"),
	require("datepicker"),//引用时间组件
	require("uploadfiles"),//上传文件组件
	require("validform"),
	//require("jqueryui"),
	require("dropdownlist"),//下拉框组件
	$public=require("public"),
	$test = function () {
		this.init.apply(this, arguments);
	};
	$test.prototype = {
		init:function(){
			//渲染时间控件
			$( "#tm" ).datepicker();
			//渲染下拉框控件
			$('#edu').selectlist({
				zIndex: 10,
				width: 200,
				height: 32,
				onChange:function(){}
			});

			var demo=$(".registerform").Validform({
					tiptype:3,
					label:".label",
					showAllError:true,
					ajaxPost:true
				});

		}
	}
	module.exports = new $test();
});