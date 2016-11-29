define(function (require, exports, module) {
	$public = require("public"),
	require("datepicker"),//时间插件
	require("validform"),
	require("core"),
	require("widget"),
	$editer = require("editer"),
	
	
	$test = function () {
		this.init.apply(this, arguments);
	};
	$test.prototype = {
		config:{
			placehd:'.infotime',
			textarea:'.reply-edit textarea',
			replyedtbtn:'.reply-content i',
			replybtnon:'.reply-edit .replay.on',
			replybtncel:'.reply-edit .cancel',
			temp_tip:'买家很喜欢，快来回复一下！'
		},
		init:function(){
			var _self = this;
			//渲染时间控件
			$( "#tm,#td" ).datepicker({
		      changeMonth: true,
		      changeYear: true
		    });
			/* _self.distanceFun(); */
			/* $(this).closest(".inforight").find(".showImg").hide(); */
		 	
			var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
					},
					ajaxPost:true
				},rule=[
				],validfm=$(".reviewform").Validform(validoptions).addRule(rule);
			/* 查询 */
			$(".searchBtn").on("click",function(){
				_self.distanceFun();
				$.ajax({
					type:'POST',
					url:""+$("#subpath").val(),
					data:{},
					success:function(data){
						$public.isLogin(data);
						
					}
				});
			});
			$(".delBtn").click(function() {
			   $("input[name='orderNO']").val("");
			   $("input[name='nickName']").val("");
			   $("input[name='itemNo']").val("");
			   $("input[name='beginDate']").val("");
			   $("input[name='endDate']").val("");
			});
			/* 图片点击查看大图 */
			_self.showImgFun();
			
			$(document).on('keyup',_self.config.textarea,function(){
				_self.computed(this);
			});
			
			$(document).on('paste',_self.config.textarea,function(){
				_current=this;
				setTimeout(function(){
					_self.computed(_current);
				},200);
			});
			
			$(document).on('focus',_self.config.textarea,function(){
				$(this).val()==_self.config.temp_tip&&$(this).val('');
			});
			
			$(document).on('blur',_self.config.textarea,function(){
				!$(this).val()&&$(this).val(_self.config.temp_tip);
			});
			
			$(document).on('click',_self.config.replyedtbtn,function(){

				var $parent_block=$(this).closest('div'),
				p_txt=$parent_block.find('p').text(),
				t_txt=$parent_block.find('label').text(),
				id=$parent_block.attr('id');

				$parent_block.after(_self.getTextarea(p_txt,t_txt,id)).remove();

			});
			
			$(document).on('click',_self.config.replybtncel,function(){

				var $parent_block=$(this).closest('div'),
				temp_content=$parent_block.find('.temp_content').val(),
				temp_time=$parent_block.find('.temp_time').val(),
				id=$parent_block.attr('id');

				$parent_block.after(_self.getRecord(temp_content,temp_time,id)).remove();

			});
			
			$(document).on('click',_self.config.replybtnon,function(){

				var $parent_block=$(this).closest('div'),
				content=$parent_block.find('textarea').val().replace(/^\s+/,'').replace(/\s+$/,''),
				dt=new Date(),
				fmtTime=$public.dateFormat(dt,'yyyy-MM-dd hh:mm:ss'),
				id=$parent_block.attr('id');
				
				if(content==''){
					$public.dialog.msg('回复内容不能为空！','error');
					return;
				}else if(content.length>200){
					$public.dialog.msg('回复内容长度不能大于200字符！','error');
					return;
				}

				$.post($public.urlpath.upReplyMsg,{
					id:$parent_block.attr('id'), 
					backTime:dt.getTime(),
					backContent:content
				},function(data){
					if(data.success){
						$public.dialog.msg('保存成功！','success');
						$parent_block.after(_self.getRecord(content,fmtTime,id)).remove();
					}else{
						$public.dialog.msg(data.msg,'error');
					}
				});

			});

		},
		computed:function(obj){

			var _self=this,
			$parent_block=$(obj).closest('.reply-edit'),
			value=$(obj).val().replace(/^\s+/,'').replace(/\s+$/,''),
			$replybtn=$parent_block.find('.replay'),
			$replyspan=$parent_block.find('span');
			
			$replyspan.text(value.length+'/200');
			if(value.length>200){
				$replyspan.css('color','red');
			}else{
				$replyspan.css('color','#999');
			}
			if(value.length>0){
				$replybtn.addClass('on');
			}else{
				$replybtn.removeClass('on');
			}

		},
		getRecord : function(s,t,id){
			var str_arr=[];
				str_arr.push('<div class="reply-content" id="'+id+'">');	
				str_arr.push('<div>');	
				str_arr.push('<p>'+s+'</p><label>'+t+'</label>');	
				str_arr.push('</div>');
				str_arr.push('<i>编辑</i>');
				str_arr.push('</div>');
			return str_arr.join('');
		},
		getTextarea : function(s,t,id){
			var str_arr=[];
				str_arr.push('<div class="reply-edit" id="'+id+'">');	
				str_arr.push('<div>');	
				str_arr.push('<textarea>'+(s?s:'买家很喜欢，快来回复一下！')+'</textarea>');
				str_arr.push('<span>'+s.length+'/200</span>');	
				str_arr.push('</div>');
				str_arr.push('<i class="replay '+(s?'on':'')+'">回复</i>');
				str_arr.push('<i class="cancel">取消</i>');
				str_arr.push('<input type="hidden" class="temp_content" value="'+s+'">');
				str_arr.push('<input type="hidden" class="temp_time" value="'+t+'">');
				str_arr.push('</div>');
			return str_arr.join('');
		},
		showImgFun : function(){
			 var listli = $(".upload ul").find("li");
			listli.click(function(){
				listli.css("borderColor","#f2f2f2");
				$(".upload").find("b").css("opacity","0");
				if(!this.is_select){
					$(this).css("borderColor","#ed6c44");
					$(this).closest(".inforight").find(".showImg img").attr("src",$(this).find('img').get(0).src);
					$(this).find("b").css("opacity","1");
					$(this).closest(".inforight").find(".showImg").show();
					listli.filter(function(){this.is_select=false;});
					$(".eredar-left").css('min-height',$(".eredar-right").height()+'px');
					this.is_select=true;
				}else{
					
					$(this).css("borderColor","#f2f2f2");
					$(this).find("b").css("opacity","0");
					$(this).closest(".inforight").find(".showImg").hide();
					this.is_select=false;
				}
				$(".eredar-left").css('min-height',$(".eredar-right").height()+'px');
			});
		},
		distanceFun :function(){
			/* 根据页面高度判断 */
			if($(".eredar-right").height() < $(".eredar-left").height()){
				$(".eredar-right").height($(".eredar-left").height());
			}
			else{
				$editer.distanceFun();
			};
		}
	}
	module.exports = new $test();
});