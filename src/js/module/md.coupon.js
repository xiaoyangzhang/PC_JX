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
			$('#state,#send,#time').selectlist({
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
				alert($("#voucherId").text());
				var data = $("#editor").val() + "/" + $("#voucherId").text();
				window.location = data;
			});
			/* 上架 */
			$(".putaway").on("click",function(){
				$('body').append('<div class="dialog" style= "display:block"><div class="bgmeng" style="height:'+$(document).height()+'px"></div></div>');
				$("#tip_get").fadeIn();
			});
			/* 删除取消 */
			$(".get_del").on("click",function(){
				$(".dialog").remove();
				$("#tip_get").fadeOut();
				$("#tip_out").fadeOut();
			})
			/* 确定上架 */
			$("#get_sure").on("click",function(){
				var url_data = $("#putaway").val() + "/" + $("#voucherId").val();
				$.ajax({
						type:'POST',
						url:url_data,
						success:function(data){
							$public.isLogin(data);
							if( data.success ){
								$public.dialog.msg(data.resultMsg,"success");
							}else{
								$public.dialog.msg(data.errorMsg,"error");
							}
						}
					});
			});
			/* 下架 */
			$(".getaway").on("click",function(){
				$('body').append('<div class="dialog" style= "display:block"><div class="bgmeng" style="height:'+$(document).height()+'px"></div></div>');
				$("#tip_out").fadeIn();
			});
			/* 确定下架 */
			$(".away_sure").on("click",function(){
				var url_data = $("#getaway").val() + "/" + $("#voucherId").val();
				$.ajax({
						type:'POST',
						url:url_data,
						success:function(data){
							$public.isLogin(data);
							if( data.success ){
								$public.dialog.msg(data.resultMsg,"success");
							}else{
								$public.dialog.msg(data.errorMsg,"error");
							}
						}
					});
			});
			/* 删除表格行 */
			$("table tr td").find(".delete").on("click",function(){
				var url_data = $("#delete").val() + "/" + $("#voucherId").val();
				$.ajax({
						type:'POST',
						url:url_data,
						success:function(data){
							$public.isLogin(data);
							if( data.success ){
								$public.dialog.msg(data.resultMsg,"success");
							}else{
								$public.dialog.msg(data.errorMsg,"error");
							}
						}
					});
			});
			$("#fill").bind("input focus",function(){
				$self.couponNum();
			});
			$(".savebtn").click(function(){
				var a=validfm.check();
				$self.couponNum();
				$self.compareFun();
				if($("#putstartime").val() == "" || $("#putendtime").val() == "" || $("#getstartime").val() == "" || $("#getstartime").val() == ""){
					alert("您的时间信息有误！"); 
				}
				
				if(a){
					params=$public.paramcompare($('.addcouponForm').serializeArray());
					console.log(JSON.stringify(params));
					$.ajax({
						type:'POST',
						url:"" + $("#add").val(),
						data:params,
						success:function(data){
							$public.isLogin(data);
							if( data.success ){
								$public.dialog.msg(data.resultMsg,"success");
							}else{
								$public.dialog.msg(data.errorMsg,"error");
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
				$("#putstartime,#putendtime").trigger('change');
			});
			$("#putstartime").on("change",function(){
				$addcoupon.timeFun($("#putstartime"),$("#putendtime"));
				$addcoupon.comperFun($("#putstartime"),$("#getstartime"));
			});
			$("#putendtime").on("change",function(){
				$addcoupon.timeFun($("#putstartime"),$("#putendtime"));
			});
			$( "#putstartime,#putendtime" ).datepicker({
			  changeMonth: true,
			  numberOfMonths: 1,
			});
			/* 第二组 */
			$(".ui-state-default").on("click",function(){
				$("#getstartime,#getendtime").trigger('change');
			});
			$("#getstartime").on("change",function(){
				$addcoupon.timeFun($("#getstartime"),$("#getendtime"));
				$addcoupon.comperFun($("#putstartime"),$("#getstartime"));
			});
			$("#getendtime").on("change",function(){
				$addcoupon.timeFun($("#getstartime"),$("#getendtime"));
			});
			$( "#getstartime,#getendtime").datepicker({
			  changeMonth: true,
			  /* numberOfMonths: 1, */
			});
			$('#getendtime').datepicker('setDate','2011/12/15');
		},
		/* 对比两个数量 */
		compareFun : function(){
			var starnum = parseFloat($("#starnum").val());
			var emdnum = parseFloat($("#emdnum").val());
			var rule = /^\d+(\.{0,1}\d+){0,1}$/;
			if(starnum != "" && emdnum != ""){
				$(".tip").find('.Validform_checktip').remove();
				if(!rule.test(starnum) || !rule.test(emdnum)){
					$(".tip").find('.Validform_checktip').remove();
					$(".tip").append('<span class="Validform_checktip Validform_wrong">请填写满的金额大于减的金额数字</span>');
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