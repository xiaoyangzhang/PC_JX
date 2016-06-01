define(function (require, exports, module) {
	$public = require("public"),
	require("datepicker"),//时间插件
	require("validform"),
	require("core"),
	require("widget"),
	$editer = require("editer"),
	
	
	$test = function () {
		this.init.apply(this, arguments);
	};
	$test.prototype = {
		init:function(){
			var $self = this;
			//渲染时间控件
			$( "#tm,#td" ).datepicker({
		      changeMonth: true,
		      changeYear: true
		    });
			$self.distanceFun();
		 	
			var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
					},
					ajaxPost:true
				},rule=[
				],validfm=$(".reviewform").Validform(validoptions).addRule(rule);
			/* 查询 */
			$(".searchBtn").on("click",function(){
				$.ajax({
					type:'POST',
					url:""+$("#subpath").val(),
					data:{},
					success:function(data){
						$public.isLogin(data);
						
					}
				});
			});
			$(".delBtn").click(function() {
			   $("input[name='orderNO']").val("");
			   $("input[name='nickName']").val("");
			   $("input[name='itemNo']").val("");
			   $("input[name='beginDate']").val("");
			   $("input[name='endDate']").val("");
			});
			/* 图片点击查看大图 */
			$self.showImgFun();
		},
		showImgFun : function(){
			 var listli = $(".upload ul").find("li");
			listli.click(function(){
				listli.css("borderColor","#f2f2f2");
				$(".upload").find("b").css("opacity","0");
				if(!this.is_select){
					$(this).css("borderColor","#ed6c44");
					$(this).closest(".inforight").find(".showImg img").attr("src",$(this).find('img').get(0).src);
					$(this).find("b").css("opacity","1");
					$(this).closest(".inforight").find(".showImg").show();
					listli.filter(function(){this.is_select=false;});
					this.is_select=true;
					$editer.distanceFun();
				}else{
					$(this).css("borderColor","#f2f2f2");
					$(this).find("b").css("opacity","0");
					$(this).closest(".inforight").find(".showImg").hide();
					this.is_select=false;
					$editer.distanceFun();
				}
			});
		},
		distanceFun :function(){
			/* 根据页面高度判断 */
			if($(".eredar-right").height() < $(".eredar-left").height()){
				$(".eredar-right").height($(".eredar-left").height());
			}
			else{
				$editer.distanceFun();
			};
		}
	}
	module.exports = new $test();
});