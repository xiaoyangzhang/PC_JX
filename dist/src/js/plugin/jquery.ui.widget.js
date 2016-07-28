/*! pc_jx - v1.0.0 - 2016-07-28 */
/*!
 * jQuery UI Widget 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
define(function(require,exports,module){!function($,undefined){var uuid=0,slice=Array.prototype.slice,_cleanData=$.cleanData;$.cleanData=function(elems){for(var elem,i=0;null!=(elem=elems[i]);i++)try{$(elem).triggerHandler("remove")}catch(e){}_cleanData(elems)},$.widget=function(name,base,prototype){var fullName,existingConstructor,constructor,basePrototype,
// proxiedPrototype allows the provided prototype to remain unmodified
// so that it can be used as a mixin for multiple widgets (#8876)
proxiedPrototype={},namespace=name.split(".")[0];name=name.split(".")[1],fullName=namespace+"-"+name,prototype||(prototype=base,base=$.Widget),
// create selector for plugin
$.expr[":"][fullName.toLowerCase()]=function(elem){return!!$.data(elem,fullName)},$[namespace]=$[namespace]||{},existingConstructor=$[namespace][name],constructor=$[namespace][name]=function(options,element){
// allow instantiation without "new" keyword
// allow instantiation without "new" keyword
// allow instantiation without initializing for simple inheritance
// must use "new" keyword (the code above always passes args)
return this._createWidget?void(arguments.length&&this._createWidget(options,element)):new constructor(options,element)},
// extend with the existing constructor to carry over any static properties
$.extend(constructor,existingConstructor,{version:prototype.version,
// copy the object used to create the prototype in case we need to
// redefine the widget later
_proto:$.extend({},prototype),
// track widgets that inherit from this widget in case this widget is
// redefined after a widget inherits from it
_childConstructors:[]}),basePrototype=new base,
// we need to make the options hash a property directly on the new instance
// otherwise we'll modify the options hash on the prototype that we're
// inheriting from
basePrototype.options=$.widget.extend({},basePrototype.options),$.each(prototype,function(prop,value){return $.isFunction(value)?void(proxiedPrototype[prop]=function(){var _super=function(){return base.prototype[prop].apply(this,arguments)},_superApply=function(args){return base.prototype[prop].apply(this,args)};return function(){var returnValue,__super=this._super,__superApply=this._superApply;return this._super=_super,this._superApply=_superApply,returnValue=value.apply(this,arguments),this._super=__super,this._superApply=__superApply,returnValue}}()):void(proxiedPrototype[prop]=value)}),constructor.prototype=$.widget.extend(basePrototype,{
// TODO: remove support for widgetEventPrefix
// always use the name + a colon as the prefix, e.g., draggable:start
// don't prefix for widgets that aren't DOM-based
widgetEventPrefix:existingConstructor?basePrototype.widgetEventPrefix||name:name},proxiedPrototype,{constructor:constructor,namespace:namespace,widgetName:name,widgetFullName:fullName}),
// If this widget is being redefined then we need to find all widgets that
// are inheriting from it and redefine all of them so that they inherit from
// the new version of this widget. We're essentially trying to replace one
// level in the prototype chain.
existingConstructor?($.each(existingConstructor._childConstructors,function(i,child){var childPrototype=child.prototype;
// redefine the child widget using the same prototype that was
// originally used, but inherit from the new version of the base
$.widget(childPrototype.namespace+"."+childPrototype.widgetName,constructor,child._proto)}),
// remove the list of existing child constructors from the old constructor
// so the old child constructors can be garbage collected
delete existingConstructor._childConstructors):base._childConstructors.push(constructor),$.widget.bridge(name,constructor)},$.widget.extend=function(target){for(var key,value,input=slice.call(arguments,1),inputIndex=0,inputLength=input.length;inputIndex<inputLength;inputIndex++)for(key in input[inputIndex])value=input[inputIndex][key],input[inputIndex].hasOwnProperty(key)&&value!==undefined&&(
// Clone objects
$.isPlainObject(value)?target[key]=$.isPlainObject(target[key])?$.widget.extend({},target[key],value):
// Don't extend strings, arrays, etc. with objects
$.widget.extend({},value):target[key]=value);return target},$.widget.bridge=function(name,object){var fullName=object.prototype.widgetFullName||name;$.fn[name]=function(options){var isMethodCall="string"==typeof options,args=slice.call(arguments,1),returnValue=this;
// allow multiple hashes to be passed on init
return options=!isMethodCall&&args.length?$.widget.extend.apply(null,[options].concat(args)):options,isMethodCall?this.each(function(){var methodValue,instance=$.data(this,fullName);return instance?$.isFunction(instance[options])&&"_"!==options.charAt(0)?(methodValue=instance[options].apply(instance,args),methodValue!==instance&&methodValue!==undefined?(returnValue=methodValue&&methodValue.jquery?returnValue.pushStack(methodValue.get()):methodValue,!1):void 0):$.error("no such method '"+options+"' for "+name+" widget instance"):$.error("cannot call methods on "+name+" prior to initialization; attempted to call method '"+options+"'")}):this.each(function(){var instance=$.data(this,fullName);instance?instance.option(options||{})._init():$.data(this,fullName,new object(options,this))}),returnValue}},$.Widget=function(){},$.Widget._childConstructors=[],$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,
// callbacks
create:null},_createWidget:function(options,element){element=$(element||this.defaultElement||this)[0],this.element=$(element),this.uuid=uuid++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=$.widget.extend({},this.options,this._getCreateOptions(),options),this.bindings=$(),this.hoverable=$(),this.focusable=$(),element!==this&&($.data(element,this.widgetFullName,this),this._on(!0,this.element,{remove:function(event){event.target===element&&this.destroy()}}),this.document=$(element.style?
// element within the document
element.ownerDocument:
// element is window or document
element.document||element),this.window=$(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:$.noop,_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function(){this._destroy(),
// we can probably remove the unbind calls in 2.0
// all event bindings should go through this._on()
this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),
// clean up events and states
this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:$.noop,widget:function(){return this.element},option:function(key,value){var parts,curOption,i,options=key;if(0===arguments.length)
// don't return a reference to the internal hash
return $.widget.extend({},this.options);if("string"==typeof key)if(
// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
options={},parts=key.split("."),key=parts.shift(),parts.length){for(curOption=options[key]=$.widget.extend({},this.options[key]),i=0;i<parts.length-1;i++)curOption[parts[i]]=curOption[parts[i]]||{},curOption=curOption[parts[i]];if(key=parts.pop(),1===arguments.length)return curOption[key]===undefined?null:curOption[key];curOption[key]=value}else{if(1===arguments.length)return this.options[key]===undefined?null:this.options[key];options[key]=value}return this._setOptions(options),this},_setOptions:function(options){var key;for(key in options)this._setOption(key,options[key]);return this},_setOption:function(key,value){return this.options[key]=value,"disabled"===key&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!value).attr("aria-disabled",value),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(suppressDisabledCheck,element,handlers){var delegateElement,instance=this;
// no suppressDisabledCheck flag, shuffle arguments
"boolean"!=typeof suppressDisabledCheck&&(handlers=element,element=suppressDisabledCheck,suppressDisabledCheck=!1),
// no element argument, shuffle and use this.element
handlers?(
// accept selectors, DOM elements
element=delegateElement=$(element),this.bindings=this.bindings.add(element)):(handlers=element,element=this.element,delegateElement=this.widget()),$.each(handlers,function(event,handler){function handlerProxy(){
// allow widgets to customize the disabled handling
// - disabled as an array instead of boolean
// - disabled class as method for disabling individual parts
if(suppressDisabledCheck||instance.options.disabled!==!0&&!$(this).hasClass("ui-state-disabled"))return("string"==typeof handler?instance[handler]:handler).apply(instance,arguments)}
// copy the guid so direct unbinding works
"string"!=typeof handler&&(handlerProxy.guid=handler.guid=handler.guid||handlerProxy.guid||$.guid++);var match=event.match(/^(\w+)\s*(.*)$/),eventName=match[1]+instance.eventNamespace,selector=match[2];selector?delegateElement.delegate(selector,eventName,handlerProxy):element.bind(eventName,handlerProxy)})},_off:function(element,eventName){eventName=(eventName||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,element.unbind(eventName).undelegate(eventName)},_delay:function(handler,delay){function handlerProxy(){return("string"==typeof handler?instance[handler]:handler).apply(instance,arguments)}var instance=this;return setTimeout(handlerProxy,delay||0)},_hoverable:function(element){this.hoverable=this.hoverable.add(element),this._on(element,{mouseenter:function(event){$(event.currentTarget).addClass("ui-state-hover")},mouseleave:function(event){$(event.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(element){this.focusable=this.focusable.add(element),this._on(element,{focusin:function(event){$(event.currentTarget).addClass("ui-state-focus")},focusout:function(event){$(event.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(type,event,data){var prop,orig,callback=this.options[type];if(data=data||{},event=$.Event(event),event.type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase(),
// the original event may come from any element
// so we need to reset the target on the new event
event.target=this.element[0],
// copy original event properties over to the new event
orig=event.originalEvent)for(prop in orig)prop in event||(event[prop]=orig[prop]);return this.element.trigger(event,data),!($.isFunction(callback)&&callback.apply(this.element[0],[event].concat(data))===!1||event.isDefaultPrevented())}},$.each({show:"fadeIn",hide:"fadeOut"},function(method,defaultEffect){$.Widget.prototype["_"+method]=function(element,options,callback){"string"==typeof options&&(options={effect:options});var hasOptions,effectName=options?options===!0||"number"==typeof options?defaultEffect:options.effect||defaultEffect:method;options=options||{},"number"==typeof options&&(options={duration:options}),hasOptions=!$.isEmptyObject(options),options.complete=callback,options.delay&&element.delay(options.delay),hasOptions&&$.effects&&$.effects.effect[effectName]?element[method](options):effectName!==method&&element[effectName]?element[effectName](options.duration,options.easing,callback):element.queue(function(next){$(this)[method](),callback&&callback.call(element[0]),next()})}})}(jQuery)});
/*! pc_jx 最后修改于： 2016-07-28 */