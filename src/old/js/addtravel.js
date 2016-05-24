$(function () {
			    // 提交表单
			   // var imgroot = $(this).attr("img-root"),oimg=$(this).find('img');
			    //console.log(imgroot+'----------------------------------------------');
   
	function wordCount (cla) {
		$(cla).keyup(function () {
			var num=$.trim($(this).val()).length;
			var count=$(this).attr("maxlength");
			$(this).siblings(".word-num").text(num+"/"+count+"字");
		})
	};
	wordCount(".textarea-count");
	wordCount(".textarea-number");
	
	function textCheck(cla){
		$(cla).blur(function () {
			if ($.trim($(this).val())=="") {
				$(this).siblings(".word-tip").remove();
				$(this).closest("td").append("<span class='word-tip'>该项不能为空</span>");
			}else{
				$(this).siblings(".word-tip").remove();
			}
		})
		$("button[type='submit']").click(function (e) {
			var flag=false;
			$(cla).each(function () {
				$(this).siblings(".word-tip").remove();
				if ($.trim($(this).val())=="") {
					$(this).closest("td").append("<span class='word-tip'>该项不能为空</span>");
					flag=true;
				}
			});
			if (flag) {
				if (e&&e.preventDefault) {
					e.preventDefault();
				} else{
					window.event.returnValue=false;
				}				
			};
		})
	};	
	textCheck(".textarea-count");
	
//	function detailJson () {
//		$("button[type='submit']").click(function  () {
//			//type:1是文本 type：2是图片
//			var imgTextObj = {};
//			imgTextObj.imgText= [];
//			for (var i=0;i<$("#editer .bd p").length;i++) {
//				var o={};
//				if ($("#editer .bd p").eq(i).hasClass("text")) {
//					o.type = 1;
//					o.value = $("#editer .bd p").eq(i).text();
//				} else{
//					o.type = 2;
//					o.value = "路径";
//				}
//				imgTextObj.imgText[i]=o;
//			}
//			console.log(imgTextObj);	
//	
//		})
//	}
//	detailJson();
})
