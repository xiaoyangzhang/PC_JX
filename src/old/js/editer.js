/*! PC_JX - v1.0.0 - 2016-11-29 */
var imgurl="http://s0.test.jiuxiulvxing.com",editer=function(){this.init.apply(this,arguments)};editer.prototype={init:function(a,b){var c=this;c.id=a||"#editers",c.config=$.extend(c.config,b),c.bindDomEvent(),c.setContentData()},config:{addTextBtn:".addtext",addPicBtn:".addpic",moveUpBtn:".moveup",moveDownBtn:".movedown",hdClass:".hd",saveTextBtn:".savetxt",saveImgBtn:".saveimg",closeTextBtn:".closetxt",closeImgBtn:".closeimg",delTextBtn:".deltext",textClass:".text",picClass:".pic",picTemp:".tbd",inputClass:".txtinput",uploadClass:".uploadimg",uploadId:"uploadimg",addImageBtn:".imgwrap",uploadAction:$("#filegw_domain").val(),contentText:"#contentText",submitBtn:".submitbtn",inputTxt:".tbd textarea",maxNum:500,picHeight:750,maxObjNum:20},bindDomEvent:function(){var a=this;a.defaultText="",$(a.id).on("click",a.config.addTextBtn,function(){return a.addTextEvent(a,$(this)),!1}),$(a.id).on("click",a.config.addPicBtn,function(){return a.addImageEvent(a,$(this)),!1}),$(a.id).on("click",a.config.moveUpBtn,function(){return a.moveUpEvent(a,$(this)),!1}),$(a.id).on("click",a.config.delTextBtn,function(){return confirm("确定要删除选中段落吗")&&a.delTextEvent(a,$(this)),!1}),$(a.id).on("click",a.config.moveDownBtn,function(){return a.moveDownEvent(a,$(this)),!1}),$(a.id).on("click",a.config.inputTxt,function(){return $(a.config.inputTxt).css("border","none"),!1}),$(a.id).on("click",a.config.saveTextBtn,function(){return""==$(".tbd textarea").val()?($(a.config.inputTxt).css("border","1px solid red"),alert("请输入要添加的文本！"),!1):(a.saveTextEvent(a,$(this)),!1)}),$(a.id).on("dblclick",a.config.textClass,function(){return a.dbClickTextEvent(a,$(this)),!1}),$(a.id).on("click",a.config.textClass,function(){return a.setTextSelect(a,$(this)),!1}),$(a.id).on("mouseenter",a.config.textClass,function(){return a.addOperationMenu(a,$(this)),!1}),$(a.id).on("mouseleave",a.config.textClass,function(){return a.delOperationMenu(a,$(this)),!1}),$(a.id).on("mouseenter",a.config.picClass,function(){return a.addOperationMenu(a,$(this)),!1}),$(a.id).on("mouseleave",a.config.picClass,function(){return a.delOperationMenu(a,$(this)),!1}),$(a.id).on("click",a.config.closeTextBtn,function(){return a.closeCurrTextEvent(a,$(this)),$(".tbd textarea").css("border","1px solid #ddd"),!1}),$(a.id).on("click",a.config.closeImgBtn,function(){return a.closeCurrImgEvent(a,$(this)),$(".tbd textarea").css("border","1px solid #ddd"),!1}),$(a.id).on("input propertychange","textarea",function(){return a.limitTextInputEvent(a,$(this)),!1}),$(a.id).on("change",a.config.uploadClass,function(){return a.uploadImgEvent(a,$(this)),!1}),$(a.id).on("click",a.config.saveImgBtn,function(){return 1!=$(".tbd .nopic").attr("id")?($(a.config.picTemp).css("border","1px solid red"),alert("请先选择图片再添加！"),!1):(a.saveImgEvent(a,$(this)),!1)}),$(a.id).on("click",a.config.picClass,function(){return a.setTextSelect(a,$(this)),!1}),$(a.id).on("click",a.config.submitBtn,function(){return alert($(a.config.contentText).val()),!1})},addTextEvent:function(a){if(a.isEditState())return!1;if($(a.id).find(".bd").find("p").length>=a.config.maxObjNum)return alert("文本和图片已超出限制！"),!1;var b=a.getTextAreaHtml();$(a.id).find(".bd").append(b),$(a.id).find(".bd").find("textarea").focus(),a.scrollBottom(".txtinput"),a.defaultText=""},addImageEvent:function(a,b){if(a.isUploadState())return!1;if($(a.id).find(".bd").find("p").length>=a.config.maxObjNum)return alert("图片和文本已超出限制！"),!1;var c=a.getImgUploadHtml();$(a.id).find(".bd").append(c),a.scrollBottom(".imgwrap")},uploadImgEvent:function(a,b){var c=a.isPicture(b[0],3),d=$(a.config.uploadClass).closest("span").prev().find("img");return c.status?($("#editers").wrap("<form id='uploadform' action='"+a.config.uploadAction+"/file/upload_compress' method='post' enctype='multipart/form-data'></form>"),d.attr("src",imgurl+"/other-plugins/editer/img/loading.gif"),void $("#uploadform").ajaxSubmit({dataType:"json",success:function(c){var e=b.closest("span");200==c.status?(d.attr({src:$("#editers").find("#imgUrl").val()+c.data,id:1}),e.prev().find(".imgDateVal").attr("value",c.data)):alert("上传失败，请稍后重试！"),$("#editers").unwrap(),$(".uploadimg").remove(),$(".uploadbtn").append('<input type="file" id="uploadimg" class="uploadimg" name="uploadimg">'),$(a.config.picTemp).css("border","none"),a.scrollBottom(".imgwrap")},error:function(a){$("#editers").unwrap(),$(".uploadimg").remove(),$(".uploadbtn").append('<input type="file" id="uploadimg" class="uploadimg" name="uploadimg">'),d.attr("src",imgurl+"/other-plugins/editer/img/no-img-big.jpg"),alert("请求发生错误！")}})):(alert(c.content),!1)},addOperationMenu:function(a,b){if(b.find("ul.menu").length>0)return!1;var c=[];c.push('<ul class="menu clearfix">'),c.push('<li class="moveup"><em class="icon-up"></em>上移</li>'),c.push('<li class="movedown"><em class="icon-down"></em>下移</li>'),c.push('<li class="deltext"><em class="icon-del"></em>删除</li>'),c.push("</ul>"),b.append(c.join("\n"))},delOperationMenu:function(a,b){b.find("ul.menu").remove()},isEditState:function(){var a=this;return $(a.id).find(a.config.inputClass).length>0},isUploadState:function(){var a=this;return $(a.id).find(a.config.uploadClass).length>0},getTextAreaHtml:function(a){var b=this,c=[],d=a||"",e=d?d.length:0;return e>b.config.maxNum&&(d=d.substr(0,b.config.maxNum),e=b.config.maxNum),c.push('<p class="'+b.config.inputClass.replace(".","")+'">'),c.push('<span class="tbd"><textarea>'+d+"</textarea></span>"),c.push('<span class="tft clearfix"><em>'+e+" / "+b.config.maxNum+'</em><a href="javascript:void(0)" class="closetxt">取消</a><a href="javascript:void(0)" class="savetxt">保存</a></span>'),c.push("</p>"),c.join("\n")},getImgUploadHtml:function(){var a=[];return a.push('<p class="imgwrap">'),a.push('<span class="tbd"><img src="'+imgurl+'/other-plugins/editer/img/no-img-big.jpg" class="nopic"/><input type="hidden" class="imgDateVal" /></span>'),a.push('<span class="tft clearfix">'),a.push('<label class="selectimg"><label>请选择图片：</label><a class="uploadbtn">选择图片<input type="file" id="uploadimg" class="uploadimg" name="uploadimg"/></a><em clsss="errormsg"></em></label>'),a.push('<label class="groupbtn clearfix">'),a.push('<a class="closeimg" href="javascript:void(0)">取消</a>'),a.push('<a class="saveimg" href="javascript:void(0)">添加</a>'),a.push("</label>"),a.push("</span>"),a.push("</p>"),a.join("\n")},delTextEvent:function(a,b){var c=b.closest("p");c.remove(),a.setContentData()},html_encode:function(a){var b="";return 0==a.length?"":(b=a.replace(/&/g,"&amp;"),b=b.replace(/</g,"&lt;"),b=b.replace(/>/g,"&gt;"),b=b.replace(/ /g,"&nbsp;"),b=b.replace(/\'/g,"&#39;"),b=b.replace(/\"/g,"&quot;"),b=b.replace(/\n/g,"<br>"))},html_decode:function(a){var b="";return 0==a.length?"":(b=a.replace(/&amp;/g,"&"),b=b.replace(/&lt;/g,"<"),b=b.replace(/&gt;/g,">"),b=b.replace(/&nbsp;/g," "),b=b.replace(/&#39;/g,"'"),b=b.replace(/&quot;/g,'"'),b=b.replace(/<br>/g,"\n"))},saveImgEvent:function(a,b){var c=b.closest("p"),d=c.find(a.config.picTemp).html();c.replaceWith('<p class="pic">'+d+"</p>"),a.setContentData()},saveTextEvent:function(a,b){var c=b.closest("p"),d=c.find("textarea").val();d=a.html_encode(d),c.replaceWith('<p class="text"><font>'+d+"</font></p>"),a.setContentData()},moveUpEvent:function(a,b){var c=b.closest("p"),d=c.index();if(0==c.length||0==d)return!1;var e=c.prev();c.insertBefore(e),a.setContentData()},moveDownEvent:function(a,b){var c=b.closest("p"),d=$(a.id).find("p").length,e=c.index();if(0==c.length||e==d)return!1;var f=c.next();c.insertAfter(f),a.setContentData()},dbClickTextEvent:function(a,b){var c=b.find("font").html();c=c.replace(/<br>/gi,"\n");var d=a.getTextAreaHtml($.trim(c));a.closeSiblingsTextEvent(a,b),a.defaultText=c,b.replaceWith(d)},setTextSelect:function(a,b){b.addClass("on").siblings().removeClass("on")},closeCurrTextEvent:function(a,b){var c=b.closest("p"),d=a.defaultText?'<p class="text"><font>'+a.defaultText+"</font></p>":"";c.replaceWith(d)},closeCurrImgEvent:function(a,b){var c=b.closest("p");c.remove()},closeSiblingsTextEvent:function(a,b){var c=b.siblings(a.config.inputClass),d=a.defaultText?'<p class="text"><font>'+a.defaultText+"</font></p>":"";c.replaceWith(d)},limitTextInputEvent:function(a,b){var c=b.closest(a.config.inputClass),d=b.val(),e=d.length;e>a.config.maxNum&&(e=a.config.maxNum,b.val(d.substr(0,a.config.maxNum))),c.find("span em").text(e+" / "+a.config.maxNum)},scrollBottom:function(a){var b=$(document).height(),c=$(a).height();$(document).scrollTop(b-c)},setContentData:function(){var a=this,b=[],c=a.config.textClass.substr(1),d=a.config.picClass.substr(1);$(a.config.textClass+","+a.config.picClass).each(function(){var e={};$(this).hasClass(c)&&(e.type="text",e.value=a.html_decode($(this).find("font").html())),$(this).hasClass(d)&&(e.type="img",e.value=$(this).find(".imgDateVal").val()),b.push(e)});var e=JSON.stringify(b);$(a.config.contentText).val(e)},isPicture:function(a,b){var c={content:"文件类型不合法,只能是jpg、png、jpeg类型！"},d=a.value,e={status:!0,content:"文件大小不能超过"+b+"M"},f=1024*b*1024,g=0,h=navigator.userAgent.toLowerCase(),i=/(msie\s|trident.*rv:)([\w.]+)/,j=null!=i.exec(h);if(!j&&(g=a.files[0].size,g>f))return e.status=!1,e;if(null!=d&&""!=d)if(d.lastIndexOf(".")!=-1){var k=d.substring(d.lastIndexOf(".")+1,d.length).toLowerCase(),l=new Array;l[0]="jpg",l[2]="png",l[3]="jpeg";for(var m=0;m<l.length;m++)if(l[m]==k)return c.status=!0,c;c.status=!1}else c.status=!1;else c.status=!0;return c},checkediter:function(){return 0==$(".bd p.text,.bd p.pic").length?($("#editers").css("border","1px solid red"),!1):($("#editers").css("border","1px solid #ddd"),!0)}};var editer_obj=new editer("#editers");
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-29 */