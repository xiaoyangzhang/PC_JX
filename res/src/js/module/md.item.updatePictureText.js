(function ($) {
    var ITEM_PUBLISH_STATUS = 2;

    var opts = {
        line: {
            type: 'tab',
            editTabList: ['#tab2']
        },
        cityActivity: {
            type: 'tab',
            editTabList: ['#tab2']
        },
        integralMall: {
            type: 'form',
            disableFieldList: [{
                el: 'title'
            }, {
                el: 'code'
            }, {
                el: 'priceY'
            }, {
                el: 'maxPoint'
            }, {
                el: 'stockNum'
            }, {
                el: 'imgvalue',
                type: 'img'
            }, {
                el: '.nonKeyProperty',
                type: 'container'
            }]
        },
        common: {
            type: 'form',
            disableFieldList: [{
                el: 'title'
            }, {
                el: 'code'
            }, {
                el: 'priceY'
            }, {
                el: 'stockNum'
            }, {
                el: 'imgvalue',
                type: 'img'
            }, {
                el: '.property',
                type: 'container'
            }]
        }
    }

    function arrayExists(arr, item) {
        for (var i = 0; i <= arr.length - 1; i++) {
            if (arr[i] == item) {
                return true
            }
        }
        return false;
    }

    function showTab(href) {
        $('a[data-toggle="tab"][href="' + href + '"]').tab('show');
    }

    function disableTab(href) {
        var $tab = $('a[data-toggle="tab"][href="' + href + '"]');
        $tab.on('show.zui.tab', function () {
            return false;
        }).removeAttr("data-toggle");
    }

    function disableControl(el) {
        $(el).prop('readonly', true);
    }

    function tabInit(opt) {
        showTab(opt.editTabList[0]);

        var allTabs = $('[data-toggle="tab"]');
        $.each(allTabs, function (index, tab) {
            var href = $(tab).attr('href');
            if (!arrayExists(opt.editTabList, href)) {
                disableTab(href);
            }

        });
    }

    function formInit(opt) {
        $.each(opt.disableFieldList, function (index, f) {
            var el = f.el,
                type = f.type;
            switch (type) {
                case 'img':
                    $('[name="' + el + '"]').closest('.imgbox').find('.del,.upl').hide();
                    break;
                case 'container':
                    $(el).find('input,select,teatarea').prop('disabled', true);
                default:
                    $('[name="' + el + '"]').prop('disabled', true);
                    break;
            }
        });
    }

    function init(type) {
        var opt = opts[type];
        if (!opt) {
            return;
        }

        switch (opt.type) {
            case 'tab':
                tabInit(opt);
                break;
            case 'form':
                formInit(opt);
                break;
        }
    }


    $(function () {
        var itemStatus = $('#itemStatus').val(),
            type = $('#itemType').val();

        if (itemStatus == ITEM_PUBLISH_STATUS) {
            init(type);
        }
    });

})(jQuery);