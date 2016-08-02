/*! pc_jx - v1.0.0 - 2016-07-28 */
define(function(require,exports,module){require("dropdownlist"),//下拉框组件
require("validform"),//验证组件
$cus_datepicker=require("cus_datepicker"),$public=require("public"),$choicehotel=function(){this.init.apply(this,arguments)},$choicehotel.prototype={config:{radiobar:".radio-bar",barbox:".bar-box",barboxul:".bar-box ul",barboxdiv:".bar-box div",radiobarlabel:".radio-bar label",radiobarimg:".radio-bar img",eredarli:".eredar-info li",eredarpanel:".eredar-right .panel",searchotel:".choicehotel",searchbox:".searchbox",hotelist:".hotelist",loadlist:".load_list",searchbtn:".search-btn",btnOk:".ok",infoBar:".info-bar",infoBox:".info-box",inputGp:'input[name="gp"]',svdraftbox:".svdraftbox",svdraft:".svdraft"},init:function(){
//获取酒店列表
function gethotelist(page,pagesize){var page=page?page:1,pagesize=pagesize?pagesize:$("#pageSize").val(),$htlst=$(_self.config.searchbox).find(_self.config.hotelist);$htlst.empty(),$.get($public.urlpath.gethotelist,{page:page,pageSize:pagesize,name:$("#hotelname").val(),locationProvinceId:$('input[name="province"]').val()?$('input[name="province"]').val():0,locationCityId:$('input[name="city"]').val()?$('input[name="city"]').val():0,locationTownId:$('input[name="area"]').val()?$('input[name="area"]').val():0},function(data){$htlst.append(data),$(_self.config.loadlist).hide(),$(".jiuniu_pagination").css("margin-left",($(".container").width()-$(".jiuniu_pagination").width())/2+"px"),$(".tb-box").height($(".hotelist").height())})}
//获取房型详细信息
function gitroominfo(){var $tr=$('input[name="hotelGroup"]:checked').closest("tr");$(".load_room").show(),$(".hotelcol").hide(),$(_self.config.infoBar).find(".htn").text($tr.find(".hotel-name").text()),$(_self.config.infoBar).find(".address").text($tr.find(".hotel-address").text()),$(_self.config.infoBar).find(".tel").text($tr.find(".hotel-tel").text()),$.get($public.urlpath.getroominfo,{hotelId:$('input[name="hotelGroup"]:checked').val()},function(data){$(".load_room").hide(),$(".hotelcol").show(),$(_self.config.infoBox).empty().append(data);var rdlth=$(".radio-bar").length-1;$(".radio-bar:eq("+rdlth+")").css("border-bottom","none"),setTimeout(function(){$(".radio-bar:eq(0)").trigger("click")},500)})}function valid_step_one(){var validresult=!0;return 0==$('input[name="hotelId"]').val()?($public.dialog.msg("请选择酒店！","error"),validresult=!1):0==$('input[name="roomId"]').val()&&($public.dialog.msg("请选择房型！","error"),validresult=!1),validresult||$(document).scrollTop(0),validresult}function valid_step_two(){var validresult=!0;return validfm.check()||(validresult=!1),check_storeLastTime()||(validresult=!1),$public.selectvalid("breakfast")||(validresult=!1),validresult}function check_storeLastTime(){var $cked=$(".checkbox input:checked"),$cklast=$(".baseinfo .checkbox:last");return $cklast.find(".Validform_checktip").remove(),$cked.length>3?($cklast.append('<span class="Validform_checktip Validform_wrong">最多只能选三个！</span>'),!1):0==$cked.length?($cklast.append('<span class="Validform_checktip Validform_wrong">请选择最晚到店时间</span>'),!1):($cklast.append('<span class="Validform_checktip Validform_right"></span>'),!0)}var _self=this,validoptions={tiptype:3,label:".label",showAllError:!0,datatype:{"*2-10":/^[\w\W]{2,10}$/,"n10-25":/^\d{10,25}$/,"n0-90":/^([0-9]|90|[1-8][0-9])$/},ajaxPost:!0},rule=[{ele:"input[type='text']:not('.allownull'),textarea",datatype:"*",nullmsg:"请填信息！"},{ele:"input[name='payType']:last",datatype:"*",nullmsg:"请选择付款方式！"},{ele:"input[name='cancelLimit']:last",datatype:"*",nullmsg:"请选择退订限制！"},{ele:"input[name='startBookTimeLimit']",datatype:"n0-90",nullmsg:"请填写提前预定天数！",errormsg:"只能输入0-90范围数字！"}],validfm=$(".baseinfo form").Validform(validoptions).addRule(rule);$("#breakfast").selectlist({width:200}),$(".baseinfo .checkbox:last").css("width","300px"),$(".checkbox input").on("change",function(){check_storeLastTime()}),$public.procityaredata("province","city","area",!0),$('textarea[name="description"]').keypress(function(ev){var e=ev||window.event||arguments.callee.caller.arguments[0];if(13==e.keyCode)return!1}),
//计算输入字数
$(".inputxt,textarea").keyup(function(){$(this).next(".mark").find("label.cv").text($(this).val().length)}).filter(function(){$(this).next(".mark").find("label.cv").text($(this).val().length)}),
//切换房型开关门
$(document).on("click",_self.config.radiobar,function(ev){var $prentli=$(this).closest("li");$(_self.config.barbox).css("height","0").attr("id",0),$(_self.config.radiobarimg).attr("src",static_source+"img/droptip_down.jpg"),$(this).next().css("height",$prentli.find(_self.config.barboxul).outerHeight()+$prentli.find(_self.config.barboxdiv).outerHeight()+15+"px"),$(this).find("img").attr("src",static_source+"img/droptip_up.jpg"),
// if(!$(this).attr('id')){
// 	$(this).attr('id',1).next()
// 	.css('height',($prentli.find(_self.config.barboxul).outerHeight()+$prentli.find(_self.config.barboxdiv).outerHeight()+15)+'px');
// 	$(this).find('img').attr('src',static_source+'img/droptip_up.jpg');
// }else{
// 	$(this).attr('id','').next().css('height','0');
// 	$(this).find('img').attr('src',static_source+'img/droptip_down.jpg');
// }
$public.stopBubble(ev)}),
//弹出框查询酒店
$(_self.config.searchotel).on("click",function(ev){var $searchbox=$(".searchbox"),$htlst=$searchbox.find(_self.config.hotelist);$public.dialog.content(968,"auto","选择酒店",$searchbox.show(),function(){var ckid=$('input[name="hotelGroup"]:checked'),htlid=ckid.val(),hp=ckid.closest("tr").find(":hidden").val(),htname=ckid.closest("td").next().text();return $(".hotelType").text(hp),htlid?($('input[name="hotelId"]').val(htlid),$('input[name="name"]').val(htname),$("#lbhotelname").text(htname),$public.dialog.closebox(),gitroominfo()):alert("请选择酒店！"),!1},function(){$htlst.height($(".container").height()-120),$(_self.config.loadlist).show()}),gethotelist(),$public.stopBubble(ev)}),
//保存草稿弹出层
$(_self.config.svdraft).on("click",function(ev){var $svdraftbox=$(_self.config.svdraftbox);$public.dialog.content(300,160,"保存草稿标题",$svdraftbox.show(),function(){var prarm=$public.paramcompare($("#hotelfm").serializeArray()),svdraftxt=($('input[name="operationFlag"]').val(),$(".svdraftxt").val());
//url=operationFlag=='update'?$public.urlpath.updatehotel:$public.urlpath.addhotel;
return"object"==typeof prarm.storeLastTime&&(prarm.storeLastTime=prarm.storeLastTime.join(",")),svdraftxt?(console.log(prarm),$public.dialog.closebox(),$public.dialog.waiting(),void $.post($public.urlpath.saveSPOTDraft,{json:prarm,draftName:svdraftxt,uuid:$("#uuid").val(),subType:$("#draftSubType").val(),mainType:1,id:$("#draftId").val()},function(data){data.success?data.resultMsg>0&&($("#draftId").val(data.resultMsg),$public.dialog.msg("保存草稿成功！","success")):$public.dialog.msg("保存草稿失败！","error"),$public.dialog.closebox()})):void $(".svdraftxt").focus()},function(){$svdraftbox.height($(".container").height()-120)},1),$public.stopBubble(ev)}),
//监听房型值
$(document).on("click",_self.config.inputGp,function(){$('input[name="roomId"]').val($(this).val())}),
//切换panel卡片
$(_self.config.eredarli).on("click",function(ev){$(_self.config.eredarli).removeClass("on"),$(this).addClass("on"),$(_self.config.eredarpanel).hide(),$($(_self.config.eredarpanel)[$(this).index()]).fadeIn(),
//渲染已设置的日期
$cus_datepicker.dateRender($cus_datepicker.supplierCalendar),$public.stopBubble(ev)}),
//查询酒店
$(_self.config.searchbtn).on("click",function(){$(_self.config.loadlist).show(),gethotelist()}),
//感应行点击
$(document).on("click",".hotelist tr",function(){$(this).find('input[type="radio"]').prop("checked","checked")}),
//返回上一页
$(".backprev").on("click",function(ev){$(".eredar-info li.on").prev().trigger("click"),$public.stopBubble(ev)}),
//“选择酒店”保存并下一步
$(".save-to-baseinfo").on("click",function(ev){return valid_step_one()?($(".eredar-info li:eq(1)").trigger("click"),void $public.stopBubble(ev)):void $(".eredar-info li:eq(0)").trigger("click")}),
//“基本信息”保存并下一步
$(".save-to-picker").on("click",function(ev){return valid_step_one()?valid_step_two()?($(".eredar-info li:eq(2)").trigger("click"),void $public.stopBubble(ev)):void $(".eredar-info li:eq(1)").trigger("click"):void $(".eredar-info li:eq(0)").trigger("click")}),
//提交表单
$(".allsub").on("click",function(ev){if(!valid_step_one())return void $(".eredar-info li:eq(0)").trigger("click");if(!valid_step_two())return void $(".eredar-info li:eq(1)").trigger("click");for(var ls=$cus_datepicker.supplierCalendar.bizSkuInfo,isHave=!1,i=0;i<ls.length;i++)"del"!=ls[i].state&&(isHave=!0);if(!isHave)return void $public.dialog.msg("请设置价格日历！","error");var prarm=$public.paramcompare($("#hotelfm").serializeArray()),operationFlag=$('input[name="operationFlag"]').val(),url="update"==operationFlag?$public.urlpath.updatehotel:$public.urlpath.addhotel;"object"==typeof prarm.storeLastTime&&(prarm.storeLastTime=prarm.storeLastTime.join(",")),$.post(url,prarm,function(data){$public.isLogin(data),data.success?($public.dialog.msg("保存成功","success"),setTimeout(function(){window.location=data.value},1e3)):$public.dialog.msg(data.resultMsg,"error")})}),
//上一页
$(document).on("click",'li.previous:not(".disabled") a',function(){var cur_page=parseInt($(".jiuniu_pagination li.active a").text());$(_self.config.loadlist).show(),gethotelist(cur_page>0?cur_page-1:cur_page)}),
//下一页
$(document).on("click",'li.next:not(".disabled") a',function(){var cur_page=parseInt($(".jiuniu_pagination li.active a").text());$(_self.config.loadlist).show(),gethotelist(cur_page+1)}),
//选择页
$(document).on("click",'li:not(".active,.previous,.next") a',function(){var cur_page=parseInt($(this).text());$(_self.config.loadlist).show(),gethotelist(cur_page)}),
//选择页大小
$(document).on("change","li #pageSize",function(){$(_self.config.loadlist).show(),gethotelist(1,$(this).val())})}},module.exports=new $choicehotel});
/*! pc_jx 最后修改于： 2016-07-28 */