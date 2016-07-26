/**
 * Created by Administrator on 2016/7/21.
 */
define(function( require, exports, module ){

    //�������
    require("core");
    require("widget");
    require("datepicker");


    //�������
    require("dropdownlist");

    //��ʼʱ��
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
        //�����ַ
        var postUrl = $("#root_path").val() + '/account/withdrawal',
        //�ɹ���ת��ַ
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