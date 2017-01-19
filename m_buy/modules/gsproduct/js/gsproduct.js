$(function () {
    //搜索框的点击事件
    var serch = document.getElementById("serch");
    var menu = document.getElementById("serch_menu");
    var flag = false;
    $("#serch").click(function () {
        if (!flag) {
            $("#menu").addClass("show");
            flag = true;
        } else {
            $("#menu").removeClass("show");
            flag = false;
        }
    })

//<-------------------------------------点击搜索栏显示隐藏----------------------------------------------------------------------------------------------------->
    var f = true;
    var rotate = 0;
    $(".price_icon").click(function () {
        rotate += 180;
        if (f) {
            $(".price_icon").css({
                'transform': 'rotate(' + 180 + 'deg) translateY(' + 10 + 'px)'
            });
            $(".all_price").addClass('show');
            f = false;
        } else {
            $(".price_icon").css({
                'transform': 'rotate(' + 0 + 'deg) translateY(' + 0 + 'px)'
            });
            $(".all_price").removeClass('show');
            f = true;
        }
    })

   //-------------------------------------------------全部价格小三角旋转以及显示隐藏部分----------------------------------------------------------------------------------
    var r = true;
    var rotate = 0;
    $("#jd").click(function () {
        rotate += 180;
        if (r) {
            $(".triangle_jd").css({
                'transform': 'rotate(' + 180 + 'deg) translateY(' + 10 + 'px)'
            });
            $(".popsort").addClass('hide show');
            r = false;
        } else {
            $(".triangle_jd").css({
                'transform': 'rotate(' + 0 + 'deg) translateY(' + 0 + 'px)'
            });
            $(".popsort").removeClass('show');
            r = true;
        }
    })
 //---------------------------------------点击京东三角让三角旋转180deg并让渲染的数据显示隐藏--------------------------------------------------------
    var b = true;
    var rotate = 0;
    $("#areabtn").click(function () {
        rotate += 180;
        if(b){
            $(".triangle_area").css({
                'transform': 'rotate(' + 180 + 'deg) translateY(' + 10 + 'px)'
            });
            $(".popsort").addClass('hide show');
            b = false;
        }else {
            $(".triangle_area").css({
                'transform': 'rotate(' + 0 + 'deg) translateY(' + 0 + 'px)'
            });
            $(".popsort").removeClass('show');
            b = true;
        }
})
//---------------------------------------点击区域三角让三角旋转180deg并让渲染的数据显示隐藏-------------------------------------------------------------------------------------
    var shopid = 0;
    var areaid = 0;
    $.ajax( {
        //url: 'http://192.168.20.144:9090/getgsproduct',
        url: 'http://mmb.ittun.com/api/getgsproduct',
        data: {
            shopid: shopid,
            areaid: areaid
        },
        dataType: 'json',
        beforeSend: function() {
                        bLoad();
            },
        complete: function() {
                setTimeout(function() {
                     $('#bload').remove();
                },3000);
            },
        success: function( data ) {
            var html = template("productId", data);
            $(".bd").html(html);
        }
        });

//<-------------------------------------------默认刷进来就显示图片------------------------------------------------------------------------------------------------->
    $("#jd").click(function () {
        function shop(dom) {
            $.ajax({
                //url: "http://192.168.20.144:9090/api/getgsshop",
                url:"http://mmb.ittun.com/api/getgsshop",
                success: function (data) {
                    //console.log(data);
                    var html = template("jdShop", data);
                    dom.html(html);
                    //遍历stores，得到li，通过li得到shopid
                    var stores = document.getElementsByClassName( "mmm_store" );
                    for ( var i = 0; i < stores.length; i ++ ) {
                        stores[i].index = i;
                        stores[i].onclick = function () {
                            shopid = this.index;
                            areaid = 0;
                            $.ajax( {
                                //url: 'http://192.168.20.144:9090/getgsproduct',
                                url: 'http://mmb.ittun.com/api/getgsproduct',
                                data: {
                                    shopid: shopid,
                                    areaid: areaid
                                },
                                dataType: 'json',
                                success: function( data ) {
                                   var html = template("productId",data);
                                   $(".bd").html(html);
                                    //console.log(data);
                                }
                            } );
                        };
                    }
                }
            });
        }
        shop($(".popsort"))
    })
    //<------------------------------------点击京东店铺切换数据--------------------------------------------------------------->
    //点击区域请求数据
    var areabtn = document.getElementById('areabtn');
    $("#areabtn").click(function () {
        //让京东和全部价格渲染回来的数据隐藏
        //$(".popsort").css("height",0);
        function area(dom) {
            $.ajax({
                //url: "http://192.168.20.144:9090/api/getgsshoparea",
                url:"http://mmb.ittun.com/api/getgsshoparea",
                 beforeSend: function() {
                        bLoad();
                },
                success: function (data) {
                    //console.log(data);
                    var html = template("area", data)
                    dom.html(html);

                    var areas = document.getElementsByClassName( "mmm_area" );
                    for ( var i = 0; i < areas.length; i ++ ) {
                        areas[i].index = i;
                        areas[i].onclick = function() {
                            areaid = this.index;
                            $.ajax( {
                                //url: 'http://192.168.20.144:9090/api/getgsproduct',
                                url: 'http://mmb.ittun.com/api/getgsproduct',
                                data: {
                                    shopid: shopid,
                                    areaid: areaid
                                },
                                dataType: 'json',
                                success: function( data ) {
                                    //console.log(data);
                                    var html = template("productId",data);
                                    $(".bd").html(html);
                                    //console.log(shopid);
                                    //console.log(areaid);
                                }
                            } );
                        };
                    }
                }
            });
        }
        //渲染回来的数据都是插在.popsort中，这样区域里面渲染的数据就不会摆放在京东的下面
        area($(".popsort"));
    });
function bLoad() {
    //追加一个对象
    $('.bill_layout').append('<div id="bload"><img src="load.gif" /></div>');
    $('.bill_layout #bload').css({
        'width': '100%',
        'maxWidth': '640px',
        'minWidth': '320px',
        'height': '100%',
        'backgroundColor': 'rgba(0,0,0,0.2)',
        'position': 'fixed',
        'top': '44px',
        'zIndex': '10000'
    });
    var w = $('.bill_layout #bload').width();
    var h = w * 0.75;
    h = h -70;
    $('.bill_layout #bload img').css({
        'width': w + 'px',
        'height': h + 'px'
    });
}

//<-------------------------------------------------点击地域切换图片------------------------------------------------------------------------------------------->
})




































