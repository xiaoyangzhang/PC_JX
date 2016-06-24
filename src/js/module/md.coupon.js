define(function (require, exports, module) {
	$public = require("public"),
	require("dropdownlist"),
	require("validform"),
	$coupon = function () {
		this.init.apply(this, arguments);
	};
	$coupon.prototype = {
		init:function(){
			var $self = this;
			$('#state,#send,#time').selectlist({
				zIndex: 10,
				width: 220,
				height: 32,
				onChange:function(){}
			});

			var demo=$(".couponform").Validform({
					tiptype:3,
					label:".label",
					showAllError:true,
					ajaxPost:true
				});
			$(".delBtn").on("click",function(){
				
			});
			$("table tr td").find(".delete").on("click",function(){
				$(this).closest("tr").remove();
			});

		}
	}
	module.exports = new $coupon();
});