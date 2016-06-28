define(function (require, exports, module) {
	$public = require("public"),
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
			//渲染时间控件
			/* 第一组 */
			$('#putstartime').datepicker({
				dateFormat:'yy-mm-dd',
				onSelect: function( startDate ) {
					var $startDate = $( "#putstartime" );
					var $endDate = $('#putendtime');
					var endDate = $endDate.datepicker( 'getDate' );
					if(endDate < startDate){
						$endDate.datepicker('setDate', startDate - 3600*1000*24);
					}
					$endDate.datepicker( "option", "minDate", startDate );
				}
			});
			$("#putendtime").datepicker({
				dateFormat:'yy-mm-dd',
				onSelect: function( endDate ) {
					var $startDate = $( "#putstartime" );
					var $endDate = $('#putendtime');
					var startDate = $startDate.datepicker( "getDate" );
					if(endDate < startDate){
						$startDate.datepicker('setDate', startDate + 3600*1000*24);
					}
					$startDate.datepicker( "option", "maxDate", endDate );
				}
			});
			/* 第二组 */
			$('#getstartime').datepicker({
				dateFormat:'yy-mm-dd',
				onSelect: function( startDate ) {
					var $startDate = $( "#getstartime" );
					var $endDate = $('#getendtime');
					var endDate = $endDate.datepicker( 'getDate' );
					if(endDate < startDate){
						$endDate.datepicker('setDate', startDate - 3600*1000*24);
					}
					$endDate.datepicker( "option", "minDate", startDate );
				}
			});
			$("#getendtime").datepicker({
				dateFormat:'yy-mm-dd',
				onSelect: function( endDate ) {
					var $startDate = $( "#getstartime" );
					var $endDate = $('#getendtime');
					var startDate = $startDate.datepicker( "getDate" );
					if(endDate < startDate){
						$startDate.datepicker('setDate', startDate + 3600*1000*24);
					}
					$startDate.datepicker( "option", "maxDate", endDate );
				}
			});
			
			
			
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

					},
					ajaxPost:true
				},rule=[
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
			/* 删除表格行 */
			$("table tr td").find(".delete").on("click",function(){
				$(this).closest("tr").remove();
			});
			
			/* addcoupon */
			var starIndex = $('#starnum').val();
			var endIndex = $('#emdnum').val();
			$('#starnum,#emdnum').bind('input change', function() {
				if(starIndex < endIndex)
				{
					$("#starnum").parent().append('<span class="Validform_checktip Validform_wrong">满大于减</span>');
				}
				
			});
			/* $('#emdnum').bind('input change', function() {
				if(starIndex < endIndex)
				{
					$("#starnum").parent().append('<span class="Validform_checktip Validform_wrong">满大于减</span>');
				}
			}); */
			
			$("#fill").bind("change",function(){
				var curr = $(this).val();
				var z= /^\d+$/;
				if(!z.test(curr)){
					$(this).parent().find('.Validform_checktip').remove();
					$(this).parent().append('<span class="Validform_checktip Validform_wrong">请填写数字</span>');
				}
				else{
					if(curr > 10){
						$(this).parent().find('.Validform_checktip').remove();
						$(this).parent().append('<span class="Validform_checktip Validform_wrong">最大限领10张</span>');
					}
					else{
						$(this).parent().find('.Validform_checktip').remove();
						$(this).parent().append('<span class="Validform_checktip Validform_right"></span>');
					}
				}
			});
			$("#part").bind("change",function(){
				var currPart = $(this).val();
				var c = /^\d+$/;
				if(!c.test(currPart)){
					alert("an");
					$(this).parent().find('.Validform_checktip').remove();
					$(this).parent().append('<span class="Validform_checktip Validform_wrong">请填写不小于1的数字</span>');
				}
				else{
					alert("asdjkaghjags");
					$(this).parent().find('.Validform_checktip').remove();
					$(this).parent().append('<span class="Validform_checktip Validform_right"></span>');
				}
			});
		}
	}
	module.exports = new $coupon();
});