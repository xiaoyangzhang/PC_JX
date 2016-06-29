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
			
			$( "#putstartime" ).datepicker({
			  defaultDate: "",
			  changeMonth: true,
			  numberOfMonths: 1,
			  onClose: function( selectedDate ) {
				$( "#putendtime" ).datepicker( "option", "minDate", selectedDate );
			  }
			});
			$( "#putendtime" ).datepicker({
			  defaultDate: "",
			  changeMonth: true,
			  numberOfMonths: 1,
			  onClose: function( selectedDate ) {
				$( "#putstartime" ).datepicker( "option", "60D", selectedDate );
			  }
			});
			/* $('#putstartime').datepicker({
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
			}); */
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
			/* 删除表格行 */
			$("table tr td").find(".delete").on("click",function(){
				$(this).closest("tr").remove();
			});
			/* addcoupon */
			$('#starnum,#emdnum').bind('input focus', function() {
				$self.compareFun();
			});
			$('#emdnum').bind('input focus', function() {
				$self.compareFun();
			});
			$("#fill").bind("focus",function(){
				var curr = $(this).val();
				var z= /^[0-9]*[1-9][0-9]*$/;
				if(!z.test(curr)){
					$(this).parent().find('.Validform_checktip').remove();
					$(this).parent().append('<span class="Validform_checktip Validform_wrong">请填写1-10之间的数字</span>');
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
			$(".savebtn").click(function(){
				alert("a");
			});
		},
		/* 对比两个数量 */
		compareFun : function(){
			var starnum = parseFloat($("#starnum").val());
			var emdnum = parseFloat($("#emdnum").val());
			var rule = /^(\d+)?$/;
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