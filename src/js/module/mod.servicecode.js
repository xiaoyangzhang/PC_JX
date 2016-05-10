define(function(require,exports,module){
	module.exports = {
		loginCode :{ 
//			//"登陆失败次数过多!"
			24001001:{"input":"#loginname","isRunTime":false},
			//用户不存在
			24001000:{"input":"#loginname","isRunTime":false},
			//用户名或者密码错误
			24001002:{"input":"#loginpwd","isRunTime":false},
			//密码不能为空
			24001012:{"input":"#loginpwd","isRunTime":false},
			//用户名不能为空
			24001011:{"input":"#loginname","isRunTime":false}
		},	
		registerCode : {
			//手机号码已注册
			24001003:{"input":"#regmobile","isRunTime":false},
			//短信发送失败
			24001004:{"input":"#getcodebtn","isRunTime":false},		
			//短信已发送
			24001006:{"input":"#getcodebtn","isRunTime":false},
			//短信验证码错误
			24001007:{"input":"#getcodebtn","isRunTime":false},
			//密码不能为空
			24001012:{"input":"#userpwd","isRunTime":false},
			//用户名不能为空
			24001011:{"input":"#loginname","isRunTime":false},
			//图片验证码错误
			24001013:{"input":"#imgcode","isRunTime":false},
			//"用户不存在
			24001000:{"input":"#regmobile","isRunTime":false},
			// "短信已发送"
			24001006:{"input":"#mobilecode","isRunTime":false},
			// "短信已发送"
			24001015:{"input":"#loginname","isRunTime":false}
		},
		passwordCode : {
			//原密码修改失败
			24001015:{"input":"#oldpassword","isRunTime":false},
			24001017:{"input":"#oldpassword","isRunTime":false},
			24001018:{"input":"#newpassword","isRunTime":false},
			24001019:{"input":"#renewpassword","isRunTime":false}
		},
		sendSmsCode : {
			//	public static final WebReturnCode USER_NOT_FOUND = new WebReturnCode(, "用户不存在");
			24001000:{"input":"#regmobile","isRunTime":false},
			// "短信已发送"
			24001006:{"input":"#mobilecode","isRunTime":false}
		}
		
	};	
	
});