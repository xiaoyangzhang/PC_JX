define(function (require, exports, module) {
	require("core"),
	require("widget"),
	require("datepicker"),//引用时间组件
	require("uploadfiles"),//上传文件组件
	require("validform"),//上传文件组件
	require("dropdownlist"),//下拉框组件
	require("upload"),
	$public=require("public"),
	$userdatafill = function () {
		this.init.apply(this, arguments);
	};
	$userdatafill.prototype = {
		// timer:null,
		// waitcode:function(obj){
		// 	var _btn=obj,_self=this,n=60;
		// 	clearInterval(_self.timer);
		// 	$(_btn).off().text('还剩'+n+'秒');
		// 	_self.timer=setInterval(function(){
		// 		n--;
		// 		$(_btn).text('还剩'+n+'秒');
		// 		if(n==0){
		// 			clearInterval(_self.timer);
		// 			$(_btn).text('获取验证码').on('click',function(){_self.waitcode(this);});
		// 		}
		// 	},1000);
		// },
		init:function(){
			var _self=this;

			//console.log(JSON.parse('{"name":"xiongzhaoling"}'));
	// $('#fm').submit(function(){
	// 	$(this).ajaxSubmit({
	// 		success:function(data){
	// 			alert(data);
	// 			console.log(data);
	// 		}
	// 	});
	// 	return false;
	// });

    // $('#basicInfoHead').change(function(){
		  // $.ajaxFileUpload({  
		  //     url:"http://192.168.0.139:8080/file/upload",//需要链接到服务器地址   
		  //     secureuri:false,  
		  //     fileElementId:"basicInfoHead",//文件选择框的id属性  
		  //     dataType: 'json',   //json  
		  //     success: function (data) {  alert(data);  
		  //     },error:function(XMLHttpRequest, textStatus, errorThrown){  
		  //    	alert('上传失败！');  
		  //  	  }  
		  // }); 
    // });
  
			// $.jsonp({
			//     url: 'http://192.168.100.94:8080/sellerAdmin/talent/saveExamineFile.dos',
			//     data: { imgSrc: 'aa' },
			//     success: function (newImgSrc, textStatus, xOptions) {
			//         console.log(newImgSrc);
			//         console.log(textStatus);
			//         console.log(xOptions.data.imgSrc);alert();
			//     }
			// });
			// $.ajax({
			//     url: 'http://192.168.100.94:8080/sellerAdmin/talent/saveExamineFile.do',
	  //           dataType : "jsonp",
	  //           jsonpCallback : "callback",
			//     success: function (data) {
			//         console.log(data);console.log('ddd');
			//     }
			// });

			// //获取验证码
			// $('.getcode').on('click',function(){_self.waitcode(this);});

	        var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
						"zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
					},
					ajaxPost:true
				},rule=[{
					ele:".picfile",
					datatype:"*"
				}],validfm=$("#forminfo").Validform(validoptions).addRule(rule);
 
			//渲染时间控件
			$( "#tm" ).datepicker();
			$('#card,#bank').selectlist({width: 200});

			//下一页并保存
			$('.nxt').on('click',function(){
				var allimgvalid=$public.allimgvalid($('.panel').find('.imgbox:not(".cnat")')),subpath=$('.subpath').val(),
					params=$public.paramcompare($('#forminfo').serializeArray()),groupimgvalid=true;
					if($('.darenzh').length>0) groupimgvalid=$public.groupimgvalid($('.darenzh'),'请选择图片！');

				if(validfm.check()&&allimgvalid&&groupimgvalid){
					$public.dialog.waiting();
					$.post(subpath,params,function(data){
						$public.dialog.closebox();
						if(data.success){
							$public.dialog.msg('保存成功！','success');
							setTimeout(function(){
								window.location=data.url;
							},1500);
						}else{
							$public.dialog.msg(data.errorMsg,'error');
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
							$public.dialog.closebox();
							if(data.success){
								$public.dialog.msg('保存成功！','success');
								setTimeout(function(){
									window.location=data.url;
								},1500);
							}else{
								$public.dialog.msg(data.errorMsg,'error');
							}
						});
					}
				return false;
			});
			
			$public.actiondata('province','city');
			
		}
	}
	module.exports = new $userdatafill();
});