define(function (require, exports, module) {
	$public = require("public"),
	$addcoupon = require("addcoupon"),
	require("core"),
	require("widget"),
	require("datepicker"),
	require("dropdownlist"),
	
	require("validform"),
	$coupon = function () {
		this.init.apply(this, arguments);
	};
	$coupon.prototype = {
		init:function(){
			var $self = this;
			/* 下拉框 */
			$('#status,#putStatus,#useStatus').selectlist({
				zIndex: 10,
				width: 220,
				height: 32,
				onChange:function(){}
			});
			/* 表单初始化 */
			var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
						"ele_p":/^[0-9]*[1-9][0-9]*$/
					},
					ajaxPost:true
				},rule=[
				{
					ele:"#part",
					nullmsg:"请填写不小于1的正整数",
					datatype:"ele_p",
					errormsg:"请填写不小于1的正整数"
				}
				],validfm=$(".couponform,.addcouponForm").Validform(validoptions).addRule(rule);
			/* 重置清空表单 */
			$(".delBtn").on("click",function(){
				var selText = "";
				$(".select-list ul").each(function(){
					var i = 0; 
					$(this).find("li").each(function(){
						if(i == 0){
							$(this).attr("class","selected");
							selText = $(this).text();
						}else{
							$(this).attr("class","");
							$("input[name = 'status']").val("0");
						}
						i++;
					});
				});
				$(".select-button").val(selText);
			});
			
			/* addcoupon */
			$('#starnum,#emdnum').bind('input focus', function() {
				$self.compareFun();
			});
			/* 投放时间和使用时间 */
			$self.time_fun();
			/* 添加获取ID */
			$(".addBtn").on("click",function(){
				var data = $("#addVoucher").val();
				window.location = data;
				
			});
			/* 编辑 */
			$(".editor").on("click",function(){
				var data = $("#editor").val() + "/" + $(this).attr("voucherId");
				window.location = data;
			});
			/* 上架 */
			$(".putaway").on("click",function(){
				/* $('body').append('<div class="mask" style= "display:block"></div>');
				$(".mask").height($(document).height()); */
				$self.maskFun();
				$("#put_voucherId").val($(this).attr("voucherId"));
				$("#tip_get").fadeIn();
			});
			/* 删除取消 */
			$(".get_del").on("click",function(){
				$(".mask").remove();
				$("#tip_get").fadeOut();
				$("#tip_out").fadeOut();
				$("#tip_del").fadeOut();
			})
			/* 确定上架 */
			$("#get_sure").on("click",function(){
				$(".mask").remove();
				$("#tip_get").fadeOut();
				var url_data = $("#putaway").val() + "/" + $("#put_voucherId").val();
				$.ajax({
						type:'POST',
						url:url_data,
						success:function(data){
							$public.isLogin(data);
							if( data.success ){
								$public.dialog.msg("上架成功","success");
								window.location.href = window.location.href;
							}else{
								$public.dialog.msg(data.resultMsg,"error");
							}
						}
					});
				
			});
			/* 列表查询 */
			$(".searchBtn").on("click",function(){
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
			});
			/* 下架 */
			$(".getaway").on("click",function(){
				$self.maskFun();
				$("#get_voucherId").val($(this).attr("voucherId"));
				$("#tip_out").fadeIn();
			});
			/* 确定下架 */
			$("#away_sure").on("click",function(){
				$("#tip_out").fadeOut();
				$(".mask").remove();
				var url_data = $("#getaway").val() + "/" + $("#get_voucherId").val();
				$.ajax({
						type:'POST',
						url:url_data,
						success:function(data){
							$public.isLogin(data);
							if( data.success ){
								$public.dialog.msg("下架成功","success");
								window.location.href = window.location.href;
							}else{
								$public.dialog.msg(data.resultMsg,"error");
							}
						}
					});
			});
			/* 删除表格行 */
			$("table tr td").find(".delete").on("click",function(){
				$self.maskFun();				
				$("#del_voucherId").val($(this).attr("voucherId"));
				var list1 = $(this).closest("tr").find(".date_list1").text();
				var list2 = $(this).closest("tr").find(".date_list2").text();
				var list3 = $(this).closest("tr").find(".date_list3").text();
				var list4 = $(this).closest("tr").find(".date_list4").text();
				if(list1!= "" && list2 != "" && list3 != "" && list4 != ""){
					$(".tou_start").html(list1);
					$(".tou_end").html(list2);
					$(".shi_start").html(list3);
					$(".shi_end").html(list4);
				}
				$("#tip_del").fadeIn();
			});
			/* 确定删除 */
			$(".delete_sure").on("click",function(){
				var _self = this;
				$("#tip_del").fadeOut();
				$(".mask").remove();
				var url_data = $("#delete").val() + "/" + $("#del_voucherId").val();
				$.ajax({
						type:'POST',
						url:url_data,
						success:function(data){
							$public.isLogin(data);
							if( data.success ){
								clearTimeout(_self.timer);
								_self.timer=setTimeout(function(){$public.dialog.msg("删除成功","success")},5000);
								window.location.href = window.location.href;
							}else{
								$public.dialog.msg(data.resultMsg,"error");
							}
						}
					});
			});
			$("#fill").bind("input focus",function(){
				$self.couponNum();
			});
			$(".savebtn").click(function(){
				var a=validfm.check();
				var id1 = $("#voucherId").val()+ "",id2 = $("#add").val()+ "",id3 = $("#edit").val() + "/" + id1;
				$self.couponNum();
				$self.compareFun();
				if($("#putstartime").val() == "" || $("#putendtime").val() == "" || $("#getstartime").val() == "" || $("#getstartime").val() == ""){
					alert("您的时间信息有误！"); 
				}
				
				if(a){
					params=$public.paramcompare($('.addcouponForm').serializeArray());
					/* console.log(JSON.stringify(params)); */
					$.ajax({
						type:'POST',
						url:(id1=="" || parseInt(id1) == 0 )?id2:id3,
						data:params,
						success:function(data){
							$public.isLogin(data);
							if(data.success ){
								$public.dialog.msg("保存成功","success");
							}else{
								$public.dialog.msg(data.resultMsg,"error");
							}
						}
					});
				}
			});
			
		},
		couponNum : function(){
			var curr = $("#fill").val();
				var z= /^[0-9]*[1-9][0-9]*$/;
				if(curr != ""){
					$("#fill").parent().find('.Validform_checktip').remove();
					if(!z.test(curr)){
						$("#fill").parent().find('.Validform_checktip').remove();
						$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">请填写1-10之间的数字</span>');
					}
					else{
						if(curr > 10){
							$("#fill").parent().find('.Validform_checktip').remove();
							$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">最大限领10张</span>');
						}
						else{
							$("#fill").parent().find('.Validform_checktip').remove();
							$("#fill").parent().append('<span class="Validform_checktip Validform_right"></span>');
						}
					}
				}
				else{
					$("#fill").parent().find('.Validform_checktip').remove();
					$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">请填写1-10之间的数字</span>');
				}
		},
		time_fun:function(){
			/* 第一组 */
			$(".ui-state-default").on("click",function(){
				$("#putstartime,#putendtime,#getstartime,#getendtime").trigger('change');
			});
			$("#putstartime").on("change",function(){
				$addcoupon.timeFun($("#putstartime"),$("#putendtime"));
				$addcoupon.comperFun($("#putstartime"),$("#getstartime"));
			});
			$("#putendtime").on("change",function(){
				$addcoupon.timeFun($("#putstartime"),$("#putendtime"));
				$addcoupon.comperFun($("#putendtime"),$("#getendtime"));
			});
			$( "#putstartime,#putendtime,#getstartime,#getendtime" ).datepicker({
			  changeMonth: true,
			  numberOfMonths: 1,
			});
			/* 第二组 */
			$("#getstartime").on("change",function(){
				$addcoupon.timeFun($("#getstartime"),$("#getendtime"));
				$addcoupon.comperFun($("#putstartime"),$("#getstartime"));
			});
			$("#getendtime").on("change",function(){
				$addcoupon.timeFun($("#getstartime"),$("#getendtime"));
				$addcoupon.comperFun($("#putendtime"),$("#getendtime"));
			});
		},
		maskFun : function(){
			$('body').append('<div class="mask" style= "display:block"></div>');
			$(".mask").height($(document).height());
		},
		/* 对比两个数量 */
		compareFun : function(){
			var starnum = parseFloat($("#starnum").val());
			var emdnum = parseFloat($("#emdnum").val());
			var rule = /^\d+(\.{0,1}\d+){0,1}$/;
			if(starnum != "" && emdnum != ""){
				$(".tip").find('.Validform_checktip').remove();
				if(!rule.test(starnum) || !rule.test(emdnum)){
					if(starnum < 0 || emdnum < 0){
						$(".tip").find('.Validform_checktip').remove();
						$(".tip").append('<span class="Validform_checktip Validform_wrong">请满足满减金额都是大于0的数</span>');
					}
					else{
						$(".tip").find('.Validform_checktip').remove();
						$(".tip").append('<span class="Validform_checktip Validform_wrong">请填写满的金额大于减的金额数字</span>');
					}
				}
				else{
					if(starnum < emdnum || starnum == emdnum){
						$(".tip").find('.Validform_checktip').remove();
						$(".tip").append('<span class="Validform_checktip Validform_wrong">请填写满的金额大于减的金额</span>')
					}
					else{
						$(".tip").find('.Validform_checktip').remove();
						$(".tip").append('<span class="Validform_checktip Validform_right"></span>');
					}
				}
			}
			else{
				$(".tip").find('.Validform_checktip').remove();
				$(".tip").append('<span class="Validform_checktip Validform_wrong">请填写满的金额大于减的金额数字</span>');
			}
		}
	}
	module.exports = new $coupon();
});