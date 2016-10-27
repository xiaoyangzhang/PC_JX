define(function(require, exports, module) {
    var $public = require("public"), //公共js
        $cus_datepicker = require('cus_datepicker'), //日期组件
        Addtrip = function() {
            this.init.apply(this, arguments);
        };
    Addtrip.prototype = {
        config: {
            priceInfo: '.price-info',
            eredarli: '.eredar-info li',
            eredarpanel: '.eredar-right .panel',
        },
        init: function() {

            var _self = this;
            //基本信息
            
            //添加套餐
            _self.addPackage();
            _self.delTc();
            _self.tcTabSwitch();
            //渲染已设置的日期
            
        },
        /*切换panel卡片*/
        tagSwitch: function() {
            var _self = this;
            $(_self.config.eredarli).on('click', function(ev) {
                $(_self.config.eredarli).removeClass('on');
                $(this).addClass('on');
                $(_self.config.eredarpanel).hide();
                $($(_self.config.eredarpanel)[$(this).index()]).fadeIn();
                //渲染已设置的日期
                /*$cus_datepicker.dateRender($cus_datepicker.supplierCalendar);
                $public.stopBubble(ev);*/
            });
        },
        /**
         * 切换标签
         * @param {$} type 事件类型
         * @param {$} menus 菜单按钮项
         * @param {$} cons 内容显示项
         * @param {$} menuClass 菜单按钮当前class
         * @param {$} conClass 内容当前class
         * @param {$} icon 是否有icon
         */
        tabSwitch: function(type, menus, cons, menuClass, conClass) {
            menus.each(function(index, ele) {
                $(ele).attr({
                    'data-index': index
                });
            });
            menus.on(type, function() {
                var $target = $(this),
                    $index = Number($target.attr('data-index')),
                    $icon = $target.find('.iconfont');
                menus.removeClass(menuClass).eq($index).addClass(menuClass);
                cons.removeClass(conClass).eq($index).addClass(conClass);
            });
        },
        /*添加套餐*/
        addPackage: function() {
            var _self = this,
                $priceInfo = $(_self.config.priceInfo),
                $packageName = $priceInfo.find('.package-name');

            $priceInfo.on('click', '.add-package',function(ev) {
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
                    $html = $('<a href="javascript:;" rId='+ $tcLen +' class="btn btn-outline posr ml10">' + $tcName.val() + '<i class="icon-close"></i></a>');
                    $parentLi.append($html);

                    $priceInfo.find('.btn-outline').removeClass('active');
                    $html.addClass('active');
                    _self.tcTabSwitch();
                    $('.tc-tab-content').show();
                    $('.tc-tab-content .inputxt').val($tcName.val());
                    $tcName.val('');

                    //清空日历数据
                    $('.day .choiced').removeClass('choiced').find('.tipvl').remove();
                    $('.setvalue input').val('');

                    $public.dialog.closebox();
                    return false;
                    
                }, function() {

                });
                
            });
        },
        tcTabSwitch : function () {
            var _self = this,
                $priceInfo = $(_self.config.priceInfo);
            $priceInfo.on('click','.btn-outline',function(ev){
                var $target = $(this),
                    $index = $target.index()-1,
                    $tcTabs = $priceInfo.find('.btn-outline');
                    dataTc = $target.attr('data-tc') && JSON.parse($target.attr('data-tc'));

                if($target.hasClass('active')) return;
                $tcTabs.removeClass('active').eq($index).addClass('active');
                $('.datepicker td').removeClass('choiced').find('.tipvl').remove(); //清空日期控件

                if(!dataTc){
                    $('.tc-tab-content .inputxt').val($target.text());
                }else{ //重新设置数据
                    $.each(dataTc.months,function(index,month){
                        $.each(month.days,function(i,day){
                            var _times = $public.dateFormat(new Date(day.time),'yyyy-MM-dd').split('-'),
                                _blocks = day.blocks,
                                _pTxt = '',
                                _price = '',
                                _stock = '';

                            //设置年
                            $('#SY').text(_times[0]);

                            //设置月
                            $('.datepicker .tdmonth li').each(function(){
                                var $target = $(this);
                                if($target.text().indexOf(_times[1]) != -1){
                                    $target.addClass('on').html($target.text());
                                }
                            });

                            //设置日
                            $('.datepicker td').each(function(){
                                var $target = $(this),
                                    $font = $(this).find('font'),
                                    _html = '';
                                if($font.text().indexOf(_times[2]) != -1){
                                    $target.closest('td').addClass('choiced');
                                    $.each(_blocks,function(i,block){
                                        _pTxt = block.pTxt;
                                        _price = block.price;
                                        _stock = block.stock;
                                        if ($target.find('.tipvl').length == 0){
                                            $target.find('.dtbx').append('<div class="tipvl"><label>'+_pTxt+'￥</label><label class="price_">' + _price + '</label><br><label>库</label><label class="stock_">' + _stock + '</label></div>');
                                        }else {
                                            _html += '<br><label>'+_pTxt+'￥</label><label class="price_">' + _price + '</label>';
                                            if(_stock){
                                                _html += '<br><label>库</label><label class="stock_">' + _stock + '</label>';
                                            }
                                        }
                                    });
                                    $target.find('.tipvl').append(_html);
                                }
                            });
                        });
                    });
                }
                
                $public.stopBubble(ev);
            });
        },
        delTc: function(){
        	//删除标签
        	var _self = this,
        		$priceInfo = $(_self.config.priceInfo);
            $priceInfo.on('click','.icon-close',function(ev) {
            	var _this = this;
            	$public.dialog.content(500, 200, '添加套餐', $('<div class="mt30">是否确认删除该套餐</div>'), function() {
            		alert('a');
            	},function(){
            		$(_this).parent().remove();
            		$public.dialog.closebox();
            	});
                $public.stopBubble(ev);
            });
        },
        getPriceInfo: function() {
            var tcs = [];
            $(".price-info .btn-outline").each(function(index,btn) {
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
