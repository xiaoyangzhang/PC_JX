define(function (require, exports, module) {
	require("core"),
	require("widget"),
	require("datepicker"),
	require("validform"),
	//require("jqueryui"),
	require("dropdownlist"),
	require("uploadfiles"),//上传文件组件
	$public=require("public"),
	$editer = require("editer"),
	require("md5"),//加密
	$test = function () {
		this.init.apply(this, arguments);
	};
	$test.prototype = {
		init:function(){
			$editer.distanceFun();
			$public.diffBrowser();
			var $self = this;
			//渲染时间控件
			$( "#tm" ).datepicker({
		      changeMonth: true,
		      changeYear: true
		    });
			/* tab切换 */
			$self.eredrInfoTab();
			/* 判断昵称是否存在 */
			$self.nickName();
			/* 省级联动 */
			$self.provinceFun();
			
			var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
					},
					ajaxPost:true
				},rule=[{
					ele:".phone",
					datatype:"null_tel"
					
				},
				{
					ele:"#nickName",
					maxlength:"15",
					nullmsg:"请填写您的昵称",
					datatype:"s",
					errormsg:"除下划线以外的特殊字符不允许输入,请填写2-15字以内的字符"
				},
				{
					ele:"#realName",
					datatype:"s",
					maxlength:"10",
					nullmsg:"请填写您的真实姓名",
					errormsg:"除下划线以外的特殊字符不允许输入,请填写10字以内的昵称"
				}
				],validfm=$(".registerform").Validform(validoptions).addRule(rule);
			/* 提示服务描述中文本的字数提示 */
			$('#serve').bind('input propertychange', function() {
				var curtxt = $(this).val().length;
				var txt = $(".change").text();
				if(txt != curtxt){
					$(".change").text(curtxt);
				}
			});
			
			$("#saveBtnEredar").on("click",function(){
				/* a代表提交按钮的所有表单中是否通过验证为true,b代表下拉框是否通过表单验证，c代表图片是否通过验证成功 */
				var a=validfm.check(),b=$public.selectvalid(),params=null,arr=[],temparr=[],imgarr=[],obj={},ctval=$('#contentText').val(),
					c=$public.allimgvalid($('.imgbox:not(".cnat")')),d=$public.groupimgvalid($('.groupimg'),'请选择图片！');
					e= $editer.tuwencheck();
					
				if(a&&b&&c&&d&&e){
					params=$public.paramcompare($('.registerform').serializeArray());
					params.pictureTextDOs=ctval;
					/* console.log(ctval);
					console.log(JSON.stringify(params)); */
					/*console.log('---------------------------------------------'); */
					for(var key in params){
						if(key=='certificatess'&&params[key]){
							for(var i=0;i<params[key].length;i++){
								obj.id=parseInt(params[key][i]);
								obj.name='';
								obj.type=1;
								$('input[name="certificatess"]:checked').filter(function(){
									if($(this).val()==params[key][i])
										obj.name=$(this).next('label').text();
								});
								arr.push(obj);
								obj={};
							}
							params[key]=JSON.stringify(arr);
							arr.length=0;
						}
						if(key=='imgpath'&&params[key]){
							temparr=params[key];
							for(var j=0;j<temparr.length;j++){
								if(temparr[j]!=''){
									imgarr.push(temparr[j]);
								}
							}
							params[key]=JSON.stringify(imgarr);
							/* console.log(params[key]); */
						}
					}
				$.ajax({
					type:'POST',
					url:$public.urlpath.eredar,
					data:params,
					success:function(data){
						/* alert(data); */
						$public.isLogin(data);
						if( data.success ){
							$public.dialog.msg("保存成功","success");
							window.location.href = window.location.href;
						}else{
							$public.dialog.msg(data.msg,"error");
						}
					}
				});
					/* console.log(JSON.stringify(params)); */
				}
			});
			
		},
		eredrInfoTab : function(){
			 $(".eredar-info ul li").click(function(){
			  	$(this).addClass("on").siblings().removeClass("on");
				var index = $(this).index();
				$(".eredar-list").hide();
				$(".eredar-list" + (index + 1)).show();
			});
		},
		nickName : function(){
			$("#nickName").blur(function(){
				var _self=this;
				$.ajax({
					type:'POST',
					url:'user/chargeUserNickName',
					data:{nickName:$('#nickName').val()},
					success:function(data){
						$public.isLogin(data);
						if(!data.success){
							$(_self).parent().find('.Validform_checktip').remove();
							$(_self).parent().append('<span class="Validform_checktip Validform_wrong">此用户昵称已被使用！</span>');
						}
					}
				});
			});
		},
		provinceFun : function(){
			$public.actiondata('province','city');
		}
	}
	module.exports = new $test();
});