/*! PC_JX - v1.0.0 - 2016-11-18 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),require("uploadfiles"),require("validform"),require("dropdownlist"),require("upload"),$public=require("public"),$test=function(){this.init.apply(this,arguments)};var a=!0;$test.prototype={init:function(){var b=this;$("#forminfo").Validform();var c=$(".private_card tr").html(),d=$(".private_tel tr").html(),e=$(".public tr").html();if($("#bank").selectlist({width:200}),$("#accountType").selectlist({width:200,onChange:function(){1==$("#accountType :hidden").val()&&($(".settlementCard_").remove(),$(".openerTel_").remove(),$(".openerCard_").remove(),$(".financeOpenName_").after($('<tr class="openerCard_"></tr>').html(c)),$(".openerCard_").after($('<tr class="openerTel_"></tr>').html(d))),2==$("#accountType :hidden").val()&&($(".openerTel_").remove(),$(".openerCard_").remove(),$(".settlementCard_").remove(),$(".financeOpenName_").after($('<tr class="settlementCard_"></tr>').html(e)))}}),$("#card").selectlist({width:200,onChange:function(){a||$("#cardtxt").removeClass("Validform_error").val("").next().empty().removeClass("Validform_wrong Validform_right"),b.changevalid(!0)}}),b.changevalid(),$("select").selectlist({zIndex:10,width:200,height:32,onChange:function(){}}),$(".error_box").length>0){var f=$(".error_box").offset().top,g=!1;$(window).scroll(function(){var a=$(this).scrollTop();f<a&&!g?($(".error_box").css({position:"fixed",right:($(document).width()-1190)/2+0+"px"}),g=!0):f>a&&g&&($(".error_box").css({position:"absolute",right:"0px"}),g=!1)})}$(".company input").each(function(){$(this).prop("checked")&&$("#travel").prop("checked","checked")});var h={tiptype:3,label:".label",showAllError:!0,datatype:{tax:/^[\w\W]{1,25}$/,name:/^[\w\W]{2,10}$/},ajaxPost:!0},i=[{ele:".taxL",datatype:"tax",nullmsg:"请填写信息",errormsg:"请填写1到25位字符！"},{ele:".zrname",datatype:"name",nullmsg:"请填写信息",errormsg:"请填写2到10位字符！"}],j=$(".registerform").Validform(h).addRule(i);$(".comtype input[type='radio']").on("click",function(){$.ajax({type:"post",url:$public.urlpath.getBsScope,data:{merchantCategoryId:$(this).val()},success:function(a){var b=JSON.parse(a.value);$('input[type="checkbox"]').prop("checked","").prop("disabled","disabled"),$('input[type="checkbox"]:disabled').each(function(){for(var a=0;a<b.length;a++)$(this).val()==b[a].businessScopeId&&$(this).prop("disabled","")});var c=$('div.bomb input[type="checkbox"]:disabled');c.length<$('div.aaa input[type="checkbox"]').length&&$(".k1").prop("disabled","")}})}),$(".subt").on("click",function(){var a=$public.selectvalid(),b=$public.groupimgvalid($(".groupimg"),"请选择图片！"),c=$public.allimgvalid($(".panel").find('.imgbox:not(".cnat")')),d=$(".subpath").val(),e=$public.paramcompare($("#forminfo").serializeArray(),function(a){a.saleScope=a.saleScope.replace(/\r\n/g,"\n")});if(j.check()&&c&&a&&b){$public.dialog.waiting();var f="";$("input[name='businessScopeId']:checked").each(function(){f+=$(this).val()+","}),e.scopeIds=f.substring(0,f.length-1),delete e.lxs,$.post(d,e,function(a){$public.isLogin(a),$public.dialog.closebox(),a.success?($public.dialog.msg("保存成功！","success"),setTimeout(function(){window.location.href=a.value},1500)):$public.dialog.msg(a.resultMsg,"error")})}return!1}),$(".ccc").change(function(){$(".company input[type='radio']").eq(0).prop("checked","checked")}),$(".k1").change(function(){$(this).prop("checked")?($(this).prop("checked","checked"),$(".aaa input[type='checkbox']").eq(0).prop("checked","checked")):($(this).prop("checked",""),$(".aaa input[type='checkbox']").prop("checked",""))}),$(".qdlm input[type='checkbox']").change(function(){b.yanzheng()}),$(".aaa input[type='checkbox']").change(function(){b.checkedstate()}),$(".ddd").change(function(){$(".ccc").prop("checked","")}),$(".company input[type='radio']").change(function(){$(".ccc").prop("checked","checked"),$(this).is(":checked")?$(".ccc").prop("checked","checked"):$(".ccc").prop("checked","")}),$(".comtype input[type='radio']").change(function(){b.comtypedisabled()}),$(".rule-name").on("click",function(){$(".big-box").show()}),$(".close").on("click",function(){$(".big-box").hide()}),$public.actiondata("province","city"),b.checkedstate(),b.comtypedisabled()},changevalid:function(b){var c=$("#card :hidden").val();b&&(a=!1),0==c?$("#cardtxt").attr("datatype","card"):1==c?$("#cardtxt").attr("datatype","dlic"):2==c?$("#cardtxt").attr("datatype","psport"):3==c&&$("#cardtxt").attr("datatype","gidcard")},checkedstate:function(){var a=$(".aaa input[type='checkbox']:checked").length;a<1?$(".k1").prop("checked",""):$(".k1").prop("checked","checked")},comtypedisabled:function(){$(".daible").is(":checked")?$(".dised").prop("disabled","disabled").siblings(".disedli").prop("checked","checked"):$(".dised").prop("disabled",""),$(".ts").is(":checked")?$(".dised").prop("checked","checked").siblings(".disedli").prop("disabled","disabled"):$(".disedli").prop("disabled","")},yanzheng:function(){$(".qdlm input[type='checkbox']").is(":checked")?($(".qdlm").find(".Validform_checktip").addClass("Validform_right").html(""),$(".qdlm").find(".Validform_checktip").removeClass("Validform_wrong").html("")):$(".qdlm").find(".Validform_checktip").addClass("Validform_wrong").html("请选择")}},$(function(){var a=$(".comtype input[name='merchantCategoryId']:checked").val();return!!a&&void $.ajax({type:"post",url:$public.urlpath.getBsScope,data:{merchantCategoryId:a},success:function(a){var b=JSON.parse(a.value);$('input[type="checkbox"]').not("input:checked").prop("disabled","disabled"),$('input[type="checkbox"]:disabled').each(function(){for(var a=0;a<b.length;a++)$(this).val()==b[a].businessScopeId&&$(this).prop("disabled","")});var c=$('div.bomb input[type="checkbox"]:disabled');c.length<$('div.aaa input[type="checkbox"]').length&&$(".k1").prop("disabled","")}})}),module.exports=new $test});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-18 */