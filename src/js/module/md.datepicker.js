define(function (require, exports, module) {
	$public=require("public");
	$datepicker = function () {

		/****************************************************价格日历********************************************/
		this.solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
		this.nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');

		this.rangedays=$('.rds').val()?$('.rds').val():60;
		this.empty_ckbox={};
		//保存y年m+1月的相关信息
		this.fat=this.mat=9;
		//在表格中显示公历和农历的日期,以及相关节日
		this.cld,this.isCtrl=false;
		//用自定义变量保存当前系统中的年月日
		this.Today = new Date();
		this.tY = this.Today.getFullYear();
		this.tM = this.Today.getMonth();
		this.tD = this.Today.getDate();

		this.lunarInfo=new Array(
		0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
		0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
		0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
		0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
		0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
		0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
		0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
		0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
		0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
		0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
		0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
		0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
		0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
		0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
		0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);


	    this.supplierCalendar={
	        "seller_id":$('input[name="sellerId"]').val(),
	        "hotel_id":$('input[name="hotelId"]').val(),
	        "sku_flag":'',
	        "bizSkuInfo":[]
	    };

		this.init.apply(this, arguments);

	}
	$datepicker.prototype = {
		  init:function(){
		  	var _self=this;
			//设置价和库存
			$('.setvl').on('click',function(){
				var temp='',$dtbx=$('.day .choiced .dtbx'),price=$('.price').val(),stock=$('.stock').val();
				if($dtbx.length>0){
					if(!/^\d{1,6}(\.\d{1,2})?$|^[1-9]\d{0,5}$/.test($('.price').val())){
						$public.dialog.msg('“价格”为数字,最大6位整数,能带两位小数','error');
						$('.price').focus();
						return;
					}
					if(!/^[1-9]\d{0,5}$/.test($('.stock').val())){
						$public.dialog.msg('“库存”为数字,最大6位整数','error');
						$('.stock').focus();
						return;
					}
					$dtbx.filter(function(){
						_self.set_tdvalue($(this),price,stock);
						_self.set_chahevalue(stock,price,$(this).parent().find('font').html());
					});
					$('input[name="supplierCalendar"]').val(JSON.stringify(_self.supplierCalendar));
				}else
					$public.dialog.msg('请选择要设置的日期','error');
			});

			//清除价格和库存
			$('.clearvl').on('click',function(){
				var temp='',$dtbx=$('.day .choiced .dtbx');
				if($dtbx.length>0){
					$dtbx.filter(function(){
						$(this).find('.tipvl').remove();
						_self.del_chahevalue($(this).parent().find('font').html());
					});
					$(document).trigger('click');
					$('.price,.stock').val('');
					$('input[name="supplierCalendar"]').val(JSON.stringify(_self.supplierCalendar));
				}else
					$public.dialog.msg('请选择要清除信息的日期','error');
			});

			$('.setvalue').on('click',function(ev){
				$public.stopBubble(ev);
			});
3
			$('.tdyears .prev').on('click',function(ev){
				var cur_years=parseInt($('#SY').text());
				$('#SY').text(cur_years-1);
				_self.changeCld();
				$public.stopBubble(ev);
			});
			$('.tdyears .next').on('click',function(ev){
				var cur_years=parseInt($('#SY').text());
				$('#SY').text(cur_years+1);
				_self.changeCld();
				$public.stopBubble(ev);
			});
			$('.tdmonth li').on('click',function(ev){
		    	$('.tdmonth li').removeClass('on');
		    	$(this).addClass('on');
				_self.changeCld();
				$public.stopBubble(ev);
			});
			$('.tdmonth li').on('click',function(ev){
		    	$('.tdmonth li').removeClass('on');
		    	$(this).addClass('on');
				_self.changeCld();
				$public.stopBubble(ev);
			});

			window.document.onclick = function (){
	  			$('.day td').filter(function(){
	  				if($(this).attr('class')){
						$(this).css('background','#fff').attr('class','').find('font').css('color',this.color_temp);
						$(this).find('label').css('color','#666');
					}
	  			});
	  			if(!_self.isCtrl) _self.empty_ckbox={};
			}
			window.document.onkeydown = function (evt){
				evt = evt || window.event || arguments.callee.caller.arguments[0];
				if(evt.keyCode == 17) _self.isCtrl=true;
			}
			window.document.onkeyup = function (evt){
				evt = evt || window.event || arguments.callee.caller.arguments[0];
				if(evt.keyCode == 17) _self.isCtrl=false;
			}

			_self.initial();

		  },
		  //返回农历y年的总天数
		  lYearDays:function(y) {
		     var i, sum = 348;
		     for(i=0x8000; i>0x8; i>>=1)sum+=(this.lunarInfo[y-1900]&i)?1:0;
		     return(sum+this.leapDays(y));
		  },
		  //返回农历y年闰月的天数
		  leapDays:function(y) {
		     if(this.leapMonth(y))  return((this.lunarInfo[y-1900] & 0x10000)? 30: 29);
		     else return(0);
		  },
		  //判断y年的农历中那个月是闰月,不是闰月返回0
		  leapMonth:function(y){
		     return(this.lunarInfo[y-1900]&0xf);
		  },
		  //返回农历y年m月的总天数
		  monthDays:function(y,m){
		     return((this.lunarInfo[y-1900]&(0x10000>>m))?30:29);
		  },
		 //返回公历y年m+1月的天数
		 solarDays:function(y,m){
		    if(m==1)
		       return(((y%4==0)&&(y%100!=0)||(y%400==0))?29:28);
		    else
		       return(this.solarMonth[m]);
		 },
		 //记录公历和农历某天的日期
		 calElement:function(sYear,sMonth,sDay,week) {
		 	   return {
		 	   	isToday:false,
		 	   	sYear:sYear,
		 	   	sMonth:sMonth,
		 	   	sDay:sDay,
		 	   	week:week,
		 	   };
		 },
		 calendar:function(y,m) {
		    this.fat=this.mat=0;
		    var sDObj,lDObj,lD=1,lX=0,obj={};
		    var n = 0;
		    var firstLM = 0;
		    sDObj = new Date(y,m,1);    //当月第一天的日期
		    obj.length = this.solarDays(y,m);    //公历当月天数
		    obj.firstWeek = sDObj.getDay();    //公历当月1日星期几
		    if ((m+1)==5){this.fat=sDObj.getDay()}
		    if ((m+1)==6){this.mat=sDObj.getDay()}
		    for(var i=0;i<obj.length;i++) {
		       if(lD>lX) {
		          sDObj = new Date(y,m,i+1);    //当月第一天的日期
		       }
		       obj[i] = this.calElement(y,m+1,i+1,this.nStr1[(i+obj.firstWeek)%7]);
		       if((i+obj.firstWeek)%7==0){
		          obj[i].color = 'red';  //周日颜色
		       }
		    }
		    if(y==this.tY && m==this.tM) obj[this.tD-1].isToday = true;    //今日
		    return obj;
		 },
		 drawCld:function(SY,SM) {
		    var TF=true,_prent_self=this;
		    var p1=p2="";
		    var i,sD,s,size;
		    _prent_self.cld = _prent_self.calendar(SY,SM);
		    for(i=0;i<42;i++) {
		       sObj=eval('SD'+ i);
		       sObj.className = '';
		       sD = i - _prent_self.cld.firstWeek;
		       if(sD>-1 && sD<_prent_self.cld.length) { //日期内
		          sObj.innerHTML = sD+1;
		          if(_prent_self.cld[sD].isToday){ sObj.style.color = '#ffaf00';} //今日颜色
		          else{sObj.style.color = '#666';}

		          $(sObj).closest('td').css({'background':'#fff','cursor':'pointer'}).off().removeClass();

		          if(_prent_self.checkRangeDay(new Date(SY,SM,sD+1),_prent_self.rangedays)){
			          $(sObj).closest('td').on('click',function(ev){
			          		var _self=this;
			          		if(!_prent_self.isCtrl){
			          			$('.day td').filter(function(){
			          				if($(this).attr('class')){
										$(this).css('background','#fff').attr('class','').find('font').css('color',this.color_temp);
										$(this).find('label').css('color','#666');
									}
			          			});
			          		}
							if($(_self).attr('class')){
								$(_self).css('background','#fff').attr('class','').find('font').css('color',_self.color_temp);
								$(_self).find('label').css('color','#666');
								//recordck($(_self),'del');
							}else{
								_self.color_temp=$(_self).find('font')[0].style.color;
								$(_self).css('background','#ed6c44').attr('class','choiced').find('font,label').css('color','#fff');
								$('.price').val($(_self).find('.price_').text());
								$('.stock').val($(_self).find('.stock_').text());
								//recordck($(_self),'add');
							}
							if(_prent_self.isCtrl) $('.price,.stock').val('');
							$public.stopBubble(ev);
					   });
				   }               
		       }
		       else { //非日期
		          sObj.innerHTML = '';
		          $(sObj).closest('td').css({'background':'#f5f5f5','cursor':'initial'}).off();
		       }
		    }
		    if($('.datepicker tr.last td:eq(0) font').text()=='')
		    	$('.datepicker tr.last').hide();
		    else
		    	$('.datepicker tr.last').show();

		    //渲染已设置的日期
	    	this.dateRender(this.supplierCalendar);

		 },
		//记录选中点
		recordck:function(obj,type){
			var cur_smp=new Date($('#SY').text(),$('.tdmonth li.on').index(),obj.find('font').html()).valueOf();
			if(!this.isCtrl) this.empty_ckbox={};
			if(type=='add'&&!this.empty_ckbox[cur_smp]){
				this.empty_ckbox[cur_smp]=true;
			}else if(type=='del'&&this.empty_ckbox[cur_smp]){
				delete this.empty_ckbox[cur_smp];
			}
		},
		//渲染已设置的日期
		dateRender:function(supplierCalendar){
			var ls=this.supplierCalendar.bizSkuInfo,days=$('.dtbx font'),_self=this;
			$('.tipvl').remove();
			for(var i=0;i<ls.length;i++){
				days.filter(function(){
					if(this.innerHTML!=''){
						var cur_smp=new Date($('#SY').text(),$('.tdmonth li.on').index(),this.innerHTML).valueOf();
						if(cur_smp==ls[i].vTxt&&ls[i].state!='del'){
							var cur_td=$(this).closest('td')[0];
							_self.set_tdvalue($(cur_td).find('.dtbx'),ls[i].price,ls[i].stock_num);
							if(_self.checkRangeDay(new Date($('#SY').text(),$('.tdmonth li.on').index(),(parseInt(this.innerHTML)+1)),_self.rangedays)){
								if(!cur_td.color_temp) cur_td.color_temp=$(cur_td).find('font')[0].style.color;
								$(cur_td).css('background','#ed6c44').attr('class','choiced').find('font,label').css('color','#fff');
							}else{console.log(this.innerHTML);console.log($(cur_td).find('.tipvl').html());
								$(cur_td).find('font,label').css('color','rgb(102, 102, 102)');
							}
						}
					}
				});
				
			}
		},
		//价格和库存写入缓存
		set_chahevalue:function(stock,price,day){
			var cur_time=new Date($('#SY').text(),$('.tdmonth li.on').index(),day).getTime()+'',
			ls=this.supplierCalendar.bizSkuInfo;
			for(var i=0;i<ls.length;i++){
				if(cur_time==ls[i].vTxt&&ls[i].state!='del'){
					if(ls[i].sku_id!=0) ls[i].state='update';
					ls[i].stock_num=stock;
					ls[i].price=price;
	        		console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo)+'   ---------set_chahevalue--update------');
					return;
				}
			}
          	ls.push({
		            "sku_id":0,
		            "state":'add',
		            "stock_num":stock,
		            "price":price,
		            "vTxt":cur_time
					});
	        console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo)+'   --------set_chahevalue--add------');
		},
		//从缓存删除价格和库存
		del_chahevalue:function(day){
			var cur_time=new Date($('#SY').text(),$('.tdmonth li.on').index(),day).getTime()+'',
			ls=this.supplierCalendar.bizSkuInfo;
			for(var i=0;i<ls.length;i++){
				if(cur_time==ls[i].vTxt){
					if(ls[i].state=='update'||ls[i].state==''){
						ls[i].state='del';
					}else if(ls[i].state=='add'){
          				ls.remove(i);
					}
				}
			}
	        console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo)+'   -------del_chahevalue----------');
		},
		//设置日期的价格和库存
		set_tdvalue:function(obj,price,stock){
			if(obj.find('.tipvl').length==0)
          		obj.append('<div class="tipvl"><label>￥：</label><label class="price_">'+price+'</label><br><label>库存：</label><label class="stock_">'+stock+'</label></div>');
			else{
				obj.find('.price_').text(price);
				obj.find('.stock_').text(stock);
			}
          	obj.find('label').css('color','#fff');
		},
		 //监测日期是否在规定范围内
		 //"v" 要检测的日期
		 //"frontRangeDay" 向前延伸的天数
		 //"behindRangeDay" 向后延伸的天数
		 checkRangeDay:function(v,frontRangeDay,behindRangeDay){
		 	var cur_time=new Date(),behindRangeDay=behindRangeDay?behindRangeDay:0,
		 	frontRangeDay=frontRangeDay?frontRangeDay:0,days=Math.ceil((v-cur_time)/1000/60/60/24);
		 	if(-behindRangeDay<=days&&days<=(frontRangeDay-1))
		 		return true;
		 	else
		 		return false;
		 },
		 //在下拉列表中选择年月时,调用自定义函数drawCld(),显示公历和农历的相关信息
		 changeCld:function() {
		    var y,m;
		    y=$('#SY').text();
		    m=$('.tdmonth li.on').index();
		    this.drawCld(y,m);
		 },
		 //打开页时,在下拉列表中显示当前年月,并调用自定义函数drawCld(),显示公历和农历的相关信息
		 initial:function() {
			var gNum,str='',slcvalue=$('input[name="supplierCalendar"]').val();
         	for(i=0;i<6;i++) {
                str+='<tr class="day '+(i==5?'last':'')+'">';
                for(j=0;j<7;j++) {
                   gNum = i*7+j;
                   str+='<td id="GD' + gNum +'"><div class="dtbx"><font id="SD' + gNum +'"';
                   if(j == 0) str+=' style="color:red"';
                   if(j == 6) str+=' style="color:#000080"';
                   str+='> </font></div></td>';
                }
                str+='</tr>';
     		}
         	$('.datepicker table').append(str);

		    $('#SY').text(this.tY);
		    $('.tdmonth li').removeClass('on');
		    $('.tdmonth').find('li:eq('+this.tM+')').addClass('on');

		    if(slcvalue)
		    	this.supplierCalendar=JSON.parse(slcvalue);
		    else
				$('input[name="supplierCalendar"]').val(JSON.stringify(this.supplierCalendar));

		    this.drawCld(this.tY,this.tM);

		 }
	}

	module.exports = new $datepicker();

});