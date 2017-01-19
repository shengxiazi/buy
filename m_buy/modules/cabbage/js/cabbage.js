// 入口函数
$(function() {
    swipe();
    search();
    // 点击关闭APP广告
    $('.cls').click(function() {
        $('.appbanner').slideUp();
    });
d
/*后台数据交互*/
/*获取url中传递的参数*/
    // (function($) {
    //         $.getQueryString = function(key) {
    //             var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    //             var result = window.location.search.substr(1).match(reg);
    //             return result ? decodeURIComponent(result[2]):null;
    //         }
    // })(jQuery);
    // 渲染白菜价标题列表
    // 全局索引id
    var index;
    renderTitle($('.buy_tabs > ul'));
    function renderTitle(dom) {
        $.ajax({
            // url: 'http://192.168.20.144:9090/api/getbaicaijiatitle',
            url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
            //传递参数
            dataType: 'json',
            //加载之前
            beforeSend: function() {
                        bLoad();
            },
            //加载之后
            complete: function() {
                setTimeout(function() {
                     $('#bload').remove();
                },3000);
            },
            //异步请求响应成功
            success: function(data) {
                //解析后台数据
                var html = template('tittpl', data);
                //依据后台数据渲染页面
                dom.html(html);
                $('.buy_tabs ul li')[0].className = 'active';
               //获取所有的li计算ul的宽度
                var ulWidth = 0;
                $.each( $('.buy_tabs ul li'), function(i, val) {
                    ulWidth += $('.buy_tabs ul li').width();
                    var lis = document.querySelectorAll('.buy_tab ul li');
                });
                $('.buy_tabs ul').css('width',ulWidth + 'px');
                swipe();
                //给所有的li批量注册事件
                // var arr = [];    //存放参数id
                $('.buy_tabs ul li').click(function() {
                    //获取当前li索引
                    index = $(this).index();
                    $('.buy_tabs ul li').eq(index).addClass('active').siblings().removeClass();
                    //获取当前li
                    var w =  $('.buy_tabs ul li').eq(index)[0].offsetLeft;
                    $('.buy_tabs ul').css({
                      'transform': 'translateX(-'+ w +'px)'
                    });
                    // var hash = window.location.hash;
                    // var titleid = hash.substr( 1, hash.length );
                     // 再异步请求
                    renderProduct($('#cabbage_products'),index);
                });
            },
            //响应失败
            error: function() {
                    bLoad();
            }
        });
    }
     // 渲染初始化商品列表
    renderProduct($('#cabbage_products'),0);
    function renderProduct(dom,index) {
        $.ajax({
            // url: 'http://192.168.20.144:9090/api/getbaicaijiaproduct',
            url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            //传递参数
            data: {'titleid': 0 || index},
            dataType: 'json',
            success: function(data) {
                //后台数据
                // var html = template('cabbagetpl', data);
                //渲染数据
                // dom.html(html);
                /*懒加载*/
                lazyLoad();
                function lazyLoad() {
                    var html = '';
                    //拼接字符串
                    function addStr(n) {
                         html += "<li>"+'<a href="http://s.click.taobao.com/lkqGHQx"'+
                                        'class="gobuy"target="_blank"></a>' +
                                '<div href="#" class="pic">' + data.result[n].productImg +'</div>' +
                                '<div class="info">' +'<div class="i">' +
                                '<div>'+ data.result[n].productName +'</div>' +
                                '<div>'+ data.result[n].productPrice +'</div>' +
                                '</div>' + '<div class="o">' + data.result[n].productCouponRemain +
                                '<div class="bot clearfix">' + '<div class="f_l">' +
                                data.result[n].productCoupon +'</div>' +
                                '<div class="f_r">' +data.result[n].productHref +
                                '</div>' +'</div>' +'</div>' + '</div>' +"</li>"
                    }
                    //加载的次数
                    var num = 4;
                    for(var i = 0; i < num; i++) {
                           addStr(i);
                    }
                    dom.html(html);
                    //可以滚动的最大高度   //监听页面滚动
                    var distanceY = $('.buy_layout').height() - window.innerHeight;
                    window.onresize = function() {
                        //重新计算
                        distanceY = $('.buy_layout').height() - window.innerHeight;
                    };
                    window.onscroll = function () {
                        if(document.body.scrollTop == distanceY && num < data.result.length) {
                        for(var i = num; i < num + 2; i++) {
                           addStr(i);
                        }
                        $('.loading').fadeToggle();
                        setTimeout(function() {
                            $('.loading').fadeToggle();
                            dom.html(html);
                        },1000);
                        //重置参数
                        //再加载2次
                        num +=2;
                        //在已加载的资源基础上递增
                        distanceY +=  2 * $('#cabbage_products li')[0].offsetHeight;
                        }
                    };
                }
                //点击返回顶部
                $('.footer_t a:nth-of-type(3)').click(function() {
                    $('html,body').animate({
                    scrollTop:'0'},1000);
                    // document.body.scrollTop = 0;
                    $('#cabbage_products li').remove();
                    lazyLoad();
                });
            }
        });
    }
/*汉堡菜单搜索功能*/
function search() {
    // //标记图标
    var flag = false;
    // 切换类名
    tap($('.search_icon')[0], function() {
            $('#search_box').fadeToggle();
            if(!flag) {
                $('#search_btn')[0].className = 'buy_icon glyphicon glyphicon-remove';
                flag = true;
            }else {
                $('#search_btn')[0].className = 'buy_icon glyphicon glyphicon-menu-hamburger';
                flag = false;

            }
        }
    );
}
//加载之前
function bLoad() {
    //追加一个对象
    $('.buy_layout').append('<div id="bload"><img src="load.gif" /></div>');
    $('.buy_layout #bload').css({
        'width': '100%',
        'maxWidth': '640px',
        'minWidth': '320px',
        'height': '100%',
        'backgroundColor': 'rgba(0,0,0,0.2)',
        'position': 'fixed',
        'top': '44px',
        'zIndex': '10000'
    });
    var w = $('.buy_layout #bload').width();
    var h = w * 0.75;
    h = h -70;
    $('.buy_layout #bload img').css({
        'width': w + 'px',
        'height': h + 'px'
    });
}
/*导航菜单条水平滑动功能*/
function swipe() {
    //滑动对象的滑动方法
    alice.iScroll({
        //父容器对象
        // jQuery对象转换为DOM对象
        swipeDom: $('.buy_tabs')[0],
        //滑动方向
        swipeType: 'x',
        //缓冲距离
        swipeDistance: 100
    });
}
// 封装 tap 轻触事件
function tap(dom,callback){
    /*
     * 1.没有触发 touchmove 事件
     * 2.响应速度要比click快
    */
    if(dom && typeof  dom == 'object'){
        var isMove = false;
        var startTime = 0;
        dom.addEventListener('touchstart',function(e){
            //console.log('touchstart');
            //console.time('tap');/*记录tap这个参数现在的时间*/
            startTime = Date.now();
        });
        dom.addEventListener('touchmove',function(e){
            //console.log('touchmove');
            isMove = true;
        });
        dom.addEventListener('touchend',function(e){
            //console.log('touchend');
            //console.timeEnd('tap')/*打印tap这个参数距离上一次记录的时候的时间*/
            /*判读  是否满足tap 的要求  一般要求tap的响应时间150*/
            if(!isMove && (Date.now()-startTime) < 150){
                /*调用 callback*/
                callback && callback(e);
            }
            /*重置 参数*/
            isMove = false;
            startTime = 0;
        });
    }
}
});