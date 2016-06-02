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
			_self.changevalid();
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


					/*   	var data={
					   		"success":true,
					   		"errorMsg":null,
					   		"errorCode":0,
					   		"returnCode":null,
					   		"value":[
					   		{'businessScopeId':6,'domainId':0,'id':36,'merchantCategoryId':7,'status':0},
						   	{'businessScopeId':2,'domainId':0,'id':37,'merchantCategoryId':7,'status':0},
						   	{'businessScopeId':4,'domainId':0,'id':38,'merchantCategoryId':7,'status':0}]
					   	}*/
					   		/*if(typeof data=='string')
					   	   		console.log(data);
					   	   	else
					   	   		console.log(JSON.stringify(data));

					   	   alert(typeof data);*/
					   	   /*	alert(d.success);*/

					   	   /*	var ddd=data.value;
					   	   	console.log(typeof ddd);
					   	   	console.log(JSON.stringify(ddd));
					   	   	console.log(ddd[0]);*/

				$(".comtype input[type='radio']").on('click' ,function(){
					$.ajax({
					   type: "post",
					   url: $public.urlpath.getBsScope,
					   data: {merchantCategoryId:$(this).val()},
					   success: function(data){
					   			  var list = JSON.parse(data.value);    
									  $('input[type="checkbox"]').each(function(){ 
									  	for (var i = 0; i < list.length; i++) {
									  		if($(this).val() != list[i].businessScopeId ) {
									  			$(this).prop("disabled","disabled");
									  		}else{
									  			$(this).prop("disabled","       ");
									  		}
									  	};
									  
									  });   
					   	   	}
					   
					});

				});

				$('.subt').on('click',function(){

					var selectvalid=$public.selectvalid(),groupimgvalid=$public.groupimgvalid($('.groupimg'),'请选择图片！'),
					allimgvalid=$public.allimgvalid($('.panel').find('.imgbox:not(".cnat")')),subpath=$('.subpath').val(),
					params=$public.paramcompare($('#forminfo').serializeArray());
					/*console.log(JSON.stringify(params));*/
					if(validfm.check()&&allimgvalid&&selectvalid&&groupimgvalid){
						$public.dialog.waiting();
					var idStr="";
					$("input[type='checkbox']:checked").each(function(){
						idStr+=$(this).val()+",";
					})
					params.scopeIds=idStr.substring(0,idStr.length-1);
					$.post(subpath,params,function(data){
							$public.isLogin(data);
							$public.dialog.closebox();
							if(data.success){
								$public.dialog.msg('保存成功！','success');
								setTimeout(function(){
									window.location=data.value;
								},1500); 
							}else{
								$public.dialog.msg(data.resultMsg,'error');
							}
						});
					}
				return false;
				});

				$(".ccc").change(function(){
					if($(this).is(':checked')){
					/*	alert("niscdns");*/
						$('.company input:radio[name="city"]').eq(0).attr("checked","checked");
					  }else{
					  	$('.company input:radio[name="city"]').attr("checked",false);
					  }
				});

				/*$("选择身份按钮").on("click",function(){
                $.ajax({
                    type: "POST",
                    url: "后台数据接口链接地址",
                    data: "wxf=2&yu=3",   //可选参数
                    dataType: "json",
                    success: function (data) {   //如果访问后台数据接口链接地址 返回数据成功
                        var html='';
                        for(i=0;i<data.data.length;i++){  //循环不同的范围html
                            html+='<li><span>'+data.data[i].name+'</span></li>'
                        }
                        $('#txt').html("<ul style='margin-left: 100px;'><li>$.ajax<>" + html + "</ul>");  //最后展示在页面
                    }
                });
            });
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