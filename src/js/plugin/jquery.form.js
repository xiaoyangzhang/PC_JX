/*! PC_JX - v1.0.0 - 2016-11-07 */
!function(a){function b(){a.fn.ajaxSubmit.debug&&window.console&&window.console.log&&window.console.log("[jquery.form] "+Array.prototype.join.call(arguments,""))}a.httpData=function(a,b,c){var d=a.getResponseHeader("content-type"),e="xml"==b||!b&&d&&d.indexOf("xml")>=0,f=e?a.responseXML:a.responseText;if(e&&"parsererror"==f.documentElement.tagName)throw"parsererror";if(c&&c.dataFilter&&(f=c.dataFilter(f,b)),"string"==typeof f)return"script"==b&&jQuery.globalEval(f.replace(/<[^>]+>/g,"")),"json"==b&&(f=window.eval("("+f+")")),f.replace(/<[^>]+>/g,"")},a.handleError=function(a,b,c,d){a.error&&a.error.call(a.context||a,b,c,d),a.global&&(a.context?jQuery(a.context):jQuery.event).trigger("ajaxError",[b,a,d])},a.fn.ajaxSubmit=function(c){function d(){function b(){if(!n++){k.detachEvent?k.detachEvent("onload",b):k.removeEventListener("load",b,!1);var c=!0;try{if(o)throw"timeout";var e,g;if(g=k.contentWindow?k.contentWindow.document:k.contentDocument?k.contentDocument:k.document,(null==g.body||""==g.body.innerHTML)&&!r)return r=1,n--,void setTimeout(b,100);if(l.responseText=g.body?g.body.innerHTML:null,l.responseXML=g.XMLDocument?g.XMLDocument:g,l.getResponseHeader=function(a){var b={"content-type":f.dataType};return b[a]},"json"==f.dataType||"script"==f.dataType){var h=g.getElementsByTagName("textarea")[0];l.responseText=h?h.value:l.responseText}else"xml"!=f.dataType||l.responseXML||null==l.responseText||(l.responseXML=d(l.responseText));e=a.httpData(l,f.dataType)}catch(b){c=!1,a.handleError(f,l,"error",b)}c&&(f.success(e,"success"),m&&a.event.trigger("ajaxSuccess",[l,f])),m&&a.event.trigger("ajaxComplete",[l,f]),m&&!--a.active&&a.event.trigger("ajaxStop"),f.complete&&f.complete(l,c?"success":"error"),setTimeout(function(){},100)}}function d(a,b){return window.ActiveXObject?(b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a)):b=(new DOMParser).parseFromString(a,"text/xml"),b&&b.documentElement&&"parsererror"!=b.documentElement.tagName?b:null}var e=j[0];if(a(":input[name=submit]",e).length)return void alert('Error: Form elements must not be named "submit".');var f=a.extend({},a.ajaxSettings,c),g=jQuery.extend(!0,{},a.extend(!0,{},a.ajaxSettings),f),h="jqFormIO"+(new Date).getTime(),i=a('<iframe id="'+h+'" name="'+h+'" src="about:blank" />'),k=i[0];i.css({position:"absolute",top:"-1000px",left:"-1000px"});var l={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1,i.attr("src","about:blank")}},m=f.global;if(m&&!a.active++&&a.event.trigger("ajaxStart"),m&&a.event.trigger("ajaxSend",[l,f]),g.beforeSend&&g.beforeSend(l,g)===!1)return void(g.global&&jQuery.active--);if(!l.aborted){var n=0,o=0,p=e.clk;if(p){var q=p.name;q&&!p.disabled&&(c.extraData=c.extraData||{},c.extraData[q]=p.value,"image"==p.type&&(c.extraData[name+".x"]=e.clk_x,c.extraData[name+".y"]=e.clk_y))}setTimeout(function(){var d=j.attr("target"),g=j.attr("action");e.setAttribute("target",h),"POST"!=e.getAttribute("method")&&e.setAttribute("method","POST"),e.getAttribute("action")!=f.url&&e.setAttribute("action",f.url),c.skipEncodingOverride||j.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&setTimeout(function(){o=!0,b()},f.timeout);var l=[];try{if(c.extraData)for(var m in c.extraData)l.push(a('<input type="hidden" name="'+m+'" value="'+c.extraData[m]+'" />').appendTo(e)[0]);i.appendTo("body"),k.attachEvent?k.attachEvent("onload",b):k.addEventListener("load",b,!1),e.submit()}finally{e.setAttribute("action",g),d?e.setAttribute("target",d):j.removeAttr("target"),a(l).remove()}},50);var r=0}}if(!this.length)return b("ajaxSubmit: skipping submit process - no element selected"),this;"function"==typeof c&&(c={success:c}),c=a.extend({url:this.attr("action")||window.location.toString(),type:this.attr("method")||"GET"},c||{});var e={};if(this.trigger("form-pre-serialize",[this,c,e]),e.veto)return b("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(c.beforeSerialize&&c.beforeSerialize(this,c)===!1)return b("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var f=this.formToArray(c.semantic);if(c.data){c.extraData=c.data;for(var g in c.data)if(c.data[g]instanceof Array)for(var h in c.data[g])f.push({name:g,value:c.data[g][h]});else f.push({name:g,value:c.data[g]})}if(c.beforeSubmit&&c.beforeSubmit(f,this,c)===!1)return b("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[f,this,c,e]),e.veto)return b("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var i=a.param(f);"GET"==c.type.toUpperCase()?(c.url+=(c.url.indexOf("?")>=0?"&":"?")+i,c.data=null):c.data=i;var j=this,k=[];if(c.resetForm&&k.push(function(){j.resetForm()}),c.clearForm&&k.push(function(){j.clearForm()}),!c.dataType&&c.target){var l=c.success||function(){};k.push(function(b){a(c.target).html(b).each(l,arguments)})}else c.success?k.push(c.success):c.success=function(a,b){for(var d=0,e=k.length;d<e;d++)k[d].apply(c,[a,b,j])};for(var m=a("input:file",this).fieldValue(),n=!1,o=0;o<m.length;o++)m[o]&&(n=!0);return c.iframe||n?c.closeKeepAlive?a.get(c.closeKeepAlive,d):d():a.ajax(c),this.trigger("form-submit-notify",[this,c]),this},a.fn.ajaxForm=function(b){return this.ajaxFormUnbind().bind("submit.form-plugin",function(){return a(this).ajaxSubmit(b),!1}).each(function(){a(":submit,input:image",this).bind("click.form-plugin",function(b){var c=this.form;if(c.clk=this,"image"==this.type)if(void 0!=b.offsetX)c.clk_x=b.offsetX,c.clk_y=b.offsetY;else if("function"==typeof a.fn.offset){var d=a(this).offset();c.clk_x=b.pageX-d.left,c.clk_y=b.pageY-d.top}else c.clk_x=b.pageX-this.offsetLeft,c.clk_y=b.pageY-this.offsetTop;setTimeout(function(){c.clk=c.clk_x=c.clk_y=null},10)})})},a.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin"),this.each(function(){a(":submit,input:image",this).unbind("click.form-plugin")})},a.fn.formToArray=function(b){var c=[];if(0==this.length)return c;var d=this[0],e=b?d.getElementsByTagName("*"):d.elements;if(!e)return c;for(var f=0,g=e.length;f<g;f++){var h=e[f],i=h.name;if(i)if(b&&d.clk&&"image"==h.type)h.disabled||d.clk!=h||c.push({name:i+".x",value:d.clk_x},{name:i+".y",value:d.clk_y});else{var j=a.fieldValue(h,!0);if(j&&j.constructor==Array)for(var k=0,l=j.length;k<l;k++)c.push({name:i,value:j[k]});else null!==j&&"undefined"!=typeof j&&c.push({name:i,value:j})}}if(!b&&d.clk)for(var m=d.getElementsByTagName("input"),f=0,g=m.length;f<g;f++){var n=m[f],i=n.name;i&&!n.disabled&&"image"==n.type&&d.clk==n&&c.push({name:i+".x",value:d.clk_x},{name:i+".y",value:d.clk_y})}return c},a.fn.formSerialize=function(b){return a.param(this.formToArray(b))},a.fn.fieldSerialize=function(b){var c=[];return this.each(function(){var d=this.name;if(d){var e=a.fieldValue(this,b);if(e&&e.constructor==Array)for(var f=0,g=e.length;f<g;f++)c.push({name:d,value:e[f]});else null!==e&&"undefined"!=typeof e&&c.push({name:this.name,value:e})}}),a.param(c)},a.fn.fieldValue=function(b){for(var c=[],d=0,e=this.length;d<e;d++){var f=this[d],g=a.fieldValue(f,b);null===g||"undefined"==typeof g||g.constructor==Array&&!g.length||(g.constructor==Array?a.merge(c,g):c.push(g))}return c},a.fieldValue=function(a,b){var c=a.name,d=a.type,e=a.tagName.toLowerCase();if("undefined"==typeof b&&(b=!0),b&&(!c||a.disabled||"reset"==d||"button"==d||("checkbox"==d||"radio"==d)&&!a.checked||("submit"==d||"image"==d)&&a.form&&a.form.clk!=a||"select"==e&&a.selectedIndex==-1))return null;if("select"==e){var f=a.selectedIndex;if(f<0)return null;for(var g=[],h=a.options,i="select-one"==d,j=i?f+1:h.length,k=i?f:0;k<j;k++){var l=h[k];if(l.selected){var m=l.value;if(m||(m=l.attributes&&l.attributes.value&&!l.attributes.value.specified?l.text:l.value),i)return m;g.push(m)}}return g}return a.value},a.fn.clearForm=function(){return this.each(function(){a("input,select,textarea",this).clearFields()})},a.fn.clearFields=a.fn.clearInputs=function(){return this.each(function(){var a=this.type,b=this.tagName.toLowerCase();"text"==a||"password"==a||"textarea"==b?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==b&&(this.selectedIndex=-1)})},a.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},a.fn.enable=function(a){return void 0==a&&(a=!0),this.each(function(){this.disabled=!a})},a.fn.selected=function(b){return void 0==b&&(b=!0),this.each(function(){var c=this.type;if("checkbox"==c||"radio"==c)this.checked=b;else if("option"==this.tagName.toLowerCase()){var d=a(this).parent("select");b&&d[0]&&"select-one"==d[0].type&&d.find("option").selected(!1),this.selected=b}})}}(jQuery);
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-07 */