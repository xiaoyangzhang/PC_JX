(function ($) {
    var ITEM_PUBLISH_STATUS = 2;

    var opts = {
        line: {
            type: 'tab',
            editTabList: [1]
        },
        cityActivity: {
            type: 'zui_tab',
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
                el: 'originalPriceStr'
            }, {
                el: 'stockNum'
            }, {
                el: 'imgvalue',
                type: 'img'
            }, {
                el: '.property',
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
                el: 'originalPriceStr'
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

    function showTab(index) {

        var $tabs = $('.eredar-info li'),
            $cur_tab = $($tabs[index]);

        var $contents = $('.eredar-right .tab-content>.panel');

        $tabs.removeClass('on');
        $cur_tab.addClass('on');
        $contents.hide();
        $($contents[index]).fadeIn();
    }

    function disableTab(tab) {
        $(tab).addClass('disabled');
    }

    function tabInit(opt) {
        showTab(opt.editTabList[0]);

        var allTabs = $('.eredar-info li');
        $.each(allTabs, function (index, tab) {
            if (!arrayExists(opt.editTabList, index)) {
                disableTab(tab);
            }
        });
    }

    function showZuiTab(href) {
        $('a[data-toggle="tab"][href="' + href + '"]').tab('show');
    }

    function disableZuiTab(href) {
        var $tab = $('a[data-toggle="tab"][href="' + href + '"]');
        $tab.on('show.zui.tab', function () {
            return false;
        }).removeAttr("data-toggle");
    }

    function zuiTabInit(opt) {
        showZuiTab(opt.editTabList[0]);

        var allTabs = $('[data-toggle="tab"]');
        $.each(allTabs, function (index, tab) {
            var href = $(tab).attr('href');
            if (!arrayExists(opt.editTabList, href)) {
                disableZuiTab(href);
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
                    $('[name="' + el + '"]').prop('readonly', true);
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
            case 'zui_tab':
                zuiTabInit(opt);
                break;
            case 'form':
                formInit(opt);
                break;
        }
    }


    $(function () {
        var itemStatus = $('#itemStatus').val(),
            isReadonly = $('#isReadonly').val(),
            type = $('#itemType').val();

        if (isReadonly == 'false' && itemStatus == ITEM_PUBLISH_STATUS) {
            init(type);
        }
    });

})(jQuery);