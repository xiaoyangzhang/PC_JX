/*! PC_JX - v1.0.0 - 2016-11-18 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),require("uploadfiles"),require("validform"),require("dropdownlist"),require("upload"),$public=require("public"),$userdatafill=function(){this.init.apply(this,arguments)},$userdatafill.prototype={init:function(){var a={tiptype:3,label:".label",showAllError:!0,datatype:{"zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/},ajaxPost:!0},b=[{ele:".picfile",datatype:"*"}],c=$("#forminfo").Validform(a).addRule(b);$("#tm").datepicker(),$("#card,#bank").selectlist({width:200}),$(".nxt").on("click",function(){var a=$public.allimgvalid($(".panel").find('.imgbox:not(".cnat")')),b=$(".subpath").val(),d=$public.paramcompare($("#forminfo").serializeArray()),e=!0;return $(".darenzh").length>0&&(e=$public.groupimgvalid($(".darenzh"),"请选择图片！")),c.check()&&a&&e&&($public.dialog.waiting(),$.post(b,d,function(a){$public.dialog.closebox(),a.success?($public.dialog.msg("保存成功！","success"),setTimeout(function(){window.location=a.url},1500)):$public.dialog.msg(a.errorMsg,"error")})),!1}),$(".allsub").on("click",function(){var a=$public.selectvalid(),b=$public.groupimgvalid($(".groupimg"),"请选择图片！"),d=$public.allimgvalid($(".panel").find('.imgbox:not(".cnat")')),e=$(".subpath").val(),f=$public.paramcompare($("#forminfo").serializeArray());return c.check()&&d&&a&&b&&($public.dialog.waiting(),$.post(e,f,function(a){$public.dialog.closebox(),a.success?($public.dialog.msg("保存成功！","success"),setTimeout(function(){window.location=a.url},1500)):$public.dialog.msg(a.errorMsg,"error")})),!1}),$public.actiondata("province","city")}},module.exports=new $userdatafill});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-18 */