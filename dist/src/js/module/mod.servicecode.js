/*! pc_jx - v1.0.0 - 2016-07-28 */
define(function(require,exports,module){module.exports={loginCode:{
//			//"登陆失败次数过多!"
24001001:{input:"#loginname",isRunTime:!1},
//用户不存在
24001e3:{input:"#loginname",isRunTime:!1},
//用户名或者密码错误
24001002:{input:"#loginpwd",isRunTime:!1},
//密码不能为空
24001012:{input:"#loginpwd",isRunTime:!1},
//用户名不能为空
24001011:{input:"#loginname",isRunTime:!1}},registerCode:{
//手机号码已注册
24001003:{input:"#regmobile",isRunTime:!1},
//短信发送失败
24001004:{input:"#getcodebtn",isRunTime:!1},
//短信已发送
24001006:{input:"#getcodebtn",isRunTime:!1},
//短信验证码错误
24001007:{input:"#getcodebtn",isRunTime:!1},
//密码不能为空
24001012:{input:"#userpwd",isRunTime:!1},
//用户名不能为空
24001011:{input:"#loginname",isRunTime:!1},
//图片验证码错误
24001013:{input:"#imgcode",isRunTime:!1},
//"用户不存在
24001e3:{input:"#regmobile",isRunTime:!1},
// "短信已发送"
24001006:{input:"#mobilecode",isRunTime:!1},
// "短信已发送"
24001015:{input:"#loginname",isRunTime:!1}},passwordCode:{
//原密码修改失败
24001015:{input:"#oldpassword",isRunTime:!1},24001017:{input:"#oldpassword",isRunTime:!1},24001018:{input:"#newpassword",isRunTime:!1},24001019:{input:"#renewpassword",isRunTime:!1}},sendSmsCode:{
//	public static final WebReturnCode USER_NOT_FOUND = new WebReturnCode(, "用户不存在");
24001e3:{input:"#regmobile",isRunTime:!1},
// "短信已发送"
24001006:{input:"#mobilecode",isRunTime:!1}}}});
/*! pc_jx 最后修改于： 2016-07-28 */