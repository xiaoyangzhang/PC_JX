<<<<<<< HEAD
define(function(require, exports, module) {
    $public = require("public");
    $datepicker = function() {

        /****************************************************价格日历********************************************/
        this.solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        this.nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');

        this.rangedays = 90;
        this.empty_ckbox = {};
        //保存y年m+1月的相关信息
        this.fat = this.mat = 9;
        //在表格中显示公历和农历的日期,以及相关节日
        this.cld = null;
        this.isCtrl = false;
        this.isShift = false;
        this.lastCtrlSelectDay = 0;
        //用自定义变量保存当前系统中的年月日
        this.Today = new Date();
        this.tY = this.Today.getFullYear();
        this.tM = this.Today.getMonth();
        this.tD = this.Today.getDate();

        this.lunarInfo = new Array(
            0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
            0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);


        this.supplierCalendar = {
            "seller_id": $('input[name="sellerId"]').val(),
            "hotel_id": $('input[name="hotelId"]').val(),
            "sku_flag": '',
            "bizSkuInfo": []
        };

        this.init.apply(this, arguments);

    }
    $datepicker.prototype = {
        init: function() {
            var _self = this;

            if ($('.rds').val()) _self.rangedays = $('.rds').val();

            //设置价和库存
            $('.setvl').on('click', function() {
                var temp = '',
                    $dtbx = $('.day .choiced .dtbx'),
                    price = $('.price').val(),
                    stock = $('.stock').val();
                if ($dtbx.length > 0) {
                    if (!/^\d{1,6}(\.\d{1,2})?$|^[1-9]\d{0,5}$/.test($('.price').val())) {
                        $public.dialog.msg('“价格”为数字,最大6位整数,能带两位小数', 'error');
                        $('.price').focus();
                        return;
                    }
                    if (!/^[1-9]\d{0,5}$/.test($('.stock').val())) {
                        $public.dialog.msg('“库存”为数字,最大6位整数', 'error');
                        $('.stock').focus();
                        return;
                    }
                    $dtbx.filter(function() {
                        _self.set_tdvalue($(this), price, stock);
                        _self.set_chahevalue(stock, price, $(this).parent().find('font').html());
                    });
                    $('input[name="supplierCalendar"]').val(JSON.stringify(_self.supplierCalendar));
                } else {
                    $public.dialog.msg('请选择要设置的日期', 'error');
                }
            });

            //清除价格和库存
            $('.clearvl').on('click', function() {
                var temp = '',
                    $dtbx = $('.day .choiced .dtbx');
                if ($dtbx.length > 0) {
                    $dtbx.filter(function() {
                        $(this).find('.tipvl').remove();
                        _self.del_chahevalue($(this).parent().find('font').html());
                    });
                    $(document).trigger('click');
                    $('.price,.stock').val('');
                    $('input[name="supplierCalendar"]').val(JSON.stringify(_self.supplierCalendar));
                } else
                    $public.dialog.msg('请选择要清除信息的日期', 'error');
            });

            $('.setvalue').on('click', function(ev) {
                $public.stopBubble(ev);
            });

            $('.tdyears .prev').on('click', function(ev) {
                var cur_years = parseInt($('#SY').text());
                $('#SY').text(cur_years - 1);
                _self.changeCld();
                $public.stopBubble(ev);
            });
            $('.tdyears .next').on('click', function(ev) {
                var cur_years = parseInt($('#SY').text());
                $('#SY').text(cur_years + 1);
                _self.changeCld();
                $public.stopBubble(ev);
            });
            $('.tdmonth li').on('click', function(ev) {
                $('.tdmonth li').removeClass('on');
                $(this).addClass('on');
                _self.changeCld();
                $public.stopBubble(ev);
            });
            $('.tdmonth li').on('click', function(ev) {
                $('.tdmonth li').removeClass('on');
                $(".tdweek input[type='checkbox']").attr("checked",false);
                $(this).addClass('on');
                this.lastCtrlSelectDay = 0;
                _self.changeCld();
                $public.stopBubble(ev);
            });

            /*
            $(".tdweek").on("click", "input[type='checkbox']", function() {
                var checked = this.checked;
                var week = $(this).attr("week");
                if (checked) {
                    $(".day td.in-range[week='" + week + "']").addClass("choiced");
                } else {
                    $(".day td.in-range[week='" + week + "']").removeClass("choiced");
                }
            });
            */
            $(".tdweek").on("click", "td:has(input[type='checkbox'])", function() {
                var tagName = event.target.tagName.toLowerCase();
                if (tagName == 'td') {
                    var inputObj = event.target.children[0];
                    inputObj.checked = !inputObj.checked;
                } else if (tagName == 'input'){
                    var inputObj = event.target;
                }
                var checked = inputObj.checked;
                var week = $(inputObj).attr("week");
                if (checked) {
                    $(".day td.in-range[week='" + week + "']").addClass("choiced");
                } else {
                    $(".day td.in-range[week='" + week + "']").removeClass("choiced");
                }
            });

            window.document.onclick = function() {
                //$('.day td.choiced').removeClass("choiced");
                //this.lastCtrlSelectDay = 0;
                //if (!_self.isCtrl) _self.empty_ckbox = {};
            };
            window.document.onkeydown = function(evt) {
                evt = evt || window.event || arguments.callee.caller.arguments[0];
                if (evt.keyCode == 17) _self.isCtrl = true;
                if (evt.keyCode == 16) {
                    _self.isShift = true;
                }
            };
            window.document.onkeyup = function(evt) {
                evt = evt || window.event || arguments.callee.caller.arguments[0];
                if (evt.keyCode == 17) _self.isCtrl = false;
                if (evt.keyCode == 16) {
                    _self.isShift = false;
                }
            };

            window.document.onselectstart = function() {
                //return false;
            };
            _self.initial();

        },
        //返回农历y年的总天数
        lYearDays: function(y) {
            var i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) sum += (this.lunarInfo[y - 1900] & i) ? 1 : 0;
            return (sum + this.leapDays(y));
        },
        //返回农历y年闰月的天数
        leapDays: function(y) {
            if (this.leapMonth(y)) return ((this.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
            else return (0);
        },
        //判断y年的农历中那个月是闰月,不是闰月返回0
        leapMonth: function(y) {
            return (this.lunarInfo[y - 1900] & 0xf);
        },
        //返回农历y年m月的总天数
        monthDays: function(y, m) {
            return ((this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
        },
        //返回公历y年m+1月的天数
        solarDays: function(y, m) {
            if (m == 1)
                return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
            else
                return (this.solarMonth[m]);
        },
        //记录公历和农历某天的日期
        calElement: function(sYear, sMonth, sDay, week) {
            return {
                isToday: false,
                sYear: sYear,
                sMonth: sMonth,
                sDay: sDay,
                week: week,
            };
        },
        calendar: function(y, m) {
            this.fat = this.mat = 0;
            var sDObj, lDObj, lD = 1,
                lX = 0,
                obj = {};
            var n = 0;
            var firstLM = 0;
            sDObj = new Date(y, m, 1); //当月第一天的日期
            obj.length = this.solarDays(y, m); //公历当月天数
            obj.firstWeek = sDObj.getDay(); //公历当月1日星期几
            if ((m + 1) == 5) { this.fat = sDObj.getDay(); }
            if ((m + 1) == 6) { this.mat = sDObj.getDay(); }
            for (var i = 0; i < obj.length; i++) {
                if (lD > lX) {
                    sDObj = new Date(y, m, i + 1); //当月第一天的日期
                }
                obj[i] = this.calElement(y, m + 1, i + 1, this.nStr1[(i + obj.firstWeek) % 7]);
                if ((i + obj.firstWeek) % 7 == 0) {
                    obj[i].color = 'red'; //周日颜色
                }
            }
            if (y == this.tY && m == this.tM) obj[this.tD - 1].isToday = true; //今日
            return obj;
        },
        select: function($td) {
            //普通的选择
            $(".day .choiced").removeClass("choiced");
            $td.addClass('choiced');
            $('.price').val($td.find('.price_').text());
            $('.stock').val($td.find('.stock_').text());

            this.lastCtrlSelectDay = 0;
        },
        ctrlSelect: function($td) {
            //按住ctrl选择
            if ($td.hasClass('choiced')) {
                $td.removeClass('choiced');
            } else {
                $td.addClass('choiced');
                if ($(".day .choiced").length == 1) {
                    $('.price').val($td.find('.price_').text());
                    $('.stock').val($td.find('.stock_').text());
                } else {
                    $('.price,.stock').val('');
                }

                this.lastCtrlSelectDay = parseInt($td.attr("day"));
                console.log("lastCtrlSelectDay:" + this.lastCtrlSelectDay);
            }
        },
        shiftSelect: function($td) {
            //按住shift选择
            var choicedLength = $(".day .choiced").length,
                startDay,
                endDay,
                currentDay = parseInt($td.attr("day"));
            if (choicedLength == 0) {
                $td.addClass('choiced');
                $('.price').val($td.find('.price_').text());
                $('.stock').val($td.find('.stock_').text());

                this.firstShiftSelectDay = currentDay;
            } else {
                endDay = currentDay;

                if (choicedLength == 1) {
                    startDay = parseInt($(".day .choiced").attr("day"));
                } else {
                    startDay = parseInt($(".day .choiced").last().attr("day"));
                }
                if (this.lastCtrlSelectDay != 0) {
                    startDay = this.lastCtrlSelectDay;
                }
                console.log("startDay:" + startDay);
                console.log("endDay:" + endDay);
                if (endDay <= startDay) {
                    return;
                }

                for (var sid = startDay; sid <= endDay; sid++) {
                    $(".day td[day='" + sid + "']").addClass("choiced");
                }
                this.lastCtrlSelectDay = 0;
                $('.price,.stock').val('');
            }
        },
        drawCld: function(SY, SM) {
            var TF = true,
                _prent_self = this;
            var p1 = p2 = "";
            var i, sD, s, size;
            _prent_self.cld = _prent_self.calendar(SY, SM);
            for (i = 0; i < 42; i++) {
                var sObj = document.getElementById("SD" + i);
                var $td = $(sObj).closest("td");
                $td.removeClass().attr("day", "").attr("week", "");
                sD = i - _prent_self.cld.firstWeek;
                if (sD > -1 && sD < _prent_self.cld.length) { //日期内
                    sObj.innerHTML = sD + 1;
                    if (_prent_self.cld[sD].isToday) {
                        $td.addClass("today");
                    }

                    var cDay = new Date(SY, SM, sD + 1);
                    $td.attr("day", sD + 1).attr("week", cDay.getDay());

                    if (_prent_self.checkRangeDay(cDay, _prent_self.rangedays)) {
                        $td.addClass("in-range").off().on('click', function(ev) {
                            var _self = $(this);
                            if (_self.hasClass("out-range")) {
                                return;
                            }

                            if (_prent_self.isCtrl) {
                                _prent_self.ctrlSelect(_self);
                            } else if (_prent_self.isShift) {
                                _prent_self.shiftSelect(_self);
                            } else {
                                _prent_self.select(_self);
                            }

                            $(".tdweek input[type='checkbox']").each(function() {
                                var week = $(this).attr("week");
                                var inRangeDays = $(".day td.in-range[week='" + week + "']").length;
                                var choicedDays = $(".day td.choiced[week='" + week + "']").length;
                                this.checked = inRangeDays == choicedDays;
                            });
                            $public.stopBubble(ev);
                        });
                    } else {
                        $td.addClass("out-range").off();
                    }
                } else { //非日期
                    sObj.innerHTML = '';
                    $td.addClass("out-range").off();
                }
            }
            if ($('.datepicker tr.last td:eq(0) font').text() == '')
                $('.datepicker tr.last').hide();
            else
                $('.datepicker tr.last').show();

            //渲染已设置的日期
            this.dateRender(this.supplierCalendar);

        },
        //记录选中点
        recordck: function(obj, type) {
            var cur_smp = new Date($('#SY').text(), $('.tdmonth li.on').index(), obj.find('font').html()).valueOf();
            if (!this.isCtrl) this.empty_ckbox = {};
            if (type == 'add' && !this.empty_ckbox[cur_smp]) {
                this.empty_ckbox[cur_smp] = true;
            } else if (type == 'del' && this.empty_ckbox[cur_smp]) {
                delete this.empty_ckbox[cur_smp];
            }
        },
        //渲染已设置的日期
        dateRender: function(supplierCalendar) {
            var ls = this.supplierCalendar.bizSkuInfo,
                days = $('.dtbx font'),
                _self = this;
            $('.tipvl').remove();
            for (var i = 0; i < ls.length; i++) {
                days.filter(function() {
                    if (this.innerHTML != '') {
                        var cur_smp = new Date($('#SY').text(), $('.tdmonth li.on').index(), this.innerHTML).valueOf();
                        if (cur_smp == ls[i].vTxt && ls[i].state != 'del') {
                            var cur_td = $(this).closest('td')[0];
                            _self.set_tdvalue($(cur_td).find('.dtbx'), ls[i].price, ls[i].stock_num);
                            if (_self.checkRangeDay(new Date($('#SY').text(), $('.tdmonth li.on').index(), (parseInt(this.innerHTML) + 1)), _self.rangedays)) {
                                //if (!cur_td.color_temp) cur_td.color_temp = $(cur_td).find('font')[0].style.color;
                                //$(cur_td).css('background', '#ed6c44').attr('class', 'choiced').find('font,label').css('color', '#fff');
                                $(cur_td).addClass("choiced");
                            } else {
                                console.log(this.innerHTML);
                                console.log($(cur_td).find('.tipvl').html());
                                //$(cur_td).find('font,label').css('color', 'rgb(102, 102, 102)');
                            }
                        }
                    }
                });

            }

            $(".tdweek input[type='checkbox']").each(function() {
                var week = $(this).attr("week");
                var inRangeDays = $(".day td.in-range[week='" + week + "']").length;
                var choicedDays = $(".day td.choiced[week='" + week + "']").length;
                this.checked = inRangeDays == choicedDays;
            });
        },
        //价格和库存写入缓存
        set_chahevalue: function(stock, price, day) {
            var cur_time = new Date($('#SY').text(), $('.tdmonth li.on').index(), day).getTime() + '',
                ls = this.supplierCalendar.bizSkuInfo;
            for (var i = 0; i < ls.length; i++) {
                if (cur_time == ls[i].vTxt && ls[i].state != 'del') {
                    if (ls[i].sku_id != 0) ls[i].state = 'update';
                    ls[i].stock_num = stock;
                    ls[i].price = price;
                    console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo) + '   ---------set_chahevalue--update------');
                    return;
                }
            }
            ls.push({
                "sku_id": 0,
                "state": 'add',
                "stock_num": stock,
                "price": price,
                "vTxt": cur_time
            });
            console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo) + '   --------set_chahevalue--add------');
        },
        //从缓存删除价格和库存
        del_chahevalue: function(day) {
            var cur_time = new Date($('#SY').text(), $('.tdmonth li.on').index(), day).getTime() + '',
                ls = this.supplierCalendar.bizSkuInfo;
            for (var i = 0; i < ls.length; i++) {
                if (cur_time == ls[i].vTxt) {
                    if (ls[i].state == 'update' || ls[i].state == '') {
                        ls[i].state = 'del';
                    } else if (ls[i].state == 'add') {
                        ls.remove(i);
                    }
                }
            }
            console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo) + '   -------del_chahevalue----------');
        },
        //设置日期的价格和库存
        set_tdvalue: function(obj, price, stock) {
            if (obj.find('.tipvl').length == 0)
                obj.append('<div class="tipvl"><label>￥：</label><label class="price_">' + price + '</label><br><label>库存：</label><label class="stock_">' + stock + '</label></div>');
            else {
                obj.find('.price_').text(price);
                obj.find('.stock_').text(stock);
            }
            //obj.find('label').css('color', '#fff');
        },
        //监测日期是否在规定范围内
        //"v" 要检测的日期
        //"frontRangeDay" 向前延伸的天数
        //"behindRangeDay" 向后延伸的天数
        checkRangeDay: function(v, frontRangeDay, behindRangeDay) {
            var cur_time = new Date(),
                behindRangeDay = behindRangeDay ? behindRangeDay : 0,
                frontRangeDay = frontRangeDay ? frontRangeDay : 0,
                days = Math.ceil((v - cur_time) / 1000 / 60 / 60 / 24);
            if (-behindRangeDay <= days && days <= (frontRangeDay - 1))
                return true;
            else
                return false;
        },
        //在下拉列表中选择年月时,调用自定义函数drawCld(),显示公历和农历的相关信息
        changeCld: function() {
            var y, m;
            y = $('#SY').text();
            m = $('.tdmonth li.on').index();
            this.drawCld(y, m);
        },
        //打开页时,在下拉列表中显示当前年月,并调用自定义函数drawCld(),显示公历和农历的相关信息
        initial: function() {
            var gNum, str = '',
                slcvalue = $('input[name="supplierCalendar"]').val();
            for (i = 0; i < 6; i++) {
                str += '<tr class="day ' + (i == 5 ? 'last' : '') + '">';
                for (j = 0; j < 7; j++) {
                    gNum = i * 7 + j;
                    str += '<td id="GD' + gNum + '"><div class="dtbx"><font id="SD' + gNum + '"';
                    if (j == 0) str += ' style="color:red"';
                    if (j == 6) str += ' style="color:#000080"';
                    str += '> </font></div></td>';
                }
                str += '</tr>';
            }
            $('.datepicker table').append(str);

            $('#SY').text(this.tY);
            $('.tdmonth li').removeClass('on');
            $('.tdmonth').find('li:eq(' + this.tM + ')').addClass('on');

            if (slcvalue)
                this.supplierCalendar = JSON.parse(slcvalue);
            else
                $('input[name="supplierCalendar"]').val(JSON.stringify(this.supplierCalendar));

            this.drawCld(this.tY, this.tM);
        }
    }

    module.exports = new $datepicker();

});
=======
/*! PC_JX - v1.0.0 - 2016-11-23 */
define(function(require,exports,module){$public=require("public"),$datepicker=function(){this.solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31),this.nStr1=new Array("日","一","二","三","四","五","六","七","八","九","十"),this.rangedays=90,this.empty_ckbox={},this.fat=this.mat=9,this.cld=null,this.isCtrl=!1,this.isShift=!1,this.lastCtrlSelectDay=0,this.Today=new Date,this.tY=this.Today.getFullYear(),this.tM=this.Today.getMonth(),this.tD=this.Today.getDate(),this.lunarInfo=new Array(19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42448,83315,21200,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46496,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19415,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448),this.supplierCalendar={seller_id:$('input[name="sellerId"]').val(),hotel_id:$('input[name="hotelId"]').val(),sku_flag:"",bizSkuInfo:[]},this.init.apply(this,arguments)},$datepicker.prototype={init:function(){var a=this;$(".rds").val()&&(a.rangedays=$(".rds").val()),$(".setvl").on("click",function(){var b=$(".day .choiced .dtbx"),c=$(".price").val(),d=$(".stock").val();if(b.length>0){if(!/^\d{1,6}(\.\d{1,2})?$|^[1-9]\d{0,5}$/.test($(".price").val()))return $public.dialog.msg("“价格”为数字,最大6位整数,能带两位小数","error"),void $(".price").focus();if(!/^[1-9]\d{0,5}$/.test($(".stock").val()))return $public.dialog.msg("“库存”为数字,最大6位整数","error"),void $(".stock").focus();b.filter(function(){a.set_tdvalue($(this),c,d),a.set_chahevalue(d,c,$(this).parent().find("font").html())}),$('input[name="supplierCalendar"]').val(JSON.stringify(a.supplierCalendar))}else $public.dialog.msg("请选择要设置的日期","error")}),$(".clearvl").on("click",function(){var b=$(".day .choiced .dtbx");b.length>0?(b.filter(function(){$(this).find(".tipvl").remove(),a.del_chahevalue($(this).parent().find("font").html())}),$(document).trigger("click"),$(".price,.stock").val(""),$('input[name="supplierCalendar"]').val(JSON.stringify(a.supplierCalendar))):$public.dialog.msg("请选择要清除信息的日期","error")}),$(".setvalue").on("click",function(a){$public.stopBubble(a)}),$(".tdyears .prev").on("click",function(b){var c=parseInt($("#SY").text());$("#SY").text(c-1),a.changeCld(),$public.stopBubble(b)}),$(".tdyears .next").on("click",function(b){var c=parseInt($("#SY").text());$("#SY").text(c+1),a.changeCld(),$public.stopBubble(b)}),$(".tdmonth li").on("click",function(b){$(".tdmonth li").removeClass("on"),$(this).addClass("on"),a.changeCld(),$public.stopBubble(b)}),$(".tdmonth li").on("click",function(b){$(".tdmonth li").removeClass("on"),$(".tdweek input[type='checkbox']").attr("checked",!1),$(this).addClass("on"),this.lastCtrlSelectDay=0,a.changeCld(),$public.stopBubble(b)}),$(".tdweek").on("click","td:has(input[type='checkbox'])",function(){var a=event.target.tagName.toLowerCase();if("td"==a){var b=event.target.children[0];b.checked=!b.checked}else if("input"==a)var b=event.target;var c=b.checked,d=$(b).attr("week");c?$(".day td.in-range[week='"+d+"']").addClass("choiced"):$(".day td.in-range[week='"+d+"']").removeClass("choiced")}),window.document.onclick=function(){},window.document.onkeydown=function(b){b=b||window.event||arguments.callee.caller.arguments[0],17==b.keyCode&&(a.isCtrl=!0),16==b.keyCode&&(a.isShift=!0)},window.document.onkeyup=function(b){b=b||window.event||arguments.callee.caller.arguments[0],17==b.keyCode&&(a.isCtrl=!1),16==b.keyCode&&(a.isShift=!1)},window.document.onselectstart=function(){},a.initial()},lYearDays:function(a){var b,c=348;for(b=32768;b>8;b>>=1)c+=this.lunarInfo[a-1900]&b?1:0;return c+this.leapDays(a)},leapDays:function(a){return this.leapMonth(a)?65536&this.lunarInfo[a-1900]?30:29:0},leapMonth:function(a){return 15&this.lunarInfo[a-1900]},monthDays:function(a,b){return this.lunarInfo[a-1900]&65536>>b?30:29},solarDays:function(a,b){return 1==b?a%4==0&&a%100!=0||a%400==0?29:28:this.solarMonth[b]},calElement:function(a,b,c,d){return{isToday:!1,sYear:a,sMonth:b,sDay:c,week:d}},calendar:function(a,b){this.fat=this.mat=0;var c,d=1,e=0,f={};c=new Date(a,b,1),f.length=this.solarDays(a,b),f.firstWeek=c.getDay(),b+1==5&&(this.fat=c.getDay()),b+1==6&&(this.mat=c.getDay());for(var g=0;g<f.length;g++)d>e&&(c=new Date(a,b,g+1)),f[g]=this.calElement(a,b+1,g+1,this.nStr1[(g+f.firstWeek)%7]),(g+f.firstWeek)%7==0&&(f[g].color="red");return a==this.tY&&b==this.tM&&(f[this.tD-1].isToday=!0),f},select:function(a){$(".day .choiced").removeClass("choiced"),a.addClass("choiced"),$(".price").val(a.find(".price_").text()),$(".stock").val(a.find(".stock_").text()),this.lastCtrlSelectDay=0},ctrlSelect:function(a){a.hasClass("choiced")?a.removeClass("choiced"):(a.addClass("choiced"),1==$(".day .choiced").length?($(".price").val(a.find(".price_").text()),$(".stock").val(a.find(".stock_").text())):$(".price,.stock").val(""),this.lastCtrlSelectDay=parseInt(a.attr("day")),console.log("lastCtrlSelectDay:"+this.lastCtrlSelectDay))},shiftSelect:function(a){var b,c,d=$(".day .choiced").length,e=parseInt(a.attr("day"));if(0==d)a.addClass("choiced"),$(".price").val(a.find(".price_").text()),$(".stock").val(a.find(".stock_").text()),this.firstShiftSelectDay=e;else{if(c=e,b=1==d?parseInt($(".day .choiced").attr("day")):parseInt($(".day .choiced").last().attr("day")),0!=this.lastCtrlSelectDay&&(b=this.lastCtrlSelectDay),console.log("startDay:"+b),console.log("endDay:"+c),c<=b)return;for(var f=b;f<=c;f++)$(".day td[day='"+f+"']").addClass("choiced");this.lastCtrlSelectDay=0,$(".price,.stock").val("")}},drawCld:function(a,b){var c,d,e=this;p2="";for(e.cld=e.calendar(a,b),c=0;c<42;c++){var f=document.getElementById("SD"+c),g=$(f).closest("td");if(g.removeClass().attr("day","").attr("week",""),d=c-e.cld.firstWeek,d>-1&&d<e.cld.length){f.innerHTML=d+1,e.cld[d].isToday&&g.addClass("today");var h=new Date(a,b,d+1);g.attr("day",d+1).attr("week",h.getDay()),e.checkRangeDay(h,e.rangedays)?g.addClass("in-range").off().on("click",function(a){var b=$(this);b.hasClass("out-range")||(e.isCtrl?e.ctrlSelect(b):e.isShift?e.shiftSelect(b):e.select(b),$(".tdweek input[type='checkbox']").each(function(){var a=$(this).attr("week"),b=$(".day td.in-range[week='"+a+"']").length,c=$(".day td.choiced[week='"+a+"']").length;this.checked=b==c}),$public.stopBubble(a))}):g.addClass("out-range").off()}else f.innerHTML="",g.addClass("out-range").off()}""==$(".datepicker tr.last td:eq(0) font").text()?$(".datepicker tr.last").hide():$(".datepicker tr.last").show(),this.dateRender(this.supplierCalendar)},recordck:function(a,b){var c=new Date($("#SY").text(),$(".tdmonth li.on").index(),a.find("font").html()).valueOf();this.isCtrl||(this.empty_ckbox={}),"add"!=b||this.empty_ckbox[c]?"del"==b&&this.empty_ckbox[c]&&delete this.empty_ckbox[c]:this.empty_ckbox[c]=!0},dateRender:function(a){var b=this.supplierCalendar.bizSkuInfo,c=$(".dtbx font"),d=this;$(".tipvl").remove();for(var e=0;e<b.length;e++)c.filter(function(){if(""!=this.innerHTML){var a=new Date($("#SY").text(),$(".tdmonth li.on").index(),this.innerHTML).valueOf();if(a==b[e].vTxt&&"del"!=b[e].state){var c=$(this).closest("td")[0];d.set_tdvalue($(c).find(".dtbx"),b[e].price,b[e].stock_num),d.checkRangeDay(new Date($("#SY").text(),$(".tdmonth li.on").index(),this.innerHTML),d.rangedays)?$(c).addClass("choiced"):(console.log(this.innerHTML),console.log($(c).find(".tipvl").html()))}}});$(".tdweek input[type='checkbox']").each(function(){var a=$(this).attr("week"),b=$(".day td.in-range[week='"+a+"']").length,c=$(".day td.choiced[week='"+a+"']").length;this.checked=b==c})},set_chahevalue:function(a,b,c){for(var d=new Date($("#SY").text(),$(".tdmonth li.on").index(),c).getTime()+"",e=this.supplierCalendar.bizSkuInfo,f=0;f<e.length;f++)if(d==e[f].vTxt&&"del"!=e[f].state)return 0!=e[f].sku_id&&(e[f].state="update"),e[f].stock_num=a,e[f].price=b,void console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo)+"   ---------set_chahevalue--update------");e.push({sku_id:0,state:"add",stock_num:a,price:b,vTxt:d}),console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo)+"   --------set_chahevalue--add------")},del_chahevalue:function(a){for(var b=new Date($("#SY").text(),$(".tdmonth li.on").index(),a).getTime()+"",c=this.supplierCalendar.bizSkuInfo,d=0;d<c.length;d++)b==c[d].vTxt&&("update"==c[d].state||""==c[d].state?c[d].state="del":"add"==c[d].state&&c.remove(d));console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo)+"   -------del_chahevalue----------")},set_tdvalue:function(a,b,c){0==a.find(".tipvl").length?a.append('<div class="tipvl"><label>￥：</label><label class="price_">'+b+'</label><br><label>库存：</label><label class="stock_">'+c+"</label></div>"):(a.find(".price_").text(b),a.find(".stock_").text(c))},checkRangeDay:function(a,b,c){var d=new Date,c=c?c:0,b=b?b:0,e=Math.ceil((a-d)/1e3/60/60/24);return-c<=e&&e<=b-1},changeCld:function(){var a,b;a=$("#SY").text(),b=$(".tdmonth li.on").index(),this.drawCld(a,b)},initial:function(){var a,b="",c=$('input[name="supplierCalendar"]').val();for(i=0;i<6;i++){for(b+='<tr class="day '+(5==i?"last":"")+'">',j=0;j<7;j++)a=7*i+j,b+='<td id="GD'+a+'"><div class="dtbx"><font id="SD'+a+'"',0==j&&(b+=' style="color:red"'),6==j&&(b+=' style="color:#000080"'),b+="> </font></div></td>";b+="</tr>"}$(".datepicker table").append(b),$("#SY").text(this.tY),$(".tdmonth li").removeClass("on"),$(".tdmonth").find("li:eq("+this.tM+")").addClass("on"),c?this.supplierCalendar=JSON.parse(c):$('input[name="supplierCalendar"]').val(JSON.stringify(this.supplierCalendar)),this.drawCld(this.tY,this.tM)}},module.exports=new $datepicker});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-23 */
>>>>>>> master
