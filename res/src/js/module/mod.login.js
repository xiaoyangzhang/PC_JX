define(function (require, exports, module) {
	var $public = require("common");
	var $servicevali = require("servicevali");
	var $login = function () {
		this.init.apply(this, arguments);
	};
	$login.prototype = { 
		init : function (){
			var $self = this;
			$self.setUserName();
			$self.submitLoginEvent();
			$self.submitRegisterEvent();
			$self.resetPasswordEvent();
			$public.getValidCode({
				runtime:120,
				phone : "#regmobile",
				clickbtn : "#getcodebtn",
				sendCallback : function(json){
					// if( !$servicevali.serviceValidate(json,"sendSmsCode") ){
					// 	return false;
					// }
					return $servicevali.serviceValidate(json,"registerCode");
				}
			});
			document.onkeydown=function(event){
	            var e = event || window.event || arguments.callee.caller.arguments[0];        
	            if(e && e.keyCode==13){
	            	$("#regSubmitBtn,#loginSubmitBtn,#resetPwdBtn").trigger('click');
	            }
	        }; 	
	        var isPopImgCodeInput = $("#isPopImgCodeInput").val();
	        if(isPopImgCodeInput === 'true' && $("#isPopImgCodeP>input").length<1){
	        	$("#isPopImgCodeP").prepend($("#imgcode").show()).show()
	        	$(document).on('input','#imgcode',function(){
	        		if(!$(this).val().trim()){
	        			$(this).parent().find('.Validform_checktip')
	        			.html('请输入4位验证码')
	        			.css({'float':'left','padding-left':'24px','color':'#ffaf00'})
	        			.show()
	        		} else if(!new RegExp("^[0-9A-Za-z]{4,4}$").test($(this).val())){
	        			$(this).parent().find('.Validform_checktip')
	        			.html('请输入4位验证码')
	        			.css({'float':'left','padding-left':'24px','color':'#ffaf00'})
	        			.show()
	        		} else {
	        			$(this).parent().find('.Validform_checktip').html('').hide()
	        		}
	        	})
	        }
		},
		submitLoginEvent : function(){
			var $self = this;
			var setCookie = function(){
				if($.cookie("token2")) return false;
				var date = new Date();
				date.setTime(date.getTime()+(60 * 60 * 1000));			
				$.cookie("token2","true",{expires:date,path: '/'});
			}
			
			var setUserName = function(){
				var saveName = $.cookie("loginName");
				var loginName = $("#loginname").val();
				var checkBox = $("#loginForm .saveuser");				
				if(checkBox.prop("checked") && saveName != loginName){
					var date = new Date();
					date.setTime(date.getTime()+(60 * 60 * 1000));						
					$.cookie("loginName",loginName,{expires:date,path: '/'});
				}
				
				if(!checkBox.prop("checked") && saveName == loginName){
					$.cookie("loginName",null,{path:'/'});
				}
			}
			
			var sucCallback = function(json){
				if( !$servicevali.serviceValidate(json,"loginCode") ){
					return false;
				}
//				if(!json.success){
//					$public.comAlert({msg:json.resultMsg,append:".login-body",hideCallback:function(){$("#loginSubmitBtn").removeAttr("disabled");}});
//					return false;
//				}
				//setCookie();
				setUserName();
				//$ajaxform.resetForm();
				if(json.value){
					window.location.href = json.value;
				}else{
					window.location.reload();
				}
			}
			
			var $ajaxform = $("#loginForm").Validform({
				tiptype:4,
				ajaxPost : true,
				callback : sucCallback
			});
			
			$("#loginSubmitBtn").on("click",function(){
				if($ajaxform.check()){
					$("#loginpwd_").val(md5($("#loginpwd").val()));
					$public.avoidCntClick(function(){
						$("#loginForm").submit();
					},50,"login");
				}
				return false;
			});					
		},
		submitRegisterEvent : function(){
			var $self = this;
			var sucCallback = function(json){
				if(!$servicevali.serviceValidate(json,"registerCode")) return false;
				if(json.value){
					window.location.href = json.value
				}else{
					window.location.reload();
				}
			}
			
			var $ajaxform = $("#registerForm").Validform({
				tiptype:4,
				showAllError : true,
				ajaxPost : true,
				beforeSubmit : function(form){
					$("#userpwd").val(md5($("#userpwd").val()));

					var checked=document.getElementById("member").checked;
					$("#VIP").val(checked.toString());
				},					
				callback : sucCallback
			});
			
			$("#regSubmitBtn").on("click",function(){

				/*if(!$ajaxform.check()){
					return false;
				}
				
				if(document.getElementById("member").checked){
					document.location.href="developing.html";
				}*/

				$public.avoidCntClick(function(){
					$("#registerForm").submit();
					$('#imgcode').val('');
					$('.imgcode')[0].src=$('#root_path').val()+'/user/getImgCode?d='+Math.random();
				},50,"login");
				return false;
			});			
		},
		resetPasswordEvent : function(){
			var $self = this;
			var sucCallback = function(json){
				if(!$servicevali.serviceValidate(json,"registerCode")) return false;
				if(json.value){
					window.location.href = json.value ;
				}else{
					window.location.reload();
				}
			}
			
			var $ajaxform = $("#resetPwdForm").Validform({
				tiptype:4,
				ajaxPost : true,
				beforeSubmit : function(form){
					$("#userpwd").val(md5($("#userpwd").val()));
				},					
				callback : sucCallback
			});
			
			$("#resetPwdBtn").on("click",function(){
				$public.avoidCntClick(function(){
					$("#resetPwdForm").submit();
					$('#imgcode').val('');
					$('.imgcode')[0].src=$('#root_path').val()+'/user/getImgCode?d='+Math.random();
				},50,"login");
				return false;
			});					
		},
		setUserName : function(){
			if($("#loginForm").length==0) return false;
			var loginName = $.cookie("loginName");
			if(loginName && loginName!=="" && loginName!=="null"){
				$("#loginname").val(loginName);
				$("#loginForm .saveuser").prop("checked",true);
			}
		}
	}
	module.exports = new $login();
});