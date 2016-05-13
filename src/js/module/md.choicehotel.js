define(function (require, exports, module) {
	$public=require("public"),
	$choicehotel = function () {
		this.init.apply(this, arguments);
	};
	$choicehotel.prototype = {
		config:{
			radiobar:'.radio-bar',
			barbox:'.bar-box',
			barboxul:'.bar-box ul',
			barboxdiv:'.bar-box div',
			radiobarlabel:'.radio-bar label',
			radiobarimg:'.radio-bar img'
		},
		init:function(){
			var _self=this;
			$(_self.config.radiobar).on('click',function(){
				$(_self.config.barbox).css('height','0');
				$(_self.config.radiobarimg).attr('src',static_source+'img/droptip_up.jpg');
				$(this).next().css('height',$(_self.config.barboxul).height()+$(_self.config.barboxdiv).height()+'px');
				$(this).find('img').attr('src',static_source+'img/droptip_down.jpg');
			});
			$(_self.config.radiobarlabel).on('click',function(e){
				$public.stopBubble(e);
			});
		}
	}
	module.exports = new $choicehotel();
});
