/*! PC_JX - v1.0.0 - 2016-12-27 */
define(function(require,exports,module){$public=require("public"),require("dropdownlist"),require("datepicker"),require("validform"),require("core"),require("widget"),$review=require("review"),$editer=require("editer"),$test=function(){this.init.apply(this,arguments)},$test.prototype={init:function(){$("#edu").selectlist({zIndex:10,width:198,height:32,onChange:function(){}}),$review.distanceFun();var a=$("#eredar .eredar-right").width()-40,b=$(".jiuniu_pagination").width();$(".jiuniu_pagination").css("margin-left",(a-b)/2+"px"),$(document).on("click",".LinkeToPage",function(){$('input[name="page"]').val($(this).attr("pageno")),$("form").submit()}),$(document).on("change","#pageSize",function(){$('input[name="page"]').val(1),$("form").submit()}),$(".del").click(function(){var a=$(this).attr("draft-id");operateUrl=$("#root_path").val()+"/draft/delete/"+a,layer.confirm("是否确认删除",{icon:3,title:"提示"},function(a){$.post(operateUrl,function(a){a.success?window.location.reload():layer.msg("²Ù×÷Ê§°Ü",{icon:2,time:1e3})},"json"),layer.close(a)})})},delFun:function(){var a,b=$(".draft table tr td").find(".del");b.on("click",function(){a=$(this),$review.distanceFun(),$("body").append('<div class="dialog" style= "display:block"><div class="bgmeng" style="height:'+$(document).height()+'px"></div></div>'),$(".draftPop").fadeIn()}),$(".del-list").on("click",function(){$(".dialog").remove(),$(".draftPop").fadeOut(),a.closest("tr").remove(),$review.distanceFun()}),$(".cancel").on("click",function(){$review.distanceFun(),$(".dialog").remove(),$(".draftPop").fadeOut()})}},module.exports=new $test});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-27 */