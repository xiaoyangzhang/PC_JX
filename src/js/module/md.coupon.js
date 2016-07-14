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
						/* "ele_p":/^[0-9]*[1-9][0-9]*$/ */
					},
					ajaxPost:true
				},rule=[
				{
					/* ele:"#part",
					nullmsg:"请填写不小于1的正整数",
					datatype:"ele_p",
					errormsg:"请填写不小于1的正整数" */
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
							$("input[name = 'putStatus']").val("0");
							$("input[name = 'useStatus']").val("0");
						}
						i++;
					});
				});
				$(".select-button").val(selText);
			});
			$("#part").bind("input focus",function(){
				$self.couponNum_fun();
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
				var status = $(this).attr("mode_status");
				var data = $("#editor").val() + "/" + $(this).attr("voucherId") + "?edtType=" + status;
				
				window.location = data;
				/* $self.editorFun(); */
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
				var dataurl = $("#subpath").val();
				var a=validfm.check();
				var id1 = $("#voucherId").val()+ "",id2 = $("#add").val()+ "",id3 = $("#edit").val() + "/" + id1;
				var b = $self.couponNum();
				var c = $self.compareFun();
				var d = $self.couponNum_fun();
				if($("#putstartime").val() == "" || $("#putendtime").val() == "" || $("#getstartime").val() == "" || $("#getstartime").val() == ""){
					alert("请选择投放/使用时间"); 
				}
				
				if(a&&b &&c&&d){
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
<<<<<<< HEAD
								setTimeout(window.location.href = dataurl,2000);
=======
								setTimeout("window.location.href = $('#subpath').val()",1000);
>>>>>>> 1a90b90e8ebe1058a71e2147ba67fc52800eeab5
							}else{
								$public.dialog.msg(data.resultMsg,"error");
								$(".dialog .msg").css('width','250px');
								$(".dialog .msg").attr("marginLeft","-140px");
							}
						}
					});
				}
			});
			
		},
		/* editorFun :function(){
			var status = $(this).attr("mode_status");
			if(status == 'ACTIVE'){
				$("input[name = 'title'],input[name = 'requirement_'],input[name = 'value_'],input[name='putStartTime'],input[name='startTime'],input[name = 'endTime'],input[name='voucherCount']").attr("disabled",true);
			}
			else{
				$("input[name = 'title'],input[name = 'requirement_'],input[name = 'value_'],input[name='putStartTime'],input[name='startTime'],input[name = 'endTime'],input[name='voucherCount']").attr("disabled",false);
			}
		}, */
		couponNum : function(){
			var result = false;
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
							result = true;
							$("#fill").parent().find('.Validform_checktip').remove();
							$("#fill").parent().append('<span class="Validform_checktip Validform_right"></span>');
						}
					}
				}
				else{
					$("#fill").parent().find('.Validform_checktip').remove();
					$("#fill").parent().append('<span class="Validform_checktip Validform_wrong">请填写1-10之间的数字</span>');
				}
				return result;
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
			var result = false;
			var starnum = $("#starnum").val();
			var emdnum = $("#emdnum").val();
			var rule = /\d{0,5}[\.{1}\d{2} | \.{0} ]$//* /^\d{0,5}(\.\d{1,2})?$/ */;
			if(starnum != "" || emdnum != "")
			{
				if(!rule.test(starnum) || !rule.test(emdnum)){
					$(".tip").find('.Validform_checktip').remove();
					$(".tip").append('<span class="Validform_checktip Validform_wrong">满额必须大于减额</span>');
				}
				 else{
					var regex = /^\d+(\.\d{0,2})?$/;
					if(!regex.test(starnum) || !regex.test(emdnum)){
						$(".tip").find('.Validform_checktip').remove();
						$(".tip").append('<span class="Validform_checktip Validform_wrong">小数点后只能保留2位</span>')
					}
					else{
						if(parseFloat(starnum) < parseFloat(emdnum) || parseFloat(starnum) == parseFloat(emdnum)){
							$(".tip").find('.Validform_checktip').remove();
							$(".tip").append('<span class="Validform_checktip Validform_wrong">满额必须大于减额</span>');
						}
						else{
							$(".tip").find('.Validform_checktip').remove();
							$(".tip").append('<span class="Validform_checktip Validform_right"></span>');
							result = true;
						}
					}
				} 
			}
			else{
				$(".tip").find('.Validform_checktip').remove();
				$(".tip").append('<span class="Validform_checktip Validform_wrong">请输入满减金额</span>');
			}
			return result;
		},
		couponNum_fun(){
			var result = false;
			var data = $("#part");
			var txt = /^[0-9]*[1-9][0-9]*$/;
			if(data.val != ""){
				if(!txt.test(data.val())){
					data.parent().find('.Validform_checktip').remove();
					data.parent().append('<span class="Validform_checktip Validform_wrong">请填写不小于1的正整数</span>');
				}
				else{
					if(parseInt(data.val())>10000){
						data.parent().find('.Validform_checktip').remove();
						data.parent().append('<span class="Validform_checktip Validform_wrong">发券数量不能大于10000</span>');
					}
					else{
						result = true; 
						data.parent().find('.Validform_checktip').remove();
						data.parent().append('<span class="Validform_checktip Validform_right"></span>');
					}
				}
			}
			return result;
		}
	}
	module.exports = new $coupon();
});