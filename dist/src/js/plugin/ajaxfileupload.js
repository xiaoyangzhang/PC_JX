/*! pc_jx - v1.0.0 - 2016-07-28 */
define(function(require,exports,module){jQuery.extend({handleError:function(s,xhr,status,e){
// If a local callback was specified, fire it
s.error&&s.error.call(s.context||s,xhr,status,e),
// Fire the global callback
s.global&&(s.context?jQuery(s.context):jQuery.event).trigger("ajaxError",[xhr,s,e])},createUploadIframe:function(id,uri){
//create frame
var frameId="jUploadFrame"+id;if(window.ActiveXObject){var io=document.createElement('<iframe id="'+frameId+'" name="'+frameId+'" />');"boolean"==typeof uri?io.src="javascript:false":"string"==typeof uri&&(io.src=uri)}else{var io=document.createElement("iframe");io.id=frameId,io.name=frameId}return io.style.position="absolute",io.style.top="-1000px",io.style.left="-1000px",document.body.appendChild(io),io},createUploadForm:function(id,fileElementId){
//create form	
var formId="jUploadForm"+id,fileId="jUploadFile"+id,form=$('<form  action="" method="POST" name="'+formId+'" id="'+formId+'" enctype="multipart/form-data"></form>'),oldElement=$("#"+fileElementId),newElement=$(oldElement).clone();
//set attributes
return $(oldElement).attr("id",fileId),$(oldElement).before(newElement),$(oldElement).appendTo(form),$(form).css("position","absolute"),$(form).css("top","-1200px"),$(form).css("left","-1200px"),$(form).appendTo("body"),form},ajaxFileUpload:function(s){
// TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
s=jQuery.extend({},jQuery.ajaxSettings,s);var id=s.fileElementId,form=jQuery.createUploadForm(id,s.fileElementId),frameId=(jQuery.createUploadIframe(id,s.secureuri),"jUploadFrame"+id),formId="jUploadForm"+id;
// Watch for a new set of requests
s.global&&!jQuery.active++&&jQuery.event.trigger("ajaxStart");var requestDone=!1,xml={};s.global&&jQuery.event.trigger("ajaxSend",[xml,s]);
// Wait for a response to come back
var uploadCallback=function(isTimeout){var io=document.getElementById(frameId);try{io.contentWindow?(xml.responseText=io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null,xml.responseXML=io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document):io.contentDocument&&(xml.responseText=io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null,xml.responseXML=io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document)}catch(e){jQuery.handleError(s,xml,null,e)}if(xml||"timeout"==isTimeout){requestDone=!0;var status;try{
// Make sure that the request was successful or notmodified
if(status="timeout"!=isTimeout?"success":"error","error"!=status){
// process the data (runs the xml through httpData regardless of callback)
var data=jQuery.uploadHttpData(xml,s.dataType);
// If a local callback was specified, fire it and pass it the data
s.success&&s.success(data,status),
// Fire the global callback
s.global&&jQuery.event.trigger("ajaxSuccess",[xml,s])}else jQuery.handleError(s,xml,status)}catch(e){status="error",jQuery.handleError(s,xml,status,e)}
// The request was completed
s.global&&jQuery.event.trigger("ajaxComplete",[xml,s]),
// Handle the global AJAX counter
s.global&&!--jQuery.active&&jQuery.event.trigger("ajaxStop"),
// Process result
s.complete&&s.complete(xml,status),jQuery(io).unbind(),setTimeout(function(){try{$(io).remove(),$(form).remove()}catch(e){jQuery.handleError(s,xml,null,e)}},100),xml=null}};
// Timeout checker
s.timeout>0&&setTimeout(function(){
// Check to see if the request is still happening
requestDone||uploadCallback("timeout")},s.timeout);try{
// var io = $('#' + frameId);
var form=$("#"+formId);$(form).attr("action",s.url),$(form).attr("method","POST"),$(form).attr("target",frameId),form.encoding?form.encoding="multipart/form-data":form.enctype="multipart/form-data",$(form).submit()}catch(e){jQuery.handleError(s,xml,null,e)}return window.attachEvent?document.getElementById(frameId).attachEvent("onload",uploadCallback):document.getElementById(frameId).addEventListener("load",uploadCallback,!1),{abort:function(){}}},uploadHttpData:function(r,type){var data=!type;
//alert($('param', data).each(function(){alert($(this).attr('value'));}));
// If the type is "script", eval it in global context
// Get the JavaScript object, if JSON is used.
// evaluate scripts within html
return data="xml"==type||data?r.responseXML:r.responseText,"script"==type&&jQuery.globalEval(data),"json"==type&&(data=data.replace(/<[^>]+>/g,"")),"html"==type&&jQuery("<div>").html(data).evalScripts(),data}})});
/*! pc_jx 最后修改于： 2016-07-28 */