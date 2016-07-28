/*! pc_jx - v1.0.0 - 2016-07-28 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),//引用时间组件
require("uploadfiles"),//上传文件组件
require("validform"),//上传文件组件
require("dropdownlist"),//下拉框组件
require("upload"),$public=require("public"),$userdatafill=function(){this.init.apply(this,arguments)},$userdatafill.prototype={
// timer:null,
// waitcode:function(obj){
// 	var _btn=obj,_self=this,n=60;
// 	clearInterval(_self.timer);
// 	$(_btn).off().text('还剩'+n+'秒');
// 	_self.timer=setInterval(function(){
// 		n--;
// 		$(_btn).text('还剩'+n+'秒');
// 		if(n==0){
// 			clearInterval(_self.timer);
// 			$(_btn).text('获取验证码').on('click',function(){_self.waitcode(this);});
// 		}
// 	},1000);
// },
init:function(){var validoptions={tiptype:3,label:".label",showAllError:!0,datatype:{"zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/},ajaxPost:!0},rule=[{ele:".picfile",datatype:"*"}],validfm=$("#forminfo").Validform(validoptions).addRule(rule);
//渲染时间控件
$("#tm").datepicker(),$("#card,#bank").selectlist({width:200}),
//下一页并保存
$(".nxt").on("click",function(){var allimgvalid=$public.allimgvalid($(".panel").find('.imgbox:not(".cnat")')),subpath=$(".subpath").val(),params=$public.paramcompare($("#forminfo").serializeArray()),groupimgvalid=!0;return $(".darenzh").length>0&&(groupimgvalid=$public.groupimgvalid($(".darenzh"),"请选择图片！")),validfm.check()&&allimgvalid&&groupimgvalid&&($public.dialog.waiting(),$.post(subpath,params,function(data){$public.dialog.closebox(),data.success?($public.dialog.msg("保存成功！","success"),setTimeout(function(){window.location=data.url},1500)):$public.dialog.msg(data.errorMsg,"error")})),!1}),
//商家入驻总提交
$(".allsub").on("click",function(){var selectvalid=$public.selectvalid(),groupimgvalid=$public.groupimgvalid($(".groupimg"),"请选择图片！"),allimgvalid=$public.allimgvalid($(".panel").find('.imgbox:not(".cnat")')),subpath=$(".subpath").val(),params=$public.paramcompare($("#forminfo").serializeArray());return validfm.check()&&allimgvalid&&selectvalid&&groupimgvalid&&($public.dialog.waiting(),$.post(subpath,params,function(data){$public.dialog.closebox(),data.success?($public.dialog.msg("保存成功！","success"),setTimeout(function(){window.location=data.url},1500)):$public.dialog.msg(data.errorMsg,"error")})),!1}),$public.actiondata("province","city")}},module.exports=new $userdatafill});
/*! pc_jx 最后修改于： 2016-07-28 */