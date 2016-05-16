define(function (require, exports, module) {
	require("dropdownlist"),//下拉框组件
	$public=require("public"),
	$hotelbaseinfo = function () {
		this.init.apply(this, arguments);
	};
	$hotelbaseinfo.prototype = {
		config:{
			radiobar:'.radio-bar',
			barbox:'.bar-box',
			barboxul:'.bar-box ul',
			barboxdiv:'.bar-box div',
			radiobarlabel:'.radio-bar label',
			radiobarimg:'.radio-bar img',
			choicehotel:'.choicehotel'
		},
		init:function(){
			var _self=this;
		}
	}
	module.exports = new $hotelbaseinfo();
});
