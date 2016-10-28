define(function (require, exports, module) {
	require("dropdownlist"),//下拉框组件
	$public=require("public"),
	ScenicAndHotel = function () {
		this.init.apply(this, arguments);
	};
	ScenicAndHotel.prototype = {
		config:{
			searchotel:'.choicehotel',
			searchbox:'.dialog .searchbox',
			hotelist:'.hotelist',
			loadlist:'.load_list',
			searchbtn:'.search-btn',
			btnOk:'.ok',
			infoBar:'.info-bar',
			infoBox:'.info-box',
			inputGp:'input[name="gp"]',
			svdraftbox:'.svdraftbox',
			svdraft:'.svdraft',
			searchScenic:'.choiceScenic',
			scenicList:'.sceniclist',
			svdraftbox:'.svdraftbox',
			svdraft:'.svdraft'
		},
		init:function(){
			var _self=this;
			//城市联动
			$public.procityaredata('province','city','area',true);
			//查询酒店弹框
			_self.hotel.hotelDialog();
			//酒店翻页

			//删除选中的景区或者酒店
			$(_self.config.infoBar).find('.icon-close').on('click',function(){
				$(this).prev().html('');
			});

			//查询酒店
			$(document).on('click','.searchHotelBtn',function(){
				$(_self.config.loadlist).show();
				_self.hotel.gethotelist();
			});

			//感应行点击
			$(document).on('click','.hotelist tr',function(){
				$(this).find('input[type="radio"]').prop('checked','checked');
			});
			
			//返回上一页
			$('.backprev').on('click',function(ev){
				$('.eredar-info li.on').prev().trigger('click');
				$public.stopBubble(ev);
			});

			//查询景区弹框
			_self.scenic.scenicDialog();
			//查询景区
			$(document).on('click','.searchScenicBtn',function(){
				$(_self.config.loadlist).show();
				_self.scenic.getScenicList();
			});

		},
		/*选择酒店*/
		hotel : {
			init_pagination:function(callback){
				//上一页
				$(document).on('click','.hotel-dialog .jiuniu_pagination li.previous:not(".disabled") a',function(){
					var cur_page=parseInt($('.jiuniu_pagination li.active a').text()),page=cur_page>0?(cur_page-1):cur_page;
					$('input[name="pageNo"]').val(page);
					callback(page);
				});

				//下一页
				$(document).on('click','.hotel-dialog .jiuniu_pagination li.next:not(".disabled") a',function(){
					var cur_page=parseInt($('.jiuniu_pagination li.active a').text()),page=cur_page+1;
					$('input[name="pageNo"]').val(page);
					callback(page);
				});

				//选择页
				$(document).on('click','.hotel-dialog .jiuniu_pagination li:not(".active,.previous,.next") a',function(){
					var cur_page=parseInt($(this).text());
					$('input[name="pageNo"]').val(cur_page);
					callback(cur_page);
				});

				//选择页大小
				$(document).on('change','.jiuniu_pagination li #pageSize',function(){
					$('input[name="pageSize"]').val($(this).val());
					callback(1,$(this).val());
				});
			},
			//弹出框查询酒店
			hotelDialog: function(){
				var _self=ScenicAndHotel.prototype,
					_this = this;
				$(_self.config.searchotel).on('click',function(ev){
					var $searchbox=$('.searchbox'),
					$htlst=$searchbox.find(_self.config.hotelist);
					$htlst.css({'overflow':'auto','height':300});
					$searchbox.find('.tb-txt').text('酒店名称');
					$('.hotelname').val('');
					$('#content-box').removeClass('scenic-dialog');
					$searchbox.find(_self.config.searchbtn).removeClass('searchScenicBtn').addClass('searchHotelBtn');
					$public.dialog.content(968,550,'选择酒店',$searchbox.show(),function(){
						
						var ckid=$('input[name="hotelGroup"]:checked'),htlid=ckid.val(),
						hp=ckid.closest('tr').find(':hidden').val(),
						htname=ckid.closest('td').next().text();
						$('.hotelType').text(hp);
						if(htlid){
							$('input[name="hotelId"]').val(htlid);
							$('input[name="name"]').val(htname);
							$('.hotel-name').text(htname);
							$public.dialog.closebox();
							_this.gitroominfo();
						}else{
							alert('请选择酒店！');
						}
						return false;
					},function(){
						$htlst.height($('.container').height()-120);
						$(_self.config.loadlist).show();
						$('#content-box').addClass('hotel-dialog');
					});
					_this.gethotelist();
					$public.stopBubble(ev);
				});
			},
			//获取酒店列表
			gethotelist: function(page,pagesize){
				var _self=ScenicAndHotel.prototype,
					_this = this,
					page=page?page:1,pagesize=pagesize?pagesize:$('#pageSize').val(),
				$htlst=$(_self.config.searchbox).find(_self.config.hotelist);
				$htlst.empty();
				$(_self.config.loadlist).show();
				$.get($public.urlpath.gethotelist,{
					page:page,
					pageSize:pagesize,
					name:$('.dialog  .hotelname').val(),
					locationProvinceId:$('input[name="province"]').val() ? $('input[name="province"]').val() : 0,
					locationCityId:$('input[name="city"]').val() ? $('input[name="city"]').val() : 0,
					locationTownId:$('input[name="area"]').val() ? $('input[name="area"]').val() : 0
				},function(data){
					$htlst.append(data);
					$(_self.config.loadlist).hide();
					$('.jiuniu_pagination').css('margin-left',(($('.container').width()-$('.jiuniu_pagination').width())/2)+'px');
					$('.tb-box').height($('.hotelist').height());
				});
				_this.init_pagination && _this.init_pagination(_this.gethotelist);
			},
			//获取房型详细信息
			gitroominfo: function (){
				var _self=ScenicAndHotel.prototype,
					$tr = $('input[name="hotelGroup"]:checked').closest('tr');
				$('.load_room').show();
				$('.hotelcol').hide();
				$(_self.config.infoBar).find('.htn').text($tr.find('.hotel-name').text());
				$(_self.config.infoBar).find('.address').text($tr.find('.hotel-address').text());
				$(_self.config.infoBar).find('.tel').text($tr.find('.hotel-tel').text());
				$.get($public.urlpath.getroominfo,{hotelId:$('input[name="hotelGroup"]:checked').val()},function (data) {
					$('.load_room').hide();
					$('.hotelcol').show();
					$(_self.config.infoBox).empty().append(data);
					var rdlth=$('.radio-bar').length-1;
					$('.radio-bar:eq('+rdlth+')').css('border-bottom','none');
					setTimeout(function(){$('.radio-bar:eq(0)').trigger('click');},500);
				});
			}
		},
		scenic : {
			init_pagination:function(callback){
				//上一页
				$(document).on('click','.scenic-dialog .jiuniu_pagination li.previous:not(".disabled") a',function(){
					var cur_page=parseInt($('.jiuniu_pagination li.active a').text()),page=cur_page>0?(cur_page-1):cur_page;
					$('input[name="pageNo"]').val(page);
					callback(page);
				});

				//下一页
				$(document).on('click','.scenic-dialog .jiuniu_pagination li.next:not(".disabled") a',function(){
					var cur_page=parseInt($('.jiuniu_pagination li.active a').text()),page=cur_page+1;
					$('input[name="pageNo"]').val(page);
					callback(page);
				});

				//选择页
				$(document).on('click','.scenic-dialog .jiuniu_pagination li:not(".active,.previous,.next") a',function(){
					var cur_page=parseInt($(this).text());
					$('input[name="pageNo"]').val(cur_page);
					callback(cur_page);
				});

				//选择页大小
				$(document).on('change','.scenic-dialog .jiuniu_pagination li #pageSize',function(){
					$('input[name="pageSize"]').val($(this).val());
					callback(1,$(this).val());
				});
			},
			scenicDialog : function(){
				var _self=ScenicAndHotel.prototype,
					_this = this;

				$(_self.config.searchScenic).on('click',function(ev){
					var $searchbox=$('.searchbox'),
					$sceniclist=$searchbox.find(_self.config.hotelist);
					/*var $searchbox=$(_self.config.searchbox),
					$sceniclist=$(_self.config.searchbox).find(_self.config.hotelist);*/
					$searchbox.find('.tb-txt').text('景区名称');
					$('.hotelname').val('');
					$sceniclist.css({'overflow':'auto','height':280});
					$('#content-box').removeClass('hotel-dialog');
					$searchbox.find(_self.config.searchbtn).removeClass('searchHotelBtn').addClass('searchScenicBtn');
					$public.dialog.content(968,550,'选择景区',$searchbox.show(),function(){
						var ckid=$('input[name="scenicGroup"]:checked'),scenicId=ckid.val(),
						scenicName=ckid.closest('td').next().text();
						if(scenicId){
							$('input[name="scenicId"]').val(scenicId);
							$('input[name="scenicName"]').val(scenicName);
							$('.scenic-name').text(scenicName);
							$public.dialog.closebox();
							_this.selectScenic();
						}else{
							alert('请选择景区！');
						}
						return false;
					},function(){
						$sceniclist.height($('.container').height()-120);
						$(_self.config.loadlist).show();
						$('#content-box').addClass('scenic-dialog');
					});
					_this.getScenicList();
					$public.stopBubble(ev);
				});
			},
			//景区列表			
			getScenicList : function(page,pagesize){
				var _self=ScenicAndHotel.prototype,
					_this = this,
					page=page?page:1,pagesize=pagesize?pagesize:$('#pageSize').val(),
				$sceniclist=$(_self.config.searchbox).find(_self.config.hotelist);
				$sceniclist.empty();
				$.get($public.urlpath.getScenicList,{
					page:page,
					pageSize:pagesize,
					name:$('.dialog  .hotelname').val(),
					locationProvinceId:$('input[name="province"]').val() ? $('input[name="province"]').val() : 0,
					locationCityId:$('input[name="city"]').val() ? $('input[name="city"]').val() : 0,
					locationTownId:$('input[name="area"]').val() ? $('input[name="area"]').val() : 0
				},function(data){ 
					$sceniclist.append(data);
					$(_self.config.loadlist).hide();
					$('.jiuniu_pagination').css('margin-left',(($('.container').width()-$('.jiuniu_pagination').width())/2)+'px');
				});
				_this.init_pagination && _this.init_pagination(_this.getScenicList);
			},

			selectScenic: function(){
				var _self=ScenicAndHotel.prototype,
					$tr = $('input[name="scenicGroup"]:checked').closest('tr');
				$(_self.config.infoBar).find('.htn').text($tr.find('.scenic-name').text());
				$(_self.config.infoBar).find('.address').text($tr.find('.scenic-locationText').text());
				$.post($public.urlpath.getScenicTicketType,{scenicId : $('input[name="scenicId"]').val()},function (data) {
					//console.log(JSON.stringify(data));
					if (data.success) {
						var tikArr = JSON.parse(data.value);
						var tdHtml = [];
						for (var i=0;i<tikArr.length;i++) {
							var lab = '<label class="radio"><input type="radio" name="ticketId" value='+ tikArr[i].id +' tTitle='+ tikArr[i].title +'>'+ tikArr[i].title +'</label>';
							tdHtml.push(lab);
						};
						$('td.ticketType').empty().append(tdHtml.join('\n'));
					} else{
						$public.dialog.msg('请求失败','error');
					}
				});
			}
		}
	};
	module.exports = new ScenicAndHotel();
});
