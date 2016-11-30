/*! PC_JX - v1.0.0 - 2016-11-30 */
define(function(require,exports,module){require("dropdownlist"),require("validform"),$cus_datepicker=require("cus_datepicker"),$public=require("public"),$choicehotel=function(){this.init.apply(this,arguments)},$choicehotel.prototype={config:{radiobar:".radio-bar",barbox:".bar-box",barboxul:".bar-box ul",barboxdiv:".bar-box div",radiobarlabel:".radio-bar label",radiobarimg:".radio-bar img",eredarli:".eredar-info li",eredarpanel:".eredar-right .panel",searchotel:".choicehotel",searchbox:".searchbox",hotelist:".hotelist",loadlist:".load_list",searchbtn:".search-btn",btnOk:".ok",infoBar:".info-bar",infoBox:".info-box",inputGp:'input[name="gp"]',svdraftbox:".svdraftbox",svdraft:".svdraft"},init:function(){function a(a,b){var a=a?a:1,b=b?b:$("#pageSize").val(),c=$(f.config.searchbox).find(f.config.hotelist);c.empty(),$(f.config.loadlist).show(),$.get($public.urlpath.gethotelist,{page:a,pageSize:b,name:$("#hotelname").val(),locationProvinceId:$('input[name="province"]').val()?$('input[name="province"]').val():0,locationCityId:$('input[name="city"]').val()?$('input[name="city"]').val():0,locationTownId:$('input[name="area"]').val()?$('input[name="area"]').val():0},function(a){c.append(a),$(f.config.loadlist).hide(),$(".jiuniu_pagination").css("margin-left",($(".container").width()-$(".jiuniu_pagination").width())/2+"px"),$(".tb-box").height($(".hotelist").height())})}function b(){var a=$('input[name="hotelGroup"]:checked').closest("tr");$(".load_room").show(),$(".hotelcol").hide(),$(f.config.infoBar).find(".htn").text(a.find(".hotel-name").text()),$(f.config.infoBar).find(".address").text(a.find(".hotel-address").text()),$(f.config.infoBar).find(".tel").text(a.find(".hotel-tel").text()),$.get($public.urlpath.getroominfo,{hotelId:$('input[name="hotelGroup"]:checked').val()},function(a){$(".load_room").hide(),$(".hotelcol").show(),$(f.config.infoBox).empty().append(a);var b=$(".radio-bar").length-1;$(".radio-bar:eq("+b+")").css("border-bottom","none"),setTimeout(function(){$(".radio-bar:eq(0)").trigger("click")},500)})}function c(){var a=!0;return 0==$('input[name="hotelId"]').val()?($public.dialog.msg("请选择酒店！","error"),a=!1):0==$('input[name="roomId"]').val()&&($public.dialog.msg("请选择房型！","error"),a=!1),a||$(document).scrollTop(0),a}function d(){var a=!0;return i.check()||(a=!1),e()||(a=!1),$public.selectvalid("breakfast")||(a=!1),a}function e(){var a=$(".checkbox input:checked"),b=$(".baseinfo .checkbox:last");return b.find(".Validform_checktip").remove(),a.length>3?(b.append('<span class="Validform_checktip Validform_wrong">最多只能选三个！</span>'),!1):0==a.length?(b.append('<span class="Validform_checktip Validform_wrong">请选择最晚到店时间</span>'),!1):(b.append('<span class="Validform_checktip Validform_right"></span>'),!0)}var f=this,g={tiptype:3,label:".label",showAllError:!0,datatype:{"*2-10":/^[\w\W]{2,10}$/,"n10-25":/^\d{10,25}$/,"n0-90":/^([0-9]|90|[1-8][0-9])$/},ajaxPost:!0},h=[{ele:"input[type='text']:not('.allownull'),textarea",datatype:"*",nullmsg:"请填信息！"},{ele:"input[name='payType']:last",datatype:"*",nullmsg:"请选择付款方式！"},{ele:"input[name='cancelLimit']:last",datatype:"*",nullmsg:"请选择退订限制！"},{ele:"input[name='startBookTimeLimit']",datatype:"n0-90",nullmsg:"请填写提前预定天数！",errormsg:"只能输入0-90范围数字！"}],i=$(".baseinfo form").Validform(g).addRule(h);$("#breakfast").selectlist({width:200}),$(".baseinfo .checkbox:last").css("width","300px"),$(".checkbox input").on("change",function(){e()}),$public.procityaredata("province","city","area",!0),$('textarea[name="description"]').keypress(function(a){var b=a||window.event||arguments.callee.caller.arguments[0];if(13==b.keyCode)return!1}),$(".inputxt,textarea").keyup(function(){$(this).next(".mark").find("label.cv").text($(this).val().length)}).filter(function(){$(this).next(".mark").find("label.cv").text($(this).val().length)}),$(document).on("click",f.config.radiobar,function(a){var b=$(this).closest("li");$(f.config.barbox).css("height","0").attr("id",0),$(f.config.radiobarimg).attr("src",static_source+"img/droptip_down.jpg"),$(this).next().css("height",b.find(f.config.barboxul).outerHeight()+b.find(f.config.barboxdiv).outerHeight()+15+"px"),$(this).find("img").attr("src",static_source+"img/droptip_up.jpg"),$public.stopBubble(a)}),$(f.config.searchotel).on("click",function(c){var d=$(".searchbox"),e=d.find(f.config.hotelist);$public.dialog.content(968,"auto","选择酒店",d.show(),function(){var a=$('input[name="hotelGroup"]:checked'),c=a.val(),d=a.closest("tr").find(":hidden").val(),e=a.closest("td").next().text();return $(".hotelType").text(d),c?($('input[name="hotelId"]').val(c),$('input[name="name"]').val(e),$("#lbhotelname").text(e),$public.dialog.closebox(),b()):alert("请选择酒店！"),!1},function(){e.height($(".container").height()-120),$(f.config.loadlist).show()}),a(),$public.stopBubble(c)}),$(f.config.svdraft).on("click",function(a){var b=$(f.config.svdraftbox);$public.dialog.content(300,160,"保存草稿标题",b.show(),function(){var a=$public.paramcompare($("#hotelfm").serializeArray()),b=($('input[name="operationFlag"]').val(),$(".svdraftxt").val());return"object"==typeof a.storeLastTime&&(a.storeLastTime=a.storeLastTime.join(",")),b?(console.log(a),$public.dialog.closebox(),$public.dialog.waiting(),void $.post($public.urlpath.saveSPOTDraft,{json:a,draftName:b,uuid:$("#uuid").val(),subType:$("#draftSubType").val(),mainType:1,id:$("#draftId").val()},function(a){a.success?a.resultMsg>0&&($("#draftId").val(a.resultMsg),$public.dialog.msg("保存草稿成功！","success")):$public.dialog.msg("保存草稿失败！","error"),$public.dialog.closebox()})):void $(".svdraftxt").focus()},function(){b.height($(".container").height()-120)},1),$public.stopBubble(a)}),$(document).on("click",f.config.inputGp,function(){$('input[name="roomId"]').val($(this).val())}),$(f.config.eredarli).on("click",function(a){$(f.config.eredarli).removeClass("on"),$(this).addClass("on"),$(f.config.eredarpanel).hide(),$($(f.config.eredarpanel)[$(this).index()]).fadeIn(),$cus_datepicker.dateRender($cus_datepicker.supplierCalendar),$public.stopBubble(a)}),$(f.config.searchbtn).on("click",function(){$(f.config.loadlist).show(),a()}),$(document).on("click",".hotelist tr",function(){$(this).find('input[type="radio"]').prop("checked","checked")}),$(".backprev").on("click",function(a){$(".eredar-info li.on").prev().trigger("click"),$public.stopBubble(a)}),$(".save-to-baseinfo").on("click",function(a){return c()?($(".eredar-info li:eq(1)").trigger("click"),void $public.stopBubble(a)):void $(".eredar-info li:eq(0)").trigger("click")}),$(".save-to-picker").on("click",function(a){return c()?d()?($(".eredar-info li:eq(2)").trigger("click"),void $public.stopBubble(a)):void $(".eredar-info li:eq(1)").trigger("click"):void $(".eredar-info li:eq(0)").trigger("click")}),$(".allsub").on("click",function(a){if(!c())return void $(".eredar-info li:eq(0)").trigger("click");if(!d())return void $(".eredar-info li:eq(1)").trigger("click");for(var b=$cus_datepicker.supplierCalendar.bizSkuInfo,e=!1,f=0;f<b.length;f++)"del"!=b[f].state&&(e=!0);if(!e)return void $public.dialog.msg("请设置价格日历！","error");var g=$public.paramcompare($("#hotelfm").serializeArray()),h=$('input[name="operationFlag"]').val(),i="update"==h?$public.urlpath.updatehotel:$public.urlpath.addhotel;"object"==typeof g.storeLastTime&&(g.storeLastTime=g.storeLastTime.join(",")),$.post(i,g,function(a){$public.isLogin(a),a.success?($public.dialog.msg("保存成功","success"),setTimeout(function(){window.location=a.value},1e3)):$public.dialog.msg(a.resultMsg,"error")})}),$public.init_pagination(a)}},module.exports=new $choicehotel});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-30 */