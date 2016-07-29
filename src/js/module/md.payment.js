
define(function( require, exports, module ){

    //日历组件
    require("core");
    require("widget");
    require("datepicker");

    //下拉组件
    require("dropdownlist");

    var g = require("public");

    Payment = function () {
        this.init.apply(this, arguments);
    };
    Payment.prototype = {
        config : {
            btnStratTime : '#getstartime',
            btnEndTime   :  '#getendtime',
            selectType   :  '.select-type',
            btnWithdrawal : '.btn-withdrawal'
        },
        init : function(){
            var _self = this;
            //console.log(11);
            _self.initDateComponent( _self );
            _self.btnWithdrawClick(_self);
            _self.initSelectComponent( _self );
        },
        //初始化下拉菜单组件
        initSelectComponent : function(_self){
            $(_self.config.selectType).selectlist({
                zIndex: 10,
                width: 216,
                triangleColor : '#ccc',
                height: 32,
                onChange:function(){}
            });
        },
        //初始化时间组件
        initDateComponent : function(_self){
            var startTime,endTime;
            $( _self.config.btnStratTime ).datepicker({
                changeMonth: true,
                changeYear: true,
                onSelect: function(dateText, inst) {
                    startTime = dateText;
                    _self.isCheckTime( startTime, endTime );
                }
            });
            $( _self.config.btnEndTime ).datepicker({
                changeMonth: true,
                changeYear: true,
                onSelect : function(dateText,inst){
                    endTime = dateText;
                    _self.isCheckTime( startTime, endTime );
                }
            });

        },
        //判断开始时间是否大于结束时间
        isCheckTime : function( startTime, endTime ){
            if( startTime && endTime ){
                if(  startTime >= endTime ){
                    g.dialog.msg('开始时间不能大于结束时间','error');
                }
            }
        },
        //钱包提现按钮点击操作
        btnWithdrawClick :  function(){
            //请求地址
            var postUrl = $("#root_path").val() + '/account/withdrawal',
            //成功跳转地址
                jumpUrl = $("#root_path").val() + '/account/withdrawalResult';
            $(document).on('click',this.config.btnWithdrawal,function(){
                $.ajax({
                    type : 'post',
                    url : postUrl,
                    dataType : 'json',
                    success : function( data ){
                        var d = data;
                        if( d.status == '200' ){
                            location.href = jumpUrl;
                        }else{
                            alert( d.message );
                        }
                    },
                    error : function(xhr,status,error){
                        alert( error );
                    }
                });
            });
        }

    };
    module.exports = new Payment;
});