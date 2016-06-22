define(function (require, exports, module) {
	require("core"),
	require("widget"),
	require("datepicker"),//引用时间组件
	require("uploadfiles"),//上传文件组件
	require("validform"),//上传文件组件
	require("dropdownlist"),//下拉框组件
	require("upload"),
	$public=require("public"),
	$test = function () {
		this.init.apply(this, arguments);
	};
	var isLock=true;
	$test.prototype = {
		init:function(){
			var _self=this;

			$("#forminfo").Validform();
			
			//渲染时间控件s
			// $( "#tm" ).datepicker();
			$('#bank').selectlist({width: 200});
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
			//渲染下拉框控件
			$('select').selectlist({
				zIndex: 10,
				width: 200,
				height: 32,
				onChange:function(){}
			});
				if($('.error_box').length>0){
				var tit_top=$('.error_box').offset().top,lock=false;
				$(window).scroll(function(){
					var cur_top=$(this).scrollTop();
					if(tit_top<cur_top&&!lock){
						$('.error_box').css({'position':'fixed','right':(($(document).width()-1190)/2+0)+'px'});
						lock=true;
					}else if(tit_top>cur_top&&lock){
						$('.error_box').css({'position':'absolute','right':'0px'});
						lock=false;
					}
				});
			}
			var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
						"tax" :/^[\w\W]{1,25}$/,
						"name" :/^[\w\W]{2,10}$/
					},
					ajaxPost:true
				},rule=[{
					ele:".taxL",
					datatype:"tax",
					nullmsg:"请填写信息",
					errormsg:"请填写1到25位字符！"
					
				},{
					ele:".zrname",
					datatype:"name",
					nullmsg:"请填写信息",
					errormsg:"请填写2到10位字符！"
					
				}],validfm=$(".registerform").Validform(validoptions).addRule(rule);
				$(".comtype input[type='radio']").on('click' ,function(){
					$.ajax({
					   type: "post",
					   url: $public.urlpath.getBsScope,
					   data: {merchantCategoryId:$(this).val()},
					   success: function(data){
					   			  var list = JSON.parse(data.value);
					   			  $('input[type="checkbox"]').prop("checked","").prop("disabled","disabled");    
									  $('input[type="checkbox"]:disabled').each(function(){ 
									  	for (var i = 0; i < list.length; i++) {
									  		if($(this).val() == list[i].businessScopeId ) {
									  			$(this).prop("disabled","");
									  		}
									  	}; 

									  });   
									   var subDisabled = $('div.bomb input[type="checkbox"]:disabled');
									  	if (subDisabled.length <3) {

									  		$(".k1").prop("disabled","");
									  	};
					   	   	}
					   
					});

				});


				$('.subt').on('click',function(){

					var selectvalid=$public.selectvalid(),groupimgvalid=$public.groupimgvalid($('.groupimg'),'请选择图片！'),
					allimgvalid=$public.allimgvalid($('.panel').find('.imgbox:not(".cnat")')),subpath=$('.subpath').val(),
					params=$public.paramcompare($('#forminfo').serializeArray(),function(data){
						data.saleScope=data.saleScope.replace(/\r\n/g, '\n');
					});
					/*console.log(JSON.stringify(params));*/
					if(validfm.check()&&allimgvalid&&selectvalid&&groupimgvalid){
						$public.dialog.waiting();
						/*把从后台去的数据转换成数组*/
					var idStr="";
					$("input[name='businessScopeId']:checked").each(function(){
						idStr+=$(this).val()+",";
					})
					params.scopeIds=idStr.substring(0,idStr.length-1);
					delete params.lxs;
					$.post(subpath,params,function(data){
							$public.isLogin(data);
							$public.dialog.closebox();
							if(data.success){
								$public.dialog.msg('保存成功！','success');
								setTimeout(function(){
									window.location.href=data.value;
								},1500); 
							}else{
								$public.dialog.msg(data.resultMsg,'error');
							}
						});
				}
				return false;
				});
				
				$(".ccc").change(function(){
					$(".company input[type='radio']").eq(0).prop("checked","checked");
				});
				$(".k1").change(function(){

					 if($(this).prop("checked")){
					 		$(this).prop("checked","checked");
							$(".aaa input[type='checkbox']").eq(0).prop("checked","checked");
						}else{
					 		$(this).prop("checked","");
							$(".aaa input[type='checkbox']").prop("checked","");
						};
					
				});

				// $(".qdlm input[type='checkbox']").change(function(){
				// 	_self.yanzheng();
			 //    });



				$(".aaa input[type='checkbox']").change(function(){
					_self.checkedstate();
				});

				$(".ddd").change(function(){
					$(".ccc").prop("checked","");
				});


				$(".company input[type='radio']").change(function(){
					$(".ccc").prop("checked","checked");
					if ($(this).is(':checked')) {
						$(".ccc").prop("checked","checked");
					}else{
						$(".ccc").prop("checked","");
					}
				});



				$(".comtype input[type='radio']").change(function(){
					_self.comtypedisabled();
				});



				$(".rule-name").on('click',function(){
					$(".big-box").show();
				});
				$(".close").on('click',function(){
					$(".big-box").hide();
				});
				$public.actiondata('province','city');
				_self.checkedstate();
				_self.comtypedisabled();

				// _self.yanzheng();

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
		},
		checkedstate : function(){
			var lxtu = $(".aaa input[type='checkbox']:checked").length ;
				if(lxtu<1){
					$(".k1").prop("checked","");
				}else{
					$(".k1").prop("checked","checked");
				};
				
		},
		comtypedisabled :function(){
			if($(".daible").is(':checked')){
						$(".dised").prop("disabled","disabled").siblings('.disedli').prop("checked","checked");
					}else{
						$(".dised").prop("disabled","");
					};
					if ($(".ts").is(':checked')) {
						$(".dised").prop("checked","checked").siblings('.disedli').prop("disabled","disabled");
					}else{
						$(".disedli").prop("disabled","");
					}
		}
		// ,
		// yanzheng : function(){
		// 		if ($(".qdlm input[type='checkbox']").is(':checked')) {
		// 		 	$(".qdlm").find('.Validform_checktip').prop('class','Validform_right').html('');
		// 		};
		// 		if($(".qdlm input[type='checkbox']").not('input:checked')) {
		// 			$(".qdlm").find('.Validform_checktip').prop('class','Validform_wrong').html('请选择');
		// 		};
		// 		// if ($(".qdlm input[type='checkbox']").not("input:checked")) {
		// 		// 	$(".qdlm").find('.Validform_checktip').attr('class','Validform_wrong').html('请选择');
		// 		// };
		// }
		// yanzheng : function(){
		// 		if ($(".qdlm input[type='checkbox']").is(':checked')) {
		// 		 	$(".qdlm").find('.Validform_checktip').prop('class','Validform_right').html('');
		// 		}else{
		// 			$(".qdlm").find('.Validform_checktip').prop('class','Validform_wrong').html('请选择');
		// 		}
		// 		// if ($(".qdlm input[type='checkbox']").not("input:checked")) {
		// 		// 	$(".qdlm").find('.Validform_checktip').attr('class','Validform_wrong').html('请选择');
		// 		// };
		// } 
		
	}
	$(function(){
		var merchantCategoryId = $(".comtype input[name='merchantCategoryId']:checked").val();
		if (!merchantCategoryId) {
			return false;
		}else{
			$.ajax({
					   type: "post",
					   url: $public.urlpath.getBsScope,
					   data: {merchantCategoryId:merchantCategoryId},
					   success: function(data){
					   			  var list = JSON.parse(data.value);
					   			  $('input[type="checkbox"]').not("input:checked").prop("disabled","");    
									  $('input[type="checkbox"]:disabled').each(function(){ 
									  	for (var i = 0; i < list.length; i++) {
									  		if($(this).val() == list[i].businessScopeId ) {
									  			$(this).prop("disabled","");
									  		}
									  	}; 
 
									  });   
					   	   	}
					   
					});
		}
	})
	module.exports = new $test();
});   
