define(function (require, exports, module) {
	$public = require("public"),
	require("dropdownlist"),
	require("datepicker"),//Ê±¼ä²å¼þ
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
			//äÖÈ¾ÏÂÀ­¿ò¿Ø¼þ
			$('#edu').selectlist({
				zIndex: 10,
				width: 200,
				height: 32,
				onChange:function(){}
			});
			$review.distanceFun();
			/* $self.delFun(); */
			var bigW = $("#eredar .eredar-right").width() - 40;
			var positionW = $(".jiuniu_pagination").width();
			/* console.log(bigW,positionW); */
			$(".jiuniu_pagination").css("margin-left",((bigW-positionW)/2) + 'px');
			
			$(document).on('click','.LinkeToPage',function(){
				$('input[name="page"]').val($(this).attr('pageno'));
				$('form').submit();
			});

			$(document).on('change','#pageSize',function(){
				$('input[name="page"]').val(1);
				$('form').submit();
			});
			
			
			$(".del").click(function(){
					var id = $(this).attr("draft-id");
					operateUrl = $('#root_path').val()+"/draft/delete/"+id;
					layer.confirm('是否确认删除', {icon: 3, title:'提示'}, function(index){
						$.post(operateUrl,function(result) {
							if(result.success) {

								window.location.reload();
							} else {
								layer.msg('²Ù×÷Ê§°Ü', {
									icon : 2,
									time : 1000
								});
							}
						},"json");
						layer.close(index);
					});
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
				$(".dialog").remove();
				$(".draftPop").fadeOut();
				_sel.closest("tr").remove();
				$review.distanceFun();
			});
			$(".cancel").on("click",function(){
				$review.distanceFun();
				$(".dialog").remove();
				$(".draftPop").fadeOut();
			})
		}
	}
	module.exports = new $test();
});