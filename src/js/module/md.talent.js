define(function (require, exports, module) {

    require("core");
    require("widget")
    require("datepicker");
    require("validform");
    require("dropdownlist");
    require("uploadfiles");
    $public = require("public");
    $editer = require("editer");
    require("md5");//加密

    $Talent = function () {
        this.init.apply(this, arguments);
    };

    $Talent.prototype = {
        init: function () {
            $editer.distanceFun();
            $public.diffBrowser();
            var $self = this;

            //渲染时间控件
            $("#tm").datepicker({
                changeMonth: true,
                changeYear: true
            });

            /* 判断昵称是否存在 */
            $self.nickName();

            /* 省级联动 */
            $self.provinceFun();

            var validfm = $(".registerform").Validform({
                tiptype: 3,
                label: ".label",
                showAllError: true,
                datatype: {},
                ajaxPost: true
            }).addRule([{
                ele: ".phone",
                datatype: "m",
                errormsg: "请输入正确的电话号码"
            },{
                ele: "#nickName",
                maxlength: "15",
                nullmsg: "请填写您的昵称",
                datatype: "s2-15",
                errormsg: "除下划线以外的特殊字符不允许输入,请填写2-15字以内的字符"
            },{
                ele: "#realName",
                datatype: "s",
                maxlength: "10",
                nullmsg: "请填写您的真实姓名",
                errormsg: "除下划线以外的特殊字符不允许输入,请填写10字以内的昵称"
            }]);
            $("#tm").bind("input change",function(){
                $self.timeFun();
            });

            /* 提示服务描述中文本的字数提示 */
            $('#serve').bind('input propertychange', function () {
                $(".change").text($(this).val().length);
            });

            $("#saveBtnEredar").on("click", function () {
                /* a代表提交按钮的所有表单中是否通过验证为true,b代表下拉框是否通过表单验证，c代表图片是否通过验证成功 */
                var a = validfm.check(),
                    b = $public.selectvalid(),
                    params = null, arr = [],
                    temparr = [], imgarr = [],
                    obj = {},
                    ctval = $('#contentText').val(),
                    c = $public.allimgvalid($('.imgbox:not(".cnat")')),
                    d = $public.groupimgvalid($('.groupimg'), '请选择图片！'),
                    e = $editer.tuwencheck();

                if (a && b && e && c && d) {
                    params = $public.paramcompare($('.registerform').serializeArray());
                    params.pictureTextDOs = ctval;

                    for (var key in params) {
                        if (key == 'certificatess' && params[key]) {
                            for (var i = 0; i < params[key].length; i++) {
                                obj.id = parseInt(params[key][i]);
                                obj.name = '';
                                obj.type = 1;
                                $('input[name="certificatess"]:checked').filter(function () {
                                    if ($(this).val() == params[key][i])
                                        obj.name = $(this).next('label').text();
                                });
                                arr.push(obj);
                                obj = {};
                            }
                            params[key] = JSON.stringify(arr);
                            arr.length = 0;
                        }
                        if (key == 'imgpath' && params[key]) {
                            temparr = params[key];
                            if(temparr.constructor == String) {
                                imgarr.push(temparr);
                                params[key]=JSON.stringify(imgarr);
                            }
                            if(temparr instanceof Array) {
                                for(var j=0;j<temparr.length;j++){
                                    if(temparr[j]!=''){
                                        imgarr.push(temparr[j]);
                                    }
                                }
                                params[key]=JSON.stringify(imgarr);
                            }
                        }
                    }

                    $.ajax({
                        type: 'POST',
                        url: $public.urlpath.eredar,
                        data: params,
                        success: function (data) {
                            $public.isLogin(data);
                            if (data.success) {
                                $public.dialog.msg("保存成功", "success");
                                window.location.href = window.location.href;
                            } else {
                                $public.dialog.msg(data.msg, "error");
                            }
                        }
                    });
                    /* console.log(JSON.stringify(params)); */
                }
            });

        },
        nickName: function () {
            $("#nickName").blur(function () {
                var _self = this;
                $.ajax({
                    type: 'POST',
                    url: 'user/chargeUserNickName',
                    data: {nickName: $('#nickName').val()},
                    success: function (data) {
                        $public.isLogin(data);
                        if (!data.success) {
                            $(_self).parent().find('.Validform_checktip').remove();
                            $(_self).parent().append('<span class="Validform_checktip Validform_wrong">此用户昵称已被使用！</span>');
                        }
                    }
                });
            });
        },
        provinceFun: function () {
            $public.actiondata('province', 'city');
        },
        timeFun :function(){
            var result = false;
            if(!$("#tm").val()){
                $("#tm").parent().find('.Validform_checktip').remove();
                $("#tm").parent().append('<span class="Validform_checktip Validform_wrong">请填写时间</span>');
            }
            else{
                result = true; 
                $("#tm").removeClass("Validform_error");
                $("#tm").parent().find('.Validform_checktip').remove();
                $("#tm").parent().append('<span class="Validform_checktip Validform_right"></span>');
            }
            return result;
        }
    }
    module.exports = new $Talent();
});