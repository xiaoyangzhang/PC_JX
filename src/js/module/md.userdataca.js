define(function (require, exports, module) {
	require("core"),
	require("widget"),
	require("datepicker"),//引用时间组件
	require("uploadfiles"),//上传文件组件
	require("validform"),//验证组件
	//require("dropdownlist"),//下拉框组件
	require("upload"),
	$public=require("public"),
	$userdataca = function () {
		this.init.apply(this, arguments);
	};

	var isLock=true;

	$userdataca.prototype = {
		init:function(){
			
			//var _self=this;
			// $('#bank').selectlist({width: 200});
			// $('#card').selectlist({
			// 	width: 200,
			// 	onChange:function(){
			// 		if(!isLock){
			// 			$('#cardtxt').removeClass('Validform_error').val('')
			// 			.next().empty().removeClass('Validform_wrong Validform_right');
			// 		}
			// 		_self.changevalid(true);
			// 	}
			// });
			//_self.changevalid();


			//商家入驻总提交
			$('.allsub').on('click',function(){
				var groupimgvalid=$public.groupimgvalid($('.groupimg'),'请选择图片！'),
					allimgvalid=$public.allimgvalid($('.panel').find('.imgbox:not(".cnat")')),subpath=$('.subpath').val(),
					params=$public.paramcompare($('#forminfo').serializeArray());
					var arr=[],nuZu=$('.imgbox:not(".groupimg .imgbox")'),imgroup=$('.groupimg'),n=0;
					
					for(var i=0;i<nuZu.length;i++){
						var obj={};
						obj.qulificationId=nuZu[i].id;
						obj.content=$(nuZu[i]).find(':hidden').val();
						arr.push(obj);
					}
					
					//for(var i=0;i<imgroup.length;i++){

						var obj={};
						obj.qulificationId=$("#qualificationId").attr('qualificationId');

						var img_values=$('.qualification :hidden'),content_value=[];
						for(var j=0;j<img_values.length;j++){
							if(img_values[j].value) content_value.push(img_values[j].value);
						}

						obj.content=content_value.join(',');
						arr.push(obj);

					//}
						//console.log(arr);
						
					params.merchantQualificationStr=JSON.stringify(arr);
					$('.groupimg .updateli :hidden').filter(function(){
						if($(this).val()!='') n++;
					});

					//if($('.darenzh').length>0) groupimgvalid=$public.groupimgvalid($('.darenzh'),'请选择图片！');

					if(allimgvalid&&groupimgvalid){
						if(n<5){
							$public.dialog.msg('游乐特种设备,至少上传5份文件.','error');
							return;
						}
						$public.dialog.waiting();
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
			

			//$public.actiondata('province','city');
			
		}
		// changevalid : function(isTrue){
		// 	var cardvalue=$('#card :hidden').val();
		// 	if(isTrue)isLock=false;
		// 	if(cardvalue==0)
		// 		$('#cardtxt').attr('datatype','card');
		// 	else if(cardvalue==1)
		// 		$('#cardtxt').attr('datatype','dlic');
		// 	else if(cardvalue==2)
		// 		$('#cardtxt').attr('datatype','psport');
		// 	else if(cardvalue==3)
		// 		$('#cardtxt').attr('datatype','gidcard');
		// }
	}
	/*异步加载页面*/
/*	$(function(){

				$.ajax({
					   type: "get",
					   datatype:"html",
					   url: $public.urlpath.pageilB,
					   success: function(data){
					   			$(".fm_md").empty().append(data);	  									
					   	   	}
					   
					});
			});*/
	module.exports = new $userdataca();
});