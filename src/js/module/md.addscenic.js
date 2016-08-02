define(function (require, exports, module) {
	require('dropdownlist'),//下拉框组件
	require('validform'),//验证
	$cus_datepicker=require('cus_datepicker'),
	$public=require("public"),
	$choiceScenic = function () {
		this.init.apply(this, arguments);
	};
	$choiceScenic.prototype = {
		config:{
			radiobar:'.radio-bar',
			barbox:'.bar-box',
			barboxul:'.bar-box ul',
			barboxdiv:'.bar-box div',
			radiobarlabel:'.radio-bar label',
			radiobarimg:'.radio-bar img',
			eredarli:'.eredar-info li',
			eredarpanel:'.eredar-right .panel',
			searchotel:'.choicehotel',
			searchbox:'.searchbox',
			hotelist:'.hotelist',
			loadlist:'.load_list',
			searchbtn:'.search-btn',
			btnOk:'.ok',
			infoBar:'.info-bar',
			infoBox:'.info-box',
			inputGp:'input[name="gp"]',
			searchScenic:'.searchScenic',
			scenicList:'.sceniclist',
			svdraftbox:'.svdraftbox',
			svdraft:'.svdraft'
		},
		init:function(){
			var _self=this;
			
	        var validoptions={
					tiptype:3,
					label:'.label',
					showAllError:true,
					datatype:{
						'*2-10' : /^[\w\W]{2,10}$/,
						'n10-25' : /^\d{10,25}$/,
						'price' : /^([1-9]\d{0,5}(\.\d{1,2})?|0\.\d{1,2})$/,
						"n0-90" : /^([0-9]|90|[1-8][0-9])$/
					},
					ajaxPost:true
				},
				rule=[{
					ele:'tr.notNull input[type="text"]',
					datatype:'*',
					nullmsg:'请填信息！'
				},{
					ele:'td input[name="ticketId"]:last',
					datatype:'*',
					nullmsg:'请选择门票类型'
				},{
					ele:'input[name="price"],input[name="originalPrice"]',
					datatype:'price',
					errormsg:'整数最多6位,可带两位小数!'
				},{
					ele:"input[name='startBookTimeLimit']",
					datatype:"n0-90",
					nullmsg:"请填写提前预定天数！",
					errormsg:"只能输入0-90范围数字！"
				}],
				validForm=$('.scenicForm').Validform(validoptions).addRule(rule);

			$public.procityaredata('province','city','area',true);

			//计算输入字数
			$('.inputxt,textarea').keyup(function(){
				$(this).next('.mark').find('label.cv').text($(this).val().length);
			}).filter(function(){
				$(this).next('.mark').find('label.cv').text($(this).val().length);
			});

			$(_self.config.eredarli).on('click',function(ev){
				$(_self.config.eredarli).removeClass('on');
				$(this).addClass('on');
				$(_self.config.eredarpanel).hide();
				$($(_self.config.eredarpanel)[$(this).index()]).fadeIn();
			    //渲染已设置的日期
		    	$cus_datepicker.dateRender($cus_datepicker.supplierCalendar);
				$public.stopBubble(ev);
			});

			$(_self.config.searchbtn).on('click',function(){
				$(_self.config.loadlist).show();
				getScenicList();
			});
			
			
			//返回上一页
			$('.backprev').on('click',function(ev){
				$('.eredar-info li.on').prev().trigger('click');
				$public.stopBubble(ev);
			});

			//“基本信息”保存并下一步
			$('.save-to-picker').on('click',function(){
				if ($('input[name="scenicId"]').val()==0) {
					$public.dialog.msg('请选择景区','error');
					return;
				}
				if (!validForm.check())
					return;
				$('.eredar-info li:eq(1)').trigger('click');
				$public.stopBubble();
			});
			
			//全部保存
			$('.allsub').on('click',function(ev){
				var ls=$cus_datepicker.supplierCalendar.bizSkuInfo,isHave=false;
				if (!validForm.check()){
					$('.eredar-info li:eq(0)').trigger('click');
					return;
				}
				for(var i=0;i<ls.length;i++){
					if(ls[i].state!='del')
						isHave=true;
				}
				if(!isHave){
					$public.dialog.msg('请设置价格日历！','error');
					return;
				}	

				var dynamicArr = [];
				$('.dynamicTr').each(function () {
					var dynamicTr ={
						pId : $(this).attr('pId'),
						pTxt : $(this).attr('pTxt'),
						pType : $(this).attr('pType'),
						vTxt : $(this).find('input').val(),
						categoryId : parseInt($('input[name="categoryId"]').val()),
						flag : false
					};	
					dynamicArr.push(dynamicTr);
				});

				var prarm=$public.paramcompare($('.scenicForm').serializeArray());
				prarm.ticketTitle=$('input[name="ticketId"]:checked').attr('tTitle');
				prarm.dynamicEntry=JSON.stringify(dynamicArr);

				var subFlag = $('input[name="operationFlag"]').val(),
				url=subFlag=='update'?$public.urlpath.updateScenic:$public.urlpath.addScenic;

				$.post(url,prarm,function (data) {
					//console.log(data);
					$public.isLogin(data);
					if (data.success) {
						$public.dialog.msg('保存成功','success');
						setTimeout(function () {
							window.location = data.value;
						},1000);
					}else{
						$public.dialog.msg(data.resultMsg,'error');
					};
				});
				
			});

			//查询景区弹出层
			$(_self.config.searchScenic).on('click',function(ev){
				var $searchbox=$(_self.config.searchbox),
				$sceniclist=$searchbox.find(_self.config.scenicList);
				$public.dialog.content(968,'auto','选择景区',$searchbox.show(),function(){
					var ckid=$('input[name="scenicGroup"]:checked'),scenicId=ckid.val(),
					scenicName=ckid.closest('td').next().text();
					if(scenicId){
						$('input[name="scenicId"]').val(scenicId);
						$('input[name="scenicName"]').val(scenicName);
						$('#lbscenicname').text(scenicName);
						$public.dialog.closebox();
						selectScenic();
					}else{
						alert('请选择景区！');
					}
					return false;
				},function(){
					$sceniclist.height($('.container').height()-120);
					$(_self.config.loadlist).show();
				});
				getScenicList();
				$public.stopBubble(ev);
			});
			
			//保存草稿弹出层
			$(_self.config.svdraft).on('click',function(ev){
				var $svdraftbox=$(_self.config.svdraftbox);
				$public.dialog.content(300,160,'保存草稿标题',$svdraftbox.show(),function(){
					var dynamicArr = [];
					$('.dynamicTr').each(function () {
						var dynamicTr ={
							pId : $(this).attr('pId'),
							pTxt : $(this).attr('pTxt'),
							pType : $(this).attr('pType'),
							vTxt : $(this).find('input').val(),
							categoryId : parseInt($('input[name="categoryId"]').val()),
							flag : false
						};	
						dynamicArr.push(dynamicTr);
					});

					var prarm=$public.paramcompare($('.scenicForm').serializeArray()),
					ticketTitle=$('input[name="ticketId"]:checked').attr('tTitle'),
					svdraftxt=$('.svdraftxt').val();
					prarm.ticketTitle=ticketTitle?ticketTitle:'';
					if(dynamicArr) prarm.dynamicEntry=JSON.stringify(dynamicArr);
					if(!svdraftxt) {
						$('.svdraftxt').focus();
						return;
					}
					console.log(prarm);
					$public.dialog.closebox();
					$public.dialog.waiting();
					$.post($public.urlpath.saveSPOTDraft,{
						json:prarm,
						draftName:svdraftxt,
						uuid:$('#uuid').val(),
						subType:$('#draftSubType').val(),
						mainType:1,
						id:$('#draftId').val(),
					},function(data){
						if(data.success) {
							if(data.resultMsg>0) {
								$("#draftId").val(data.resultMsg);
								$public.dialog.msg("保存草稿成功！",'success');
							}
						}else
							$public.dialog.msg("保存草稿失败！",'error');
							
						$public.dialog.closebox();
					});
				},function(){
					$svdraftbox.height($('.container').height()-120);
				},1);
				$public.stopBubble(ev);
			});
			
			$public.init_pagination(getScenicList);
			
			//景区列表			
			function getScenicList(page,pagesize){
				var page=page?page:1,pagesize=pagesize?pagesize:$('#pageSize').val(),
				$sceniclist=$(_self.config.searchbox).find(_self.config.scenicList);
				$sceniclist.empty();
				$.get($public.urlpath.getScenicList,{
					page:page,
					pageSize:pagesize,
					name:$('#scenicName').val(),
					locationProvinceId:$('input[name="province"]').val() ? $('input[name="province"]').val() : 0,
					locationCityId:$('input[name="city"]').val() ? $('input[name="city"]').val() : 0,
					locationTownId:$('input[name="area"]').val() ? $('input[name="area"]').val() : 0
				},function(data){ 
					$sceniclist.append(data);
					$(_self.config.loadlist).hide();
					$('.jiuniu_pagination').css('margin-left',(($('.container').width()-$('.jiuniu_pagination').width())/2)+'px');
				});
			};

			//列表感应行点击
			$(document).on('click','.sceniclist tr',function(){
				$(this).find('input[type="radio"]').prop('checked','checked');
			});
			
			function selectScenic(){
				var $tr = $('input[name="scenicGroup"]:checked').closest('tr');
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
						validForm=$('.scenicForm').Validform(validoptions).addRule(rule);
					} else{
						$public.dialog.msg('请求失败','error');
					}
				});
			};
			
		}
	}
	module.exports = new $choiceScenic();
});
