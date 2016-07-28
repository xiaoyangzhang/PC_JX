/*! pc_jx - v1.0.0 - 2016-07-28 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),//引用时间组件
require("uploadfiles"),//上传文件组件
require("validform"),//验证组件
//require("dropdownlist"),//下拉框组件
require("upload"),$public=require("public"),$userdataca=function(){this.init.apply(this,arguments)};$userdataca.prototype={init:function(){if($(".error_box").length>0){var tit_top=$(".error_box").offset().top,lock=!1;$(window).scroll(function(){var cur_top=$(this).scrollTop();tit_top<cur_top&&!lock?($(".error_box").css({position:"fixed",right:($(document).width()-1190)/2+0+"px"}),lock=!0):tit_top>cur_top&&lock&&($(".error_box").css({position:"absolute",right:"0px"}),lock=!1)})}
//var _self=this;
// $('#bank').selectlist({width: 200});
// $('#card').selectlist({
// 	width: 200,
// 	onChange:function(){
// 		if(!isLock){
// 			$('#cardtxt').removeClass('Validform_error').val('')
// 			.next().empty().removeClass('Validform_wrong Validform_right');
// 		}
// 		_self.changevalid(true);
// 	}
// });
//_self.changevalid();
//商家入驻总提交
$(".allsub").on("click",function(){for(var groupimgvalid=$public.groupimgvalid($(".groupimg"),"请选择图片！"),allimgvalid=$public.allimgvalid($(".panel").find('.imgbox:not(".cnat")')),subpath=$(".subpath").val(),params=$public.paramcompare($("#forminfo").serializeArray()),arr=[],nuZu=$('.imgbox:not(".groupimg .imgbox")'),i=($(".groupimg"),0);i<nuZu.length;i++){var obj={};obj.qulificationId=nuZu[i].id,obj.content=$(nuZu[i]).find(":hidden").val(),arr.push(obj)}
//for(var i=0;i<imgroup.length;i++){
var obj={};
//var img_values=$('.groupimg .inblock'),
// for(var j=0;j<img_values.length;j++){
// 	$(img_values[j]).
// 	if(img_values[j].value) content_value.push(img_values[j].value);
// }
//}
//console.log(arr);
// $('.groupimg .updateli :hidden').filter(function(){
// 	if($(this).val()!='') n++;
// });
//if($('.darenzh').length>0) groupimgvalid=$public.groupimgvalid($('.darenzh'),'请选择图片！');
// if(n<5){
// 	$public.dialog.msg('游乐特种设备,至少上传5份文件.','error');
// 	return;
// }
return obj.qulificationId=$("#qualificationId").attr("qualificationId"),content_value=[],$(".groupimg .inblock").each(function(){var value=$(this).find(":hidden").val();value&&content_value.push(value)}),obj.content=content_value.join(","),arr.push(obj),params.merchantQualificationStr=JSON.stringify(arr),allimgvalid&&groupimgvalid&&($public.dialog.waiting(),$.post(subpath,params,function(data){$public.isLogin(data),$public.dialog.closebox(),data.success?($public.dialog.msg("保存成功！","success"),setTimeout(function(){window.location.href=data.value},1500)):$public.dialog.msg(data.resultMsg,"error")})),!1})}},/*异步加载页面*/
/*	$(function(){

				$.ajax({
					   type: "get",
					   datatype:"html",
					   url: $public.urlpath.pageilB,
					   success: function(data){
					   			$(".fm_md").empty().append(data);	  									
					   	   	}
					   
					});
			});*/
module.exports=new $userdataca});
/*! pc_jx 最后修改于： 2016-07-28 */