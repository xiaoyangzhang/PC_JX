define(function (require, exports, module) {
	require("ajaxform"),
	$public=require("public"),
	$uploadfiles = function () {
		this.init.apply(this, arguments);
	};
	$uploadfiles.prototype = {
		config : {
			curfilebox : null,
			upldclik : ".upldclik",
			adpicfile : ".adpicfile",
			single : ".single",
			mult : ".mult",
			plhd : ".plhd",
			imgbox : ".imgbox",
			del : ".del",
			canclick : ".canclick",
			groupimg : ".groupimg",
			base_str : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
		},
		init:function(){
			var _self = this,temp_src='';
			
			$(_self.config.imgbox).find('img').filter(function(){
				temp_src=$(this).attr('src');
				if(temp_src&&temp_src!=_self.config.base_str)
					$(this).closest(_self.config.imgbox).addClass('imgbox-action').find(_self.config.upldclik).css('z-index',3);
			});
			$(_self.config.canclick).click(function(){return false;});
			$(_self.config.del).on('click',function(){_self.delboximg(_self,this);return false;});
			$(_self.config.adpicfile).on('change',function(){_self.addboximg(_self,this);return false;});
		},
		uploadPic:function(img,fileObj){
			  var $imgbox=$(img).closest('span'),_self=this;
			  $(fileObj).parent().wrap("<form id='uploadform' action='"+(fileCompressURL?fileCompressURL:"http://filegw.test.jiuxiulvxing.com/filegw/file/upload_compress_string")+"' method='post' enctype='multipart/form-data'></form>");
			  $imgbox.find(_self.config.plhd).addClass('plhd-action');
			  $('#uploadform').ajaxSubmit({
	                success: function (data) {
						$public.isLogin(data);
	                	data=JSON.parse(data);
	                	$('#uploadform').remove();
	                	$(_self.config.plhd).removeClass('plhd-action');
		                $imgbox.append('<a class="upldclik"><input type="file" name="adpicfile" class="adpicfile"></a>');
					    $imgbox.find('.adpicfile').on('change',function(){_self.addboximg(_self,this);});
	                	if(_self.config.curfilebox&&data.status==200){ 	
	                		var $box=_self.config.curfilebox;
	                		$box.find('img').attr('src',data.data?img_domain+data.data:'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
	                		$box.find(':hidden').val(data.data);
	                		$imgbox.addClass('imgbox-action');
							_self.sucssinfo($imgbox);
			            	$imgbox.find(_self.config.upldclik).css('z-index',3);
	                	}else{
							$public.dialog.msg(data.message,'error');
    						$imgbox.find(_self.config.upldclik).css('z-index',9);
	                	}
	                },
	                error:function(err){
						$public.dialog.msg('请求发生错误！','error');
	                	$(_self.config.plhd).removeClass('plhd-action');
    					$imgbox.find(_self.config.upldclik).css('z-index',9);
	                }
              });
              this.config.curfilebox=$imgbox;
			  return false;
		},
		addboximg:function(_self,_this){
			var $imgbox=$(_this).closest(_self.config.imgbox),
            	isPicture=$public.isPicture(_this,500);
				$imgbox.parent().find('.Validform_checktip').remove();
                if(!isPicture.status&&isPicture.content){
					_self.errorinfo($imgbox,isPicture.content);
                }else{
					$imgbox.find('input').show();
					_self.uploadPic($imgbox.find('img').get(0),_this);
                }
                return false;
		},
		delboximg:function(_self,_this){
			var $imgbox=$(_this).closest(_self.config.imgbox);
    		$imgbox.find(_self.config.upldclik).css('z-index',9);
			$imgbox.removeClass('imgbox-action');
			$imgbox.find('img').attr('src',_self.config.base_str);
			$imgbox.find(':hidden').val('');
    		$imgbox.find(_self.config.upldclik).show();
			_self.errorinfo($imgbox,'请选择图片！');
			return false;
		},
		errorinfo:function($box,msg){
			var _self=this,isGroup=$box.attr('class').indexOf('cnat')!=-1?true:false,isAllowNull='';
			if(isGroup){
				isAllowNull=$box.closest(_self.config.groupimg).attr('class').indexOf('allownull')!=-1?true:false;
				$box=$box.closest(_self.config.groupimg),$files=$box.find(':hidden');
				// for(var i=0;i<$files.length;i++){
				// 	if($files[i].value!='') return;
				// }
				$box.find('.Validform_checktip').remove();
				if(!isAllowNull||(isAllowNull&&msg!='请选择图片！')) $box.append('<span class="Validform_checktip Validform_wrong">'+msg+'</span>');
			}else{
				isAllowNull=$box.attr('class').indexOf('allownull')!=-1?true:false;
				$box.parent().find('.Validform_checktip').remove();
				if(!isAllowNull||(isAllowNull&&msg!='请选择图片！')) $box.after('<span class="Validform_checktip Validform_wrong">'+msg+'</span>');
			}
		},
		sucssinfo:function($box){
			var _self=this,isGroup=$box.attr('class').indexOf('cnat')!=-1?true:false;
			if(isGroup){
				$box=$box.closest(_self.config.groupimg);
				$box.find('.Validform_checktip').remove();
				$box.append('<span class="Validform_checktip Validform_right"></span>');
			}else{
				$box.parent().find('.Validform_checktip').remove();
				$box.after('<span class="Validform_checktip Validform_right"></span>');
			}
		}
	}
	module.exports = new $uploadfiles();
});