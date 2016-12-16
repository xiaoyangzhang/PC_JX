/*! PC_JX - v1.0.0 - 2016-12-16 */
define(function(require,exports,module){$public=require("public"),function(a,b,c){function d(b,c){this.element=b,this.settings=a.extend({},f,c),this._defaults=f,this._name=e,this.init()}var e="selectlist",f={enable:!0,zIndex:10,width:100,height:32,border:null,borderRadius:null,showMaxHeight:null,optionHeight:34,triangleSize:6,triangleColor:"#999",topPosition:!1,speed:100,onChange:function(){"city"!=this.element.id&&$public.selectvalid(this.element.id)},onSuccess:function(b){var c=a("#"+b.id+"_").val(),d=a("#"+b.id).find("li");d.filter(function(){a(this).attr("data-value")==c&&a(this).trigger("click")})}};d.prototype={init:function(){var a=this,b=this.element;a.replaceProtoypeSelect(b),a.setSelectEvent(b),a.setSelectStyle(b),a.settings.onSuccess.call(a,b)},getSelectID:function(b){var c=a(b),d=c.attr("id");return"undefined"!=typeof d?d:d=""},getSelectName:function(b){var c=this,d=a(b),e=d.attr("name");return"undefined"!=typeof e?e:c.getSelectID(d)},getSelectClassName:function(b){var c=a(b),d=[],e=[],f=c.attr("class");if("undefined"!=typeof f){e=f.split(" "),e.sort(),d=[e[0]];for(var g=1;g<e.length;g++)e[g]!==d[d.length-1]&&d.push(e[g]);return d.join(" ")}return f=""},getSelectedIndex:function(b){var c=a(b),d=c.get(0).selectedIndex||0;return d},getOptionCount:function(b){var c=a(b);return c.children().length},getOptionText:function(b){for(var c=this,d=a(b),e=d.children(),f=[],g=c.getOptionCount(d),h=0;h<g;h++)f[h]=a.trim(e.eq(h).text());return f},getSelectedOptionText:function(b){var c=this,d=a(b),e=c.getSelectedIndex(d),f=c.getOptionText(d);return f[e]},getSelectedOptionValue:function(b){var c=this,d=a(b),e=c.getSelectedIndex(d),f=c.getOptionValue(d);return f[e]},getOptionValue:function(b){for(var c=this,d=a(b),e=d.children(),f=[],g=c.getOptionCount(d),h=0;h<g;h++)f[h]=e.eq(h).val();return f},renderSelect:function(b){for(var c=this,d=a(b),e=c.getSelectID(d),f=c.getSelectName(d),g=c.getSelectClassName(d),h=c.getOptionText(d),i=c.getSelectedOptionText(d),j=c.getOptionValue(d),k=c.getSelectedIndex(d),l=c.getSelectedOptionValue(d),m=c.getOptionCount(d),n='<span id="'+e+'" class="select-wrapper '+g+'"><input type="hidden" name="'+f+'" value="'+l+'" /><i class="icon select-down"></i><input type="button" class="select-button" value="'+i+'" /><div class="select-list"><ul>',o="",p=0;p<m;p++)o=p!==k?o+'<li data-value="'+j[p]+'">'+h[p]+"</li>":o+'<li data-value="'+j[p]+'" class="selected">'+h[p]+"</li>";return n=n+o+"</ul></div></span>"},replaceProtoypeSelect:function(b){var c=this,d=a(b),e=c.renderSelect(d);d.replaceWith(e)},setSelectDisabled:function(b){var c=this,d=a(b),e="#"+c.getSelectID(d);a(e).children("i").addClass("disabled").end().children(".select-button").attr("disabled","disabled")},setSelectEnabled:function(b){var c=this,d=a(b),e="#"+c.getSelectID(d);a(e).children("i").removeClass("disabled").end().children(".select-button").removeAttr("disabled")},setSelectStyle:function(b){var c=this,d=a(b),e="#"+c.getSelectID(d),f=c.getOptionCount(d);a(e).css({"z-index":c.setStyleProperty(c.settings.zIndex),width:c.setStyleProperty(c.settings.width)-2+"px",height:c.setStyleProperty(c.settings.height)+"px"}),a(e).children(".select-down").css({top:c.setStyleProperty((c.settings.height-c.settings.triangleSize)/2)+"px","border-width":c.setStyleProperty(c.settings.triangleSize)+"px","border-color":c.setStyleProperty(c.settings.triangleColor)+" transparent transparent transparent"}),a(e).children(".select-button").css({width:function(){return c.settings.width?c.settings.width-2+"px":void 0},height:c.setStyleProperty(c.settings.height)+"px",border:c.setStyleProperty(c.settings.border),"border-radius":c.setStyleProperty(c.settings.borderRadius)+"px"}),a(e).children(".select-list").css({width:function(){return c.settings.width?c.settings.width-2+"px":void 0},top:function(a,b){if(c.settings.height)return c.settings.topPosition?c.settings.optionHeight?-c.settings.optionHeight*f-3+"px":void 0:c.settings.height+1+"px"},"max-height":c.setStyleProperty(c.settings.showMaxHeight)+"px"}),a(e+" ul").css({"max-height":c.setStyleProperty(c.settings.showMaxHeight)+"px","line-height":c.setStyleProperty(c.settings.optionHeight)+"px"}),a(e+" li").css({height:c.setStyleProperty(c.settings.optionHeight)+"px"})},setStyleProperty:function(a){return a?a:void 0},setSelectEvent:function(b){var d=this,e=a(b),f=d.settings.speed,g=d.settings.border,h="#"+d.getSelectID(e),i=(d.getSelectName(e),d.getSelectedIndex(e)),j=d.getOptionCount(e),k=a(h+' input[type="button"]'),l=a(h+" li");return d.settings.enable?(a(h).click(function(b){b.stopPropagation(),a(this).children(".select-list").slideToggle(f),d.settings.border?a(this).css({border:g}):a(this).addClass("focus"),a(this).find("li").each(function(){a(this).text()===k.val()&&a(this).addClass("selected").siblings().removeClass("selected")}),a(".select-wrapper").css("z-index",10),a(".focus").css("z-index",20)}).on("focusin",'input[type="button"]',function(){a(".select-wrapper").children(".select-list").slideUp(f),a(".select-wrapper").hasClass("focus")&&a(".select-wrapper").removeClass("focus")}).on("keyup",'input[type="button"]',function(b){var c=a(this).siblings(".select-list").children().children("li.selected");switch(b.keyCode){case 13:a(this).val(c.text()).prev().prev().val(c.attr("data-value")),a.isFunction(d.settings.onChange)&&d.settings.onChange.call(d);break;case 27:a(this).siblings(".select-list").slideUp(f);break;case 38:b.preventDefault(),0!==i?(c.removeClass("selected").prev().addClass("selected"),i-=1):($selectItem.last().addClass("selected").siblings().removeClass("selected"),i=j-1),c=a(this).siblings(".select-list").children().children("li.selected"),a(this).val(c.text()).prev().prev().val(c.attr("data-value"));break;case 40:b.preventDefault(),i<j-1?(c.removeClass("selected").next().addClass("selected"),i+=1):($selectItem.first().addClass("selected").siblings().removeClass("selected"),i=0),c=a(this).siblings(".select-list").children().children("li.selected"),a(this).val(c.text()).prev().prev().val(c.attr("data-value"))}}).children("i").removeClass("disabled").end().children(".select-button").removeAttr("disabled"),l.on("click",function(b){return b.stopPropagation(),a(this).addClass("selected").siblings().removeClass("selected").parent().parent().slideUp(f).prev().val(a(this).text()).siblings('input[type="hidden"]').val(a(this).attr("data-value")),a(".select-wrapper").hasClass("focus")&&a(".select-wrapper").removeClass("focus"),a.isFunction(d.settings.onChange)&&d.settings.onChange.call(d),!1}).on("autoclick",function(b){return b.stopPropagation(),a(this).addClass("selected").siblings().removeClass("selected").parent().parent().slideUp(f).prev().val(a(this).text()).siblings('input[type="hidden"]').val(a(this).attr("data-value")),a(".select-wrapper").hasClass("focus")&&a(".select-wrapper").removeClass("focus"),!1}).hover(function(){a(this).addClass("selected").siblings().removeClass("selected")}).mouseenter(function(b){var c=b.target,d=c.offsetWidth,e=c.scrollWidth,f=a(c).text();d<e&&a(c).attr("title",f)}),a(c).on("click",function(){a(".select-wrapper").css("z-index",10),a(this).find(".select-list").slideUp(f),a(".select-wrapper").hasClass("focus")&&a(".select-wrapper").removeClass("focus")}),void 0):void a(h).children("i").addClass("disabled").end().children(".select-button").attr("disabled","disabled")}},a.fn[e]=function(b){return this.each(function(){a.data(this,"plugin_"+e)||(a.data(this,"plugin_"+e,new d(this,b)),b.topPosition?b.zIndex++:b.zIndex--)}),this}}(jQuery,window,document)});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-16 */