<<<<<<< HEAD
/*! PC_JX - v1.0.0 - 2016-11-29 */
define(function(require,exports,module){var a={selector:{btn_download:".agremt-btn",btn_View:".agremt-view"},init:function(){$(a.selector.btn_View).on("click",function(){a.pdfUrl?a.preview():a.getPdfUrl()})},getPdfUrl:function(){var b=$("#root_path").val()+"/basicInfo/toContractDownloadPage",c=$("#renewDate").val(),d=$("#sellerId").val();$.ajax({url:b,type:"post",data:{sellerId:d,renewDate:c},success:function(b){b.success&&(a.pdfUrl=b.value,a.preview())}})},preview:function(){window.open(a.pdfUrl,"_blank")}};$(function(){a.init()})});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-29 */
=======
/*! PC_JX - v1.0.0 - 2016-11-24 */
define(function(require,exports,module){var a={selector:{btn_download:".agremt-btn",btn_View:".agremt-view"},init:function(){$(a.selector.btn_View).on("click",function(){a.pdfUrl?a.preview():a.getPdfUrl()})},getPdfUrl:function(){var b=$("#root_path").val()+"/basicInfo/toContractDownloadPage",c=$("#renewDate").val(),d=$("#sellerId").val();$.ajax({url:b,type:"post",data:{sellerId:d,renewDate:c},success:function(b){b.success&&(a.pdfUrl=b.value,a.preview())}})},preview:function(){window.open(a.pdfUrl,"_blank")}};$(function(){a.init()})});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-24 */
>>>>>>> master
