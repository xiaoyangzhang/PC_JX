/*! pc_jx - v1.0.0 - 2016-07-28 */
/*!
 * jQuery UI Core 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
define(function(require,exports,module){!function($,undefined){
// selectors
function focusable(element,isTabIndexNotNaN){var map,mapName,img,nodeName=element.nodeName.toLowerCase();
// the element and all of its ancestors must be visible
return"area"===nodeName?(map=element.parentNode,mapName=map.name,!(!element.href||!mapName||"map"!==map.nodeName.toLowerCase())&&(img=$("img[usemap=#"+mapName+"]")[0],!!img&&visible(img))):(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:"a"===nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN)&&visible(element)}function visible(element){return $.expr.filters.visible(element)&&!$(element).parents().addBack().filter(function(){return"hidden"===$.css(this,"visibility")}).length}var uuid=0,runiqueId=/^ui-id-\d+$/;
// $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui=$.ui||{},$.extend($.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),
// plugins
$.fn.extend({focus:function(orig){return function(delay,fn){return"number"==typeof delay?this.each(function(){var elem=this;setTimeout(function(){$(elem).focus(),fn&&fn.call(elem)},delay)}):orig.apply(this,arguments)}}($.fn.focus),scrollParent:function(){var scrollParent;return scrollParent=$.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test($.css(this,"position"))&&/(auto|scroll)/.test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!scrollParent.length?$(document):scrollParent},zIndex:function(zIndex){if(zIndex!==undefined)return this.css("zIndex",zIndex);if(this.length)for(var position,value,elem=$(this[0]);elem.length&&elem[0]!==document;){if(
// Ignore z-index if position is set to a value where z-index is ignored by the browser
// This makes behavior of this function consistent across browsers
// WebKit always returns auto if the element is positioned
position=elem.css("position"),("absolute"===position||"relative"===position||"fixed"===position)&&(
// IE returns 0 when zIndex is not specified
// other browsers return a string
// we ignore the case of nested elements with an explicit value of 0
// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
value=parseInt(elem.css("zIndex"),10),!isNaN(value)&&0!==value))return value;elem=elem.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++uuid)})},removeUniqueId:function(){return this.each(function(){runiqueId.test(this.id)&&$(this).removeAttr("id")})}}),$.extend($.expr[":"],{data:$.expr.createPseudo?$.expr.createPseudo(function(dataName){return function(elem){return!!$.data(elem,dataName)}}):
// support: jQuery <1.8
function(elem,i,match){return!!$.data(elem,match[3])},focusable:function(element){return focusable(element,!isNaN($.attr(element,"tabindex")))},tabbable:function(element){var tabIndex=$.attr(element,"tabindex"),isTabIndexNaN=isNaN(tabIndex);return(isTabIndexNaN||tabIndex>=0)&&focusable(element,!isTabIndexNaN)}}),
// support: jQuery <1.8
$("<a>").outerWidth(1).jquery||$.each(["Width","Height"],function(i,name){function reduce(elem,size,border,margin){return $.each(side,function(){size-=parseFloat($.css(elem,"padding"+this))||0,border&&(size-=parseFloat($.css(elem,"border"+this+"Width"))||0),margin&&(size-=parseFloat($.css(elem,"margin"+this))||0)}),size}var side="Width"===name?["Left","Right"]:["Top","Bottom"],type=name.toLowerCase(),orig={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight};$.fn["inner"+name]=function(size){return size===undefined?orig["inner"+name].call(this):this.each(function(){$(this).css(type,reduce(this,size)+"px")})},$.fn["outer"+name]=function(size,margin){return"number"!=typeof size?orig["outer"+name].call(this,size):this.each(function(){$(this).css(type,reduce(this,size,!0,margin)+"px")})}}),
// support: jQuery <1.8
$.fn.addBack||($.fn.addBack=function(selector){return this.add(null==selector?this.prevObject:this.prevObject.filter(selector))}),
// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
$("<a>").data("a-b","a").removeData("a-b").data("a-b")&&($.fn.removeData=function(removeData){return function(key){return arguments.length?removeData.call(this,$.camelCase(key)):removeData.call(this)}}($.fn.removeData)),
// deprecated
$.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),$.support.selectstart="onselectstart"in document.createElement("div"),$.fn.extend({disableSelection:function(){return this.bind(($.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(event){event.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),$.extend($.ui,{
// $.ui.plugin is deprecated. Use $.widget() extensions instead.
plugin:{add:function(module,option,set){var i,proto=$.ui[module].prototype;for(i in set)proto.plugins[i]=proto.plugins[i]||[],proto.plugins[i].push([option,set[i]])},call:function(instance,name,args){var i,set=instance.plugins[name];if(set&&instance.element[0].parentNode&&11!==instance.element[0].parentNode.nodeType)for(i=0;i<set.length;i++)instance.options[set[i][0]]&&set[i][1].apply(instance.element,args)}},
// only used by resizable
hasScroll:function(el,a){
//If overflow is hidden, the element might have extra content, but the user wants to hide it
if("hidden"===$(el).css("overflow"))return!1;var scroll=a&&"left"===a?"scrollLeft":"scrollTop",has=!1;
// TODO: determine which cases actually cause this to happen
// if the element doesn't have the scroll set, see if it's possible to
// set the scroll
return el[scroll]>0||(el[scroll]=1,has=el[scroll]>0,el[scroll]=0,has)}})}(jQuery)});
/*! pc_jx 最后修改于： 2016-07-28 */