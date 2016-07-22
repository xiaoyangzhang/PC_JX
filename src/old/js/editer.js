
	var imgurl='http://s0.test.jiuxiulvxing.com';
	var editer = function () {
		this.init.apply(this, arguments);
	};
	editer.prototype = {
		init : function (id,options) {
			var $self = this;
			$self.id = id || "#editers";
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
			uploadAction : $('#uploadAction').val()?$('#uploadAction').val():"http://filegw.test.jiuxiulvxing.com/filegw/",
			contentText : "#contentText",
			submitBtn : ".submitbtn",
			inputTxt : ".tbd textarea",
			maxNum : 500,
			picHeight:750,
			maxObjNum:20
		},
		bindDomEvent : function(){
			var _self = this;
			_self.defaultText = '';
			$(_self.id).on("click",_self.config.addTextBtn,function(){
				_self.addTextEvent(_self,$(this));
				return false;
			});
			$(_self.id).on("click",_self.config.addPicBtn,function(){
				_self.addImageEvent(_self,$(this));
				return false;
			});
			$(_self.id).on("click",_self.config.moveUpBtn,function(){
				_self.moveUpEvent(_self,$(this));
				return false;
			});
			$(_self.id).on("click",_self.config.delTextBtn,function(){
//				var isSure = function(){
//					layer.confirm('确定删除选中段落吗？', {
//						btn: ['确定','取消'] 
//					}, function(){
//						return true;
//					}, function(){
//						return false;
//					});					
//				};
//				if (isSure()) {
//					_self.delTextEvent(_self,$(this));
//				};
				if(confirm("确定要删除选中段落吗")){
					_self.delTextEvent(_self,$(this));
				};
				return false;
			});			
			$(_self.id).on("click",_self.config.moveDownBtn,function(){
				_self.moveDownEvent(_self,$(this));
				return false;
			});			
			$(_self.id).on("click",_self.config.inputTxt,function(){
				$(_self.config.inputTxt).css('border','none');
				return false;
			});
			$(_self.id).on("click",_self.config.saveTextBtn,function(){
				if($('.tbd textarea').val()==''){
					$(_self.config.inputTxt).css('border','1px solid red');
					alert('请输入要添加的文本！');
					return false;
				}
				_self.saveTextEvent(_self,$(this));
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
				$('.tbd textarea').css('border','1px solid #ddd');
				return false;
			});
			$(_self.id).on("click",_self.config.closeImgBtn,function(){
				_self.closeCurrImgEvent(_self,$(this));
				$('.tbd textarea').css('border','1px solid #ddd');
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
				if($('.tbd .nopic').attr('id')!=1){
					$(_self.config.picTemp).css('border','1px solid red');
					alert('请先选择图片再添加！');
					return false;
				}
				_self.saveImgEvent(_self,$(this));
				return false;
			});	
			$(_self.id).on("click",_self.config.picClass,function(){
				_self.setTextSelect(_self,$(this));
				return false;
			});	
			$(_self.id).on("click",_self.config.submitBtn,function(){
				alert($(_self.config.contentText).val());
				return false;
			});				
		},
		addTextEvent : function(_self){
			if(_self.isEditState()) return false;
			if ($(_self.id).find(".bd").find("p").length >= _self.config.maxObjNum) {
				alert("文本和图片已超出限制！");
				return false;
			} else{				
				var html = _self.getTextAreaHtml();
				$(_self.id).find(".bd").append(html);
				$(_self.id).find(".bd").find("textarea").focus();
				_self.scrollBottom(".txtinput");
				_self.defaultText = '';
			}
		},

		addImageEvent : function(_self,_this){
			if(_self.isUploadState()) return false;
			if ($(_self.id).find(".bd").find("p").length >= _self.config.maxObjNum) {
				alert("图片和文本已超出限制！");
				return false;
			} else{
				var html = _self.getImgUploadHtml();
				$(_self.id).find(".bd").append(html);
				_self.scrollBottom(".imgwrap");				
			}			
		},
		uploadImgEvent : function(_self,_this){
			//document.domain = 'jiuxiulvxing.com';
			var picheck=_self.isPicture(_this[0],3),imgshowbox=$(_self.config.uploadClass).closest("span").prev().find("img");
				if(!picheck.status){
					alert(picheck.content);
					return false;
				}
			$('#editers').wrap("<form id='uploadform' action='"+_self.config.uploadAction+"file/upload_compress' method='post' enctype='multipart/form-data'></form>");
			imgshowbox.attr('src',imgurl+'/other-plugins/editer/img/loading.gif');
			$('#uploadform').ajaxSubmit({
				dataType:'json',
				success: function (data) {
					var _parent = _this.closest("span");
					//data=JSON.parse(data);
					if(data.status==200){ 	
						imgshowbox.attr({'src':$('#editers').find("#imgUrl").val()+data.data,'id':1});
						_parent.prev().find(".imgDateVal").attr("value",data.data)
	                }else{
						alert('上传失败，请稍后重试！');
	                };
					$('#editers').unwrap();
					$('.uploadimg').remove();
					$('.uploadbtn').append('<input type="file" id="uploadimg" class="uploadimg" name="uploadimg">');
					$(_self.config.picTemp).css('border','none');
					_self.scrollBottom(".imgwrap");
				},
				error:function(err){
					$('#editers').unwrap();
					$('.uploadimg').remove();
					$('.uploadbtn').append('<input type="file" id="uploadimg" class="uploadimg" name="uploadimg">');
					imgshowbox.attr('src',imgurl+'/other-plugins/editer/img/no-img-big.jpg');
					alert('请求发生错误！');
				}
			});	
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
			_html.push('<span class="tbd"><img src="'+imgurl+'/other-plugins/editer/img/no-img-big.jpg" class="nopic"/><input type="hidden" class="imgDateVal" /></span>');
			_html.push('<span class="tft clearfix">');
			_html.push('<label class="selectimg"><label>请选择图片：</label><a class="uploadbtn">选择图片<input type="file" id="uploadimg" class="uploadimg" name="uploadimg"/></a><em clsss="errormsg"></em></label>');
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
		html_encode : function(str){   
		  var s = "";   
		  if (str.length == 0) return "";   
		  s = str.replace(/&/g, "&amp;");   
		  s = s.replace(/</g, "&lt;");   
		  s = s.replace(/>/g, "&gt;");   
		  s = s.replace(/ /g, "&nbsp;");   
		  s = s.replace(/\'/g, "&#39;");   
		  s = s.replace(/\"/g, "&quot;");   
		  s = s.replace(/\n/g, "<br>");   
		  return s;   
		},
		html_decode : function(str){
		  var s = "";   
		  if (str.length == 0) return "";   
		  s = str.replace(/&amp;/g, "&");   
		  s = s.replace(/&lt;/g, "<");   
		  s = s.replace(/&gt;/g, ">");   
		  s = s.replace(/&nbsp;/g, " ");   
		  s = s.replace(/&#39;/g, "\'");   
		  s = s.replace(/&quot;/g, "\"");   
		  s = s.replace(/<br>/g, "\n");   
		  return s;  
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
			_value = _self.html_encode(_value);
//			_value=_value.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});		
//			_value = _value.replace(/\n/gi,"<br>").replace(/ /gi,"&nbsp;");
			_parent.replaceWith('<p class="text"><font>'+_value+'</font></p>');
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
			var _value = _this.find("font").html();
				_value = _value.replace(/<br>/gi,"\n");
			var _html = _self.getTextAreaHtml($.trim(_value));
			_self.closeSiblingsTextEvent(_self,_this);
			_self.defaultText = _value;
			_this.replaceWith(_html);
		},
		setTextSelect : function(_self,_this){
			_this.addClass("on").siblings().removeClass("on");
		},
		closeCurrTextEvent : function(_self,_this){			
			var _parent = _this.closest("p");
			//_self.defaultText = _self.html_encode(_self.defaultText);
			var _html = _self.defaultText?'<p class="text"><font>'+_self.defaultText+'</font></p>':"";
			_parent.replaceWith(_html);
		},
		closeCurrImgEvent : function(_self,_this){
			var _parent = _this.closest("p");
			_parent.remove();
		},	
		closeSiblingsTextEvent : function(_self,_this){
			var _siblings = _this.siblings(_self.config.inputClass);
			//_self.defaultText = _self.html_encode(_self.defaultText);
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
					obj.type = "text";
					obj.value = _self.html_decode($(this).find("font").html());
				}
				if($(this).hasClass(_picClassName)){
					obj.type = "img";
					obj.value = $(this).find(".imgDateVal").val();
				}				
				arr.push(obj);
			});
			var _jsonStr = JSON.stringify(arr);
			$(_self.config.contentText).val(_jsonStr);
		},
		isPicture:function(file,s){
		    var result={content:'文件类型不合法,只能是jpg、png、jpeg类型！'},fileName=file.value,
		        szcontent={status:true,content:'文件大小不能超过'+s+'M'},
		        maxsize = s*1024*1024,filesize = 0,
				ua=navigator.userAgent.toLowerCase(),
				rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
				isIE=rMsie.exec(ua)!=null;
		        if(!isIE) {
		        	filesize=file.files[0].size;
				    if(filesize>maxsize){
				        szcontent.status = false;
				        return szcontent;
				    }
		        }
			    if(fileName!=null && fileName !=""){
			      //lastIndexOf如果没有搜索到则返回为-1
			      if (fileName.lastIndexOf(".")!=-1) {
			            var fileType = (fileName.substring(fileName.lastIndexOf(".")+1,fileName.length)).toLowerCase();
			            var suppotFile = new Array();
			            suppotFile[0] = "jpg";
			            suppotFile[2] = "png";
			            suppotFile[3] = "jpeg";
			            for (var i =0;i<suppotFile.length;i++) {
			                if (suppotFile[i]==fileType) {
			                    result.status = true;
			                    return result;
			                } else{
			                    continue;
			                }
			            }
			            result.status = false;
			        } else{
			            result.status = false;
			        }
			    }else{
		            result.status = true;
		        }
	            return result;
		},
		checkediter : function(){
			if($('.bd p.text,.bd p.pic').length==0){
				$('#editers').css('border','1px solid red');
				return false;
			}
			else{
				$('#editers').css('border','1px solid #ddd');
				return true;
			}
		}
	}
	var editer_obj=new editer("#editers");
	//alert(editer_obj.checkediter());