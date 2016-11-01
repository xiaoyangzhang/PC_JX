define(function (require, exports, module) {
	require("pdfobject"),
	$public=require("public"),
	$agreement = function () {
		this.init.apply(this, arguments);
	};

	var isLock=true;

	$agreement.prototype = {
		init:function(){
			$('.dialog').show();
			$('.dialog-agreement i').on('click',function(ev){
				$('.dialog').hide();
				$public.stopBubble(ev);
			});
			$('.agremt-view').on('click',function(){
				PDFObject.embed('/jiuxiu.pdf','#example1');
			});
		}
	}
	module.exports = new $agreement();
});