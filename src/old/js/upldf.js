/*! PC_JX - v1.0.0 - 2016-12-27 */
var imgurl="http://s0.test.jiuxiulvxing.com",defaulturl="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";$(function(){$(document).on("change",".picfile",changeboximg),$(document).on("click",".del",function(){var a=$(this).closest(".imgbox");return a.find("img").attr("src",defaulturl),a.find(".del").hide(),a.find(".upl").show(),a.find(".picCode").val("").trigger("change"),!1}),$(".imgbox :hidden").filter(function(){var a=$(this).closest(".imgbox");""!=$(this).val()&&(a.find(".upl").hide(),a.find(".del").show())})});var uploadPic=function(a,b){var c=$(a).closest(".imgbox"),d=isPicture(b,500),e=$("#filegw_domain").val()+"/file/upload",f=$("#tfs").val();return d.status?(c.css("border","none"),c.find("img").attr("src",imgurl+"/other-plugins/uploadfile/img/waiting.gif"),$(b).wrap("<form id='uploadform' action='"+e+"' method='post' enctype='multipart/form-data'></form>"),$("#uploadform").ajaxSubmit({success:function(a){200==a.status?(c.find("img").attr("src",a.data?f+a.data:defaulturl),c.find(".picCode").val(a.data).trigger("change"),c.find(".upl").hide(),c.find(".del").show()):(c.find("img").attr("src",defaulturl),alert("上传失败，请稍后重试！"))},error:function(a){c.find("img").attr("src",defaulturl),alert("请求发生错误！")}}),$("#uploadform").remove(),c.find(".upl").append('<input type="file" name="picfile" class="picfile">'),c.find(".picfile").on("change",changeboximg),!1):(alert(d.content),!1)},changeboximg=function(){var a=$(this).closest(".imgbox");return uploadPic(a.find("img").get(0),this),!1},isPicture=function(a,b){var c={content:"文件类型不合法,只能是jpg、png、jpeg类型！"},d=a.value,e={status:!0,content:"文件大小不能超过"+b+"K"},f={status:!0,content:"不可上传空文件"},g=1024*b,h=0;if(ua=navigator.userAgent.toLowerCase(),rMsie=/(msie\s|trident.*rv:)([\w.]+)/,isIE=null!=rMsie.exec(ua),!isIE){if(h=a.files[0].size,h>g)return e.status=!1,e;if(0==h)return f.status=!1,f}if(null!=d&&""!=d)if(d.lastIndexOf(".")!=-1){var i=d.substring(d.lastIndexOf(".")+1,d.length).toLowerCase(),j=new Array;j[0]="jpg",j[2]="png",j[3]="jpeg";for(var k=0;k<j.length;k++)if(j[k]==i)return c.status=!0,c;c.status=!1}else c.status=!1;else c.status=!0;return c};
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-27 */