
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
            //var startDate,endDate;
            $( _self.config.btnStratTime ).datepicker({
                changeMonth: true,
                changeYear: true,
                onSelect: function(dateText, inst) {
                    ///console.log( inst );

                    var $startDate = $( _self.config.btnStratTime );
                    var $endDate = $(_self.config.btnEndTime);
                    var startDate = $startDate.datepicker( 'getDate');
                    var endDate = $endDate.datepicker( 'getDate' );

                    //if(endDate < startDate){
                        //$endDate.datepicker('setDate', startDate - 3600*1000*24);
                    //}
                    //console.log( startDate + 3600*1000*24 );
                    //var endDate = $endDate.datepicker( 'getDate' ) || '0';
                    //
                    //if(endDate < startDate){
                    //$endDate.datepicker('setDate', startDate - 3600*1000*24);
                    //}
                    //console.log(  dateText )

                    $endDate.datepicker( "option", "minDate", startDate  );

                }
            });
            $( _self.config.btnEndTime ).datepicker({
                changeMonth: true,
                changeYear: true,
                onSelect : function(dateText,inst){
                    var $startDate = $( _self.config.btnStratTime );
                    var $endDate = $(_self.config.btnEndTime);
                    var endDate = $endDate.datepicker( 'getDate' );
                    var startDate = $startDate.datepicker( "getDate" );
                    //if(endDate < startDate){
                    //    $startDate.datepicker('setDate', startDate + 3600*1000*24);
                    //}
                    $startDate.datepicker( "option", "maxDate", endDate );
                }
            });

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