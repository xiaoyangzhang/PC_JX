define(function (require, exports, module) {
	$public=require("public"),
	require("md5"),//¼ÓÃÜ
	require("validform"),
	$servicevali = require("servicevali")
	$test = function () {
		this.init.apply(this, arguments);
	};
	$test.prototype = {
		init:function(){
			var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					ajaxPost:true
				},rule=[
				{
					ele:"#oldpassword",
					datatype:"*6-16",
					nullmsg:"请输入当前密码",
					errormsg:"请输入6-16位密码！"
				},
				{
					ele:"#newpassword",
					datatype:"pwd",
					nullmsg:"请输入新密码",
					errormsg:"请输入6-16位密码，需同时包含字母及数字！"
				},
				{
					ele:"#renewpassword",
					datatype:"*",
					recheck:"newpassword",
					nullmsg:"请重复新密码",
					errormsg:"两次输入密码不一致"
				}
				],validfm=$(".registerform").Validform(validoptions).addRule(rule);
			/* 修改密码提交 */
			$("#changSaveBtn").click(function(){
				var oldPass = md5($("#oldpassword").val());
				var newPass = md5($("#newpassword").val());
				var renewPass = md5($("#renewpassword").val());
				if(!validfm.check()){
					return false;
				}
				$.ajax({
					type:'POST',
					url:$public.urlpath.updatepwd,
					data:{oldPassword:oldPass,newPassword:newPass},
					success:function(data){
						$public.isLogin(data);
						if(!$servicevali.serviceValidate(data,"passwordCode")){
							return false;
						}
						if(data.success){
							window.location.href = data.value;
						}else{
							
						}
					}
				});
				return false;
			});

		}
	}
	module.exports = new $test();
});