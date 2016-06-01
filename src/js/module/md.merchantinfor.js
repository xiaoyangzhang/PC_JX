define(function (require, exports, module) {
	require("core"),
	require("widget"),
	require("datepicker"),//引用时间组件
	require("uploadfiles"),//上传文件组件
	require("validform"),//上传文件组件
	require("dropdownlist"),//下拉框组件
	require("upload"),
	$public=require("public"),
	$test = function () {
		this.init.apply(this, arguments);
	};
	var isLock=true;
	$test.prototype = {
		init:function(){
			var _self=this;
			$("#forminfo").Validform();
			$public.actiondata('province','city');
			//渲染时间控件
			$( "#tm" ).datepicker();
			$('#bank').selectlist({width: 200});
			$('#card').selectlist({
				width: 200,
				onChange:function(){
					if(!isLock){
						$('#cardtxt').removeClass('Validform_error').val('')
						.next().empty().removeClass('Validform_wrong Validform_right');
					}
					_self.changevalid(true);
				}
			});
			//渲染下拉框控件
			$('select').selectlist({
				zIndex: 10,
				width: 200,
				height: 32,
				onChange:function(){}
			});

			var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
						"tax" : /\d{15}$/
					},
					ajaxPost:true
				},rule=[{
					ele:".taxL",
					datatype:"tax",
					nullmsg:"请填写信息",
					errormsg:"税务登记号最多15个字符！"
					
				}],validfm=$(".registerform").Validform(validoptions).addRule(rule);


   /* $(".k1").click(function(){     
        if($(this).is(':checked')){
            $(".aaa").show();
        }else{
            $(".aaa").hide();
        }
    });*/
    	
    	/*$(".listli input:radio[name='type']").click(function(){
    		var index = $(".listli input:radio[name='type']").index($(this));
    			if(index == 0) //选中第2个时，div显示
       				 $(".company").show();
   				 else //当被选中的不是第2个时，div隐藏
        			 $(".company").hide();
        });*/
		},
		changevalid : function(isTrue){
			var cardvalue=$('#card :hidden').val();
			if(isTrue)isLock=false;
			if(cardvalue==0)
				$('#cardtxt').attr('datatype','card');
			else if(cardvalue==1)
				$('#cardtxt').attr('datatype','dlic');
			else if(cardvalue==2)
				$('#cardtxt').attr('datatype','psport');
			else if(cardvalue==3)
				$('#cardtxt').attr('datatype','gidcard');
		}
	}

	module.exports = new $test();
});