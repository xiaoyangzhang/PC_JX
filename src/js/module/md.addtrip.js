<<<<<<< HEAD
/*! PC_JX - v1.0.0 - 2016-11-29 */
define(function(require,exports,module){var a=require("public"),b=require("cus_datepicker_trip");require("oldajaxform");window.deletedSKU=[],window.updatedSKU=[],Addtrip=function(){this.init.apply(this,arguments)},Addtrip.prototype={config:{eredarli:".eredar-info li",priceInfo:".price-info",eredarli:".eredar-info li",eredarpanel:".eredar-right .tab-content > .panel"},init:function(){var a=this;a.tabSwitch(),a.addPackage(),a.delTc(),a.createTc(),a.updateTc()},tabSwitch:function(){var a=this;$(a.config.eredarli).on("click",function(b){$(a.config.eredarli).removeClass("on"),$(this).addClass("on"),$(a.config.eredarpanel).hide(),$($(a.config.eredarpanel)[$(this).index()]).fadeIn(),"价格信息"==$(this).text()&&$(".add-tc .btn-outline").eq(0).click()})},updateTc:function(){var a=$(".datepicker .setvalue input[type=hidden]");$(".datepicker").on("change",".setvalue input",function(){var a=$(this).attr("data-sku-id");a&&window.updatedSKU.push(a)}),a.length&&(skuId=$inputHidden.attr("data-sku-id"),skuId&&window.updatedSKU.push(skuId)),$(".tc-tab-content .tc-name").change(function(){var a=$(this).val();$(".add-tc .btn-outline").each(function(){if($(this).hasClass("active")){var b=$(this).attr("data-tc")&&JSON.parse($(this).attr("data-tc"));b.name=a,$(this).text(a),$(this).attr("data-tc",JSON.stringify(b))}})})},createTc:function(){var a=$("#priceInfoJson").val()&&JSON.parse($("#priceInfoJson").val()),b=a&&a.tcs;$.each(b,function(a,b){var c=b.name;b.months;$html=$('<a href="javascript:;" data-id="'+-b.id+"\" data-tc='"+JSON.stringify(b)+'\' class="btn btn-outline posr ml10">'+c+'<i class="icon-close"></i></a>'),$(".add-tc").append($html)}),this.tcTabSwitch()},addPackage:function(){var b=this,c=$(b.config.priceInfo),d=c.find(".package-name");c.on("click",".add-package",function(e){var f=!0,g=c.find(".btn-outline").length;return g>19?void a.dialog.msg("最多可添加20个套餐","error"):void a.dialog.content(500,200,"添加套餐",d.show(),function(){var e=d.find(".tc-name"),g="",h=$(".add-tc");return $.trim(e.val())?e.val().length>20?void a.dialog.msg("最多可输入20个字符","error"):(c.find(".btn-outline").each(function(){$(this).text()==e.val()&&(a.dialog.msg("添加的套餐名称重复","error"),f=!1)}),f?(g=$('<a href="javascript:;" data-id="'+(new Date).getTime()+'"  class="btn btn-outline posr ml10">'+e.val()+'<i class="icon-close"></i></a>'),h.append(g),c.find(".btn-outline").removeClass("active"),g.addClass("active"),b.tcTabSwitch(),$(".tc-tab-content").show(),$(".tc-tab-content .inputxt").val(e.val()),e.val(""),b.clearDatepicker(),$(".setvalue input[type=text]").val(""),a.dialog.closebox(),!1):void d.find(".tc-name").val("")):void a.dialog.msg("请输入套餐名称","error")},function(){})})},tcTabSwitch:function(){var a=this;$(a.config.priceInfo);$(".price-info").on("click",".btn-outline",function(c){var d=$(this),e=d.text();if(index=d.index()-1,$tcTabs=$(".price-info .btn-outline"),!d.hasClass("active")){$(".tc-tab-content").show(),$tcTabs.removeClass("active").eq(index).addClass("active"),$(".tc-tab-content .inputxt").val(d.text()),a.clearDatepicker(),a.setHaveMonth(e),b.dateRender(d.attr("data-tc"));var f=(new Date).getMonth();$(".tdmonth li").removeClass("on"),$(".tdmonth li").eq(f).addClass("on").click()}})},delTc:function(){var c,d=this;$(d.config.priceInfo);$(".price-info").on("click",".icon-close",function(d){var e=this;a.dialog.content(500,200,"添加套餐",$('<div class="mt30">是否确认删除该套餐</div>'),function(){$(e).parent().remove(),a.dialog.closebox(),$(".add-tc .btn-outline").eq(0).click(),c=$(".add-tc .btn-outline").length,c||$(".tc-tab-content").hide(),b.months=[]},function(){}),a.stopBubble(d)})},clearDatepicker:function(){$(".datepicker td").removeClass("choiced").find(".tipvl").remove(),b.supplierCalendar={id:"1",name:"套餐",PId:22,PType:5,PTxt:"套餐",months:[]},b.months=[],$(".datepicker td").each(function(){$(this).removeAttr("data-sku-id")}),$(".tdweek input[type=checkbox]").each(function(){this.checked=!1})},setHaveMonth:function(c){var d=this;if($("#priceInfoJson").val()){var e=JSON.parse($("#priceInfoJson").val());$.each(e.tcs,function(d,e){e.name==c&&$.each(e.months,function(c,d){$.each(d.days,function(c,d){var e=a.dateFormat(new Date(d.time),"yyyy-MM-dd").split("-")[1];e=e<10?e.substring(1):e,b.months.push(Number(e))})})}),b.months=d.unique(b.months)}},unique:function(a){for(var b=[],c=0;c<a.length;c++){var d=a[c];b.indexOf(d)===-1&&b.push(d)}return b}},module.exports=new Addtrip});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-29 */
=======
/*! PC_JX - v1.0.0 - 2016-11-24 */
define(function(require,exports,module){var a=require("public"),b=require("cus_datepicker_trip");require("oldajaxform");window.deletedSKU=[],window.updatedSKU=[],Addtrip=function(){this.init.apply(this,arguments)},Addtrip.prototype={config:{eredarli:".eredar-info li",priceInfo:".price-info",eredarli:".eredar-info li",eredarpanel:".eredar-right .tab-content > .panel"},init:function(){var a=this;a.tabSwitch(),a.addPackage(),a.delTc(),a.createTc(),a.updateTc()},tabSwitch:function(){var a=this;$(a.config.eredarli).on("click",function(b){$(a.config.eredarli).removeClass("on"),$(this).addClass("on"),$(a.config.eredarpanel).hide(),$($(a.config.eredarpanel)[$(this).index()]).fadeIn(),"价格信息"==$(this).text()&&$(".add-tc .btn-outline").eq(0).click()})},updateTc:function(){var a=$(".datepicker .setvalue input[type=hidden]");$(".datepicker").on("change",".setvalue input",function(){var a=$(this).attr("data-sku-id");a&&window.updatedSKU.push(a)}),a.length&&(skuId=$inputHidden.attr("data-sku-id"),skuId&&window.updatedSKU.push(skuId)),$(".tc-tab-content .tc-name").change(function(){var a=$(this).val();$(".add-tc .btn-outline").each(function(){if($(this).hasClass("active")){var b=$(this).attr("data-tc")&&JSON.parse($(this).attr("data-tc"));b.name=a,$(this).attr("data-tc",JSON.stringify(b)),months=b&&b.months,months&&$.each(months,function(a,b){days=b.days,$.each(days,function(a,b){blocks=b.blocks,$.each(blocks,function(a,b){skuId=b.skuId,skuId&&window.updatedSKU.push(skuId,skuId)})})})}})})},createTc:function(){var a=$("#priceInfoJson").val()&&JSON.parse($("#priceInfoJson").val()),b=a&&a.tcs;$.each(b,function(a,b){var c=b.name;b.months;$html=$('<a href="javascript:;"  data-tc=\''+JSON.stringify(b)+'\' class="btn btn-outline posr ml10">'+c+'<i class="icon-close"></i></a>'),$(".add-tc").append($html)}),this.tcTabSwitch()},addPackage:function(){var b=this,c=$(b.config.priceInfo),d=c.find(".package-name");c.on("click",".add-package",function(e){var f=!0,g=c.find(".btn-outline").length;return g>19?void a.dialog.msg("最多可添加20个套餐","error"):void a.dialog.content(500,200,"添加套餐",d.show(),function(){var e=d.find(".tc-name"),g="",h=$(".add-tc");return $.trim(e.val())?e.val().length>20?void a.dialog.msg("最多可输入20个字符","error"):(c.find(".btn-outline").each(function(){$(this).text()==e.val()&&(a.dialog.msg("添加的套餐名称重复","error"),f=!1)}),f?(g=$('<a href="javascript:;" class="btn btn-outline posr ml10">'+e.val()+'<i class="icon-close"></i></a>'),h.append(g),c.find(".btn-outline").removeClass("active"),g.addClass("active"),b.tcTabSwitch(),$(".tc-tab-content").show(),$(".tc-tab-content .inputxt").val(e.val()),e.val(""),$(".day .choiced").removeClass("choiced").find(".tipvl").remove(),$(".setvalue input[type=text]").val(""),a.dialog.closebox(),!1):void d.find(".tc-name").val("")):void a.dialog.msg("请输入套餐名称","error")},function(){})})},tcTabSwitch:function(){var a=this;$(a.config.priceInfo);$(".price-info").on("click",".btn-outline",function(a){var c=$(this),d=c.index()-1,e=$(".price-info .btn-outline");c.hasClass("active")||($(".tc-tab-content").show(),e.removeClass("active").eq(d).addClass("active"),$(".datepicker td").removeClass("choiced").find(".tipvl").remove(),$(".tc-tab-content .inputxt").val(c.text()),b.dateRender(c.attr("data-tc")))})},delTc:function(){var b,c,d,e,f,g,h=this;$(h.config.priceInfo);$(".price-info").on("click",".icon-close",function(h){var i=this;a.dialog.content(500,200,"添加套餐",$('<div class="mt30">是否确认删除该套餐</div>'),function(){dataTc=$(i).parent().attr("data-tc"),b=$(i).parent().attr("data-tc")&&JSON.parse($(i).parent().attr("data-tc")),c=b&&b.months,c&&$.each(c,function(a,b){d=b.days,$.each(d,function(a,b){e=b.blocks,$.each(e,function(a,b){f=b.skuId,f&&window.deletedSKU.push(f,f)})})}),$(i).parent().remove(),a.dialog.closebox(),$(".add-tc .btn-outline").eq(0).click(),g=$(".add-tc .btn-outline").length,g||$(".tc-tab-content").hide()},function(){}),a.stopBubble(h)})}},module.exports=new Addtrip});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-24 */
>>>>>>> master
