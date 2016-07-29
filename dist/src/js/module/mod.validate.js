/*! pc_jx - v1.0.0 - 2016-07-28 */
define(function(require,exports,module){var $code=require("servicecode"),$validate=function(){this.init.apply(this,arguments)};$validate.prototype={init:function(){},serviceValidate:function(json,codeType){var _code=$code[codeType][json.errorCode];if(!json.success&&_code){if(null!=json.errorCode&&"22000000"==json.errorCode){
//FIXME 熊钊苓
var root_path=$("#root_path");return window.location.href=root_path+"/user/login",!1}return $(_code.input).siblings("span.Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(json.resultMsg),$(_code.input).closest("form").find("[type='password']").val(""),_code.isRunTime}return!0}},module.exports=new $validate});
/*! pc_jx 最后修改于： 2016-07-28 */