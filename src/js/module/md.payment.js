/*! PC_JX - v1.0.0 - 2016-12-16 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),require("dropdownlist");var a=require("public");Payment=function(){this.init.apply(this,arguments)},Payment.prototype={config:{btnStratTime:"#getstartime",btnEndTime:"#getendtime",selectType:".select-type",btnWithdrawal:".btn-withdrawal",queryForm:"#queryForm"},init:function(){function b(a,b){var d=$(c.config.queryForm),e=d.serialize(),f=d.attr("action");d.attr("action",f+"?"+e).submit()}var c=this;c.initDateComponent(c),c.btnWithdrawClick(c),c.initSelectComponent(c),a.init_pagination(b),$(".withdrawal,.billDetail").on("click",function(){var b=$(this).attr("redirectUrl");6==$(".status").val()?a.dialog.msg($(".tipMessage").val(),"error",5e3):b&&(window.location=b)})},initSelectComponent:function(a){$(a.config.selectType).selectlist({zIndex:10,width:216,triangleColor:"#ccc",height:32,onChange:function(){}})},initDateComponent:function(a){$(a.config.btnStratTime).datepicker({changeMonth:!0,changeYear:!0,onSelect:function(b,c){var d=$(a.config.btnStratTime),e=$(a.config.btnEndTime),f=d.datepicker("getDate");e.datepicker("getDate");e.datepicker("option","minDate",f)}}),$(a.config.btnEndTime).datepicker({changeMonth:!0,changeYear:!0,onSelect:function(b,c){var d=$(a.config.btnStratTime),e=$(a.config.btnEndTime),f=e.datepicker("getDate");d.datepicker("getDate");d.datepicker("option","maxDate",f)}})},btnWithdrawClick:function(){var a=$("#root_path").val()+"/account/withdrawal",b=$("#root_path").val()+"/account/withdrawalResult";$(document).on("click",this.config.btnWithdrawal,function(){$public.dialog.content(600,320,"确认信息",$("#bill").show(),function(){$.ajax({type:"post",url:a,dataType:"json",success:function(a){var c=a;"200"==c.status?location.href=b:$public.dialog.msg(c.message.substr(1,c.message.length-2),"success",4e3)},error:function(a,b,c){$public.dialog.msg(c,"error")}})},function(){})})}},module.exports=new Payment});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-16 */