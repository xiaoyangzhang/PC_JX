/*! PC_JX - v1.0.0 - 2017-01-17 */
!function(a,b,c){function d(b,c){var d=(a(window).width()-b.outerWidth())/2,e=(a(window).height()-b.outerHeight())/2,e=(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)+(e>0?e:0);b.css({left:d}).animate({top:e},{duration:c,queue:!1})}var e=null,f=null,g=!0,h={tit:"提示信息",w:{"*":"不能为空！","*6-16":"请填写6到16位任意字符！",n:"请填写数字！","n6-16":"请填写6到16位数字！",s:"不能输入特殊字符！","s6-18":"请填写6到18位字符！",pwd:"请输入6-16位密码，需同时包含字母及数字！",p:"请填写邮政编码！",m:"请填写手机号码！",tel:"请填写座机例:(0731-83187200)或手机号码!",e:"邮箱地址格式不对！",url:"请填写网址！",card:"请填写正确（身份证号）例如：462245199003044859！",dlic:"请填写正确（驾驶证号）例如：450401196501！",psport:"请填写正确（护照号）例如：G-15525453！",gidcard:"请填写正确（导游证号）例如：D-4621-005480！",null_n:"请填写数字！","null_n6-16":"请填写6到16位数字！",null_s:"不能输入特殊字符！","null_s6-18":"请填写6到18位字符！",null_p:"请填写邮政编码！",null_m:"请填写手机号码！",null_tel:"请填写座机例:(0731-83187200)或手机号码!",null_e:"邮箱地址格式不对！",null_url:"请填写网址！"},def:"请填写正确信息！",undef:"datatype未定义！",reck:"两次输入的内容不一致！",r:"",c:"正在检测信息…",s:"请{填写|选择}{0|信息}！",v:"所填信息没有经过验证，请稍后…",p:"正在提交数据…"};a.Tipmsg=h;var i=function(b,d,e){var d=a.extend({},i.defaults,d);d.datatype&&a.extend(i.util.dataType,d.datatype);var f=this;return f.tipmsg={w:{}},f.forms=b,f.objects=[],e!==!0&&void b.each(function(){if("inited"==this.validform_inited)return!0;this.validform_inited="inited";var b=this;b.settings=a.extend({},d);var e=a(b);b.validform_status="normal",e.data("tipmsg",f.tipmsg),e.delegate("[datatype]","blur",function(){var a=arguments[1],b=this;setTimeout(function(){i.util.check.call(b,e,a)},100)}),e.delegate(":text","keypress",function(a){13==a.keyCode&&0==e.find(":submit").length&&setTimeout(function(){e.submit()},50)}),i.util.enhance.call(e,b.settings.tiptype,b.settings.usePlugin,b.settings.tipSweep),b.settings.btnSubmit&&e.find(b.settings.btnSubmit).bind("click",function(){return setTimeout(function(){e.trigger("submit")},50),!1}),e.submit(function(){var a=i.util.submitForm.call(e,b.settings);return a===c&&(a=!0),a}),e.find("[type='reset']").add(e.find(b.settings.btnReset)).bind("click",function(){i.util.resetForm.call(e)})})};i.defaults={parents:"td",tiptype:4,tipSweep:!1,showAllError:!1,postonce:!1,ajaxPost:!1},i.util={dataType:{"*":/[\w\W]+/,"*6-16":/^[\w\W]{6,16}$/,"s6-18":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,"n6-16":/^\d{6,16}$/,pwd:/^(?=.{6,16}$)(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]+$/,n:/^\d+$/,s:/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,p:/^[0-9]{6}$/,m:/^1[0-9]{10}$/,tel:/^0\d{2,3}-?\d{7,8}$|^1[0-9]{10}$/,e:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,url:/^(\w+:\/\/)?\w+(\.\w+)+.*$/,card:/^(\d{15}$|^\d{16}$|^\d{17}$|^\d{18}$|^\d{17}[a-zA-z])$/,dlic:/^\d{12}$/,psport:/^[a-zA-z]-?\d{7,8}$/,gidcard:/^[a-zA-z]-?\d{4}-?\d{6}$/,"null_s6-18":/^([\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18})?$/,"null_n6-16":/^(\d{6,16})?$/,null_n:/^(\d+)?$/,null_s:/^([\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+)?$/,null_p:/^([0-9]{6})?$/,null_m:/^(1[0-9]{10})?$/,null_tel:/^(0\d{2,3}-?\d{7,8}|1[0-9]{10})?$/,null_e:/^(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)?$/,null_url:/^((\w+:\/\/)?\w+(\.\w+)+.*)?$/},toString:Object.prototype.toString,isEmpty:function(b){return""===b||b===a.trim(this.attr("tip"))},getValue:function(b){var d,e=this;return b.is(":radio")?(d=e.find(":radio[name='"+b.attr("name")+"']:checked").val(),d=d===c?"":d):b.is(":checkbox")?(d="",e.find(":checkbox[name='"+b.attr("name")+"']:checked").each(function(){d+=a(this).val()+","}),d=d===c?"":d):d=b.val()==b.attr("placeholder")?b.val():b.val(),d=a.trim(d),i.util.isEmpty.call(b,d)?"":d},enhance:function(b,c,d,e){var f=this;f.find("[datatype]").each(function(){var c=a(this).closest(".gf-select").length>0?a(this).closest(".gf-select"):a(this);2==b?0==c.parent().next().find(".Validform_checktip").length&&(c.parent().next().append("<span class='Validform_checktip' />"),c.siblings(".Validform_checktip").remove()):3!=b&&4!=b||0==c.siblings(".Validform_checktip").length&&(c.parent().append("<span class='Validform_checktip' />"),c.parent().next().find(".Validform_checktip").remove())}),f.find("input[recheck]").each(function(){if("inited"==this.validform_inited)return!0;this.validform_inited="inited";var b=a(this),c=f.find("input[name='"+a(this).attr("recheck")+"']");c.bind("keyup",function(){if(c.val()==b.val()&&""!=c.val()){if(c.attr("tip")&&c.attr("tip")==c.val())return!1;b.trigger("blur")}}).bind("blur",function(){if(c.val()!=b.val()&&""!=b.val()){if(b.attr("tip")&&b.attr("tip")==b.val())return!1;b.trigger("blur")}})}),f.find("[tip]").each(function(){if("inited"==this.validform_inited)return!0;this.validform_inited="inited";var b=a(this).attr("tip"),c=a(this).attr("altercss");a(this).focus(function(){a(this).val()==b&&(a(this).val(""),c&&a(this).removeClass(c))}).blur(function(){""===a.trim(a(this).val())&&(a(this).val(b),c&&a(this).addClass(c))})}),f.find(":checkbox[datatype],:radio[datatype]").each(function(){if("inited"==this.validform_inited)return!0;this.validform_inited="inited";var b=a(this),c=b.attr("name");f.find("[name='"+c+"']").filter(":checkbox,:radio").bind("click",function(){setTimeout(function(){b.trigger("blur")},0)})}),f.find("select[datatype][multiple]").bind("click",function(){var b=a(this);setTimeout(function(){b.trigger("blur")},0)}),i.util.usePlugin.call(f,c,b,d,e)},usePlugin:function(b,c,d,e){var f=this,b=b||{};if(f.find("input[plugin='swfupload']").length&&"undefined"!=typeof swfuploadhandler){var g={custom_settings:{form:f,showmsg:function(a,b,e){i.util.showmsg.call(f,a,c,{obj:f.find("input[plugin='swfupload']"),type:b,sweep:d})}}};g=a.extend(!0,{},b.swfupload,g),f.find("input[plugin='swfupload']").each(function(b){return"inited"==this.validform_inited||(this.validform_inited="inited",a(this).val(""),void swfuploadhandler.init(g,b))})}if(f.find("input[plugin='datepicker']").length&&a.fn.datePicker&&(b.datepicker=b.datepicker||{},b.datepicker.format&&(Date.format=b.datepicker.format,delete b.datepicker.format),b.datepicker.firstDayOfWeek&&(Date.firstDayOfWeek=b.datepicker.firstDayOfWeek,delete b.datepicker.firstDayOfWeek),f.find("input[plugin='datepicker']").each(function(c){return"inited"==this.validform_inited||(this.validform_inited="inited",b.datepicker.callback&&a(this).bind("dateSelected",function(){var c=new Date(a.event._dpCache[this._dpId].getSelected()[0]).asString(Date.format);b.datepicker.callback(c,this)}),void a(this).datePicker(b.datepicker))})),f.find("input[plugin*='passwordStrength']").length&&a.fn.passwordStrength&&(b.passwordstrength=b.passwordstrength||{},b.passwordstrength.showmsg=function(a,b,e){i.util.showmsg.call(f,b,c,{obj:a,type:e,sweep:d})},f.find("input[plugin='passwordStrength']").each(function(c){return"inited"==this.validform_inited||(this.validform_inited="inited",void a(this).passwordStrength(b.passwordstrength))})),"addRule"!=e&&b.jqtransform&&a.fn.jqTransSelect){if("true"==f[0].jqTransSelected)return;f[0].jqTransSelected="true";var h=function(b){var c=a(".jqTransformSelectWrapper ul:visible");c.each(function(){var c=a(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);b&&c.oLabel&&c.oLabel.get(0)==b.get(0)||a(this).hide()})},j=function(b){0===a(b.target).parents(".jqTransformSelectWrapper").length&&h(a(b.target))},k=function(){a(document).mousedown(j)};b.jqtransform.selector?(f.find(b.jqtransform.selector).filter('input:submit, input:reset, input[type="button"]').jqTransInputButton(),f.find(b.jqtransform.selector).filter("input:text, input:password").jqTransInputText(),f.find(b.jqtransform.selector).filter("input:checkbox").jqTransCheckBox(),f.find(b.jqtransform.selector).filter("input:radio").jqTransRadio(),f.find(b.jqtransform.selector).filter("textarea").jqTransTextarea(),f.find(b.jqtransform.selector).filter("select").length>0&&(f.find(b.jqtransform.selector).filter("select").jqTransSelect(),k())):f.jqTransform(),f.find(".jqTransformSelectWrapper").find("li a").click(function(){a(this).parents(".jqTransformSelectWrapper").find("select").trigger("blur")})}},getNullmsg:function(a){var b,c=this,d=/[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z\s]+/g,e=a[0].settings.label||".Validform_label";if(e=c.siblings(e).eq(0).text()||c.siblings().find(e).eq(0).text()||c.parent().siblings(e).eq(0).text()||c.parent().siblings().find(e).eq(0).text(),e=e.replace(/\s(?![a-zA-Z])/g,"").match(d),e=e?e.join(""):[""],d=/\{(.+)\|(.+)\}/,b=a.data("tipmsg").s||h.s,""!=e){if(b=b.replace(/\{0\|(.+)\}/,e),c.attr("recheck"))return b=b.replace(/\{(.+)\}/,""),c.attr("nullmsg",b),b}else b=c.is(":checkbox,:radio,select")?b.replace(/\{0\|(.+)\}/,""):b.replace(/\{0\|(.+)\}/,"$1");return b=c.is(":checkbox,:radio,select")?b.replace(d,"$2"):b.replace(d,"$1"),c.attr("nullmsg",b),b},getErrormsg:function(b,c,d){var e,f=/^(.+?)((\d+)-(\d+))?$/,g=/^(.+?)(\d+)-(\d+)$/,i=/(.*?)\d+(.+?)\d+(.*)/,j=c.match(f);if("recheck"==d)return e=b.data("tipmsg").reck||h.reck;var k=a.extend({},h.w,b.data("tipmsg").w);if(j[0]in k)return b.data("tipmsg").w[j[0]]||h.w[j[0]];for(var l in k)if(l.indexOf(j[1])!=-1&&g.test(l))return e=(b.data("tipmsg").w[l]||h.w[l]).replace(i,"$1"+j[3]+"$2"+j[4]+"$3"),b.data("tipmsg").w[j[0]]=e,e;return b.data("tipmsg").def||h.def},_regcheck:function(a,b,d,e){var e=e,f=null,g=!1,j=/\/.+\//g,k=/^(.+?)(\d+)-(\d+)$/,l=3;if(j.test(a)){var m=a.match(j)[0].slice(1,-1),n=a.replace(j,""),o=RegExp(m,n);g=o.test(b)}else if("[object Function]"==i.util.toString.call(i.util.dataType[a]))g=i.util.dataType[a](b,d,e,i.util.dataType),g===!0||g===c?g=!0:(f=g,g=!1);else{if(!(a in i.util.dataType)){var p,q=a.match(k);if(q){for(var r in i.util.dataType)if(p=r.match(k),p&&q[1]===p[1]){var s=i.util.dataType[r].toString(),n=s.match(/\/[mgi]*/g)[1].replace("/",""),t=new RegExp("\\{"+p[2]+","+p[3]+"\\}","g");s=s.replace(/\/[mgi]*/g,"/").replace(t,"{"+q[2]+","+q[3]+"}").replace(/^\//,"").replace(/\/$/,""),i.util.dataType[a]=new RegExp(s,n);break}}else g=!1,f=e.data("tipmsg").undef||h.undef}"[object RegExp]"==i.util.toString.call(i.util.dataType[a])&&(g=i.util.dataType[a].test(b))}if(g){if(l=2,f=d.attr("sucmsg")||e.data("tipmsg").r||h.r,d.attr("recheck")){var u=e.find("input[name='"+d.attr("recheck")+"']:first");b!=u.val()&&(g=!1,l=3,f=d.attr("errormsg")||i.util.getErrormsg.call(d,e,a,"recheck"))}}else f=f||d.attr("errormsg")||i.util.getErrormsg.call(d,e,a),i.util.isEmpty.call(d,b)&&(f=d.attr("nullmsg")||i.util.getNullmsg.call(d,e));return{passed:g,type:l,info:f}},regcheck:function(a,b,c){var d=this,e=null;if("ignore"===c.attr("ignore")&&i.util.isEmpty.call(c,b))return c.data("cked")&&(e=""),{passed:!0,type:4,info:e};c.data("cked","cked");for(var f,g=i.util.parseDatatype(a),h=0;h<g.length;h++){for(var j=0;j<g[h].length&&(f=i.util._regcheck(g[h][j],b,c,d),f.passed);j++);if(f.passed)break}return f},parseDatatype:function(a){var b=/\/.+?\/[mgi]*(?=(,|$|\||\s))|[\w\*-]+/g,c=a.match(b),d=a.replace(b,"").replace(/\s*/g,"").split(""),e=[],f=0;e[0]=[],e[0].push(c[0]);for(var g=0;g<d.length;g++)"|"==d[g]&&(f++,e[f]=[]),e[f].push(c[g+1]);return e},showmsg:function(b,e,h,j){if(b!=c&&("bycheck"!=j||!h.sweep||(!h.obj||h.obj.is(".Validform_error"))&&"function"!=typeof e)){if(a.extend(h,{curform:this}),"function"==typeof e)return void e(b,h,i.util.cssctl);(1==e||"byajax"==j&&4!=e)&&f.find(".Validform_info").html(b),(1==e&&"bycheck"!=j&&2!=h.type||"byajax"==j&&4!=e)&&(g=!1,f.find(".iframe").css("height",f.outerHeight()),f.show(),d(f,100)),h.obj=h.obj.closest(".gf-select").length>0?h.obj.closest(".gf-select"):h.obj,2==e&&h.obj&&(h.obj.parent().next().find(".Validform_checktip").html(b),i.util.cssctl(h.obj.parent().next().find(".Validform_checktip"),h.type)),3!=e&&4!=e||!h.obj||(h.obj.siblings(".Validform_checktip").html(b),i.util.cssctl(h.obj.siblings(".Validform_checktip"),h.type))}},cssctl:function(a,b){switch(b){case 1:a.removeClass("Validform_right Validform_wrong").addClass("Validform_checktip");break;case 2:a.removeClass("Validform_wrong").addClass("Validform_checktip Validform_right");break;case 4:a.removeClass("Validform_right Validform_wrong").addClass("Validform_checktip");break;default:a.removeClass("Validform_right").addClass("Validform_checktip Validform_wrong")}},check:function(b,c,d){var f=b[0].settings,c=c||"",g=i.util.getValue.call(b,a(this));if(f.ignoreHidden&&a(this).is(":hidden")||"dataIgnore"===a(this).data("dataIgnore"))return!0;if(f.dragonfly&&!a(this).data("cked")&&i.util.isEmpty.call(a(this),g)&&"ignore"!=a(this).attr("ignore"))return!1;var j=i.util.regcheck.call(b,a(this).attr("datatype"),g,a(this));if(g==this.validform_lastval&&!a(this).attr("recheck")&&""==c)return!!j.passed;this.validform_lastval=g;var k;if(e=k=a(this),!j.passed)return i.util.abort.call(k[0]),d||(i.util.showmsg.call(b,j.info,f.tiptype,{obj:a(this),type:j.type,sweep:f.tipSweep},"bycheck"),!f.tipSweep&&k.addClass("Validform_error")),!1;var l=a(this).attr("ajaxurl");if(l&&!i.util.isEmpty.call(a(this),g)&&!d){var m=a(this);if("postform"==c?m[0].validform_subpost="postform":m[0].validform_subpost="","posting"===m[0].validform_valid&&g==m[0].validform_ckvalue)return"ajax";m[0].validform_valid="posting",m[0].validform_ckvalue=g,i.util.showmsg.call(b,b.data("tipmsg").c||h.c,f.tiptype,{obj:m,type:4,sweep:f.tipSweep},"bycheck"),i.util.abort.call(k[0]);var n=a.extend(!0,{},f.ajaxurl||{}),o={type:"POST",cache:!1,url:l,data:"param="+encodeURIComponent(g)+"&name="+encodeURIComponent(a(this).attr("name")),success:function(a){a.success?(m[0].validform_valid="true",a.info&&m.attr("sucmsg",a.info),i.util.showmsg.call(b,m.attr("sucmsg")||b.data("tipmsg").r||h.r,f.tiptype,{obj:m,type:4,sweep:f.tipSweep},"bycheck"),k.removeClass("Validform_error"),e=null,"postform"==m[0].validform_subpost&&b.trigger("submit")):(m[0].validform_valid="false",k.addClass("Validform_error")),k[0].validform_ajax=null},error:function(a){if("200"==a.status)return"y"==a.responseText?n.success({status:"y"}):n.success({status:"n",info:a.responseText}),!1;if("abort"!==a.statusText){var c="status: "+a.status+"; statusText: "+a.statusText;i.util.showmsg.call(b,c,f.tiptype,{obj:m,type:4,sweep:f.tipSweep}),k.addClass("Validform_error")}return m[0].validform_valid=a.statusText,k[0].validform_ajax=null,!0}};if(n.success){var p=n.success;n.success=function(a){o.success(a),p(a,m)}}if(n.error){var q=n.error;n.error=function(a){o.error(a)&&q(a,m)}}return n=a.extend({},o,n,{dataType:"json"}),k[0].validform_ajax=a.ajax(n),"ajax"}return l&&i.util.isEmpty.call(a(this),g)&&(i.util.abort.call(k[0]),k[0].validform_valid="true"),d||(i.util.showmsg.call(b,j.info,f.tiptype,{obj:a(this),type:j.type,sweep:f.tipSweep},"bycheck"),k.removeClass("Validform_error")),e=null,!0},submitForm:function(b,c,d,f,g){var j=this;if("posting"===j[0].validform_status)return!1;if(b.postonce&&"posted"===j[0].validform_status)return!1;var k=b.beforeCheck&&b.beforeCheck(j);if(k===!1)return!1;var l,m=!0;if(j.find("[datatype]").each(function(){if(c)return!1;if(b.ignoreHidden&&a(this).is(":hidden")||"dataIgnore"===a(this).data("dataIgnore"))return!0;var d,f=i.util.getValue.call(j,a(this));if(e=d=a(this),l=i.util.regcheck.call(j,a(this).attr("datatype"),f,a(this)),!l.passed)return i.util.showmsg.call(j,l.info,b.tiptype,{obj:a(this),type:l.type,sweep:b.tipSweep}),d.addClass("Validform_error"),b.showAllError?(m&&(m=!1),!0):(d.focus(),m=!1,!1);if(a(this).attr("ajaxurl")&&!i.util.isEmpty.call(a(this),f)){if("true"!==this.validform_valid){var g=a(this);return i.util.showmsg.call(j,j.data("tipmsg").v||h.v,b.tiptype,{obj:g,type:4,sweep:b.tipSweep}),d.addClass("Validform_error"),g.trigger("blur",["postform"]),b.showAllError?(m&&(m=!1),!0):(m=!1,!1)}}else a(this).attr("ajaxurl")&&i.util.isEmpty.call(a(this),f)&&(i.util.abort.call(this),this.validform_valid="true");i.util.showmsg.call(j,l.info,b.tiptype,{obj:a(this),type:l.type,sweep:b.tipSweep}),d.removeClass("Validform_error"),e=null}),b.showAllError&&j.find(".Validform_error:first").focus(),m){var n=b.beforeSubmit&&b.beforeSubmit(j);if(n===!1)return!1;if(j[0].validform_status="posting",!b.ajaxPost&&"ajaxPost"!==f){b.postonce||(j[0].validform_status="normal");var d=d||b.url;return d&&j.attr("action",d),b.callback&&b.callback(j)}var o=a.extend(!0,{},b.ajaxpost||{});if(o.url=d||o.url||b.url||j.attr("action"),i.util.showmsg.call(j,j.data("tipmsg").p||h.p,b.tiptype,{obj:j,type:1,sweep:b.tipSweep},"byajax"),g?o.async=!1:g===!1&&(o.async=!0),o.success){var p=o.success;o.success=function(a){b.callback&&b.callback(a),j[0].validform_ajax=null,a.success?j[0].validform_status="posted":j[0].validform_status="normal",p(a,j)}}if(o.error){var q=o.error;o.error=function(a){b.callback&&b.callback(a),j[0].validform_status="normal",j[0].validform_ajax=null,q(a,j)}}var r={type:"POST",async:!0,data:j.serializeArray(),success:function(a){a.success?(j[0].validform_status="posted",i.util.showmsg.call(j,a.info,b.tiptype,{obj:j,type:4,sweep:b.tipSweep},"byajax")):(j[0].validform_status="normal",i.util.showmsg.call(j,a.info,b.tiptype,{obj:j,type:4,sweep:b.tipSweep},"byajax")),b.callback&&b.callback(a),j[0].validform_ajax=null},error:function(a){var c="status: "+a.status+"; statusText: "+a.statusText;i.util.showmsg.call(j,c,b.tiptype,{obj:j,type:4,sweep:b.tipSweep},"byajax"),b.callback&&b.callback(a),j[0].validform_status="normal",j[0].validform_ajax=null}};o=a.extend({},r,o,{dataType:"json"}),j[0].validform_ajax=a.ajax(o)}return!1},resetForm:function(){var a=this;a.each(function(){this.reset&&this.reset(),this.validform_status="normal"}),a.find(".Validform_right").text(""),a.find(".passwordStrength").children().removeClass("bgStrength"),a.find(".Validform_checktip").removeClass("Validform_wrong Validform_right"),a.find(".Validform_error").removeClass("Validform_error"),a.find("[datatype]").removeData("cked").removeData("dataIgnore").each(function(){this.validform_lastval=null}),a.eq(0).find("input:first").focus()},abort:function(){this.validform_ajax&&this.validform_ajax.abort()}},a.Datatype=i.util.dataType,i.prototype={dataType:i.util.dataType,eq:function(b){var c=this;return b>=c.forms.length?null:(b in c.objects||(c.objects[b]=new i(a(c.forms[b]).get(),{},!0)),c.objects[b])},resetStatus:function(){var b=this;return a(b.forms).each(function(){this.validform_status="normal"}),this},setStatus:function(b){var c=this;return a(c.forms).each(function(){this.validform_status=b||"posting"}),this},getStatus:function(){var b=this,c=a(b.forms)[0].validform_status;return c},ignore:function(b){var c=this,b=b||"[datatype]";return a(c.forms).find(b).each(function(){a(this).data("dataIgnore","dataIgnore").removeClass("Validform_error")}),this},unignore:function(b){var c=this,b=b||"[datatype]";return a(c.forms).find(b).each(function(){a(this).removeData("dataIgnore")}),this},addRule:function(b){for(var c=this,b=b||[],d=0;d<b.length;d++){var e=a(c.forms).find(b[d].ele);for(var f in b[d])"ele"!==f&&e.attr(f,b[d][f])}return a(c.forms).each(function(){var b=a(this);i.util.enhance.call(b,this.settings.tiptype,this.settings.usePlugin,this.settings.tipSweep,"addRule")}),this},ajaxPost:function(b,c,d){var e=this;return a(e.forms).each(function(){i.util.submitForm.call(a(e.forms[0]),this.settings,b,d,"ajaxPost",c)}),this},submitForm:function(b,d){var e=this;return a(e.forms).each(function(){var e=i.util.submitForm.call(a(this),this.settings,b,d);e===c&&(e=!0),e===!0&&this.submit()}),this},resetForm:function(){var b=this;return i.util.resetForm.call(a(b.forms)),this},abort:function(){var b=this;return a(b.forms).each(function(){i.util.abort.call(this)}),this},check:function(b,c){var c=c||"[datatype]",d=this,e=a(d.forms),f=!0;return e.find(c).each(function(){i.util.check.call(this,e,"",b)||(f=!1)}),f},config:function(b){var c=this;return b=b||{},a(c.forms).each(function(){var c=a(this);this.settings=a.extend(!0,this.settings,b),i.util.enhance.call(c,this.settings.tiptype,this.settings.usePlugin,this.settings.tipSweep)}),this}},a.fn.Validform=function(a){return new i(this,a)}}(jQuery,window);
/*! PC_JX xiongzhaoling 最后修改于： 2017-01-17 */