/*! pc_jx - v1.0.0 - 2016-07-28 */
define(function(require,exports,module){/* var $public = require("public");*/
$urlpath=require("urlpath"),require("upload"),$public=require("public"),require("ajaxform");var $module=function(){this.init.apply(this,arguments)};$module.prototype={init:function(){var $self=this;/*            $('.main-details .master-registration').hide();
            $('.main-details .merchants-registration').hide();*/
$(".mode-tab-nav ul li").first().children(".nav-bom").css("background","#ffaf00"),$(".mode-tab-nav ul li").on("click",function(){$(this).children(".nav-bom").css("background","#ffaf00"),$(this).siblings().children(".nav-bom").css("background","#f3f7fa")}),$self.bindDomEvent(),$(".mode-tab-nav li").on("click",function(){/*                console.log($public.urlpath.agreement);
                console.log($public.urlpath.toDetailPage);*/
"shazi"==$(this).attr("id")?$("#Settled").attr("href",$public.urlpath.agreement):$("#Settled").attr("href",$public.urlpath.toDetailPage)})},config:{main_nav:".jiux_main>.main-nav>ul>li",main_nav_content:".jiux_main>.main>.main-details>div",mode_nav:".main-mode>.mode-tab>.mode-tab-nav>ul>li",mode_nav_content:".main-mode>.mode-tab>.mode-info>ul>li",mode_nav_text:".main-mode>.mode-tab>.mode-tab-nav>ul>li>.nav-bom"},bindDomEvent:function(){var $self=this;/*导航条tab栏切换*/
/*$self.tab($self.config.main_nav, 'active', $self.config.main_nav_content);*/
/*商家入驻 --- 入驻模式tab栏切换*/
$self.tab($self.config.mode_nav,"current",$self.config.mode_nav_content)},tab:function(nav,className,content){var nav=$(nav),content=$(content);nav.on("click",function(){var index=$(this).index();$(this).addClass(className).siblings().removeClass(className),content.eq(index).show().siblings().hide()})}},module.exports=new $module});
/*! pc_jx 最后修改于： 2016-07-28 */