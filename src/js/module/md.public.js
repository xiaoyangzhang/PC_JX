define(function (require, exports, module) {
	require("json"),
	$urlpath=require("urlpath"),
	$public = function () {
		Array.prototype.remove=function(dx) 
		{ 
		    if(isNaN(dx)||dx>this.length){return false;} 
		    for(var i=0,n=0;i<this.length;i++) 
		    { 
		        if(this[i]!=this[dx]) 
		        { 
		            this[n++]=this[i] 
		        } 
		    } 
		    this.length-=1;
		    return this;
		} 
		String.prototype.Trim = function()  
		{  
			return this.replace(/(^\s*)|(\s*$)/g, "");  
		}  
		String.prototype.LTrim = function()  
		{  
			return this.replace(/(^\s*)/g, "");  
		}  
		String.prototype.RTrim = function()  
		{  
			return this.replace(/(\s*$)/g, "");  
		}
		this.init.apply(this, arguments);
	},
	fileuploadURL=$urlpath.fileuploadURL,
	site_path=$urlpath.site_path,
	c_domain=$urlpath.c_domain,
	img_domain=$urlpath.img_domain,
	static_source=$urlpath.static_source;
	
	$public.prototype = {
		init:function(){
			var _self=this;
			/* 统一主域名 */
			if(document.domain.indexOf(c_domain)!=-1)
				document.domain = c_domain;
			$('textarea,input:not(input[type="radio"],input[type="checkbox"])').on('focus',function(){
				$(this).css('border','1px solid #ed6c44');
			}).on('blur',function(){
				$(this).css('border','1px solid #ddd');
			});
				 _self.depath(); 
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
		isLogin :function(data){
			if(!data instanceof Object)
				data=JSON.parse(data);
			if(data.errorCode==22000000)
				window.location=site_path+'/user/login';
		},
		 depath :function(){
			var hh=$("#jiuxColor").height(),fh=$("#footID,.jiux-footer").height(),el=$(".eredar-left"),er=$(".eredar-right"),
				wdh=$(window).height()-hh-fh-102,auto_height=$(document).height()-hh-fh-60,
				elh=el.height()+120,erh=er.height();
			if(wdh>elh&&wdh>erh)
				el.height(elh);
			else
				el.height(auto_height);
		}, 
		urlpath:{
			eredar:site_path+'/basicInfo/talent/saveTalentInfo',
			merchant:site_path+'/basicInfo/merchant/saveBasic',
			updatepwd:site_path+'/account/modifyPassword',
			gethotelist:site_path+'/hotel/queryHotelManageList',
			getroominfo:site_path+'/hotel/queryRoomTypeListByData',
			addhotel:site_path+'/hotel/addHotelMessageVOByData',
			updatehotel:site_path+'/hotel/editHotelMessageVOByData',
			getScenicList:site_path+'/scenic/queryScenicManageVOListByData',
			getScenicTicketType:site_path+'/scenic/queryTicketListByScenicId',
			addScenic:site_path+'/scenic/addScenicManageVOByDdata',
			updateScenic:site_path+'/scenic/editScenicManageVOByDdata',
			getBsScope:site_path+'/apply/getBusinessScope',
			pageilB:site_path+'/apply/seller/pageDetailB'
		},
		timer:null,
		dialog:{
			initbox:function(){
				var _self=this;
				clearTimeout(_self.timer);
				if(!_self.box) {
					$('body').append('<div class="dialog"><div class="bgmeng" style="height:'+$(document).height()+'px"></div></div>');
					$('.bgmeng').on('click',function(ev){
						_self.closebox();
						$public.stopBubble(ev);
					});
					_self.box=$('.dialog').height($(window).height());
				}
			},
			closebox:function(){
				var _self=this;
				_self.box.hide();
				$('.container').children('div').hide().appendTo('body');
				$('.bgmeng').off().on('click',function(ev){
					_self.closebox();
					$public.stopBubble(ev);
				});
			},
			waiting:function(){
				var _self=this;
				_self.initbox();
				if(_self.box.attr('id')=='waiting-box')
					_self.box.fadeIn();
				else{
					$('.bgmeng').off(); 
					_self.box.children(':not(".bgmeng")').remove();
					_self.box.attr('id','waiting-box').append('<div class="loading"><img src="'+static_source+'img/loading.gif"><label>请稍后。。。</label></div>').fadeIn();
				}
			},
			msg:function(value,type){
				var _self=this;
				_self.initbox();
				if(_self.box.attr('id')=='msg-box'){
					$('.msg').text(value);
					_self.box.fadeIn();
				}else{
					_self.box.children(':not(".bgmeng")').remove();
					_self.box.attr('id','msg-box').append('<div class="msg">'+value+'</div>').fadeIn();
				}
				clearTimeout(_self.timer);
				_self.timer=setTimeout(function(){_self.closebox();},2000);
				if(type=='success')
					$('.msg').css('color','green');
				else if(type=='error')
					$('.msg').css('color','red');
			},
			content:function(n_width,n_height,title,html_content,callback,init_callback){
				var _self=this,total_h=0;
				_self.initbox();
				if(n_height=='auto')
					n_height=$(window).height()-180;
				if(_self.box.attr('id')=='content-box'){
					_self.box.fadeIn();
				}else{
					_self.box.children(':not(".bgmeng")').remove();
					_self.box.attr('id','content-box').append('<div class="content-box"></div>').fadeIn();
					$('.content-box').append('<div class="btn-group"><div><button class="ok">确定</button><button class="cancel">取消</button></div></div>')
					.append('<div class="close-tip clearfix"><i></i><div><h2>'+title+'</h2></div></div>').append('<div class="container"></div>')
					.width(n_width).height(n_height).css({'margin-left':-(n_width/2)+'px','margin-top':-(n_height/2)+'px'});
					$('.container').height(n_height-125);
					$('.ok').off().on('click',function(ev){
						callback();
						$public.stopBubble(ev);
					});
					$('.cancel,.close-tip').off().on('click',function(ev){
						_self.closebox();
						$public.stopBubble(ev);
					});
				}
				html_content.appendTo($('.container'));
				init_callback();
			}
		},
		ck_device:function(){
		    var browser = {
		       versions: function () {
		           var u = navigator.userAgent, app = navigator.appVersion;
		           return {         //移动终端浏览器版本信息
		               trident: u.indexOf('Trident') > -1, //IE内核
		               presto: u.indexOf('Presto') > -1, //opera内核
		               webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		               gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		               mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
		               ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		               android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
		               iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
		               iPad: u.indexOf('iPad') > -1, //是否iPad
		               webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		           };
		       }(),
		       language: (navigator.browserLanguage || navigator.language).toLowerCase()
		    }
		    if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
		           var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
		           if (ua.match(/MicroMessenger/i) == "micromessenger") {
		                   //在微信中打开
		           }
		           if (ua.match(/WeiBo/i) == "weibo") {
		                   //在新浪微博客户端打开
		           }
		           if (ua.match(/QQ/i) == "qq") {
		                   //在QQ空间打开
		           }
		           if (browser.versions.ios) {
		                   //是否在IOS浏览器打开
		           } 
		           if(browser.versions.android){
		                   //是否在安卓浏览器打开
		           }
		    } else {
		           //否则就是PC浏览器打开
		    }
		},
		paramcompare:function(arr){
			var result={},temp={};
			for(var i=0;i<arr.length;i++){
				if(temp[arr[i].name]){
					var key=arr[i].name,oldvalue=result[key],newvalue=arr[i].value,temp_arr=[];
					if(oldvalue.constructor == Array){
						result[key]=oldvalue.concat(newvalue);
					}else{
						temp_arr.push(oldvalue);
						temp_arr.push(newvalue);
						result[key]= temp_arr;
					}
				}else{
					result[arr[i].name]=arr[i].value;
					temp[arr[i].name]=true;
				}
			}
			return result;
		},
	    actiondata:function (province,city,is_check) {
			//加载联动数据
	        $.ajax({
	            url : static_source+'src/js/allcity.js',
	            dataType : "jsonp",
	            jsonpCallback : "callback",
	            success : function(data){
	                setTimeout(function(){
	                  $("#"+province).empty().append(_.template($("#province-tpl").html(),data)).children('option').filter(function(){
	                        if($(this).val()==$('.province_h').val()){
	                            $(this).attr('selected','selected');
	                        }
	                    });
						//渲染下拉框控件 
						$('#'+province).selectlist({
								onChange:function(){
			                        var cur_p=$('input[name="province"]').val();
		                            for(var c_key in data.city){
		                                if(c_key==cur_p){
		                                    $("#"+city).empty().append(_.template($("#city-tpl").html(),{city: data.city[c_key]}))
		                                    .selectlist({width:150,onChange:function(){if(!is_check)$public.selectvalid(this.element.id);}});
		                                }
		                            }
		                            if(!is_check)$public.selectvalid(this.element.id);
			                    },
			                    onSuccess:function(){
				                    var cur_value=$('#'+this.element.id+'_').val(),cur_value=cur_value?cur_value:'fail',olis=$('#'+this.element.id).find('li'),_self=this;
				                    olis.filter(function(){
				                        if($(this).attr('data-value')==cur_value){
				                            $(this).trigger('autoclick');
				                            setTimeout(function(){
						                        var cur_p=$('input[name="province"]').val();
					                            for(var c_key in data.city){
					                                if(c_key==cur_p){
					                                    $("#"+city).empty().append(_.template($("#city-tpl").html(),{city: data.city[c_key]}))
					                                    .selectlist({width:150,onChange:function(){if(!is_check)$public.selectvalid(this.element.id);}});
					                                }
					                            }
					                            if(!is_check)$public.selectvalid(_self.element.id);
				                            },100);
				                        }
				                    });
			                    }
		                });
						$('#'+city).selectlist({width: 150});
	                },100);
	            }             
	        });
		},
	    procityaredata:function (province,city,area,is_check) {
			//加载联动数据
	        $.ajax({
	            url : static_source+'src/js/allcity.js',
	            dataType : "jsonp",
	            jsonpCallback : "callback",
	            success : function(data){
	                setTimeout(function(){
	                  $("#"+province).empty().append(_.template($("#province-tpl").html(),data)).children('option').filter(function(){
	                        if($(this).val()==$('.province_h').val()){
	                            $(this).attr('selected','selected');
	                        }
	                    });
						//渲染下拉框控件 
						$('#'+province).selectlist({
								onChange:function(){
			                        var cur_p=$('input[name="province"]').val();
		                            for(var c_key in data.city){
		                                if(c_key==cur_p){
		                                    $("#"+city).empty().append(_.template($("#city-tpl").html(),{city: data.city[c_key]}))
		                                    .selectlist({
		                                    	width:150,
		                                    	onChange:function(){
							                        var cur_p=$('input[name="city"]').val();
						                            for(var c_key in data.area){
						                                if(c_key==cur_p){
						                                    $("#"+area).empty().append(_.template($("#area-tpl").html(),{area: data.area[c_key]}))
						                                    .selectlist({
						                                    	width:200,
						                                    	onChange:function(){
						                                    		if(!is_check)$public.selectvalid(this.element.id);
							                                    }
							                                });
						                                }
						                            }
		                                    		if(!is_check)$public.selectvalid(this.element.id);
			                                    }
			                                });
		                                }
		                            }
		                            if(!is_check)$public.selectvalid(this.element.id);
			                    },
			                    onSuccess:function(){
				                    var cur_value=$('#'+this.element.id+'_').val(),cur_value=cur_value?cur_value:'fail',
				                    olis=$('#'+this.element.id).find('li'),_self=this;
				                    olis.filter(function(){
				                        if($(this).attr('data-value')==cur_value){
				                            $(this).trigger('autoclick');
				                            setTimeout(function(){
						                        var cur_p=$('input[name="province"]').val();
					                            for(var c_key in data.city){
					                                if(c_key==cur_p){
					                                    $("#"+city).empty().append(_.template($("#city-tpl").html(),{city: data.city[c_key]}))
					                                    .selectlist({
					                                    	width:150,
					                                    	onChange:function(){
										                        var cur_p=$('input[name="city"]').val();
									                            for(var c_key in data.area){
									                                if(c_key==cur_p){
									                                    $("#"+area).empty().append(_.template($("#area-tpl").html(),{area: data.area[c_key]}))
									                                    .selectlist({
									                                    	width:200,
									                                    	onChange:function(){
									                                    		if(!is_check)$public.selectvalid(this.element.id);
										                                    }
										                                });
									                                }
									                            }
					                                    		if(!is_check)$public.selectvalid(this.element.id);
						                                    },
										                    onSuccess:function(){
											                    var cur_value=$('#'+this.element.id+'_').val(),cur_value=cur_value?cur_value:'fail',
											                    olis=$('#'+this.element.id).find('li'),_self=this;
											                    olis.filter(function(){
											                        if($(this).attr('data-value')==cur_value){
											                            $(this).trigger('autoclick');
											                            setTimeout(function(){
													                        var cur_p=$('input[name="city"]').val();
												                            for(var c_key in data.area){
												                                if(c_key==cur_p){
												                                    $("#"+area).empty().append(_.template($("#area-tpl").html(),{area: data.area[c_key]}))
												                                    .selectlist({
												                                    	width:200,
												                                    	onChange:function(){
												                                    		if(!is_check)$public.selectvalid(this.element.id);
													                                    }
													                                });
												                                }
												                            }
												                            if(!is_check)$public.selectvalid(_self.element.id);
											                            },100);
											                        }
											                    });
										                    }
						                                });
					                                }
					                            }
					                            if(!is_check)$public.selectvalid(_self.element.id);
				                            },100);
				                        }
				                    });
			                    }
		                });
						$('#'+city).selectlist({width: 150});
	                },100);
	            }             
	        });
		},
		//验证图片盒子
		allimgvalid:function($box){
			var result=true,obj=null;
			if($box.length>0){
				$box.filter(function(){
					var isAllowNull=$(this).attr('class').indexOf('allownull')!=-1?true:false;
						obj=$(this).find('input:hidden');
						$(this).parent().find('.Validform_checktip').remove();
					if(!isAllowNull){
						if(obj.val()!=''){
							$(this).after('<span class="Validform_checktip Validform_right"></span>');
						}else{
							$(this).after('<span class="Validform_checktip Validform_wrong">请选择图片！</span>');
							result=false;
						}
					}
					// else{
					// 	var errortip=$(this).parent().find('.Validform_wrong').length;
					// 	if(errortip)
					// 		result=false;
					// }
				});
			}
			return result;
		},
		//验证图片盒子
		groupimgvalid:function($box,msg){
			if($box.length>0){
				var $files=$box.find(':hidden'),isAllowNull=$box.attr('class').indexOf('allownull')!=-1?true:false;
					$box.find('.Validform_checktip').remove();
				if(!isAllowNull){
					for(var i=0;i<$files.length;i++){
						if($files[i].value!=''){
							$box.append('<span class="Validform_checktip Validform_right"></span>');
							return true;
						}
					}
					$box.append('<span class="Validform_checktip Validform_wrong">'+(msg?msg:'')+'</span>');
					return false;
				}else{
					// var errortip=$box.find('.Validform_wrong').length;
					// if(errortip)
					// 	return false;
					return true;
				}
			}else
				return true;
		},
		//验证下拉框
		selectvalid:function(id){
			var result=true,$droplist=null;
			if(id)
				$droplist=$('input[name="'+id+'"]');
			else
				$droplist=$('.select-wrapper input:hidden');
            $droplist.filter(function(){
            	var $droplistprent=$(this).closest('.select-wrapper');
        		$droplistprent.next('.Validform_checktip').remove();
            	if($(this).val()!=''){
            		$droplistprent.find('.select-button').css('background','#fff');
            		$droplistprent.after('<span class="Validform_checktip Validform_right Select_tip"></span>');
            	}else{
            		$droplistprent.find('.select-button').css('background','#ffe7e7');
            		$droplistprent.after('<span class="Validform_checktip Validform_wrong Select_tip"></span>');
					result=false;
            	}
            });
			return result;
		},
		//判断上传文件格式是否满足条件
		isPicture:function(file,sz){
		    var result={content:'文件类型不合法,只能是jpg、png、jpeg类型！'},fileName=file.value,
		        szcontent={status:true,content:'文件大小不能超过'+sz+'K'},
		        maxsize = sz*1024,filesize = 0; //M;
		        if(this.diffBrowser().substring(0,1)!='I') {
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
		stopBubble:function(ev){
			var e = ev || window.event || arguments.callee.caller.arguments[0];
		   //一般用在鼠标或键盘事件上
		   if(e && e.stopPropagation){
			   //W3C取消冒泡事件
			   e.stopPropagation();
		   }else{
			   //IE取消冒泡事件
			   window.event.cancelBubble = true;
		   }
		},
		stopDefault:function(ev){
			var e = ev || window.event || arguments.callee.caller.arguments[0];
		    //阻止默认浏览器动作(W3C) 
		    if ( e && e.preventDefault ) 
		        e.preventDefault(); 
		    //IE中阻止函数器默认动作的方式 
		    else 
		        window.event.returnValue = false; 
		    return false; 
		},
    	dateFormat: function (date, format) {
	        format = format || 'yyyy-MM-dd hh:mm:ss';
	        var o = {
	            "M+": date.getMonth() + 1,
	            "d+": date.getDate(),
	            "h+": date.getHours(),
	            "m+": date.getMinutes(),
	            "s+": date.getSeconds(),
	            "q+": Math.floor((date.getMonth() + 3) / 3),
	            "S": date.getMilliseconds()
	        };
	        if (/(y+)/.test(format)) {
	            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	        }
	        for (var k in o) {
	            if (new RegExp("(" + k + ")").test(format)) {
	                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	            }
	        }
	        return format;
	    },
	    setCookie:function(name,value){
	        var Days = 30;
	        var exp = new Date();
	        exp.setTime(exp.getTime() + Days*24*60*60*1000);
	        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	    },
	    getCookie:function(name){
	        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	        if(arr=document.cookie.match(reg))
	        return unescape(arr[2]);
	        else
	        return null;

	        // var name = cname + "=";
	        // var ca = document.cookie.split(';');
	        // for(var i=0; i<ca.length; i++) {
	        //     var c = ca[i];
	        //     while (c.charAt(0)==' ') c = c.substring(1);
	        //     if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	        // }
	        // return "";
	    },
	    delCookie:function(name){
	        var exp = new Date();
	        exp.setTime(exp.getTime() - 1);
	        var cval=getCookie(name);
	        if(cval!=null)
	        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	    },
		diffBrowser:function(){
			//使用IE条件注释来判断是否IE6，通过判断userAgent不一定准确
			//if (document.all) document.write('<!--[if lte IE 6]><script type="text/javascript">window.ie6= true<\/script><![endif]-->');
		    var userAgent = navigator.userAgent, //取得浏览器的userAgent字符串
		     isOpera = userAgent.indexOf("Opera") > -1, //判断是否Opera浏览器
		     ua=navigator.userAgent.toLowerCase(),
		     rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
		     isIE=rMsie.exec(ua)!=null, //判断是否IE浏览器
		     isFF = userAgent.indexOf("Firefox") > -1, //判断是否Firefox浏览器
		     isSafari = userAgent.indexOf("Safari") > -1, //判断是否Safari浏览器
		     isChrome = userAgent.indexOf("Chrome") > -1; //判断是否Chrome浏览器
		    if (isIE) {
		        var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = false,
		        reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		        reIE.test(userAgent);
		        var fIEVersion = parseFloat(RegExp["$1"]),
		        IE55 = fIEVersion == 5.5,
		        IE6 = fIEVersion == 6.0,
		        IE7 = fIEVersion == 7.0,
		        IE8 = fIEVersion == 8.0,
		        IE9 = fIEVersion == 9.0;
		        if (IE55) {
		            return "IE55";
		        }
		        else if (IE6) {
		            return "IE6";
		        }
		        else if (IE7) {
		            return "IE7";
		        }
		        else if (IE8) {
		            return "IE8";
		        }
		        else if (IE9) {
		            return "IE9";
		        }else{
		            return "IE";
		        }
		    }
		    else if (isFF) {
		        return "FF";
		    }
		    else if (isOpera) {
		        return "Opera";
		    }
		    else if (isChrome) {
		        return "Chrome";
		    }
		    else if (isSafari) {
		        return "Safari";
		    }
		}, 
		uploadPic:function(picId,fileId) {
			  var pic = document.getElementById(picId),file = document.getElementById(fileId);
			  if(window.FileReader){
				   oFReader = new FileReader();
				   oFReader.readAsDataURL(file.files[0]);
				   oFReader.onload = function (oFREvent) {pic.src = oFREvent.target.result;};  
			  }
			  else if (document.all) {
				   file.select();
				   var reallocalpath = document.selection.createRange().text;
				   if (window.ie6) pic.src = reallocalpath;
				   else {
					pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
					pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
				   }
			  }
			  else if (file.files) {
				   if (file.files.item(0)) {
					url = file.files.item(0).getAsDataURL();
					pic.src = url;
				   }
			  }
	    }	
	}
	module.exports = new $public();
});