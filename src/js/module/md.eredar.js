/*! PC_JX - v1.0.0 - 2016-11-29 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),require("validform"),require("dropdownlist"),require("uploadfiles");var a=require("public"),b=require("editer");require("module/md.renewdialog"),require("md5");var c=function(){this.init.apply(this,arguments)};c.prototype={init:function(){b.distanceFun();var c=this;$("#tm").datepicker({changeYear:!0,changeMonth:!0,numberOfMonths:1,yearRange:"-76:+0"}),$("#tm").bind("input change",function(){c.timeFun()}),c.eredrInfoTab(),c.nickName(),c.provinceFun();var d={tiptype:3,label:".label",showAllError:!0,datatype:{},ajaxPost:!0},f=[{ele:"#nickName",maxlength:"15",nullmsg:"请填写您的昵称",datatype:"s",errormsg:"除下划线以外的特殊字符不允许输入,请填写2-15字以内的字符"},{ele:"#realName",datatype:"s",maxlength:"10",nullmsg:"请填写您的真实姓名",errormsg:"除下划线以外的特殊字符不允许输入,请填写10字以内的昵称"}],i=$(".registerform").Validform(d).addRule(f);$(".change").text($("#serve").val().length),$("#serve").bind("input propertychange",function(){var a=$(this).val().length;$(".change").text(a)}),$(function(){0==$("input[name='certificatess']:checked").length&&$("input[name='certificatess']").attr("checked","checked")}),$("#saveBtnEredar").on("click",function(){var d=10,f=$(this).attr("data-imgnum");f||(f=d);var j=i.check(),k=a.selectvalid(),l=null,m=[],n=[],o=[],p={},q=$("#contentText").val(),r=a.allimgvalid($('.imgbox:not(".cnat")')),s=a.groupimgvalid($(".groupimg"),"请选择图片！");if(e=b.tuwencheck(),h=c.timeFun(),g=b.picNumCheck(f),!e)return a.dialog.msg("关于我的图文介绍至少需要输入一段文字或一张图片","error"),!1;if(!g)return a.dialog.msg("关于我的图片最多只能上传"+f+"张","error"),!1;if(j&&k&&r&&s&&e&&h){l=a.paramcompare($(".registerform").serializeArray()),l.pictureTextDOs=q;for(var t in l){if("certificatess"==t&&l[t]){for(var u=0;u<l[t].length;u++)p.id=parseInt(l[t][u]),p.name="",p.type=1,$('input[name="certificatess"]:checked').filter(function(){$(this).val()==l[t][u]&&(p.name=$(this).next("label").text())}),m.push(p),p={};l[t]=JSON.stringify(m),m.length=0}if("imgpath"==t&&l[t]&&(n=l[t],n.constructor==String&&(o.push(n),l[t]=JSON.stringify(o)),n instanceof Array)){for(var v=0;v<n.length;v++)""!=n[v]&&o.push(n[v]);l[t]=JSON.stringify(o)}}$.ajax({type:"POST",url:a.urlpath.eredar,data:l,success:function(b){a.isLogin(b),b.success?(a.dialog.msg("保存成功","success"),window.location.href=window.location.href):(a.dialog.msg(b.msg,"error"),b.value&&(window.location.href=b.value))}})}})},eredrInfoTab:function(){$(".eredar-info ul li").click(function(){$(this).addClass("on").siblings().removeClass("on");var a=$(this).index();$(".eredar-list").hide(),$(".eredar-list"+(a+1)).show()})},timeFun:function(){var a=!1;return $("#tm").val()?(a=!0,$("#tm").parent().find(".Validform_checktip").remove(),$("#tm").parent().append('<span class="Validform_checktip Validform_right"></span>')):($("#tm").parent().find(".Validform_checktip").remove(),$("#tm").parent().append('<span class="Validform_checktip Validform_wrong">请填写时间</span>')),a},nickName:function(){$("#nickName").blur(function(){var b=this;$.ajax({type:"POST",url:"user/chargeUserNickName",data:{nickName:$("#nickName").val()},success:function(c){a.isLogin(c),c.success||($(b).parent().find(".Validform_checktip").remove(),$(b).parent().append('<span class="Validform_checktip Validform_wrong">此用户昵称已被使用！</span>'))}})})},provinceFun:function(){a.actiondata("province","city")}},module.exports=new c});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-29 */