/*! PC_JX - v1.0.0 - 2017-01-17 */
!function(a){function b(a,b){for(var c=0;c<=a.length-1;c++)if(a[c]==b)return!0;return!1}function c(b){var c=a(".eredar-info li"),d=a(c[b]),e=a(".eredar-right .tab-content>.panel");c.removeClass("on"),d.addClass("on"),e.hide(),a(e[b]).fadeIn()}function d(b){a(b).addClass("disabled")}function e(e){c(e.editTabList[0]);var f=a(".eredar-info li");a.each(f,function(a,c){b(e.editTabList,a)||d(c)})}function f(b){a('a[data-toggle="tab"][href="'+b+'"]').tab("show")}function g(b){var c=a('a[data-toggle="tab"][href="'+b+'"]');c.on("show.zui.tab",function(){return!1}).removeAttr("data-toggle")}function h(c){f(c.editTabList[0]);var d=a('[data-toggle="tab"]');a.each(d,function(d,e){var f=a(e).attr("href");b(c.editTabList,f)||g(f)})}function i(b){a.each(b.disableFieldList,function(b,c){var d=c.el,e=c.type;switch(e){case"img":a('[name="'+d+'"]').closest(".imgbox").find(".del,.upl").hide();break;case"container":a(d).find("input,select,teatarea").prop("disabled",!0);default:a('[name="'+d+'"]').prop("readonly",!0)}})}function j(a){var b=l[a];if(b)switch(b.type){case"tab":e(b);break;case"zui_tab":h(b);break;case"form":i(b)}}var k=2,l={line:{type:"tab",editTabList:[1]},cityActivity:{type:"zui_tab",editTabList:["#tab2"]},integralMall:{type:"form",disableFieldList:[{el:"title"},{el:"code"},{el:"priceY"},{el:"maxPoint"},{el:"originalPriceStr"},{el:"stockNum"},{el:"imgvalue",type:"img"},{el:".property",type:"container"}]},common:{type:"form",disableFieldList:[{el:"title"},{el:"code"},{el:"originalPriceStr"},{el:"priceY"},{el:"stockNum"},{el:"imgvalue",type:"img"},{el:".property",type:"container"}]}};a(function(){var b=a("#itemStatus").val(),c=a("#isReadonly").val(),d=a("#itemType").val();"false"==c&&b==k&&j(d)})}(jQuery);
/*! PC_JX xiongzhaoling 最后修改于： 2017-01-17 */