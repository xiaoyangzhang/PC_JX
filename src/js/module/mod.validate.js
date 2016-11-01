define(function (require, exports, module) {
	var $code = require("servicecode");
	var $validate = function () {
		this.init.apply(this, arguments);
	};
	$validate.prototype = {
		init : function(){},
		serviceValidate : function(json,codeType){
			var _code = $code[codeType][json.errorCode];

			if(!json.success && json.value==='true' && $("#isPopImgCodeP>input").length<1){
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

			if(!json.success && _code){	
				if( json.errorCode != null  && "22000000" == json.errorCode){
					//FIXME 熊钊苓
					var root_path = $("#root_path") ;
					window.location.href = root_path+"/user/login";
					return false;
				}
				$(_code.input).siblings("span.Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(json.resultMsg);
				$(_code.input).closest("form").find("[type='password']").val('');

				return _code.isRunTime;
			}else{
				return true;
			}
		}
	}
	module.exports = new $validate();
});