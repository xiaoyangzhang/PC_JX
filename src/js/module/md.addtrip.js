<<<<<<< HEAD
define(function(require, exports, module) {
    var $public = require("public"), //公共js
        $cus_datepicker_trip = require('cus_datepicker_trip'), //日期组件
        $ajaxform = require('oldajaxform');
    window.deletedSKU = [];
    window.updatedSKU = [];
    Addtrip = function() {
        this.init.apply(this, arguments);
    };
    Addtrip.prototype = {
        config: {
            eredarli: '.eredar-info li',
            priceInfo: '.price-info',
            eredarli: '.eredar-info li',
            eredarpanel: '.eredar-right .tab-content > .panel',
        },
        init: function() {
            var _self = this;
            //标签切换
            _self.tabSwitch();
            //添加套餐
            _self.addPackage();
            //删除套餐
            _self.delTc();
            _self.createTc();
            _self.updateTc();
        },
        /*切换panel卡片*/
        tabSwitch: function() {
            var _self = this;
            $(_self.config.eredarli).on('click', function(ev) {
                $(_self.config.eredarli).removeClass('on');
                $(this).addClass('on');
                $(_self.config.eredarpanel).hide();
                $($(_self.config.eredarpanel)[$(this).index()]).fadeIn();
                if ($(this).text() == '价格信息') {
                    $('.add-tc .btn-outline').eq(0).click();
                }
            });
        },
        updateTc: function() {
            var $hiddenInput = $('.datepicker .setvalue input[type=hidden]');
            $('.datepicker').on('change', '.setvalue input', function() {
                var skuId = $(this).attr('data-sku-id');
                skuId && window.updatedSKU.push(skuId);
            });
            if ($hiddenInput.length) {
                skuId = $inputHidden.attr('data-sku-id');
                skuId && window.updatedSKU.push(skuId);
            }

            //更改套餐名
            $('.tc-tab-content .tc-name').change(function(){
                var name = $(this).val();
                $('.add-tc .btn-outline').each(function(){
                    if($(this).hasClass('active')){
                        var tc = $(this).attr('data-tc') && JSON.parse($(this).attr('data-tc'));
                        tc.name = name;
                        $(this).text(name);
                        $(this).attr('data-tc',JSON.stringify(tc));
                    }
                });
            });
        },
        createTc: function() {
            var priceInfo = $('#priceInfoJson').val() && JSON.parse($('#priceInfoJson').val()),
                tcs = priceInfo && priceInfo.tcs;
            $.each(tcs, function(index, tc) {
                var name = tc.name,
                    months = tc.months;

                $html = $('<a href="javascript:;"  data-tc=\'' + JSON.stringify(tc) + '\' class="btn btn-outline posr ml10">' + name + '<i class="icon-close"></i></a>');
                $('.add-tc').append($html);

            });
            this.tcTabSwitch();
        },
        /*添加套餐*/
        addPackage: function() {
            var _self = this,
                $priceInfo = $(_self.config.priceInfo),
                $packageName = $priceInfo.find('.package-name');
                

            $priceInfo.on('click', '.add-package', function(ev) {
                var isAddPackage = true;
                //最多可添加20个套餐
                var tcLen = $priceInfo.find('.btn-outline').length;
                if (tcLen > 19) {
                    $public.dialog.msg("最多可添加20个套餐", 'error');
                    return;
                }

                
                //添加套餐弹框
                $public.dialog.content(500, 200, '添加套餐', $packageName.show(), function() {
                    var $name = $packageName.find('.tc-name'),
                        $html = '',
                        $parentLi = $('.add-tc');
                    if (!$.trim($name.val())) {
                        $public.dialog.msg('请输入套餐名称','error');
                        return;
                    }else if($name.val().length > 20){
                        $public.dialog.msg('最多可输入20个字符','error');
                        return;
                    }

                    $priceInfo.find('.btn-outline').each(function(){
                        if($(this).text() == $name.val()){
                            $public.dialog.msg("添加的套餐名称重复", 'error');
                            isAddPackage = false;
                        }
                    });
                    
                    if(!isAddPackage) {
                        $packageName.find('.tc-name').val('');
                        return;
                    }
                    //创建套餐标签
                    $html = $('<a href="javascript:;" class="btn btn-outline posr ml10">' + $name.val() + '<i class="icon-close"></i></a>');
                    $parentLi.append($html);

                    $priceInfo.find('.btn-outline').removeClass('active');
                    $html.addClass('active');
                    _self.tcTabSwitch();
                    $('.tc-tab-content').show();
                    $('.tc-tab-content .inputxt').val($name.val());
                    $name.val('');

                    //清空日历数据
                    _self.clearDatepicker();
                    $('.setvalue input[type=text]').val('');

                    $public.dialog.closebox();
                    return false;

                }, function() {

                });

            });
        },
        /*切换套餐*/
        tcTabSwitch: function() {
            var _self = this,
                $priceInfo = $(_self.config.priceInfo);

            $('.price-info').on('click', '.btn-outline', function(ev) {
                var $target = $(this),
                    name = $target.text();
                    index = $target.index() - 1,
                    $tcTabs = $('.price-info .btn-outline');
                if ($target.hasClass('active')) return;

                $('.tc-tab-content').show();
                $tcTabs.removeClass('active').eq(index).addClass('active');
                $('.tc-tab-content .inputxt').val($target.text());

                //清空日期控件
                _self.clearDatepicker();
                _self.setHaveMonth(name);

                $cus_datepicker_trip.dateRender($target.attr('data-tc'));

                //切换套餐默认显示当前月
                var m = new Date().getMonth();
                $('.tdmonth li').removeClass('on');
                $('.tdmonth li').eq(m).addClass('on').click();
            });
        },
        delTc: function() {
            //删除标签
            var _self = this,
                $priceInfo = $(_self.config.priceInfo),
                tc,months,days,blocks,skuId,len;

            $('.price-info').on('click', '.icon-close', function(ev) {
                var _this = this;
                $public.dialog.content(500, 200, '添加套餐', $('<div class="mt30">是否确认删除该套餐</div>'), function() {
                    $(_this).parent().remove();
                    $public.dialog.closebox();
                    $('.add-tc .btn-outline').eq(0).click();
                    len = $('.add-tc .btn-outline').length;
                    if(!len){
                        $('.tc-tab-content').hide();
                    }

                }, function() {

                });
                $public.stopBubble(ev);
            });
        },
        //清空日期数据
        clearDatepicker: function(){
            $('.datepicker td').removeClass('choiced').find('.tipvl').remove(); 
            
            $cus_datepicker_trip.supplierCalendar = {
                "id":"1",
                "name":"套餐",
                "PId":22,
                "PType":5,
                "PTxt":"套餐",
                "months":[]
            };
            $cus_datepicker_trip.months = [];

            $(".datepicker td").each(function(){
                $(this).removeAttr('data-sku-id');
            })
            
        },
        setHaveMonth: function(name){
            var _self = this;
            if($('#priceInfoJson').val()){
                var priceInfoJson = JSON.parse($('#priceInfoJson').val());

                $.each(priceInfoJson.tcs,function(index,tc){
                    if(tc.name == name){
                        $.each(tc.months,function(index,month){
                            $.each(month.days,function(index,day){
                                var m = $public.dateFormat(new Date(day.time),'yyyy-MM-dd').split('-')[1]; 
                                m = m < 10 ? m.substring(1) : m;
                                $cus_datepicker_trip.months.push(Number(m));
                            });
                        });
                    }
                });

                $cus_datepicker_trip.months = _self.unique($cus_datepicker_trip.months);
            }
        },
        unique: function(arr) {
          var ret = [];
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (ret.indexOf(item) === -1) {
              ret.push(item);
            }
          }
          return ret;
        },
    }
    module.exports = new Addtrip();
});
=======
/*! PC_JX - v1.0.0 - 2016-11-23 */
define(function(require,exports,module){var a=require("public"),b=require("cus_datepicker_trip");require("oldajaxform");window.deletedSKU=[],window.updatedSKU=[],Addtrip=function(){this.init.apply(this,arguments)},Addtrip.prototype={config:{eredarli:".eredar-info li",priceInfo:".price-info",eredarli:".eredar-info li",eredarpanel:".eredar-right .tab-content > .panel"},init:function(){var a=this;a.tabSwitch(),a.addPackage(),a.delTc(),a.createTc(),a.updateTc()},tabSwitch:function(){var a=this;$(a.config.eredarli).on("click",function(b){$(a.config.eredarli).removeClass("on"),$(this).addClass("on"),$(a.config.eredarpanel).hide(),$($(a.config.eredarpanel)[$(this).index()]).fadeIn(),"价格信息"==$(this).text()&&$(".add-tc .btn-outline").eq(0).click()})},updateTc:function(){var a=$(".datepicker .setvalue input[type=hidden]");$(".datepicker").on("change",".setvalue input",function(){var a=$(this).attr("data-sku-id");a&&window.updatedSKU.push(a)}),a.length&&(skuId=$inputHidden.attr("data-sku-id"),skuId&&window.updatedSKU.push(skuId)),$(".tc-tab-content .tc-name").change(function(){var a=$(this).val();$(".add-tc .btn-outline").each(function(){if($(this).hasClass("active")){var b=$(this).attr("data-tc")&&JSON.parse($(this).attr("data-tc"));b.name=a,$(this).attr("data-tc",JSON.stringify(b)),months=b&&b.months,months&&$.each(months,function(a,b){days=b.days,$.each(days,function(a,b){blocks=b.blocks,$.each(blocks,function(a,b){skuId=b.skuId,skuId&&window.updatedSKU.push(skuId,skuId)})})})}})})},createTc:function(){var a=$("#priceInfoJson").val()&&JSON.parse($("#priceInfoJson").val()),b=a&&a.tcs;$.each(b,function(a,b){var c=b.name;b.months;$html=$('<a href="javascript:;"  data-tc=\''+JSON.stringify(b)+'\' class="btn btn-outline posr ml10">'+c+'<i class="icon-close"></i></a>'),$(".add-tc").append($html)}),this.tcTabSwitch()},addPackage:function(){var b=this,c=$(b.config.priceInfo),d=c.find(".package-name");c.on("click",".add-package",function(e){var f=!0,g=c.find(".btn-outline").length;return g>19?void a.dialog.msg("最多可添加20个套餐","error"):void a.dialog.content(500,200,"添加套餐",d.show(),function(){var e=d.find(".tc-name"),g="",h=$(".add-tc");return $.trim(e.val())?e.val().length>20?void a.dialog.msg("最多可输入20个字符","error"):(c.find(".btn-outline").each(function(){$(this).text()==e.val()&&(a.dialog.msg("添加的套餐名称重复","error"),f=!1)}),f?(g=$('<a href="javascript:;" class="btn btn-outline posr ml10">'+e.val()+'<i class="icon-close"></i></a>'),h.append(g),c.find(".btn-outline").removeClass("active"),g.addClass("active"),b.tcTabSwitch(),$(".tc-tab-content").show(),$(".tc-tab-content .inputxt").val(e.val()),e.val(""),$(".day .choiced").removeClass("choiced").find(".tipvl").remove(),$(".setvalue input[type=text]").val(""),a.dialog.closebox(),!1):void d.find(".tc-name").val("")):void a.dialog.msg("请输入套餐名称","error")},function(){})})},tcTabSwitch:function(){var a=this;$(a.config.priceInfo);$(".price-info").on("click",".btn-outline",function(a){var c=$(this),d=c.index()-1,e=$(".price-info .btn-outline");c.hasClass("active")||($(".tc-tab-content").show(),e.removeClass("active").eq(d).addClass("active"),$(".datepicker td").removeClass("choiced").find(".tipvl").remove(),$(".tc-tab-content .inputxt").val(c.text()),b.dateRender(c.attr("data-tc")))})},delTc:function(){var b,c,d,e,f,g,h=this;$(h.config.priceInfo);$(".price-info").on("click",".icon-close",function(h){var i=this;a.dialog.content(500,200,"添加套餐",$('<div class="mt30">是否确认删除该套餐</div>'),function(){dataTc=$(i).parent().attr("data-tc"),b=$(i).parent().attr("data-tc")&&JSON.parse($(i).parent().attr("data-tc")),c=b&&b.months,c&&$.each(c,function(a,b){d=b.days,$.each(d,function(a,b){e=b.blocks,$.each(e,function(a,b){f=b.skuId,f&&window.deletedSKU.push(f,f)})})}),$(i).parent().remove(),a.dialog.closebox(),$(".add-tc .btn-outline").eq(0).click(),g=$(".add-tc .btn-outline").length,g||$(".tc-tab-content").hide()},function(){}),a.stopBubble(h)})}},module.exports=new Addtrip});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-23 */
>>>>>>> master
