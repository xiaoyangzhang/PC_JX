define(function (require, exports, module) {
	require("tmpl");
	require("validform");
	require("md5");
	var $public = function () {
		this.init.apply(this, arguments);
	};
	$public.prototype = {
		init : function (){
			var $self = this;
			$self.timmer = {};
			$self.setPlaceholder();
			$self.comSelect();
			$self.lineInteractive();
			$self.scrollBanner({
				bannerId : "#scroll-banner"
			});
			$self.saveFeedBack();
			$self.loadIndexImages();
			$self.setTopFixed(".details-list");
			$self.scrollTourContent();
			$self.screenBackTop();
			$self.hoverText();
			$self.buyActivity();
			$self.setTextAreaNumber();
			$self.immediately();
		},
		isUserLogin : function(options){
			var $self = this;
			var config = {
				cookieName : "token2",
				callback : function(){}
			}
			var opts = $.extend(config,options);
			var cookie = require("cookie");
			var isLogin = $.cookie(opts.cookieName)?true:false;
			if(isLogin) {
				opts.callback();
			}else{
				$self.showLoginWindow(opts.callback);
			}
		},		
		showLoginWindow : function(_callback){
			var $self = this;
			if($self.closeWinFn) $self.closeWinFn();
			var showWinCallback = function(){
				var loginName = $.cookie("loginName");
				if(loginName && loginName!=="" && loginName!=="null") $("#loginname").val(loginName);
				$self.submitLoginEvent(_callback);				
				$("#loginSubmitBtn").on("click",function(){
					$self.avoidCntClick(function(){
						$("#loginForm").submit();
					},100,"winlogin");
					return false;
				});					
			}
			$self.openWindowFn({
				width:640,
				height:400,
				frameId : "login-pop-frame",
				url: $("#loginWindow").val(),
				showCallback: showWinCallback
			});
		},
		submitLoginEvent : function(_callback){
			var $self = this;			
			var setCookie = function(){
				if($.cookie("token2")) return false;
				var date = new Date();
				date.setTime(date.getTime()+(60 * 60 * 1000));			
				$.cookie("token2","true",{expires:date,path: '/'});
			}
			var setUserName = function(){
				var loginName = $("#loginname").val();
				var checkBox = $("#loginForm .saveuser");				
				if(checkBox.prop("checked")){
					var date = new Date();
					date.setTime(date.getTime()+(60 * 60 * 1000));						
					$.cookie("loginName",loginName,{expires:date,path: '/'});
				}else{
					$.cookie("loginName",null,{path:'/'});
				}	
			}
			var sucCallback = function(json){
				if(!json.success){
					$self.comAlert({msg:json.resultMsg,append:"#login-pop-frame",hideCallback:function(){$("#loginSubmitBtn").removeAttr("disabled");}});
					return false;
				}
				$('#imgcode').val('');
				$('.imgcode')[0].src=$('#root_path').val()+'/user/getImgCode?d='+Math.random();
				//setCookie();
				setUserName();
				$ajaxform.resetForm();
				$("#login-pop-frame").remove();
				if(_callback){
					var isok =  _callback();
					setTimeout(function(){
						$("#loginSubmitBtn").removeAttr("disabled");
					},500);	
					return isok;
				}
				if(json.value){
					window.location.href = json.value
				}else{
					window.location.reload();
				}
			}
			
			var $ajaxform = $("#loginForm").Validform({
				tiptype:4,
				ajaxPost : true,
				beforeCheck : function(){
					var username = $("#loginname").val();
					var password = $("#loginpwd").val();						
					if(username == ""){
						$self.comAlert({msg:"请输入用户名",append:"#login-pop-frame"});
						return false;
					}
					
					if(password == ""){
						$self.comAlert({msg:"请输入密码",append:"#login-pop-frame"});
						return false;
					}
					
					if(password.length < 6){
						$self.comAlert({msg:"请输入6-20位密码",append:"#login-pop-frame"});
						return false;
					}
				},
				beforeSubmit : function(form){
					$("#loginpwd").val(md5($("#loginpwd").val()));
				},				
				callback : sucCallback
			});
			return false;			
		},
		comSelect : function(){
			$(document).on("click",".ym-select span",function(){
				$(this).closest(".ym-select").css("z-index",100);
				$(".ym-select ul").hide();
				if($(this).next("ul").children().length>4){
					$(this).next("ul").css({"height":184,"overflow":"auto"});
				}else{
					$(this).next("ul").css({"height":"auto"});
				}
				$(this).next("ul").show();
			});
			$(document).on("click",".ym-select ul li",function(){
				var parent = $(this).closest("ul");
				var select = $(this).closest(".ym-select");
				var value = $(this).attr("data-value");
				var text = $(this).text();
				select.css("z-index",1);
				select.find("em").html(text);
				select.find("input[type='hidden']").val(value!=0?value:"");
				parent.hide();
			});
			$(document).on("click",function(e){
				if($(e.target).closest(".ym-select").length == 0){
					$(".ym-select").css("z-index",1);
					$(".ym-select ul").hide();
				}
			});
		},		
		comAlert : function (options) {
			var opts = $.extend({
				type : false,
				msg : "", //默认提示消息
				showTime : 2000, //停顿时间
				animationTime : 500,
				append : false,
				showCallback : function () {}, //显示后的回调函数
				hideCallback : function () {}
			}, options);
			var typeclass = opts.type ?"ym-alert-sucess":"ym-alert-fail";
			var self = this;
			var appendto = opts.append?opts.append:"body";
			var $html = $('<div class="ym-alert-fail">'+options.msg+ '</div>');
			if(opts.append==""){
				$html.css("position","fixed");
			}else{
				$html.css("position","absolute");
			}
			$("."+typeclass).remove();
			$html.appendTo(appendto);
			var hideEvent = function () {
				$("."+typeclass).fadeOut(opts.animationTime, opts.hideCallback);
			};
			$("."+typeclass).fadeIn(opts.animationTime, opts.showCallback);
			setTimeout(hideEvent, opts.showTime);
		},		
		screenBackTop : function(options){
			var $self = this;
			var _confing = {
				backId : "#back-top",
				direction : "right",
				clickBtn : "a:first",
				offtop : 0,
				offleft : 0,
				boxWidth :1200,
				bottomOffSize : 380
			}
			var opts = $.extend(_confing,options);
			var $backDom = $(opts.backId),
				$backWidth = $backDom.width(),
				$backHeight = $backDom.height(),
				$domWidth = $(document).width(),
				$domHeight = $(document).height(),
				$winHeight = $(window).height()
			var initBackTop = function(){
				var offWidth = document.all?20:0;
				var offRight = ($domWidth - opts.boxWidth-offWidth)/2-$backWidth;
				$backDom.css({right:offRight});
			}
			
			var scrollEvent = function(){
				$self.avoidCntClick(function(){
				var scrollTop = $(this).scrollTop();
					if(scrollTop>$winHeight){
						$backDom.find("a:first").removeClass("hidden");
					}else{
						$backDom.find("a:first").addClass("hidden");
					}
					if(scrollTop>$domHeight-$winHeight-opts.bottomOffSize){
						$backDom.animate({bottom:opts.bottomOffSize},500);
					}else{
						$backDom.animate({bottom:0},500);
					}
				},100);
			}
			initBackTop();
			$(window).on("scroll",scrollEvent);
			$backDom.find("a:first").on("click",function(){
				$("html,body").animate({"scrollTop":0},500);
			});
		},
		scrollBanner : function(options){
			var _confing = {
				bannerId : "#scroll-banner",
				isFullScreen :true,
				width : 1920,
				height :660,
				runtime : 1000,
				steptime : 5000,
				numDots : ".dots",
				numOn : "active"
			}
			var opts = $.extend(_confing,options);
			var $scrollDom = $(opts.bannerId);
			var $scrollUl = $scrollDom.find("ul");
			var $size = $scrollUl.find("li").size();
			var width = opts.isFullScreen?$scrollDom.find("img").width():opts.width;
				width = width > 1920?1920:$scrollDom.find("img").width();
			var height = opts.isFullScreen?$scrollDom.find("img").height():opts.height;			
			var tt,index = 1;
			
			var initScrollBanner = function(){
				$scrollUl.find("li").css({
					"position":"absolute",
					"left":0,
					"top":0,
					"bottom" : 0,
					"right" : 0,
					"z-index" :0,
					"opacity" : 0
				});
				$scrollUl.find("li:first").css({"z-index":1,"opacity":1});
				$(opts.numDots).find("li:first").addClass(opts.numOn);
				scrollStart();
			}
			var runAnimate = function(eq){
				var _index = eq!==undefined?eq:index;
				if(_index>=$size) index = _index = 0;
				var _current = $scrollUl.find("li:eq("+_index+")");
				_current.siblings().stop().animate({"opacity":0,"z-index":0},opts.runtime);
				_current.stop().animate({"opacity":1,"z-index":1},opts.runtime);
				$(opts.numDots).find("li:eq("+_index+")").addClass(opts.numOn).siblings("li").removeClass(opts.numOn);
				index++;
			}		
			
			var scrollStart = function(){
				tt = window.setInterval(function(){
					runAnimate();
				},opts.steptime);
			}
			
			
			$scrollDom.on("mouseover",function(){
				window.clearInterval(tt);
			});
			
			$scrollDom.on("mouseout",function(){
				scrollStart();
			});	
			
			$(opts.numDots).find("li").on("mouseover",function(){
				var eq = $(this).index();
				window.clearInterval(tt);
				runAnimate(eq);
			});
			
			$(opts.numDots).find("li").on("mouseout",function(){
				scrollStart();
			});				

			initScrollBanner();
		},
		setTopFixed : function (dom, options) {
			var $this = $(dom);
			if ($this.length == 0)
				return false;
			var config = {
				top : 0
			}
			var inittop = $this.offset().top;
			var opts = $.extend(config, options);
			var position = $this.css("position");
			$(window).on("scroll", function () {
				var scrolltop = $this.prev().length>0?$this.prev().offset().top:inittop;
				var height = $this.prev().length>0?$this.outerHeight():0;
				if ($(this).scrollTop() <= scrolltop+height) {
					$this.removeAttr("style");
					return false;
				}
				$this.css({
					"position" : "fixed",
					"top" : 0,
					"bottom" : "auto",
					"margin" : 0,
					"width" : $this.width(),
					"z-index" : 99
				});				
			});
		},
		openWindowFn : function(options){
			var self = this;
			var config = {
				title : "",
				width : 780,
				height : 600,
				url : "",
				data : null,
				content : "",
				jsondata : {},
				frameId : "ym-pop-frame",
				closebtn : ".close-pop-btn",
				showCallback : function () {},
				hideCallback : function () {}
			}
			var opts = $.extend(config, options);
			var doc_height = $(document).height(),win_height = $(window).height();

			var showWinEvent = function () {
				
				var style = {
					"width" : opts.width,
					"height" : opts.height,
					"margin-left" : -opts.width / 2,
					"margin-top" : -opts.height / 2,
					"display" : "none",
					"z-index" : 999,
					"position" : opts.height > win_height ? "absolute" : "fixed"
				}
				
				$("#"+opts.fr).remove();
				$("#ym-doc-mask").remove();
				
				$('<div id="ym-doc-mask"></div>').css({
					"height" : doc_height
				}).appendTo("body");
				
				$('<div id="'+opts.frameId+'"></div>').css(style).appendTo("body");
				$("#"+opts.frameId).append('<div class="ym-pop-hd"><span class="title">'+opts.title+'</span><em class="ym-pop-close close-pop-btn"></em></div>');
				$("#"+opts.frameId).append('<div class="ym-pop-bd"></div>');
				
				var ajaxConfig = {
					cache : false,
					type : "get",
					url : opts.url,
					data : opts.data,
					success : function(html){
						$.template('template',html);
						$("#"+opts.frameId+" .ym-pop-bd").html($.tmpl('template',opts.jsondata));
					}
				}
				
				if(opts.url && opts.url!=""){
					$.ajax(ajaxConfig);
				}else{
					$.template('template',opts.content);
					$("#"+opts.frameId+" .ym-pop-bd").html($.tmpl('template',opts.jsondata));
				}

				$("#"+opts.frameId).fadeIn(300,opts.showCallback);
			}

			var closeWinEvent = function () {
				$("#"+opts.frameId).fadeOut(300, function () {
					$("#ym-doc-mask").remove();
					$(this).remove();
					opts.hideCallback();
				});
			}
			showWinEvent();
			this.closeWinFn = closeWinEvent;
			$(document).on("click", opts.closebtn, closeWinEvent);
		},
		saveFeedBack : function(){
			var $self = this;
			var vform = $("#feedbackform").Validform({
				tiptype:4,
				ajaxPost : true,
				callback : function(json){
					if(!json.success){
						$self.comAlert({msg:json.resultMsg});
						return false;
					}
					$self.openWindowFn({
						width:596,
						height:378,						
						title : "温馨提示",
						url : $("#win-feedback").val(),
						hideCallback : function(){
							window.location.reload();
						}
					});
				}
			});
			
			$("#feedbackform-submit").on("click",function(){
				$("#feedbackform").submit();
				return false;
			});			
		},
		lineInteractive : function(){
			$("#ym-tour ul li").hover(function(){
				var icon = $(this).find("i.icon-tool");
				if(icon.hasClass("air")){
					icon.addClass("air-on");
					return false;
				}
				if(icon.hasClass("bus")){
					icon.addClass("bus-on");
					return false;
				}
				if(icon.hasClass("train")){
					icon.addClass("train-on");
					return false;
				}
				if(icon.hasClass("ship")){
					icon.addClass("ship-on");
					return false;
				}				
			},function(){
				var icon = $(this).find("i.icon-tool");
				if(icon.hasClass("air")){
					icon.removeClass("air-on");
					return false;
				}
				if(icon.hasClass("bus")){
					icon.removeClass("bus-on");
					return false;
				}
				if(icon.hasClass("train")){
					icon.removeClass("train-on");
					return false;
				}
				if(icon.hasClass("ship")){
					icon.removeClass("ship-on");
					return false;
				}				
			});
			
			$("#ym-tour ul li > .content").each(function(){
				var _height = $(this).height();
				if(_height>530){
					$(this).addClass("hidden");
				}else{
					$(this).closest("li").find("a.more").remove();
				}
			});
			
			$("#ym-tour ul li > a.more").on("click",function(){
				if(!$(this).attr("open")){
					$(this).siblings(".content").removeClass("hidden");
					$(this).attr("open",true).text("close");;
				}else{
					$(this).siblings(".content").addClass("hidden");
					$(this).attr("open",false).text("more");						
				}
			});			
		},
		loadIndexImages : function(){
			var lock = true;
			var $firstbox = $('<div id="content_0" class="clearfix"></div>');
				$firstbox.css({
					"position" :"absolute",
					"z-index" : 1,
					"opacity":1,
					"left" : 0,
					"top" : 0,
					"right" : 0,
					"bottom" : 0
				});
			$("#loadarea").css({"position":"relative"}).wrapInner($firstbox);
			$(".tab-lan ul li").on("click",function(){
				var ajaxurl = $(this).attr("ajaxurl");
				var index = $(this).index();
				if($(this).find("span").hasClass("on") || !lock) return false;lock = false;
				$(this).find("span").addClass("on");
				$(this).siblings().find("span").removeClass("on");
				if($("#content_"+index).length > 0){
					$("#content_"+index).siblings().animate({"z-index":0,"opacity":0},400);
					$("#content_"+index).stop().animate({"z-index":1,"opacity":1},800,function(){lock=true});
					return false;
				}
				$.get(ajaxurl,{"t":new Date().getTime()},function(html){
					var $box = $('<div id="content_'+index+'"></div>');
					$box.css({
						"position" :"absolute",
						"z-index" : 0,
						"opacity":0,
						"left" : 0,
						"top" : 0, 
						"right" : 0,
						"bottom" : 0
					}).html(html);
					$("#loadarea").append($box);
					$("#content_"+index).siblings().animate({"z-index":0,"opacity":0},400);
					$("#content_"+index).stop().animate({"z-index":1,"opacity":1},800,function(){lock=true});
				});
				return false;
			});			
		},
		scrollTourContent : function(){
			$(".details-list ul li").click(function(event) {
				var $this = $(this);
				var index = $this.index();
				var offtop = $("#a"+(index+1)).offset().top;
				var difftop = $(this).height();
				$("html,body").animate({scrollTop:offtop-difftop},500,function(){
					$this.addClass("on");
					$this.siblings().removeClass("on");					
				});
				return false;				
			});
			$(window).on("scroll",function(){
				var $this = $(this);
				var $menuheight = $(".details-list").height();
				$("#a1,#a2,#a3").each(function(i){
					var difftop = $this.scrollTop()-$(this).offset().top;
					if(difftop>=0 && difftop<=$(window).height()/3){
						$(".details-list ul li:eq("+i+")").addClass("on").siblings().removeClass("on");
						return false;
					}
				});
				if($this.scrollTop()==$(document).height()-$(window).height()){
					$(".details-list ul li:last").addClass("on").siblings().removeClass("on");
					return false;
				}
			});			
		},
		hoverText : function(){
			$(document).on("mouseover",".membertab ol li a",function(){
				var $this = $(this);
				var $prent = $this.find("p strong");
				var $textDom = $this.find("p em");
				var textHeight = $this.find("p em").height();
				if(textHeight>24){
					$prent.stop().animate({"height":textHeight,"padding":"10px 0"},300);
				}
				return false;
			});
			
			$(document).on("mouseout",".membertab ol li a",function(){
				var $this = $(this);
				var $prent = $this.find("p strong");
				$prent.stop().animate({"height":24,"padding":0},300);
				return false;
			});			

        },
		immediately : function() {
			$("#lk-immediately").on("click",function(){
				$("body").append("<div id='mask' class='mask'></div>");
				$("#immediately").fadeIn("slow");
				return false;
			});		
			//关闭
			$(".bm-close").on('click', function (){
				$("#immediately").fadeOut("fast");
				$("#mask").hide().remove();
				return false;
			});		
		},
		buyActivity : function(){
			var $self = this;
			$("#buyActBtn").on("click",function(){
				var link = $(this).attr("href");
				$self.isUserLogin({
					callback : function(){
						window.location.href = link;
					}
				});
				return false;
			});		
		},
		avoidCntClick : function(callback,wait,id){
			var $self = this;
			var _callback = callback || function(){};
			var _id = id || "flag";

			if ($self[_id]) {
				window.clearTimeout($self[_id]);
				delete $self[_id];
			}
			return $self[_id] = window.setTimeout(function() {
				callback();
				delete $self[_id];
			}, wait,_id);
		},
		setProNumber : function (dom,options){
			var _self = this;
			var $this = $(dom);
			if ($this.length == 0)
				return false;
			var config = {
				clickBtn : [".minus", ".add"],
				grayBtn : "on",
				numInput : ".num",
				initVal : 0,
				callback : function () {}
			}
			var opts = $.extend(config, options);
			var setBtnState = function(){
				$("span[pid]").each(function(){
					var _input = $(this).find(opts.numInput);
					var _inputVal = parseInt(_input.val());
					var _minus = _input.siblings(opts.clickBtn[0]);
					var _add = _input.siblings(opts.clickBtn[1]);
					var _maxnum = _input.attr("maxnum")?parseInt(_input.attr("maxnum")):99;
					if(_inputVal <= opts.initVal){
						_minus.addClass(opts.grayBtn);
					}else{
						_minus.removeClass(opts.grayBtn);
					}
					if(_inputVal >=_maxnum){
						_add.addClass(opts.grayBtn);
					}else{
						_add.removeClass(opts.grayBtn);
					}				
				});
			}
			var clickBtnEvent = function () {
				var _parent = $(this).parent("span");
				var _parentid = _parent.attr("pid");
				var _input = $(this).siblings(opts.numInput);
				var _value = _input.attr("data-value")?JSON.parse(_input.attr("data-value")):false;
				var _num = parseInt(_input.val());
				
				if ($(this).hasClass(opts.grayBtn)) {
					return false;
				}
				
				$(this).hasClass(opts.clickBtn[0].substr(1)) ? _num-- : _num++;
				
				$("span[pid='"+_parentid+"']").each(function(){
					var _input = $(this).find(opts.numInput);
					var _minus = _input.siblings(opts.clickBtn[0]);
					var _add = _input.siblings(opts.clickBtn[1]);
					var _maxnum = _input.attr("maxnum")?parseInt(_input.attr("maxnum")):99;
					if (_num <= opts.initVal) {
						_minus.addClass(opts.grayBtn);
						_add.removeClass(opts.grayBtn);
					}else if(_num>=_maxnum){
						_num = _maxnum;
						_add.addClass(opts.grayBtn);
						_minus.removeClass(opts.grayBtn);
					}else {
						_add.removeClass(opts.grayBtn);
						_minus.removeClass(opts.grayBtn);
					}
					_input.val(_num);					
				});
				opts.callback(_value,_num,_parent,_self);
				return false;
			}
			var inputEvent = function() {
				var _parent = $(this).closest("span");
				var _parentid = _parent.attr("pid");				
				var _minus = _parent.find(opts.clickBtn[0]);
				var _add = _parent.find(opts.clickBtn[1]);
				var _input = _parent.find(opts.numInput);
				var _maxnum = $(this).attr("maxnum")?parseInt($(this).attr("maxnum")):99;
				var _currval = $(this).val();
				var _value = $(this).attr("data-value")?JSON.parse($(this).attr("data-value")):false;
				var _num = _currval;
				var _isNumber = (/^[1-9]+[0-9]*]*$/.test(_currval) || _currval===opts.initVal) && _currval!==""?true:false;
				
				if (!_isNumber){
					_input.val(opts.initVal);
					_minus.addClass(opts.grayBtn);
					if(_maxnum > opts.initVal ){
						_add.removeClass(opts.grayBtn);
					}else{
						_add.addClass(opts.grayBtn);
					}
					_num = opts.initVal;
					setTimeout(function(){
						_input.blur();
						opts.callback(_value,_num,_parent,_self);						
					},600);
					return false
				}
				if(parseInt(_currval) == opts.initVal){
					setTimeout(function(){
						_input.blur();
						opts.callback(_value,_num,_parent,_self);						
					},600);				
					return false;
				}
				if(parseInt(_currval) > _maxnum){
					_input.val(_maxnum);
					_minus.removeClass(opts.grayBtn);
					_add.addClass(opts.grayBtn);
					_num =_maxnum;
					setTimeout(function(){
						_input.blur();
						opts.callback(_value,_num,_parent,_self);						
					},600);				
					return false
				}
				
				if(parseInt(_currval) > opts.initVal && parseInt(_currval) < _maxnum){
					_minus.removeClass(opts.grayBtn);
					_add.removeClass(opts.grayBtn);
					setTimeout(function(){
						_input.blur();
						opts.callback(_value,_num,_parent,_self);						
					},600);				
					return false;
				}
			}
			var btnArr = opts.clickBtn.join(",");
			setBtnState();
			$this.on("click", btnArr, clickBtnEvent);
			$(opts.numInput).on("input propertychange",inputEvent);
			$this.on("click", opts.numInput, function () {$(this).select()});
			$this.on("selectstart",btnArr,function(){return false});
			
		},
		getValidCode : function(options){
			var config = {
				runtime : 60,
				disabled : "disabled",
				clickbtn : "#get-vcode",
				ajaxurl : "",
				initText : "获取短信验证码",
				disabledText : "重新获取",
				imgcode : "#imgcode",
				phone : "#regmobile",
				befCallback : function(){},
				sendCallback : function(){}
			}
			var opts = $.extend(config,options);
			var clickBtnEvent = function(){
				var mobileRule = /^1[0-9]{10}$/;
				var mobileValue = $.trim($(opts.phone).val());
				var imgCodeRule = /^[^\s]{4,4}$/;
				var imgCodeValue = $.trim($(opts.imgcode).val());
				
				var $this = $(this);
				var ajaxurl = $this.attr("sendurl");
				var phonename = $(opts.phone).attr("name");
				var imgcodes = $(opts.imgcode).attr("name");
				if($this.attr("disabled")) return false;
				
				if(mobileValue == ""){
					var msg = $(opts.phone).attr("nullmsg");
					$(opts.phone).siblings("span.Validform_checktip").text(msg).addClass("Validform_wrong");
					return false;
				}			
				if(!mobileRule.test(mobileValue)){
					var msg = $(opts.phone).attr("errormsg");
					$(opts.phone).siblings("span.Validform_checktip").text(msg).addClass("Validform_wrong");
					return false;
				}
				if(imgCodeValue == ""){
					var msg = $(opts.imgcode).attr("nullmsg");
					$(opts.imgcode).siblings("span.Validform_checktip").text(msg).addClass("Validform_wrong");
					return false;
				}
				if(!imgCodeRule.test(imgCodeValue)){
					var msg = $(opts.imgcode).attr("errormsg");
					$(opts.imgcode).siblings("span.Validform_checktip").text(msg).addClass("Validform_wrong");
					return false;
				}				
				var data = {};
					data[phonename] = mobileValue;
					data[imgcodes] = imgCodeValue;
					data["t"] = new Date().getTime();
				
				var sendAjaxEvent = function(json){
					var isok = opts.sendCallback(json,$this);
					if(!isok){
						$('#imgcode').val('');
						$('.imgcode')[0].src=$('#root_path').val()+'/user/getImgCode?d='+Math.random();
						return false;
					}
					var rurntime = $this.attr("runtime")?parseInt($this.attr("runtime")):opts.runtime;				
					var tt = window.setInterval(function(){
						rurntime--;
						$this.text(opts.disabledText+"("+rurntime+")");
						if(rurntime<=0){
							$this.removeAttr("disabled").removeClass("disabled").text(opts.initText);
							window.clearInterval(tt);
							return false;
						}
					},1000);
					$this.attr("disabled","disabled").addClass("disabled");						
				}
				$.post(ajaxurl,data,sendAjaxEvent);
				return false;
			}
			$(opts.clickbtn).on("click",clickBtnEvent);
		},		
		setPlaceholder : function(){
			if('placeholder' in document.createElement('input')) return false;
			$("[placeholder]").each(function(){
				var inputType = $(this).attr("type");
				var width=$(this).outerWidth();
				var height = $(this).outerHeight();
				var left = $(this).position().left;
				var top = $(this).position().top;
				var padding = ($(this).innerWidth()-$(this).width());
				$placeholder = $(this).css("color","#a9a9a9").attr("placeholder");
				if(inputType == "text") $(this).val($placeholder);
				if(inputType == "password"){
					$(this).parent().css({"position":"relative","z-index":1});
					$("<div>"+$placeholder+"</div>").css({
						"display" :"block",
						"color" : "#a9a9a9",
						"font-size" : "16px",
						"position" : "absolute",
						"cursor" : "text",
						"z-index" : 10,
						"left" : left+"px",
						"top" : top+"px",
						"width":(width-padding)+"px",
						"height":height+"px",
						"line-height":height+"px",
						"padding" : "0 "+(padding/2)+"px"
					}).on("click",function(){
						$(this).hide().prev().focus();
					}).insertAfter($(this));
				}
			});
			
			$("[placeholder]").on("focus",function(){
				var inputType = $(this).attr("type");
				var $val = $(this).val();
				var $placeholder = $(this).attr("placeholder"); 
				if($val==$placeholder && inputType=="text") $(this).css("color","").val("");
				if(inputType=="password") $(this).next().css("display","none");
			});
			
			$("[placeholder]").on("blur",function(){
				var inputType = $(this).attr("type");
				var $val = $(this).val();
				var $placeholder = $(this).attr("placeholder"); 
				if($val=="" && inputType=="text") $(this).css("color","#999").val($placeholder);
				if($val=="" && inputType=="password") $(this).next().css("display","block");
			});
			
			$(document).on("submit","form",function(){
				$(this).find("[placeholder]").each(function(){
					var $val = $(this).val();
					var $placeholder = $(this).attr("placeholder");
					if($val==$placeholder) $(this).val("");
				});
			});
		},
		setTextAreaNumber : function(){
			$("textarea[max-length]").on("input propertychange",function(){
				var textVal = $.trim($(this).val());
				var maxLen = $(this).attr("max-length");
				if(textVal.length > parseInt(maxLen)){
					$(this).val(textVal.substr(0,maxLen));
					$(this).next("p").html("您还可以输入<em>0</em>个字");
				}else{
					$(this).next("p").html("您还可以输入<em>"+(maxLen-textVal.length)+"</em>个字");
				}
			});
		},
		formatCurrency:function(num) {  
			num = num.toString().replace(/\$|\,/g,'');  
			if(isNaN(num)) num = "0";  
			sign = (num == (num = Math.abs(num)));  
			num = Math.floor(num*100+0.50000000001);  
			cents = num%100;  
			num = Math.floor(num/100).toString();  
			if(cents<10)  
			cents = "0" + cents;  
			for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
			num = num.substring(0,num.length-(4*i+3))+','+  
			num.substring(num.length-(4*i+3));  
			return (((sign)?'':'-') + num + '.' + cents);  
		} 		
    }
	module.exports = new $public();
});