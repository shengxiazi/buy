$(function() {
    renderNav($(".menu > .top"));
    product($("#list" ));
    //导航部分的ajax请求
function renderNav(dom) {
    //html中的top就是dom，相当于top是实参，dom是形参
    //dom，把拿到的元素插到dom里面
    $.ajax({
        // url:'http://192.168.20.144:9090/api/getindexmenu',
        url:'http://mmb.ittun.com/api/getindexmenu',
        beforeSend: function() {
                    bLoad();
        },
        complete: function() {
                setTimeout(function() {
                     $('#bload').remove();
                },1000);
            },
        success:function(data) {
            var html = template("menutpl",data)
            dom.html(html);
            $('.menu > .top >.menu_item:nth-child(-n+4)').addClass('hide');
            //$('.menu > .top >.menu_item:nth-child( 8 ) > a')是jq对象，转成dom对象
            //将第八个a标签的属性改成#
            $('.menu > .top >.menu_item:nth-child( 8 ) > a')[0].href = '#';
            menuMore($('.menu .top .menu_item:nth-child(8) a'));
        },
        error: function() {
                    bLoad();
            }
    });
}
function bLoad() {
    //追加一个对象
    $('.index_layout').append('<div id="bload"><img src="modules/load.gif" /></div>');
    $('.index_layout #bload').css({
        'width': '100%',
        'maxWidth': '640px',
        'minWidth': '320px',
        'height': '100%',
        'backgroundColor': 'rgba(0,0,0,0.2)',
        'position': 'fixed',
        'top': '44px',
        'zIndex': '10000'
    });
    var w = $('.index_layout #bload').width();
    var h = w * 0.75;
    h = h -70;
    $('.index_layout #bload img').css({
        'width': w + 'px',
        'height': h + 'px'
    });
}
//点击更多，让后面4个显示隐藏s
function menuMore(dom,callback) {
    $(dom).on('click',function() {
        $('.menu > .top >.menu_item:nth-child(-n+4)').fadeToggle();
    });
}
function product(dom) {
    $.ajax({
        // url:'http://192.168.20.144:9090/api/getmoneyctrl',
        url:'http://mmb.ittun.com/api/getmoneyctrl',
        data: {},
        dataType: 'json',
        success:function(data) {
            var html = template("productId",data);
            dom.html(html);
            //console.log(1);
        }
    })
}
});



