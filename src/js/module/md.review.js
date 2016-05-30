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
			/* 根据页面高度判断 */
			if($(".eredar-right").height() > $(".eredar-left").height()){
				$public.depath();
			}
			else{
				$editer.distanceFun();
			};
		 	
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
<<<<<<< HEAD
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
=======
//			$(".searchBtn").on("click",function(){});
>>>>>>> 57432ee92d452250669dc3ce87bc889da32beffd
			/* 清除 */
//			$(".delBtn").on("click",function(){
//				$(".reviewform").resetForm();
//			});
			
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
					$(".showImg img").attr("src",$(this).find('img').get(0).src);
					$(this).find("b").css("opacity","1");
					$(".showImg").show();
					listli.filter(function(){this.is_select=false;});
					this.is_select=true;
				}else{
					$(this).css("borderColor","#f2f2f2");
					$(this).find("b").css("opacity","0");
					$(".showImg").hide();
					this.is_select=false;
				}
			});
		}
	}
	module.exports = new $test();
});