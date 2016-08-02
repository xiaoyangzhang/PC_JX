/*! pc_jx - v1.0.0 - 2016-07-28 */
/*
 * jQuery JSONP Core Plugin 2.3.1 (2012-05-16)
 *
 * https://github.com/jaubourg/jquery-jsonp
 *
 * Copyright (c) 2012 Julian Aubourg
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
define(function(require,exports,module){!function($){
// ###################### UTILITIES ##
// Noop
function noop(){}
// Generic callback
function genericCallback(data){lastValue=[data]}
// Call if defined
function callIfDefined(method,object,parameters,returnFlag){try{returnFlag=method&&method.apply(object.context||object,parameters)}catch(_){returnFlag=!1}return returnFlag}
// Give joining character given url
function qMarkOrAmp(url){return/\?/.test(url)?"&":"?"}
// ###################### MAIN FUNCTION ##
function jsonp(xOptions){
// Success notifier
function notifySuccess(json){done++||(cleanUp(),
// Pagecache if needed
pageCacheFlag&&(pageCache[url]={s:[json]}),
// Apply the data filter if provided
dataFilter&&(json=dataFilter.apply(xOptions,[json])),
// Call success then complete
callIfDefined(successCallback,xOptions,[json,STR_SUCCESS]),callIfDefined(completeCallback,xOptions,[xOptions,STR_SUCCESS]))}
// Error notifier
function notifyError(type){done++||(
// Clean up
cleanUp(),
// If pure error (not timeout), cache if needed
pageCacheFlag&&type!=STR_TIMEOUT&&(pageCache[url]=type),
// Call error then complete
callIfDefined(errorCallback,xOptions,[xOptions,type]),callIfDefined(completeCallback,xOptions,[xOptions,type]))}
// Build data with default
xOptions=$.extend({},xOptionsDefaults,xOptions);
// References to xOptions members (for better minification)
var pageCached,
// Request execution vars
firstChild,script,scriptAfter,timeoutTimer,successCallback=xOptions.success,errorCallback=xOptions.error,completeCallback=xOptions.complete,dataFilter=xOptions.dataFilter,callbackParameter=xOptions.callbackParameter,successCallbackName=xOptions.callback,cacheFlag=xOptions.cache,pageCacheFlag=xOptions.pageCache,charset=xOptions.charset,url=xOptions.url,data=xOptions.data,timeout=xOptions.timeout,
// Abort/done flag
done=0,
// Life-cycle functions
cleanUp=noop;
// Call beforeSend if provided (early abort if false returned)
// If we have Deferreds:
// - substitute callbacks
// - promote xOptions to a promise
// Create the abort method
// Call beforeSend if provided (early abort if false returned)
// Control entries
// Build final url
// Add callback parameter if provided as option
// Add anticache parameter if needed
// Replace last ? by callback parameter
// Check page cache
// Install the generic callback
// (BEWARE: global namespace pollution ahoy)
// Create the script tag
// Set charset if provided
// onerror is not supported: do not set as async and assume in-order execution.
// Add a trailing script to emulate the event
// onerror is supported: set the script as async to avoid requests blocking each others
// Internet Explorer: event/htmlFor trick
// Attached event handlers
// Set source
// Re-declare cleanUp function
// Append main script
// Append trailing script if needed
// If a timeout is needed, install it
return Deferred&&Deferred(function(defer){defer.done(successCallback).fail(errorCallback),successCallback=defer.resolve,errorCallback=defer.reject}).promise(xOptions),xOptions.abort=function(){!done++&&cleanUp()},callIfDefined(xOptions.beforeSend,xOptions,[xOptions])===!1||done?xOptions:(url=url||STR_EMPTY,data=data?"string"==typeof data?data:$.param(data,xOptions.traditional):STR_EMPTY,url+=data?qMarkOrAmp(url)+data:STR_EMPTY,callbackParameter&&(url+=qMarkOrAmp(url)+encodeURIComponent(callbackParameter)+"=?"),!cacheFlag&&!pageCacheFlag&&(url+=qMarkOrAmp(url)+"_"+(new Date).getTime()+"="),url=url.replace(/=\?(&|$)/,"="+successCallbackName+"$1"),pageCacheFlag&&(pageCached=pageCache[url])?pageCached.s?notifySuccess(pageCached.s[0]):notifyError(pageCached):(win[successCallbackName]=genericCallback,script=$(STR_SCRIPT_TAG)[0],script.id=STR_JQUERY_JSONP+count++,charset&&(script[STR_CHARSET]=charset),opera&&opera.version()<11.6?(scriptAfter=$(STR_SCRIPT_TAG)[0]).text="document.getElementById('"+script.id+"')."+STR_ON_ERROR+"()":script[STR_ASYNC]=STR_ASYNC,STR_ON_READY_STATE_CHANGE in script&&(script.htmlFor=script.id,script.event=STR_ON_CLICK),script[STR_ON_LOAD]=script[STR_ON_ERROR]=script[STR_ON_READY_STATE_CHANGE]=function(result){
// Test readyState if it exists
if(!script[STR_READY_STATE]||!/i/.test(script[STR_READY_STATE])){try{script[STR_ON_CLICK]&&script[STR_ON_CLICK]()}catch(_){}result=lastValue,lastValue=0,result?notifySuccess(result[0]):notifyError(STR_ERROR)}},script.src=url,cleanUp=function(i){timeoutTimer&&clearTimeout(timeoutTimer),script[STR_ON_READY_STATE_CHANGE]=script[STR_ON_LOAD]=script[STR_ON_ERROR]=null,head[STR_REMOVE_CHILD](script),scriptAfter&&head[STR_REMOVE_CHILD](scriptAfter)},head[STR_INSERT_BEFORE](script,firstChild=head.firstChild),scriptAfter&&head[STR_INSERT_BEFORE](scriptAfter,firstChild),timeoutTimer=timeout>0&&setTimeout(function(){notifyError(STR_TIMEOUT)},timeout)),xOptions)}var
// Last returned value
lastValue,// String constants (for better minification)
STR_ASYNC="async",STR_CHARSET="charset",STR_EMPTY="",STR_ERROR="error",STR_INSERT_BEFORE="insertBefore",STR_JQUERY_JSONP="_jqjsp",STR_ON="on",STR_ON_CLICK=STR_ON+"click",STR_ON_ERROR=STR_ON+STR_ERROR,STR_ON_LOAD=STR_ON+"load",STR_ON_READY_STATE_CHANGE=STR_ON+"readystatechange",STR_READY_STATE="readyState",STR_REMOVE_CHILD="removeChild",STR_SCRIPT_TAG="<script>",STR_SUCCESS="success",STR_TIMEOUT="timeout",
// Window
win=window,
// Deferred
Deferred=$.Deferred,
// Head element
head=$("head")[0]||document.documentElement,
// Page cache
pageCache={},
// Counter
count=0,
// ###################### DEFAULT OPTIONS ##
xOptionsDefaults={
//beforeSend: undefined,
//cache: false,
callback:STR_JQUERY_JSONP,
//callbackParameter: undefined,
//charset: undefined,
//complete: undefined,
//context: undefined,
//data: "",
//dataFilter: undefined,
//error: undefined,
//pageCache: false,
//success: undefined,
//timeout: 0,
//traditional: false,
url:location.href},
// opera demands sniffing :/
opera=win.opera;
// ###################### SETUP FUNCTION ##
jsonp.setup=function(xOptions){$.extend(xOptionsDefaults,xOptions)},
// ###################### INSTALL in jQuery ##
$.jsonp=jsonp}(jQuery)});
/*! pc_jx 最后修改于： 2016-07-28 */