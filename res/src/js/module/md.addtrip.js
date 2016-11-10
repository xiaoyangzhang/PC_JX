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
            /*if ($hiddenInput.length) {
                skuId = $inputHidden.attr('data-sku-id');
                skuId && window.updatedSKU.push(skuId);
            }*/

            //更改套餐名
            $('.tc-tab-content .tc-name').change(function(){
                var name = $(this).val();
                $('.add-tc .btn-outline').each(function(){
                    if($(this).hasClass('active')){
                        var tc = $(this).attr('data-tc') && JSON.parse($(this).attr('data-tc'));
                        tc.name = name;
                        $(this).attr('data-tc',JSON.stringify(tc));

                        months = tc && tc.months;
                        if(months){
                            $.each(months, function(index, month) {
                                days = month.days;
                                $.each(days, function(index, day) {
                                    blocks = day.blocks;
                                    $.each(blocks, function(index, block) {
                                        skuId = block.skuId;
                                        skuId && window.updatedSKU.push(skuId,skuId);
                                    });
                                });
                            });
                        }
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
                    $('.day .choiced').removeClass('choiced').find('.tipvl').remove();
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
                    index = $target.index() - 1,
                    $tcTabs = $('.price-info .btn-outline');
                if ($target.hasClass('active')) return;

                $('.tc-tab-content').show();
                $tcTabs.removeClass('active').eq(index).addClass('active');
                $('.datepicker td').removeClass('choiced').find('.tipvl').remove(); //清空日期控件
                $('.tc-tab-content .inputxt').val($target.text());

                $cus_datepicker_trip.dateRender($target.attr('data-tc'));
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
                     dataTc = $(_this).parent().attr('data-tc');
                    tc = $(_this).parent().attr('data-tc') && JSON.parse($(_this).parent().attr('data-tc'));
                    months = tc && tc.months;
                    if(months){
                        $.each(months, function(index, month) {
                            days = month.days;
                            $.each(days, function(index, day) {
                                blocks = day.blocks;
                                $.each(blocks, function(index, block) {
                                    skuId = block.skuId;
                                    skuId && window.deletedSKU.push(skuId,skuId);
                                });
                            });
                        });
                    }
                    $(_this).parent().remove();
                    $public.dialog.closebox();
                    $('.add-tc .btn-outline').eq(0).click();
                    len = $('.add-tc .btn-outline').length;
                    if(!len){
                        $('.tc-tab-content').hide();
                    }
                    //_self.tcTabSwitch();

                }, function() {

                });
                $public.stopBubble(ev);
            });

            
        }
    }
    module.exports = new Addtrip();
});
