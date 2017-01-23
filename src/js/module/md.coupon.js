/*! PC_JX - v1.0.0 - 2017-01-17 */
define(function(require,exports,module){$public=require("public"),require("dropdownlist"),require("datepicker"),require("validform"),require("core"),require("widget"),$review=require("review"),$editer=require("editer"),$addcoupon=require("addcoupon"),$coupon=function(){this.init.apply(this,arguments)},$coupon.prototype={init:function(){var a=this;$("#status,#putStatus,#useStatus").selectlist({zIndex:10,width:198,height:32,onChange:function(){}});var b={tiptype:3,label:".label",showAllError:!0,datatype:{},ajaxPost:!0},c=[{}],d=$(".couponform,.addcouponForm").Validform(b).addRule(c);$(".delBtn").on("click",function(){var a="";$(".select-list ul").each(function(){var b=0;$(this).find("li").each(function(){0==b?($(this).attr("class","selected"),a=$(this).text()):($(this).attr("class",""),$("input[name = 'status']").val("0"),$("input[name = 'putStatus']").val("0"),$("input[name = 'useStatus']").val("0")),b++})}),$(".select-button").val(a)}),$("#part").bind("input focus",function(){a.couponNum_fun()}),$("#starnum,#emdnum").bind("input focus",function(){a.compareFun()}),a.time_fun(),$(".addBtn").on("click",function(){var a=$("#addVoucher").val();window.location.href=a}),$(".editor").on("click",function(){var a=$(this).attr("mode_status"),b=$("#editor").val()+"/"+$(this).attr("voucherId")+"?edtType="+a;window.location.href=b}),$(".putaway").on("click",function(){a.maskFun(),$("#put_voucherId").val($(this).attr("voucherId")),$("#tip_get").fadeIn()}),$(".get_del").on("click",function(){$(".mask").remove(),$("#tip_get").fadeOut(),$("#tip_out").fadeOut(),$("#tip_del").fadeOut()}),$("#get_sure").on("click",function(){$(".mask").remove(),$("#tip_get").fadeOut();var a=$("#putaway").val()+"/"+$("#put_voucherId").val();$.ajax({type:"POST",url:a,success:function(a){$public.isLogin(a),a.success?($public.dialog.msg("上架成功","success"),window.location.href=window.location.href):($public.dialog.msg(a.resultMsg,"error"),$(".dialog .msg").css("width","220px"),$(".dialog .msg").attr("marginLeft","-130px"))}})}),$(".getaway").on("click",function(){a.maskFun(),$("#get_voucherId").val($(this).attr("voucherId")),$("#tip_out").fadeIn()}),$("#away_sure").on("click",function(){$("#tip_out").fadeOut(),$(".mask").remove();var a=$("#getaway").val()+"/"+$("#get_voucherId").val();$.ajax({type:"POST",url:a,success:function(a){$public.isLogin(a),a.success?($public.dialog.msg("下架成功","success"),window.location.href=window.location.href):$public.dialog.msg(a.resultMsg,"error")}})}),$("table tr td").find(".delete").on("click",function(){a.maskFun(),$("#del_voucherId").val($(this).attr("voucherId")),$("#tip_del").fadeIn()}),$(".delete_sure").on("click",function(){var a=this;$("#tip_del").fadeOut(),$(".mask").remove();var b=$("#delete").val()+"/"+$("#del_voucherId").val();$.ajax({type:"POST",url:b,success:function(b){$public.isLogin(b),b.success?(clearTimeout(a.timer),a.timer=setTimeout(function(){$public.dialog.msg("删除成功","success")},5e3),window.location.href=window.location.href):$public.dialog.msg(b.resultMsg,"error")}})}),$("#fill").bind("input focus",function(){a.couponNum()}),$(".savebtn").click(function(){var b=($("#subpath").val(),d.check()),c=$("#voucherId").val()+"",e=$("#add").val()+"",f=$("#edit").val()+"/"+c,g=a.couponNum(),h=a.compareFun(),i=a.couponNum_fun();return""==$("#putstartime").val()||""==$("#putendtime").val()||""==$("#getstartime").val()||""==$("#getstartime").val()?(alert("请选择投放/使用时间"),!1):void(b&&g&&h&&i&&(params=$public.paramcompare($(".addcouponForm").serializeArray()),$.ajax({type:"POST",url:""==c||0==parseInt(c)?e:f,data:params,success:function(a){return $public.isLogin(a),a.success?($public.dialog.msg("保存成功","success"),setTimeout("window.location.href = $('#subpath').val()",1e3),!1):($public.dialog.msg(a.resultMsg,"error"),$(".dialog .msg").css("width","250px"),$(".dialog .msg").attr("marginLeft","-140px"),void 0)}})))})},couponNum:function(){var a=!1,b=$("#fill").val(),c=/^[0-9]*[1-9][0-9]*$/;return""!=b?($("#fill").parent().find(".Validform_checktip").remove(),c.test(b)?b>10?($("#fill").parent().find(".Validform_checktip").remove(),$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">最大限领10张</span>')):(a=!0,$("#fill").parent().find(".Validform_checktip").remove(),$("#fill").parent().append('<span class="Validform_checktip Validform_right"></span>')):($("#fill").parent().find(".Validform_checktip").remove(),$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">请填写1-10之间的数字</span>'))):($("#fill").parent().find(".Validform_checktip").remove(),$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">请填写1-10之间的数字</span>')),a},time_fun:function(){$(".ui-state-default").on("click",function(){$("#putstartime,#putendtime,#getstartime,#getendtime").trigger("change")}),$("#putstartime").on("change",function(){var a=$("#voucherId").val();$addcoupon.timeFun($("#putstartime"),$("#putendtime"),a),$addcoupon.comperFun($("#putstartime"),$("#getstartime"))}),$("#putendtime").on("change",function(){var a=$("#voucherId").val();$addcoupon.timeFun($("#putstartime"),$("#putendtime"),a),$addcoupon.comperFun($("#putendtime"),$("#getendtime"))}),$("#putstartime,#putendtime,#getstartime,#getendtime").datepicker({changeMonth:!0,numberOfMonths:1}),$("#getstartime").on("change",function(){var a=$("#voucherId").val();$addcoupon.timeFun($("#getstartime"),$("#getendtime"),a),$addcoupon.comperFun($("#putstartime"),$("#getstartime"))}),$("#getendtime").on("change",function(){var a=$("#voucherId").val();$addcoupon.timeFun($("#getstartime"),$("#getendtime"),a),$addcoupon.comperFun($("#putendtime"),$("#getendtime"))})},maskFun:function(){$("body").append('<div class="mask" style= "display:block"></div>'),$(".mask").height($(document).height())},compareFun:function(){var a=!1,b=$("#starnum").val(),c=$("#emdnum").val(),d=/^\d{0,8}(\.\d{1,2})?$/;if(""!=b&&""!=c)if(d.test(b)&&d.test(c)){var e=/^\d+(\.\d{0,2})?$/;e.test(b)&&e.test(c)?parseFloat(b)<parseFloat(c)||parseFloat(b)==parseFloat(c)?($(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_wrong">满额必须大于减额</span>')):($(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_right"></span>'),a=!0):($(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_wrong">小数点后只能保留2位</span>'))}else $(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_wrong">不能输入特殊字符,并且小数点后只能保留2位</span>');else $(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_wrong">请输入满减金额</span>');return a},couponNum_fun:function(){var a=!1,b=$("#part"),c=/^[0-9]*[1-9][0-9]*$/;return""!=b.val&&(c.test(b.val())?parseInt(b.val())>1e4?(b.parent().find(".Validform_checktip").remove(),b.parent().append('<span class="Validform_checktip Validform_wrong">发券数量不能大于10000</span>')):(a=!0,b.parent().find(".Validform_checktip").remove(),b.parent().append('<span class="Validform_checktip Validform_right"></span>')):(b.parent().find(".Validform_checktip").remove(),b.parent().append('<span class="Validform_checktip Validform_wrong">请填写不小于1的正整数</span>'))),a}},module.exports=new $coupon});
/*! PC_JX xiongzhaoling 最后修改于： 2017-01-17 */