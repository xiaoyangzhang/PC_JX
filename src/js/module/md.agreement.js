/*! PC_JX - v1.0.0 - 2016-11-09 */
define(function(require,exports,module){require("pdfobject"),$public=require("public"),$agreement=function(){this.init.apply(this,arguments)};$agreement.prototype={init:function(){$(".dialog").show(),$(".dialog-agreement i").on("click",function(a){$(".dialog").hide(),$public.stopBubble(a)}),$(".agremt-view").on("click",function(){PDFObject.embed("/jiuxiu.pdf","#example1")})}},module.exports=new $agreement});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-09 */