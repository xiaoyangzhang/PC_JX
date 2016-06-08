//$(function () {
    //验证
    var validatePro = function() {
//      if($.trim($('.item-title,.item-name').val()).length < 1) {
//          return '请输入商品名称';
//      }else if($.trim($('.item-title,.item-name').val()).length > 38){
//          return '商品名称不能超过38个字';
//      }
//      if($.trim($('.item-code').val()).length > 20){
//          return '商品代码不能超过20个字';
//      }
        
        var msg;
        
        //国内当地玩乐经纬度       
        if ($('#longitude,#latitude').length>0) {
	        var lngRe=/^[-]?(\d|([1-9]\d)|(1[0-7]\d)|(180))(\.\d*)?$/;
			var latRe=/^[-]?(\d|([1-8]\d)|(90))(\.\d*)?$/;
			if ($.trim($('#longitude').val()).length < 1) {
				return '请输入经度'
			}else if (!lngRe.test($('#longitude').val())) {
				return '请检查经度格式'
			}
			if ($.trim($('#latitude').val()).length <1) {
				return '请输入纬度'
			}else if (!lngRe.test($('#latitude').val())) {
				return '请检查纬度格式'
			}       	
        }
        //国内当地玩乐sku
//      if(!skuTableShowFlag){
//          if(!$('.priceY').val() || !/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test($('.priceY').val())){
//              return '请输入正确的价格';
//          }
//          if(!$('.stockNum').val() || !/^[1-9]\d*|0$/.test($('.stockNum').val())){
//              return '请输入正确的库存';
//          }
//      }else{
//          $('.price').each(function(){
//              if(!$(this).val() || !/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test($(this).val())){
//                  msg = '请检查sku价格格式';
//              }
//          });
//          $('.stock').each(function(){
//              if(!$(this).val() || !/^[1-9]\d*|0$/.test($(this).val())){
//                  msg = '请检查sku库存格式';
//              }
//          });
//      }
//      if(msg){return msg;}

		//--------------线路 自由行跟团游 验证-------------------
			//--------------行程天数------
		if ($('.days.int-only').length>0) {
			if ($.trim($('.days.int-only').val()).length < 1) {
				return '请填写行程天数';
			}else if ($('.days.int-only').val()<1 || $('.days.int-only').val()>100) {
				return '行程天数为1-100的整数';
			}
			
		}
			//--------------价格信息----------
		$('.priceInfo').find('.tc-stock').each(function () {
			if ($.trim($(this).val()).length<1) {
				msg = '请填写库存';
				$(this).focus();
				return false;
			};
			if (!/^([1-9]\d{0,5}|\d{0,6})$/.test($(this).val())) {
				msg = '库存为数字，最大六位整数';
				$(this).focus();
				return false;
			}
		});
		$('.priceInfo').find('.tc-price').each(function () {
			if ($.trim($(this).val()).length<1) {
				msg = '请填写价格';
				$(this).focus();
				return false;
			};
			if (!/^\d{1,6}(\.\d{1,2})?$|^[1-9]\d{0,5}$/.test($(this).val())) {
				msg = '价格为数字，最大六位整数，可带两位小数';
				$(this).focus();
				return false;
			}
		});
		if(msg){return msg;};
			//提前天数----------------
		if ($('.day-limit').length>0) {
			if ($.trim($('.day-limit').val()).length < 1) {
				return '请填写提前报名天数';
			}else if ($('.day-limit').val()<1 || $('.day-limit').val()>10000) {
				return '行程天数为1-10000的整数';
			}
		}
		
		
		//图片验证
//      var hasPicFlag = false;
//      $('.picCode').each(function(){
//          if($(this).val()){
//              hasPicFlag = true;
//          }
//      });
//      if(!hasPicFlag){
//          return '请选择商品主图';
//      }

        //(特产商品)必填属性
//      $('.keyProperty').each(function(){
//          if(($(this).find('.propertySelect').length == 0 || $.trim($(this).find('.propertySelect').val()) == '0') && !$.trim($(this).find('.propertyInput').val())){
//              msg = '请填写必填属性' + $(this).attr('pTxt');
//              return false;
//          }else if($.trim($(this).find('.propertyInput').val()).length > 30){
//              msg = $(this).attr('pTxt') + '长度不能超过30个字';
//              return false;
//          }
//      });
//      if(msg){return msg;}
//      
//      //(特产商品)非必填属性
//      $('.nonKeyProperty').each(function(){
//          if($(this).find('.propertyInput').val() && $.trim($(this).find('.propertyInput').val()).length > 30){
//              msg = $(this).attr('pTxt') + '长度不能超过30个字';
//              return false;
//          }
//      });
        //图文介绍验证
//		var pt = getPictureText() || {};
//		var pts = pt.pictureTextItems || [];
//		if(pts.length == 0) {
//			msg = '图文介绍至少需输入一段文字，或一张图片';
//		}
//      if(msg){return msg;}

    };	
    
    //保存按钮触发验证
//  $('button.save').click(function () {
//  	var errmsg = validatePro();
//  	if (errmsg) {
//  		layer.msg(errmsg,{icon:2,time:1500});
//  		return false;   		
//  	}
//  });	
	
	//文本框字数计数
	var wordCount = function  () {
		$('.textarea-count').each(function () {
			var num=$.trim($(this).val()).length;
			var count=parseInt($(this).siblings('.word-num').find('.num-b').text());
			$(this).siblings(".word-num").find('.num-a').text(num);			
		});
	};
	
	$(function () {
		//初始调用
		wordCount();
		$(document).on('keyup paste blur','.textarea-count',function (evt) {
			var evt = evt || window.event || arguments.callee.caller.arguments[0],
			count=parseInt($(this).siblings('.word-num').find('.num-b').text()),
			cur_value=$.trim($(this).val());
			if ($.trim($(this).val()).length>count&&evt.keyCode!=8) {
				$(this).val(cur_value.substring(0,count));
				wordCount();
				return false;
			}
			wordCount();
		});
	})
	

//})
