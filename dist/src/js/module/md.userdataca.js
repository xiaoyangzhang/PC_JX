/*! PC_JX - v1.0.0 - 2016-11-01 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),require("uploadfiles"),require("validform"),require("upload"),$public=require("public"),$userdataca=function(){this.init.apply(this,arguments)};$userdataca.prototype={init:function(){if($(".error_box").length>0){var a=$(".error_box").offset().top,b=!1;$(window).scroll(function(){var c=$(this).scrollTop();a<c&&!b?($(".error_box").css({position:"fixed",right:($(document).width()-1190)/2+0+"px"}),b=!0):a>c&&b&&($(".error_box").css({position:"absolute",right:"0px"}),b=!1)})}$(".allsub").on("click",function(){for(var a=$public.groupimgvalid($(".groupimg"),"请选择图片！"),b=$public.allimgvalid($(".panel").find('.imgbox:not(".cnat")')),c=$(".subpath").val(),d=$public.paramcompare($("#forminfo").serializeArray()),e=[],f=$('.imgbox:not(".groupimg .imgbox")'),g=($(".groupimg"),0);g<f.length;g++){var h={};h.qulificationId=f[g].id,h.content=$(f[g]).find(":hidden").val(),e.push(h)}var h={};return h.qulificationId=$("#qualificationId").attr("qualificationId"),content_value=[],$(".groupimg .inblock").each(function(){var a=$(this).find(":hidden").val();a&&content_value.push(a)}),h.content=content_value.join(","),e.push(h),d.merchantQualificationStr=JSON.stringify(e),b&&a&&($public.dialog.waiting(),$.post(c,d,function(a){$public.isLogin(a),$public.dialog.closebox(),a.success?($public.dialog.msg("保存成功！","success"),setTimeout(function(){window.location.href=a.value},1500)):$public.dialog.msg(a.resultMsg,"error")})),!1})}},module.exports=new $userdataca});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-01 */