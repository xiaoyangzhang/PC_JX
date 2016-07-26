/**
 * Created by Administrator on 2016/7/21.
 */
define(function( require, exports, module ){

    //日历组件
    require("core");
    require("widget");
    require("datepicker");


    //下拉组件
    require("dropdownlist");

    //起始时间
    $('#getstartime,#getendtime').datepicker({
        changeMonth: true,
        changeYear: true
    });
    $('.select-type').selectlist({
        zIndex: 10,
        width: 216,
        triangleColor : '#ccc',
        height: 32,
        onChange:function(){}
    });

    //console.log( $("#root_path").val());
    //
    withdrawBtnClick();
    function withdrawBtnClick(){
        //请求地址
        var postUrl = $("#root_path").val() + '/account/withdrawal',
        //成功跳转地址
            jumpUrl = $("#root_path").val() + '/account/withdrawalResult';
        $(document).on('click','.btn-withdrawal',function(){
            $.ajax({
                type : 'get',
                url : postUrl,
                dataType : 'jsonp',
                success : function( data ){
                    var d = data;
                    if( d.status == '200' ){
                        location.href = jumpUrl;
                    }else{
                        alert( d.message );
                    }
                }
            });
        });
    }
});