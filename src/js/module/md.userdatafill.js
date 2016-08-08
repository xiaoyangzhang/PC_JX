define(function (require, exports, module) {
	require("core"),
	require("widget"),
	require("datepicker"),//引用时间组件
	require("uploadfiles"),//上传文件组件
	require("validform"),//验证组件
	require("dropdownlist"),//下拉框组件
	require("upload"),
	$public=require("public"),
	$userdatafill = function () {
		this.init.apply(this, arguments);
	};

	var isLock=true;

	$userdatafill.prototype = {
		init:function(){
			
			var _self=this;

			if($('.error_box').length>0){
				var tit_top=$('.error_box').offset().top,lock=false;
				$(window).scroll(function(){
					var cur_top=$(this).scrollTop();
					if(tit_top<cur_top&&!lock){
						$('.error_box').css({'position':'fixed','right':(($(document).width()-1190)/2+110)+'px'});
						lock=true;
					}else if(tit_top>cur_top&&lock){
						$('.error_box').css({'position':'absolute','right':'110px'});
						lock=false;
					}
				});
			}

	        var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
						"*2-10" : /^[\w\W]{2,10}$/,
						"n10-25" : /^\d{10,25}$/
					},
					ajaxPost:true
				},rule=[{
					ele:".picfile",
					datatype:"*"
				},{
					ele:".businesname",
					datatype:"*2-10",
					nullmsg:"请填写姓名",
					errormsg:"请填写2-10字以内的姓名"
				},{
					ele:".finance",
					datatype:"n8-25",
					nullmsg:"请填写财务结算账号",
					errormsg:"财务结算账号只允许8-25个数字"
				}],validfm=$("#forminfo").Validform(validoptions).addRule(rule);

			// $('#principleName_').keyup(function(){
			// 	$('#financeOpenName_').val($(this).val());
			// });
 
			//渲染时间控件
			//var cardHtml = '<td class="tbtxt w280"><label class="bred">*</label><span>开户人身份证：</span></td><td><input class="inptxt" datatype="card" maxlength="18"    //value="$!examineInfo.openerCard" id="openerCard_" name="openerCard" ></td>';
			//var telHtml = '<td class="tbtxt w280"><label class="bred">*</label><span>开户人手机号：</span></td><td><input class="inptxt" datatype="m" maxlength="11"    //value="$!examineInfo.openerTel" id="openerTel_" name="openerTel" placeholder="银行预留手机号" ></td>';
			//var setHtml = '<td class="tbtxt w280"><label class="bred">*</label><span>结算联行号：</span></td><td><input class="inptxt" datatype="n" maxlength="12"   //value="$!examineInfo.settlementCard" id="settlementCard_" name="settlementCard" ></td>';
			var cardHtml = $(".private_card tr").html();
			var telHtml = $(".private_tel tr").html();
			var setHtml = $(".public tr").html();
			$( "#tm" ).datepicker();
			$('#bank').selectlist({width: 200});
			$('#accountType').selectlist({
				width: 200,
				onChange:function(){
					if($("#accountType :hidden").val() == 1){
						$(".settlementCard_").remove();
						$(".financeOpenName_").after($("<tr class=\"openerCard_\"></tr>").html(cardHtml));
						$(".financeOpenName_").after($("<tr class=\"openerTel_\"></tr>").html(telHtml));
					}
					if($("#accountType :hidden").val() == 2){
						$(".openerTel_").remove();
						$(".openerCard_").remove();
						$(".financeOpenName_").after($("<tr class=\"settlementCard_\"></tr>").html(setHtml));
					}
				}
			});
			$('#card').selectlist({
				width: 200,
				onChange:function(){
					if(!isLock){
						$('#cardtxt').removeClass('Validform_error').val('')
						.next().empty().removeClass('Validform_wrong Validform_right');
					}
					_self.changevalid(true);
				}
			});
			_self.changevalid();

			//下一页并保存
			$('.nxt').on('click',function(){
				var allimgvalid=$public.allimgvalid($('.panel').find('.imgbox:not(".cnat")')),subpath=$('.subpath').val(),
					params=$public.paramcompare($('#forminfo').serializeArray(),function(data){
						data.saleScope=data.saleScope.replace(/\r\n/g, '\n');
					}),groupimgvalid=true;
					if($('.darenzh').length>0) groupimgvalid=$public.groupimgvalid($('.darenzh'),'请选择图片！');
					if(validfm.check()&&allimgvalid&&groupimgvalid){
						$public.dialog.waiting();
						$.post(subpath,params,function(data){
							$public.isLogin(data);
							$public.dialog.closebox();
							if(data.success){
								$public.dialog.msg('保存成功！','success');
								setTimeout(function(){
									window.location=data.value;
								},1500);
							}else{
								$public.dialog.msg(data.resultMsg,'error');
							}
						});
					}
					return false;
			});

			//商家入驻总提交
			$('.allsub').on('click',function(){
				var selectvalid=$public.selectvalid(),groupimgvalid=$public.groupimgvalid($('.groupimg'),'请选择图片！'),
					allimgvalid=$public.allimgvalid($('.panel').find('.imgbox:not(".cnat")')),subpath=$('.subpath').val(),
					params=$public.paramcompare($('#forminfo').serializeArray());
					if(validfm.check()&&allimgvalid&&selectvalid&&groupimgvalid){
						$public.dialog.waiting();
						$.post(subpath,params,function(data){
							$public.isLogin(data);
							$public.dialog.closebox();
							if(data.success){
								$public.dialog.msg('保存成功！','success');
								setTimeout(function(){
									window.location=data.value;
								},1500); 
							}else{
								$public.dialog.msg(data.resultMsg,'error');
							}
						});
					}
				return false;
			});
			
			$public.actiondata('province','city');
			
		},
		changevalid : function(isTrue){
			var cardvalue=$('#card :hidden').val();
			if(isTrue)isLock=false;
			if(cardvalue==0)
				$('#cardtxt').attr('datatype','card');
			else if(cardvalue==1)
				$('#cardtxt').attr('datatype','dlic');
			else if(cardvalue==2)
				$('#cardtxt').attr('datatype','psport');
			else if(cardvalue==3)
				$('#cardtxt').attr('datatype','gidcard');
		}
	}
	module.exports = new $userdatafill();
});