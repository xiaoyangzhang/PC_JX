/*! pc_jx - v1.0.0 - 2016-07-28 */
/*
 * jQuery Form Plugin
 * version: 2.21 (08-FEB-2009)
 * @requires jQuery v1.2.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
!function($){
// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log(){$.fn.ajaxSubmit.debug&&window.console&&window.console.log&&window.console.log("[jquery.form] "+Array.prototype.join.call(arguments,""))}/*
    Usage Note:  
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are intended to be exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').bind('submit', function() {
            $(this).ajaxSubmit({
                target: '#output'
            });
            return false; // <-- important!
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });
        
    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.  
*/
/**
 * ajaxSubmit() provides a mechanism for immediately submitting 
 * an HTML form using AJAX.
 */
$.httpData=function(xhr,type,s){var ct=xhr.getResponseHeader("content-type"),xml="xml"==type||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&"parsererror"==data.documentElement.tagName)throw"parsererror";if(s&&s.dataFilter&&(data=s.dataFilter(data,type)),"string"==typeof data)return"script"==type&&jQuery.globalEval(data.replace(/<[^>]+>/g,"")),"json"==type&&(data=window.eval("("+data+")")),data.replace(/<[^>]+>/g,"")},$.handleError=function(s,xhr,status,e){s.error&&s.error.call(s.context||s,xhr,status,e),s.global&&(s.context?jQuery(s.context):jQuery.event).trigger("ajaxError",[xhr,s,e])},$.fn.ajaxSubmit=function(options){
// private function for handling file uploads (hat tip to YAHOO!)
function fileUpload(){function cb(){if(!cbInvoked++){io.detachEvent?io.detachEvent("onload",cb):io.removeEventListener("load",cb,!1);var ok=!0;try{if(timedOut)throw"timeout";
// extract the server response from the iframe
var data,doc;if(doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document,(null==doc.body||""==doc.body.innerHTML)&&!nullCheckFlag)
// in some browsers (cough, Opera 9.2.x) the iframe DOM is not always traversable when
// the onload callback fires, so we give them a 2nd chance
return nullCheckFlag=1,cbInvoked--,void setTimeout(cb,100);if(xhr.responseText=doc.body?doc.body.innerHTML:null,xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc,xhr.getResponseHeader=function(header){var headers={"content-type":opts.dataType};return headers[header]},"json"==opts.dataType||"script"==opts.dataType){var ta=doc.getElementsByTagName("textarea")[0];xhr.responseText=ta?ta.value:xhr.responseText}else"xml"!=opts.dataType||xhr.responseXML||null==xhr.responseText||(xhr.responseXML=toXml(xhr.responseText));data=$.httpData(xhr,opts.dataType)}catch(e){ok=!1,$.handleError(opts,xhr,"error",e)}
// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
ok&&(opts.success(data,"success"),g&&$.event.trigger("ajaxSuccess",[xhr,opts])),g&&$.event.trigger("ajaxComplete",[xhr,opts]),g&&!--$.active&&$.event.trigger("ajaxStop"),opts.complete&&opts.complete(xhr,ok?"success":"error"),
// clean up
setTimeout(function(){},100)}}function toXml(s,doc){return window.ActiveXObject?(doc=new ActiveXObject("Microsoft.XMLDOM"),doc.async="false",doc.loadXML(s)):doc=(new DOMParser).parseFromString(s,"text/xml"),doc&&doc.documentElement&&"parsererror"!=doc.documentElement.tagName?doc:null}var form=$form[0];if($(":input[name=submit]",form).length)return void alert('Error: Form elements must not be named "submit".');var opts=$.extend({},$.ajaxSettings,options),s=jQuery.extend(!0,{},$.extend(!0,{},$.ajaxSettings),opts),id="jqFormIO"+(new Date).getTime(),$io=$('<iframe id="'+id+'" name="'+id+'" src="about:blank" />'),io=$io[0];$io.css({position:"absolute",top:"-1000px",left:"-1000px"});var xhr={// mock object
aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1,$io.attr("src","about:blank")}},g=opts.global;if(
// trigger ajax global events so that activity/block indicators work like normal
g&&!$.active++&&$.event.trigger("ajaxStart"),g&&$.event.trigger("ajaxSend",[xhr,opts]),s.beforeSend&&s.beforeSend(xhr,s)===!1)return void(s.global&&jQuery.active--);if(!xhr.aborted){var cbInvoked=0,timedOut=0,sub=form.clk;if(sub){var n=sub.name;n&&!sub.disabled&&(options.extraData=options.extraData||{},options.extraData[n]=sub.value,"image"==sub.type&&(options.extraData[name+".x"]=form.clk_x,options.extraData[name+".y"]=form.clk_y))}
// take a breath so that pending repaints get some cpu time before the upload starts
setTimeout(function(){
// make sure form attrs are set
var t=$form.attr("target"),a=$form.attr("action");
// update form attrs in IE friendly way
form.setAttribute("target",id),"POST"!=form.getAttribute("method")&&form.setAttribute("method","POST"),form.getAttribute("action")!=opts.url&&form.setAttribute("action",opts.url),
// ie borks in some cases when setting encoding
options.skipEncodingOverride||$form.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),
// support timout
opts.timeout&&setTimeout(function(){timedOut=!0,cb()},opts.timeout);
// add "extra" data to form if provided in options
var extraInputs=[];try{if(options.extraData)for(var n in options.extraData)extraInputs.push($('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />').appendTo(form)[0]);
// add iframe to doc and submit the form
$io.appendTo("body"),io.attachEvent?io.attachEvent("onload",cb):io.addEventListener("load",cb,!1),form.submit()}finally{
// reset attrs and remove "extra" input elements
form.setAttribute("action",a),t?form.setAttribute("target",t):$form.removeAttr("target"),$(extraInputs).remove()}},50);var nullCheckFlag=0}}
// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
if(!this.length)return log("ajaxSubmit: skipping submit process - no element selected"),this;"function"==typeof options&&(options={success:options}),options=$.extend({url:this.attr("action")||window.location.toString(),type:this.attr("method")||"GET"},options||{});
// hook for manipulating the form data before it is extracted;
// convenient for use with rich editors like tinyMCE or FCKEditor
var veto={};if(this.trigger("form-pre-serialize",[this,options,veto]),veto.veto)return log("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;
// provide opportunity to alter form data before it is serialized
if(options.beforeSerialize&&options.beforeSerialize(this,options)===!1)return log("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var a=this.formToArray(options.semantic);if(options.data){options.extraData=options.data;for(var n in options.data)if(options.data[n]instanceof Array)for(var k in options.data[n])a.push({name:n,value:options.data[n][k]});else a.push({name:n,value:options.data[n]})}
// give pre-submit callback an opportunity to abort the submit
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===!1)return log("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(
// fire vetoable 'validate' event
this.trigger("form-submit-validate",[a,this,options,veto]),veto.veto)return log("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var q=$.param(a);"GET"==options.type.toUpperCase()?(options.url+=(options.url.indexOf("?")>=0?"&":"?")+q,options.data=null):options.data=q;// data is the query string for 'post'
var $form=this,callbacks=[];
// perform a load on the target only if dataType is not provided
if(options.resetForm&&callbacks.push(function(){$form.resetForm()}),options.clearForm&&callbacks.push(function(){$form.clearForm()}),!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){$(options.target).html(data).each(oldSuccess,arguments)})}else options.success?callbacks.push(options.success):options.success=function(data,status){for(var i=0,max=callbacks.length;i<max;i++)callbacks[i].apply(options,[data,status,$form])};for(var files=$("input:file",this).fieldValue(),found=!1,j=0;j<files.length;j++)files[j]&&(found=!0);
// options.iframe allows user to force iframe mode
// hack to fix Safari hang (thanks to Tim Molendijk for this)
// see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
// fire 'notify' event
return options.iframe||found?options.closeKeepAlive?$.get(options.closeKeepAlive,fileUpload):fileUpload():$.ajax(options),this.trigger("form-submit-notify",[this,options]),this},/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm=function(options){return this.ajaxFormUnbind().bind("submit.form-plugin",function(){return $(this).ajaxSubmit(options),!1}).each(function(){
// store options in hash
$(":submit,input:image",this).bind("click.form-plugin",function(e){var form=this.form;if(form.clk=this,"image"==this.type)if(void 0!=e.offsetX)form.clk_x=e.offsetX,form.clk_y=e.offsetY;else if("function"==typeof $.fn.offset){// try to use dimensions plugin
var offset=$(this).offset();form.clk_x=e.pageX-offset.left,form.clk_y=e.pageY-offset.top}else form.clk_x=e.pageX-this.offsetLeft,form.clk_y=e.pageY-this.offsetTop;
// clear form vars
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null},10)})})},
// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin"),this.each(function(){$(":submit,input:image",this).unbind("click.form-plugin")})},/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray=function(semantic){var a=[];if(0==this.length)return a;var form=this[0],els=semantic?form.getElementsByTagName("*"):form.elements;if(!els)return a;for(var i=0,max=els.length;i<max;i++){var el=els[i],n=el.name;if(n)if(semantic&&form.clk&&"image"==el.type)
// handle image inputs on the fly when semantic == true
el.disabled||form.clk!=el||a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});else{var v=$.fieldValue(el,!0);if(v&&v.constructor==Array)for(var j=0,jmax=v.length;j<jmax;j++)a.push({name:n,value:v[j]});else null!==v&&"undefined"!=typeof v&&a.push({name:n,value:v})}}if(!semantic&&form.clk)for(var inputs=form.getElementsByTagName("input"),i=0,max=inputs.length;i<max;i++){var input=inputs[i],n=input.name;n&&!input.disabled&&"image"==input.type&&form.clk==input&&a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y})}return a},/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize=function(semantic){
//hand off to jQuery.param for proper encoding
return $.param(this.formToArray(semantic))},/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize=function(successful){var a=[];
//hand off to jQuery.param for proper encoding
return this.each(function(){var n=this.name;if(n){var v=$.fieldValue(this,successful);if(v&&v.constructor==Array)for(var i=0,max=v.length;i<max;i++)a.push({name:n,value:v[i]});else null!==v&&"undefined"!=typeof v&&a.push({name:this.name,value:v})}}),$.param(a)},/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *       array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i],v=$.fieldValue(el,successful);null===v||"undefined"==typeof v||v.constructor==Array&&!v.length||(v.constructor==Array?$.merge(val,v):val.push(v))}return val},/**
 * Returns the value of the field element.
 */
