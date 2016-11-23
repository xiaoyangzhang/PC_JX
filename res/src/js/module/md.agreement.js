define(function (require, exports, module) {
    var agreement = {
        selector: {
            btn_download: '.agremt-btn',
            btn_View: '.agremt-view'
        },
        init: function () {
            $(agreement.selector.btn_View).on('click', function () {
                if (agreement.pdfUrl) {
                    agreement.preview();
                } else {
                    agreement.getPdfUrl();
                }
            });
        },
        getPdfUrl: function () {
            var ajaxUrl = $('#root_path').val() + '/basicInfo/toContractDownloadPage',
                renewDate = $('#renewDate').val(),
                sellerId = $('#sellerId').val();

            $.ajax({
                url: ajaxUrl,
                type: 'post',
                data: {
                    sellerId: sellerId,
                    renewDate: renewDate
                },
                success: function (res) {
                    if (res.success) {
                        agreement.pdfUrl = res.value;
                        agreement.preview();
                    }
                }
            });
        },
        preview: function () {
            window.open(agreement.pdfUrl, '_blank');
        }
    }
    $(function () {
        agreement.init();
    });
});