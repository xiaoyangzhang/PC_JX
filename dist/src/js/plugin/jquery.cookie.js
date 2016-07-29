/*! pc_jx - v1.0.0 - 2016-07-28 */
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
!function(factory){factory(jQuery)}(function($){function encode(s){return config.raw?s:encodeURIComponent(s)}function decode(s){return config.raw?s:decodeURIComponent(s)}function stringifyCookieValue(value){return encode(config.json?JSON.stringify(value):String(value))}function parseCookieValue(s){0===s.indexOf('"')&&(
// This is a quoted cookie as according to RFC2068, unescape...
s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{
// Replace server-side written pluses with spaces.
// If we can't decode the cookie, ignore it, it's unusable.
// If we can't parse the cookie, ignore it, it's unusable.
return s=decodeURIComponent(s.replace(pluses," ")),config.json?JSON.parse(s):s}catch(e){}}function read(s,converter){var value=config.raw?s:parseCookieValue(s);return $.isFunction(converter)?converter(value):value}var pluses=/\+/g,config=$.cookie=function(key,value,options){
// Write
if(arguments.length>1&&!$.isFunction(value)){if(options=$.extend({},config.defaults,options),"number"==typeof options.expires){var days=options.expires,t=options.expires=new Date;t.setMilliseconds(t.getMilliseconds()+864e5*days)}return document.cookie=[encode(key),"=",stringifyCookieValue(value),options.expires?"; expires="+options.expires.toUTCString():"",// use expires attribute, max-age is not supported by IE
options.path?"; path="+options.path:"",options.domain?"; domain="+options.domain:"",options.secure?"; secure":""].join("")}for(
// Read
var result=key?void 0:{},
// To prevent the for loop in the first place assign an empty array
// in case there are no cookies at all. Also prevents odd result when
// calling $.cookie().
cookies=document.cookie?document.cookie.split("; "):[],i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split("="),name=decode(parts.shift()),cookie=parts.join("=");if(key===name){
// If second argument (value) is a function it's a converter...
result=read(cookie,value);break}
// Prevent storing a cookie that we couldn't decode.
key||void 0===(cookie=read(cookie))||(result[name]=cookie)}return result};config.defaults={},$.removeCookie=function(key,options){
// Must not alter options, thus extending a fresh object...
return $.cookie(key,"",$.extend({},options,{expires:-1})),!$.cookie(key)}});
/*! pc_jx 最后修改于： 2016-07-28 */