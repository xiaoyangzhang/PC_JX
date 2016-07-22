//document.domain = 'jiuxiulvxing.com';
var imgurl='http://s0.test.jiuxiulvxing.com',
defaulturl='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
 $(function(){
    //上传图片
    $(document).on('change','.picfile',changeboximg);
    $(document).on('click','.del',function(){
        var $imgbox=$(this).closest('.imgbox');
        $imgbox.find('img').attr('src',defaulturl);
		//callbackUpload(callbacks,$imgbox.find('input:hidden'));
        $imgbox.find('.del').hide();
        $imgbox.find('.upl').show();
        $imgbox.find('.picCode').val('').trigger("change");
      	return false;
    });
	
	$('.imgbox :hidden').filter(function(){
		var box=$(this).closest('.imgbox');
		if($(this).val()!=''){
			box.find('.upl').hide();
			box.find('.del').show();
		}
	});
	
 });
 
var uploadPic=function(img,fileObj) {
      var $imgbox=$(img).closest('.imgbox'),_self=this,
      	  picheck=isPicture(fileObj,500);
      var $uplUrl = $('#filegw_domain').val()+'/file/upload_string';
      var $imgUrl = $imgbox.siblings(".imgUrl").val();
      if(!picheck.status){
      	//$imgbox.css('border','1px solid red');
      	alert(picheck.content);
      	return false;
      }else{
      	$imgbox.css('border','none');
      }
      $imgbox.find('img').attr('src',imgurl+'/other-plugins/uploadfile/img/waiting.gif');
      $(fileObj).wrap("<form id='uploadform' action='"+ $uplUrl +"' method='post' enctype='multipart/form-data'></form>");
      $('#uploadform').ajaxSubmit({
            success: function (data) {
            	//console.log(typeof data);
               data=JSON.parse(data);
               // console.log(data);
                $('#uploadform').remove();
                if(data.success){
                	$imgbox.find('img').attr('src',data.value?$imgUrl+data.value:defaulturl);
                   // $imgbox.find('img').attr('src',data.data?'http://img.test.yimayholiday.com/v1/tfs/'+data.data:defaulturl);
                    $imgbox.find('.picCode').val(data.value).trigger("change");
					//callbackUpload(callbacks,$imgbox.find('input:hidden'));
                    $imgbox.find('.upl').hide();
                    $imgbox.find('.del').show();
                }else{
                    $imgbox.find('img').attr('src',defaulturl);
                    alert(data.resultMsg);
                }
                $imgbox.find('.upl').append('<input type="file" name="picfile" class="picfile">');
                $imgbox.find('.picfile').on('change',changeboximg);
            },
            error:function(err){
            	//console.log(err);
                $imgbox.find('img').attr('src',defaulturl);
                alert('请求发生错误！');
                $('#uploadform').remove();
                $imgbox.find('.upl').append('<input type="file" name="picfile" class="picfile">');
                $imgbox.find('.picfile').on('change',changeboximg);
            }
      });
      return false;
 }

var changeboximg=function(){
        var $imgbox=$(this).closest('.imgbox');
        uploadPic($imgbox.find('img').get(0),this);
        return false;
    }

 var isPicture=function(file,s){
	    var result={content:'文件类型不合法,只能是jpg、png、jpeg类型！'},
	    	fileName=file.value,
	        szcontent={status:true,content:'文件大小不能超过'+s+'K'},szcontents={status:true,content:'不可上传空文件'},
	        maxsize = s*1024,filesize = 0; 
	        ua=navigator.userAgent.toLowerCase(),
		    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
		    isIE=rMsie.exec(ua)!=null;
            if(!isIE) {
	        	filesize=file.files[0].size;
			    if(filesize>maxsize){
			        szcontent.status = false;
			        return szcontent;
			    }else if (filesize==0) {
			    	szcontents.status = false;
			    	return szcontents;
			    }
	        };
		    if(fileName!=null && fileName !=""){
		      //lastIndexOf如果没有搜索到则返回为-1
		      if (fileName.lastIndexOf(".")!=-1) {
		            var fileType = (fileName.substring(fileName.lastIndexOf(".")+1,fileName.length)).toLowerCase();
		            var suppotFile = new Array();
		            suppotFile[0] = "jpg";
		            suppotFile[2] = "png";
		            suppotFile[3] = "jpeg";
		            for (var i =0;i<suppotFile.length;i++) {
		                if (suppotFile[i]==fileType) {
		                    result.status = true;
		                    return result;
		                } else{
		                    continue;
		                }
		            }
		            result.status = false;
		        } else{
		            result.status = false;
		        }
		    }else{
	            result.status = true;
	       };

            return result;          
		}