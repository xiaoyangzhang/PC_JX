/*! PC_JX - v1.0.0 - 2016-11-22 */
define(function(require,exports,module){$public=require("public"),require("datepicker"),require("validform"),require("core"),require("widget"),$editer=require("editer"),$test=function(){this.init.apply(this,arguments)},$test.prototype={init:function(){var a=this;$("#tm,#td").datepicker({changeMonth:!0,changeYear:!0});var b={tiptype:3,label:".label",showAllError:!0,datatype:{},ajaxPost:!0},c=[];$(".reviewform").Validform(b).addRule(c);$(".searchBtn").on("click",function(){a.distanceFun(),$.ajax({type:"POST",url:""+$("#subpath").val(),data:{},success:function(a){$public.isLogin(a)}})}),$(".delBtn").click(function(){$("input[name='orderNO']").val(""),$("input[name='nickName']").val(""),$("input[name='itemNo']").val(""),$("input[name='beginDate']").val(""),$("input[name='endDate']").val("")}),a.showImgFun()},showImgFun:function(){var a=$(".upload ul").find("li");a.click(function(){a.css("borderColor","#f2f2f2"),$(".upload").find("b").css("opacity","0"),this.is_select?($(this).css("borderColor","#f2f2f2"),$(this).find("b").css("opacity","0"),$(this).closest(".inforight").find(".showImg").hide(),this.is_select=!1):($(this).css("borderColor","#ed6c44"),$(this).closest(".inforight").find(".showImg img").attr("src",$(this).find("img").get(0).src),$(this).find("b").css("opacity","1"),$(this).closest(".inforight").find(".showImg").show(),a.filter(function(){this.is_select=!1}),$(".eredar-left").css("min-height",$(".eredar-right").height()+"px"),this.is_select=!0),$(".eredar-left").css("min-height",$(".eredar-right").height()+"px")})},distanceFun:function(){$(".eredar-right").height()<$(".eredar-left").height()?$(".eredar-right").height($(".eredar-left").height()):$editer.distanceFun()}},module.exports=new $test});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-22 */