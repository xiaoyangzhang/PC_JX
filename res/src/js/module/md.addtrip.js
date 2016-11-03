define(function(require, exports, module) {
    var $public = require("public"), //公共js
        $cus_datepicker = require('cus_datepicker'), //日期组件
        $oldajaxform = require('oldajaxform');
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
            //基本信息
            _self.tabSwitch();
            //添加套餐
            _self.addPackage();
            _self.delTc();
            _self.tcTabSwitch();
            _self.createTc();

            //渲染已设置的日期
            $cus_datepicker.dateRender($cus_datepicker.supplierCalendar);
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

                    //$('.tc-tab-content').show();
                    _self.updateTc();
                }
            });
        },
        updateTc: function() {
            var $inputHidden = $('.datepicker .setvalue input[type=hidden]');
            $('.datepicker').on('change', '.setvalue input', function() {
                var $skuId = $(this).attr('data-sku-id');
                $skuId && window.updatedSKU.push($skuId);
            });
            if ($inputHidden.length) {
                $skuId = $inputHidden.attr('data-sku-id');
                $skuId && window.updatedSKU.push($skuId);
            }

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
                //最多可添加20个套餐
                var $tcLen = $priceInfo.find('.btn-outline').length;
                if ($tcLen > 20) {
                    $public.dialog.msg("最多可添加20个套餐", 'error');
                    return;
                }

                //添加套餐弹框
                $public.dialog.content(500, 200, '添加套餐', $packageName.show(), function() {
                    var $tcName = $packageName.find('.tc-name'),
                        $html = '',
                        $parentLi = $('.add-tc');
                    if (!$tcName.val()) {
                        alert('请输入套餐名称');
                        return;
                    }

                    //创建套餐标签
                    $tcLen = $tcLen + 1;
                    $html = $('<a href="javascript:;" rId=' + $tcLen + ' class="btn btn-outline posr ml10">' + $tcName.val() + '<i class="icon-close"></i></a>');
                    $parentLi.append($html);

                    $priceInfo.find('.btn-outline').removeClass('active');
                    $html.addClass('active');
                    _self.tcTabSwitch();
                    $('.tc-tab-content').show();
                    $('.tc-tab-content .inputxt').val($tcName.val());
                    $tcName.val('');

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
                    $index = $target.index() - 1,
                    $tcTabs = $('.price-info .btn-outline');
                dataTc = $target.attr('data-tc') && JSON.parse($target.attr('data-tc'));
                $('.tc-tab-content').show();
                if ($target.hasClass('active')) return;
                $tcTabs.removeClass('active').eq($index).addClass('active');
                $('.datepicker td').removeClass('choiced').find('.tipvl').remove(); //清空日期控件
                $('.tc-tab-content .inputxt').val($target.text());

                if (dataTc) { //重新设置数据
                    $.each(dataTc.months, function(index, month) {
                        $.each(month.days, function(i, day) {
                            var _times = $public.dateFormat(new Date(day.time), 'yyyy-MM-dd').split('-'),
                                _blocks = day.blocks,
                                _pTxt = '',
                                _price = '',
                                _stock = '';

                            //设置年
                            $('#SY').text(_times[0]);

                            //设置月
                            $('.datepicker .tdmonth li').each(function() {
                                var $target = $(this);
                                if ($target.text().indexOf(_times[1]) != -1) {
                                    $target.addClass('on').html($target.text());
                                }
                            });

                            //设置日
                            $('.datepicker td').each(function() {
                                var $target = $(this),
                                    $font = $(this).find('font'),
                                    _html = '',
                                    $text = Number($font.text());
                                $text = $text > 10 ? '' + $text : '0' + $text;
                                if ($text == _times[2]) {
                                    $target.closest('td').addClass('choiced');
                                    $.each(_blocks, function(i, block) {
                                        _pTxt = block.pTxt;
                                        _price = block.price;
                                        _stock = block.stock;
                                        if ($target.find('.tipvl').length == 0) {
                                            $target.find('.dtbx').append('<div class="tipvl"><label>' + _pTxt + '￥</label><label class="price_">' + _price + '</label><br><label>库</label><label class="stock_">' + _stock + '</label></div>');
                                        } else {
                                            _html += '<br><label>' + _pTxt + '￥</label><label class="price_">' + _price + '</label>';
                                            if (_stock) {
                                                _html += '<br><label>库</label><label class="stock_">' + _stock + '</label>';
                                            }
                                        }
                                    });
                                    $target.find('.tipvl').append(_html);
                                }
                            });

                            //设置文本框
                            /*$.each(_blocks, function(index, block) {
                                $('.datepicker .setvalue dt').each(function(idx, dt) {
                                    if (index == idx % _blocks.length) {
                                        _name = block.name;
                                        _price = block.price;
                                        _stock = block.stock,
                                            _skuId = block.skuId;

                                        $(this).next('dd').find('input').eq(0).val(_price).attr('data-sku-id', _skuId);
                                        $(this).next('dd').next('dd').find('input').eq(0).val(_stock).attr('data-sku-id', _skuId);
                                    }
                                });
                            });*/
                        });
                    });
                }
                $public.stopBubble(ev);
            });
            
            //$('.add-tc .btn-outline').eq(0).click();
        },
        delTc: function() {
            //删除标签
            var _self = this,
                $priceInfo = $(_self.config.priceInfo),
                tc,months,days,blocks,skuId,len;

            $('.price-info').on('click', '.icon-close', function(ev) {
                var _this = this;
                    dataTc = $(_this).parent().attr('data-tc');
                    tc = $(_this).parent().attr('data-tc') && JSON.parse($(_this).parent().attr('data-tc'));
                    months = tc.months;
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
                    $(_this).parent().remove();
                    $('.add-tc .btn-outline').eq(0).click();
                    len = $('.price-info .btn-outline').length;
                    if(!len){
                        $('.tc-tab-content').hide();
                    }
                /*$public.dialog.content(500, 200, '添加套餐', $('<div class="mt30">是否确认删除该套餐</div>'), function() {
                    dataTc = $(_this).parent().attr('data-tc');
                    tc = $(_this).parent().attr('data-tc') && JSON.parse($(_this).parent().attr('data-tc'));
                    months = tc.months;
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
                    $(_this).parent().remove();
                    $public.dialog.closebox();
                    //_self.tcTabSwitch();

                }, function() {

                });*/
                $public.stopBubble(ev);
            });
        },
        getPriceInfo: function() {
            var tcs = [];
            $(".price-info .btn-outline").each(function(index, btn) {
                var _tc = JSON.parse(btn.attr('data-tc'));
                tcs.push(tc);
            });
            var result = {
                tcs: tcs,
                updatedSKU: updatedSKU,
                deletedSKU: deletedSKU,
                limit: $(".day-limit").val() || 0
            };
            return result;
        }

    }
    module.exports = new Addtrip();
});
