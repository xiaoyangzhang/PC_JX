define(function (require, exports, module) {
    var $public = require("public")

    function getDialogHtml(expireDate) {
        var year = new Date().getFullYear();
        var renewurl = site_path + '/basicInfo/contractRenewDate';
        return '<div class="dialog" style="display: block;">' +
            '<div class="dialog-agreement">' +
            '<div class="clearfix">' +
            '<h2>' + (year+1) + '年九休旅行续签申请须知</h2>' +
            '<i></i>' +
            '</div>' +
            '<p>尊敬的商家您好：</p>' +
            '<p>若您与我平台的协议到期日为<label>' + expireDate + '</label>，请于合同到期日前在线申请' + (year + 1) + '年协议续签，逾期未续签的商户将视为自动放弃续签。同时未续签的商户您的店铺届时将不能正常运营。请您及时续签，以免造成不必要的损失</p>' +
            '<p>续签流程如下：</p>' +
            '<p class="bold">申请续签——下载协议&nbsp; ——彩色打印两份，盖章并签字——邮寄回九休——续签成功</p>' +
            '<p>若有疑问请拨打续签咨询电话：18314575075</p>' +
            '<a class="actionagrmt" href="' + renewurl + '">申请续签</a>' +
            '</div>' +
            '<div class="bgmeng"></div>' +
            '</div>';
    }

    var agreement = {
        show: function () {
            var renewDayContract = $('#renewDayContract').val();
            var renewContract = $('#renewContract').val();
            var renewDate = $('#renewDate').val();
            if (renewContract === "2" && renewDayContract === "2") {
                agreement.init(renewDate);
            }
        },
        init: function (expireDate) {
            var dialog = getDialogHtml(expireDate);
            var $dialog = $(dialog).show().appendTo('body');
            $dialog.find('.dialog-agreement i').on('click', function (ev) {
                $dialog.hide();
                $public.stopBubble(ev);
            });
        }
    }
    agreement.show();
});