$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if("undefined"==typeof successful&&(successful=!0),successful&&(!n||el.disabled||"reset"==t||"button"==t||("checkbox"==t||"radio"==t)&&!el.checked||("submit"==t||"image"==t)&&el.form&&el.form.clk!=el||"select"==tag&&el.selectedIndex==-1))return null;if("select"==tag){var index=el.selectedIndex;if(index<0)return null;for(var a=[],ops=el.options,one="select-one"==t,max=one?index+1:ops.length,i=one?index:0;i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(v||(// extra pain for IE...
v=op.attributes&&op.attributes.value&&!op.attributes.value.specified?op.text:op.value),one)return v;a.push(v)}}return a}return el.value},/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm=function(){return this.each(function(){$("input,select,textarea",this).clearFields()})},/**
 * Clears the selected form elements.
 */
$.fn.clearFields=$.fn.clearInputs=function(){return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();"text"==t||"password"==t||"textarea"==tag?this.value="":"checkbox"==t||"radio"==t?this.checked=!1:"select"==tag&&(this.selectedIndex=-1)})},/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm=function(){return this.each(function(){
// guard against an input with the name of 'reset'
// note that IE reports the reset function as an 'object'
("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},/**
 * Enables or disables any matching elements.
 */
$.fn.enable=function(b){return void 0==b&&(b=!0),this.each(function(){this.disabled=!b})},/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected=function(select){return void 0==select&&(select=!0),this.each(function(){var t=this.type;if("checkbox"==t||"radio"==t)this.checked=select;else if("option"==this.tagName.toLowerCase()){var $sel=$(this).parent("select");select&&$sel[0]&&"select-one"==$sel[0].type&&
// deselect all other options
$sel.find("option").selected(!1),this.selected=select}})}}(jQuery);
/*! pc_jx 最后修改于： 2016-07-28 */