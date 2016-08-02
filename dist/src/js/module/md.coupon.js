/*! pc_jx - v1.0.0 - 2016-07-28 */
define(function(require,exports,module){$public=require("public"),require("dropdownlist"),require("datepicker"),//Ê±¼ä²å¼þ
require("validform"),require("core"),require("widget"),$review=require("review"),$editer=require("editer"),$addcoupon=require("addcoupon"),$coupon=function(){this.init.apply(this,arguments)},$coupon.prototype={init:function(){var $self=this;/* 下拉框 */
$("#status,#putStatus,#useStatus").selectlist({zIndex:10,width:198,height:32,onChange:function(){}});/* 表单初始化 */
var validoptions={tiptype:3,label:".label",showAllError:!0,datatype:{},ajaxPost:!0},rule=[{}],validfm=$(".couponform,.addcouponForm").Validform(validoptions).addRule(rule);/* 重置清空表单 */
$(".delBtn").on("click",function(){var selText="";$(".select-list ul").each(function(){var i=0;$(this).find("li").each(function(){0==i?($(this).attr("class","selected"),selText=$(this).text()):($(this).attr("class",""),$("input[name = 'status']").val("0"),$("input[name = 'putStatus']").val("0"),$("input[name = 'useStatus']").val("0")),i++})}),$(".select-button").val(selText)}),$("#part").bind("input focus",function(){$self.couponNum_fun()}),/* addcoupon */
$("#starnum,#emdnum").bind("input focus",function(){$self.compareFun()}),/* 投放时间和使用时间 */
$self.time_fun(),/* 添加获取ID */
$(".addBtn").on("click",function(){var data=$("#addVoucher").val();window.location.href=data}),/* 编辑 */
$(".editor").on("click",function(){var status=$(this).attr("mode_status"),data=$("#editor").val()+"/"+$(this).attr("voucherId")+"?edtType="+status;window.location.href=data}),/* 上架 */
$(".putaway").on("click",function(){/* $('body').append('<div class="mask" style= "display:block"></div>');
				$(".mask").height($(document).height()); */
$self.maskFun(),$("#put_voucherId").val($(this).attr("voucherId")),$("#tip_get").fadeIn()}),/* 删除取消 */
$(".get_del").on("click",function(){$(".mask").remove(),$("#tip_get").fadeOut(),$("#tip_out").fadeOut(),$("#tip_del").fadeOut()}),/* 确定上架 */
$("#get_sure").on("click",function(){$(".mask").remove(),$("#tip_get").fadeOut();var url_data=$("#putaway").val()+"/"+$("#put_voucherId").val();$.ajax({type:"POST",url:url_data,success:function(data){$public.isLogin(data),data.success?($public.dialog.msg("上架成功","success"),window.location.href=window.location.href):($public.dialog.msg(data.resultMsg,"error"),$(".dialog .msg").css("width","220px"),$(".dialog .msg").attr("marginLeft","-130px"))}})}),/* 列表查询 */
/* $(".searchBtn").on("click",function(){
				var search_url = $("#subpath").val();
				var status = $("input[name='status']").val();
				var putStatus = $("input[name='putStatus']").val();
				var useStatus = $("input[name='useStatus']").val();
				$.ajax({
						type:'GET',
						url:search_url,
						data:{status:status,putStatus:putStatus,useStatus:useStatus},
						success:function(data){
							$public.isLogin(data);
							if( data.success ){
								$public.dialog.msg("查询成功","success");
								window.location.href = window.location.href;
							}else{
								$public.dialog.msg(data.resultMsg,"error");
							}
						}
					});
			}); */
/* 下架 */
$(".getaway").on("click",function(){$self.maskFun(),$("#get_voucherId").val($(this).attr("voucherId")),$("#tip_out").fadeIn()}),/* 确定下架 */
$("#away_sure").on("click",function(){$("#tip_out").fadeOut(),$(".mask").remove();var url_data=$("#getaway").val()+"/"+$("#get_voucherId").val();$.ajax({type:"POST",url:url_data,success:function(data){$public.isLogin(data),data.success?($public.dialog.msg("下架成功","success"),window.location.href=window.location.href):$public.dialog.msg(data.resultMsg,"error")}})}),/* 删除表格行 */
$("table tr td").find(".delete").on("click",function(){$self.maskFun(),$("#del_voucherId").val($(this).attr("voucherId")),/* var list1 = $(this).closest("tr").find(".date_list1").text();
				var list2 = $(this).closest("tr").find(".date_list2").text();
				var list3 = $(this).closest("tr").find(".date_list3").text();
				var list4 = $(this).closest("tr").find(".date_list4").text();
				if(list1!= "" && list2 != "" && list3 != "" && list4 != ""){
					$(".tou_start").html(list1);
					$(".tou_end").html(list2);
					$(".shi_start").html(list3);
					$(".shi_end").html(list4);
				} */
$("#tip_del").fadeIn()}),/* 确定删除 */
$(".delete_sure").on("click",function(){var _self=this;$("#tip_del").fadeOut(),$(".mask").remove();var url_data=$("#delete").val()+"/"+$("#del_voucherId").val();$.ajax({type:"POST",url:url_data,success:function(data){$public.isLogin(data),data.success?(clearTimeout(_self.timer),_self.timer=setTimeout(function(){$public.dialog.msg("删除成功","success")},5e3),window.location.href=window.location.href):$public.dialog.msg(data.resultMsg,"error")}})}),$("#fill").bind("input focus",function(){$self.couponNum()}),$(".savebtn").click(function(){var a=($("#subpath").val(),validfm.check()),id1=$("#voucherId").val()+"",id2=$("#add").val()+"",id3=$("#edit").val()+"/"+id1,b=$self.couponNum(),c=$self.compareFun(),d=$self.couponNum_fun();/* console.log(JSON.stringify(params)); */
return""==$("#putstartime").val()||""==$("#putendtime").val()||""==$("#getstartime").val()||""==$("#getstartime").val()?(alert("请选择投放/使用时间"),!1):void(a&&b&&c&&d&&(params=$public.paramcompare($(".addcouponForm").serializeArray()),$.ajax({type:"POST",url:""==id1||0==parseInt(id1)?id2:id3,data:params,success:function(data){/* setTimeout(window.location.href = dataurl,2000); */
return $public.isLogin(data),data.success?($public.dialog.msg("保存成功","success"),setTimeout("window.location.href = $('#subpath').val()",1e3),!1):($public.dialog.msg(data.resultMsg,"error"),$(".dialog .msg").css("width","250px"),$(".dialog .msg").attr("marginLeft","-140px"),void 0)}})))})},/* editorFun :function(){
			var status = $(this).attr("mode_status");
			if(status == 'ACTIVE'){
				$("input[name = 'title'],input[name = 'requirement_'],input[name = 'value_'],input[name='putStartTime'],input[name='startTime'],input[name = 'endTime'],input[name='voucherCount']").attr("disabled",true);
			}
			else{
				$("input[name = 'title'],input[name = 'requirement_'],input[name = 'value_'],input[name='putStartTime'],input[name='startTime'],input[name = 'endTime'],input[name='voucherCount']").attr("disabled",false);
			}
		}, */
couponNum:function(){var result=!1,curr=$("#fill").val(),z=/^[0-9]*[1-9][0-9]*$/;return""!=curr?($("#fill").parent().find(".Validform_checktip").remove(),z.test(curr)?curr>10?($("#fill").parent().find(".Validform_checktip").remove(),$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">最大限领10张</span>')):(result=!0,$("#fill").parent().find(".Validform_checktip").remove(),$("#fill").parent().append('<span class="Validform_checktip Validform_right"></span>')):($("#fill").parent().find(".Validform_checktip").remove(),$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">请填写1-10之间的数字</span>'))):($("#fill").parent().find(".Validform_checktip").remove(),$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">请填写1-10之间的数字</span>')),result},time_fun:function(){/* 第一组 */
$(".ui-state-default").on("click",function(){$("#putstartime,#putendtime,#getstartime,#getendtime").trigger("change")}),$("#putstartime").on("change",function(){var status=$("#voucherId").val();$addcoupon.timeFun($("#putstartime"),$("#putendtime"),status),$addcoupon.comperFun($("#putstartime"),$("#getstartime"))}),$("#putendtime").on("change",function(){var status=$("#voucherId").val();$addcoupon.timeFun($("#putstartime"),$("#putendtime"),status),$addcoupon.comperFun($("#putendtime"),$("#getendtime"))}),$("#putstartime,#putendtime,#getstartime,#getendtime").datepicker({changeMonth:!0,numberOfMonths:1}),/* 第二组 */
$("#getstartime").on("change",function(){var status=$("#voucherId").val();$addcoupon.timeFun($("#getstartime"),$("#getendtime"),status),$addcoupon.comperFun($("#putstartime"),$("#getstartime"))}),$("#getendtime").on("change",function(){var status=$("#voucherId").val();$addcoupon.timeFun($("#getstartime"),$("#getendtime"),status),$addcoupon.comperFun($("#putendtime"),$("#getendtime"))})},maskFun:function(){$("body").append('<div class="mask" style= "display:block"></div>'),$(".mask").height($(document).height())},/* 对比两个数量 */
compareFun:function(){var result=!1,starnum=$("#starnum").val(),emdnum=$("#emdnum").val(),rule=/^\d{0,8}(\.\d{1,2})?$/;if(""!=starnum&&""!=emdnum)if(rule.test(starnum)&&rule.test(emdnum)){var regex=/^\d+(\.\d{0,2})?$/;regex.test(starnum)&&regex.test(emdnum)?parseFloat(starnum)<parseFloat(emdnum)||parseFloat(starnum)==parseFloat(emdnum)?($(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_wrong">满额必须大于减额</span>')):($(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_right"></span>'),result=!0):($(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_wrong">小数点后只能保留2位</span>'))}else $(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_wrong">不能输入特殊字符,并且小数点后只能保留2位</span>');else $(".tip").find(".Validform_checktip").remove(),$(".tip").append('<span class="Validform_checktip Validform_wrong">请输入满减金额</span>');return result},couponNum_fun:function(){var result=!1,data=$("#part"),txt=/^[0-9]*[1-9][0-9]*$/;return""!=data.val&&(txt.test(data.val())?parseInt(data.val())>1e4?(data.parent().find(".Validform_checktip").remove(),data.parent().append('<span class="Validform_checktip Validform_wrong">发券数量不能大于10000</span>')):(result=!0,data.parent().find(".Validform_checktip").remove(),data.parent().append('<span class="Validform_checktip Validform_right"></span>')):(data.parent().find(".Validform_checktip").remove(),data.parent().append('<span class="Validform_checktip Validform_wrong">请填写不小于1的正整数</span>'))),result}},module.exports=new $coupon});
/*! pc_jx 最后修改于： 2016-07-28 */