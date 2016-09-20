define(function (require, exports, module){
	require("json");
	require("ajaxform");
	$public=require("public");
	//$ddd = ("eredar");
	var editer = function () {
		this.init.apply(this, arguments);
	};
	editer.prototype = {
		init : function (id,options) {
			var $self = this;
			$self.id = id || "#editer";
			$self.config = $.extend($self.config,options);
			$self.bindDomEvent();
			$self.setContentData();
		},
		config : {
			addTextBtn : ".addtext",
			addPicBtn : ".addpic",
			moveUpBtn : ".moveup",
			moveDownBtn : ".movedown",
			hdClass:'.hd',
			saveTextBtn : ".savetxt",
			saveImgBtn : ".saveimg",
			closeTextBtn : ".closetxt",
			closeImgBtn : ".closeimg",
			delTextBtn : ".deltext",
			textClass  : ".text",
			picClass : ".pic",
			picTemp : ".tbd",
			inputClass : ".txtinput",
			uploadClass : ".uploadimg",
			uploadId : "uploadimg",
			addImageBtn : ".imgwrap",
			contentText : "#contentText",
			submitBtn : ".submitbtn",
			maxNum : 500,
			picHeight:750,
		},
		tuwencheck : function(){
			var count = 0;
			if(!$("#contentText").val()){
				
				$("#editer").css('border','1px solid red');
				return false;
			}
			$(".bd p.text").each(function(i,ele) {
				if($(this).find("font").text().length > 0) {
					count += 1;
				}
				
			});
			if(count > 0) {
				$("#editer").css('border','1px solid #ddd');
				return true;
			}
			$("#editer").css('border','1px solid #ddd');
			return true;
			
		},
		distanceFun : function(){
			$(".eredar-left").height($(".eredar-right").height());
		},
		bindDomEvent : function(){
			var _self = this;
			$(_self.id).on("click",_self.config.addTextBtn,function(){
				_self.addTextEvent(_self,$(this));
				_self.distanceFun();
				return false;
			});
			$(_self.id).on("click",_self.config.addPicBtn,function(){
				if ($(".bd p.pic").length >= 10) {
					$public.dialog.msg('最多上传10张图片！','error');
				}else{
					_self.addImageEvent(_self,$(this));
					_self.distanceFun();
					return false;					
				}
			});
			$(_self.id).on("click",_self.config.moveUpBtn,function(){
				_self.moveUpEvent(_self,$(this));
				return false;
			});
			$(_self.id).on("click",_self.config.delTextBtn,function(){
				_self.delTextEvent(_self,$(this));
				_self.tuwencheck();
				return false;
			});			
			$(_self.id).on("click",_self.config.moveDownBtn,function(){
				_self.moveDownEvent(_self,$(this));
				return false;
			});
			$(_self.id).on("click",_self.config.saveTextBtn,function(){
				_self.tuwencheck();
				_self.saveTextEvent(_self,$(this));
				_self.distanceFun();
				return false;
			});
			$(_self.id).on("dblclick",_self.config.textClass,function(){
				_self.dbClickTextEvent(_self,$(this));
				return false;
			});
			$(_self.id).on("click",_self.config.textClass,function(){
				_self.setTextSelect(_self,$(this));
				return false;
			});
			$(_self.id).on("mouseenter",_self.config.textClass,function(){
				_self.addOperationMenu(_self,$(this));
				return false;
			});
			$(_self.id).on("mouseleave",_self.config.textClass,function(){
				_self.delOperationMenu(_self,$(this));
				return false;
			});
			$(_self.id).on("mouseenter",_self.config.picClass,function(){
				_self.addOperationMenu(_self,$(this));
				return false;
			});
			$(_self.id).on("mouseleave",_self.config.picClass,function(){
				_self.delOperationMenu(_self,$(this));
				return false;
			});			
			$(_self.id).on("click",_self.config.closeTextBtn,function(){
				_self.closeCurrTextEvent(_self,$(this));
				_self.distanceFun();
				return false;
			});
			$(_self.id).on("click",_self.config.closeImgBtn,function(){
				_self.closeCurrImgEvent(_self,$(this));
				_self.distanceFun();
				return false;
			});			
			$(_self.id).on("input propertychange","textarea",function(){
				_self.limitTextInputEvent(_self,$(this));
				return false;
			});
			$(_self.id).on("change",_self.config.uploadClass,function(){
				_self.uploadImgEvent(_self,$(this));
				return false;
			});
			$(_self.id).on("click",_self.config.saveImgBtn,function(){
				_self.tuwencheck();
				_self.saveImgEvent(_self,$(this));
				_self.distanceFun();
				return false;
			});	
			$(_self.id).on("click",_self.config.picClass,function(){
				_self.setTextSelect(_self,$(this));
				return false;
			});	
			$(_self.id).on("click",_self.config.submitBtn,function(){
				// alert($(_self.config.contentText).val());
				// return false;
			});				
		},
		addTextEvent : function(_self){
			if(_self.isEditState()) return false;
			var html = _self.getTextAreaHtml();
			$(_self.id).find(".bd").append(html);
			$(_self.id).find(".bd").find("textarea").focus();
			_self.scrollBottom(".txtinput");
			_self.defaultText = '';
		},
		addImageEvent : function(_self,_this){
			if(_self.isUploadState()) return false;
			var html = _self.getImgUploadHtml();
			$(_self.id).find(".bd").append(html);
			_self.scrollBottom(".imgwrap");
		},
		uploadImgEvent : function(_self,_this){
			var isPicture=$public.isPicture(_this[0],3);
			if(!isPicture.status&&isPicture.content){
				$public.dialog.msg(isPicture.content,'error');
				return false;
            }
			if($('#uploadform').length==0) 
				$('#editer').wrap("<form id='uploadform' action='"+(fileCompressURL?fileCompressURL+"file/upload_compress_string":"http://filegw.test.jiuxiulvxing.com/filegw/file/upload_compress_string")+"' method='post' enctype='multipart/form-data'></form>");
			  $('#uploadform').ajaxSubmit({
	                success: function (jsondata) {
						jsondata = eval("("+jsondata+")");
						var _this = $(_self.config.uploadClass);
						var _parent = _this.closest("span");
						if(!jsondata.status==200){
							$public.dialog.msg('上传失败，请稍后重试','error');
						}else{
							_parent.prev().find("img").attr('src',img_domain+jsondata.data);
						}
						_self.scrollBottom(".imgwrap");
	                },
	                error:function(err){
						$public.dialog.msg('请求发生错误！','error');
	                }
              }).off();

   	// 		$.post('http://192.168.200.107:8080/file/upload_string',{filename:'dfs'},function(data){
				// alert(data);
   	// 		});

			// $.ajaxFileUpload({
			// 	url: 'http://192.168.200.107:8080/file/upload_string',
			// 	dataType : "json",
			// 	secureuri: false,
			// 	fileElementId: _self.config.uploadId,
			// 	type: "POST",
			// 	success: function (data){alert(data);
			// 		var json = JSON.parse(data);
			// 		var _this = $(_self.config.uploadClass);
			// 		var _parent = _this.closest("span");
			// 		if(!json.success){
			// 			_this.next("em.errormsg").html(json.msg);
			// 		}else{
			// 			_parent.prev().find("img").replaceWith('<img src="'+json.value+'"/>');
			// 		}
			// 		_self.scrollBottom(".imgwrap");
			// 	}
			// });	
		},
		addOperationMenu : function(_self,_this){
			if(_this.find("ul.menu").length>0) return false;
			var _html = [];
			_html.push('<ul class="menu clearfix">');
			_html.push('<li class="moveup"><em class="icon-up"></em>上移</li>');
			_html.push('<li class="movedown"><em class="icon-down"></em>下移</li>');
			_html.push('<li class="deltext"><em class="icon-del"></em>删除</li>');
			_html.push('</ul>');
			_this.append(_html.join("\n"));
		},
		delOperationMenu : function(_self,_this){
			_this.find("ul.menu").remove();
		},		
		isEditState : function(){
			var _self = this;
			return $(_self.id).find(_self.config.inputClass).length > 0 ? true:false;
		},
		isUploadState : function(){
			var _self = this;
			return $(_self.id).find(_self.config.uploadClass).length > 0 ? true:false;
		},		
		getTextAreaHtml : function(value){
			var _self = this;
			var _html = [];
			var _value = value || "";
			var _currnum = !_value?0:_value.length;
			if(_currnum > _self.config.maxNum){
				_value = _value.substr(0,_self.config.maxNum);
				_currnum = _self.config.maxNum;
			}
			_html.push('<p class="'+_self.config.inputClass.replace(".","")+'">');
			_html.push('<span class="tbd"><textarea>'+_value+'</textarea></span>');
			_html.push('<span class="tft clearfix"><em>'+_currnum+' / '+_self.config.maxNum+'</em><a href="javascript:void(0)" class="closetxt">取消</a><a href="javascript:void(0)" class="savetxt">保存</a></span>');
			_html.push('</p>');
			return _html.join("\n");
		},
		getImgUploadHtml : function(){
			var _html = [];
			_html.push('<p class="imgwrap">');
			_html.push('<span class="tbd"><img src="'+(static_source?static_source+'img/no-img.jpg':'http://s0.test.jiuxiulvxing.com/busines/img/no-img.jpg')+'" width="72" height="72" class="nopic"/></span>');
			_html.push('<span class="tft clearfix">');
			_html.push('<label class="selectimg">请选择图片：<input type="file" id="uploadimg" name="uploadimg" class="uploadimg"/><em clsss="errormsg"></em></label>');
			_html.push('<label class="groupbtn clearfix">');
			_html.push('<a class="closeimg" href="javascript:void(0)">取消</a>');
			_html.push('<a class="saveimg" href="javascript:void(0)">添加</a>');
			_html.push('</label>');
			_html.push('</span>');
			_html.push('</p>');
			return _html.join("\n");
		},
		delTextEvent : function(_self,_this){
			var _parent = _this.closest("p");
			_parent.remove();
			_self.setContentData();
		},		
		saveImgEvent : function(_self,_this){
			var _parent = _this.closest("p");
			var _value = _parent.find(_self.config.picTemp).html();
			_parent.replaceWith('<p class="pic">'+_value+'</p>');
			_self.setContentData();
		},		
		saveTextEvent : function(_self,_this){
			var _parent = _this.closest("p");
			var _value = _parent.find("textarea").val();
			_parent.replaceWith('<p class="text"><font style="line-height:12px;">'+$public.html_encode(_value.Trim())+'</font></p>');
			_self.setContentData();
		},
		moveUpEvent : function(_self,_this){
			var _moveDom = _this.closest("p");
			var _index = _moveDom.index();
			if(_moveDom.length == 0 ||_index == 0) return false;
			var _prevDom = _moveDom.prev();
			_moveDom.insertBefore(_prevDom);
			_self.setContentData();
		},
		moveDownEvent : function(_self,_this){
			var _moveDom = _this.closest("p");
			var _size = $(_self.id).find("p").length;
			var _index = _moveDom.index();
			if(_moveDom.length == 0 ||_index == _size) return false;
			var _nextDom = _moveDom.next();
			_moveDom.insertAfter(_nextDom);
			_self.setContentData();
		},		
		dbClickTextEvent : function(_self,_this){
			var _value = _this.find("font").text();
			var _html = _self.getTextAreaHtml($.trim(_value));
			_self.closeSiblingsTextEvent(_self,_this);
			_this.replaceWith(_html);
			_self.defaultText = _value;
		},
		setTextSelect : function(_self,_this){
			_this.addClass("on").siblings().removeClass("on");
		},
		closeCurrTextEvent : function(_self,_this){
			var _parent = _this.closest("p");
			var _html = _self.defaultText?'<p class="text"><font>'+_self.defaultText+'</font></p>':"";
			_parent.replaceWith(_html);
		},
		closeCurrImgEvent : function(_self,_this){
			var _parent = _this.closest("p");
			_parent.remove();
		},	
		closeSiblingsTextEvent : function(_self,_this){
			var _siblings = _this.siblings(_self.config.inputClass);
			var _html = _self.defaultText?'<p class="text"><font>'+_self.defaultText+'</font></p>':"";
			_siblings.replaceWith(_html);			
		},
		limitTextInputEvent:function(_self,_this){
			var _parent = _this.closest(_self.config.inputClass);
			var _value = _this.val();
			var _currnum = _value.length;
			if(_currnum > _self.config.maxNum){
				_currnum = _self.config.maxNum;
				_this.val(_value.substr(0,_self.config.maxNum));
			}
			_parent.find("span em").text(_currnum+" / "+_self.config.maxNum);
		},
		scrollBottom:function(box){
			var _domHeight = $(document).height();
			var _boxHeight = $(box).height();
			$(document).scrollTop(_domHeight-_boxHeight);
		},
		setContentData : function(){
			var _self = this;
			var arr = [];
			var _textClassName = _self.config.textClass.substr(1);
			var _picClassName = _self.config.picClass.substr(1);
			$(_self.config.textClass+","+_self.config.picClass).each(function(){
				var obj = {};
				if($(this).hasClass(_textClassName)){
					obj.type = 1;
					obj.value = $public.html_decode($(this).find("font").html());
				}
				if($(this).hasClass(_picClassName)){
					obj.type = 2;
					var index=$(this).find("img").attr("src").lastIndexOf("/");
					//var str = $(this).find("img").attr("src").split("\/");
					obj.value = $(this).find("img").attr("src").substring(index);
				}				
				arr.push(obj);
			});
			if (arr.length == 0) {
				$(_self.config.contentText).val('');
			}else{
				var _jsonStr = JSON.stringify(arr);
				$(_self.config.contentText).val(_jsonStr);
			};
		}
	}
	module.exports = new editer("#editer");
});