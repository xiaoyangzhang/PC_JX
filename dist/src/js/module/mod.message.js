/*! PC_JX - v1.0.0 - 2016-11-01 */
define(function(require,exports,module){var a=function(){return this.init()};a.prototype={init:function(){},getMessage:function(){var a=this;$.ajax({cache:!1,url:a.messageUrl,dataType:"json",type:"post",data:{timeout:20},timeout:20500,success:function(b,c){return b.success?(window.location.href=b.value,!1):void a.getMessage()},error:function(b,c){a.getMessage()}})}},module.exports=new a});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-01 */