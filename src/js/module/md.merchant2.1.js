define(function (require, exports, module) {

	require("uploadfiles");
	require("validform");
	var $public = require("public");

	var SCOPE = {
		browser: $public.diffBrowser(),
		validformInstance: null,
		formClassName : ".registerform"
	};

	$Merchant = function () {
		this.init.apply(this, arguments);
	};

	$Merchant.prototype = {
		init: function () {
			this.addValidform();
			this.bindEvent();
		},

		addValidform: function () {
			// http://validform.rjboy.cn
			SCOPE.validformInstance = $(SCOPE.formClassName).Validform({
				tiptype: 3, // 侧边提fixdetel示
				label: ".label", //在没有绑定nullmsg时查找要显示的提示文字
				showAllError: true, //显示全部错误而不是只显示第一个
				datatype: {
					"address": /^([\w\W]{1,100})?$/,
					"nickname": /^[\d\w\u4e00-\u9fa5,\—]{2,15}$/,
					"customerServicePhone": /^0\d{2,3}-?\d{7,8}$|^1[0-9]{10}$/
				},
				ajaxPost: true
			}).addRule([
				{
					ele: ".fixdetel",
					datatype: "customerServicePhone",
					nullmsg: "请输入客服电话",
					errormsg: "请检查客服电话格式，例:(0731-83187200)或手机号码!"
				},
				{
					ele: ".gray",
					datatype: "address",
					nullmsg: "请输入店铺地址",
					errormsg: "请输入0~100位字符！"
				},
				{
					ele: ".nickname",
					datatype: "nickname",
					nullmsg: "请填写信息",
					errormsg: "昵称至少2个字符,最多15个字符！"
				}
			]);
		},

		bindEvent: function () {
			//店铺地址
			$(document).on("keyup", "#address", function () {
				$("#addressLength").html($(this).val().length);
			});

			//商家简介
			$(document).on("keyup", "#summary", function () {
				$("#summaryLength").html($(this).val().length);
			});

			// 保存
			$(document).on("click", "#save", function () {
				var fieldsPass = SCOPE.validformInstance.check();
				if( !fieldsPass ) return;

				var imagePass = $public.allimgvalid($('.imgbox'));
				if( !imagePass ) return;

				var param = $public.paramcompare($(SCOPE.formClassName).serializeArray());
				$.post($public.urlpath.merchant, param, function (data) {
					$public.isLogin(data);
					if (data.success) {
						$public.dialog.msg('恭喜，您的资料修改成功', 'success');
						setTimeout(function () {
							location.reload();
						}, 1000);
					} else {
						$public.dialog.msg(data.resultMsg, 'error');
					}
				});

			});
		}
	}
	module.exports = new $Merchant();
});
