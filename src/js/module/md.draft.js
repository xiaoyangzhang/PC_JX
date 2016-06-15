define(function (require, exports, module) {
	$public = require("public"),
	require("dropdownlist"),
	require("datepicker"),//时间插件
	require("validform"),
	require("core"),
	require("widget"),
	$review = require("review"),
	$editer = require("editer"),
	
	
	$test = function () {
		this.init.apply(this, arguments);
	};
	$test.prototype = {
		init:function(){
			var $self = this;
			//渲染下拉框控件
			$('#edu').selectlist({
				zIndex: 10,
				width: 200,
				height: 32,
				onChange:function(){}
			});
			$review.distanceFun();
			$self.delFun();
			
			$(document).on('click','.LinkeToPage',function(){
				$('input[name="page"]').val($(this).attr('pageno'));
				$('form').submit();
			});

			$(document).on('change','#pageSize',function(){
				$('input[name="page"]').val(1);
				$('form').submit();
			});
		},
		delFun : function(){
			var delList = $(".draft table tr td").find(".del");
			var _sel;
			delList.on("click",function(){
				_sel = $(this);
				$review.distanceFun();
				$('body').append('<div class="dialog" style= "display:block"><div class="bgmeng" style="height:'+$(document).height()+'px"></div></div>');
				$(".draftPop").fadeIn();
			});
			$(".del-list").on("click",function(){
				$(".dialog").css("display","none");
				$(".draftPop").fadeOut();
				_sel.closest("tr").remove();
				$review.distanceFun();
			});
			$(".cancel").on("click",function(){
				$review.distanceFun();
				$(".dialog").css("display","none");
				$(".draftPop").fadeOut();
			})
		}
	}
	module.exports = new $test();
});