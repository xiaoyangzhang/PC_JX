/*! PC_JX - v1.0.0 - 2016-12-20 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),require("uploadfiles"),require("validform"),require("dropdownlist"),require("module/md.renewdialog");var a=require("public"),b=function(){this.init.apply(this,arguments)};b.prototype={init:function(){$("#tm").datepicker(),$("select").selectlist({zIndex:10,width:300,height:32,onChange:function(){}});var b={tiptype:3,label:".label",showAllError:!0,datatype:{addressL:/^([\w\W]{1,100})?$/,nmname:/^[\d\w\u4e00-\u9fa5,\—]{2,15}$/,kefutel:/^0\d{2,3}-?\d{7,8}$|^1[0-9]{10}$/},ajaxPost:!0},c=[{ele:".fixdetel",datatype:"kefutel",nullmsg:"请输入客服电话",errormsg:"请检查客服电话格式，例:(0731-83187200)或手机号码!"},{ele:".gray",datatype:"addressL",nullmsg:"请输入店铺地址",errormsg:"请输入0~100位字符！"},{ele:".niname",datatype:"nmname",nullmsg:"请填写信息",errormsg:"请输入2~15位字符，支持中文、字母、数字、下划线"}],d=$(".registerform").Validform(b).addRule(c);$("#save").on("click",function(){var b=d.check(),c=a.allimgvalid($(".imgbox"));if(b&&c){var e=a.paramcompare($(".registerform").serializeArray());$.post(a.urlpath.merchant,e,function(b){a.isLogin(b),b.success?(a.dialog.msg("保存成功","success"),setTimeout(function(){location.reload()},1e3)):(a.dialog.msg(b.msg,"error"),b.value&&(window.location.href=b.value))})}}),$(".address").each(function(){$("#addressLen").html($(this).val().length)}),$(".merchantDesc").each(function(){$("#merchantLen").html($(this).val().length)}),$(document).on("input propertychange",".address",function(){var a=$(this).val(),b=a.length;return b>100&&(b=100,$(this).val(a.substr(0,100))),$("#addressLen").html(b),!1}),$(document).on("input propertychange",".merchantDesc",function(){var a=$(this).val(),b=a.length;return b>500&&(b=500,$(this).val(a.substr(0,500))),$("#merchantLen").html(b),!1})}},module.exports=new b});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-20 */