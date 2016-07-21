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
    //$(document).on('click','.btn-search',function(){
    //
    //});
});