<<<<<<< HEAD
/*! PC_JX - v1.0.0 - 2016-11-29 */
define(function(require,exports,module){$public=require("public"),require("md5"),require("validform"),$servicevali=require("servicevali"),$test=function(){this.init.apply(this,arguments)},$test.prototype={init:function(){var a={tiptype:3,label:".label",showAllError:!0,ajaxPost:!0},b=[{ele:"#oldpassword",datatype:"*6-16",nullmsg:"请输入当前密码",errormsg:"请输入6-16位密码！"},{ele:"#newpassword",datatype:"pwd",nullmsg:"请输入新密码",errormsg:"请输入6-16位密码，需同时包含字母及数字！"},{ele:"#renewpassword",datatype:"*",recheck:"newpassword",nullmsg:"请重复新密码",errormsg:"两次输入密码不一致"}],c=$(".registerform").Validform(a).addRule(b);$("#changSaveBtn").click(function(){var a=md5($("#oldpassword").val()),b=md5($("#newpassword").val());md5($("#renewpassword").val());return!!c.check()&&($.ajax({type:"POST",url:$public.urlpath.updatepwd,data:{oldPassword:a,newPassword:b},success:function(a){return $public.isLogin(a),!!$servicevali.serviceValidate(a,"passwordCode")&&void(a.success&&(window.location.href=a.value))}}),!1)})}},module.exports=new $test});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-29 */
=======
/*! PC_JX - v1.0.0 - 2016-11-24 */
define(function(require,exports,module){$public=require("public"),require("md5"),require("validform"),$servicevali=require("servicevali"),$test=function(){this.init.apply(this,arguments)},$test.prototype={init:function(){var a={tiptype:3,label:".label",showAllError:!0,ajaxPost:!0},b=[{ele:"#oldpassword",datatype:"*6-16",nullmsg:"请输入当前密码",errormsg:"请输入6-16位密码！"},{ele:"#newpassword",datatype:"pwd",nullmsg:"请输入新密码",errormsg:"请输入6-16位密码，需同时包含字母及数字！"},{ele:"#renewpassword",datatype:"*",recheck:"newpassword",nullmsg:"请重复新密码",errormsg:"两次输入密码不一致"}],c=$(".registerform").Validform(a).addRule(b);$("#changSaveBtn").click(function(){var a=md5($("#oldpassword").val()),b=md5($("#newpassword").val());md5($("#renewpassword").val());return!!c.check()&&($.ajax({type:"POST",url:$public.urlpath.updatepwd,data:{oldPassword:a,newPassword:b},success:function(a){return $public.isLogin(a),!!$servicevali.serviceValidate(a,"passwordCode")&&void(a.success&&(window.location.href=a.value))}}),!1)})}},module.exports=new $test});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-24 */
>>>>>>> master
