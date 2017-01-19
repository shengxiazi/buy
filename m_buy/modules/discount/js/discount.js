$(function() {
    load();
    $("#skip").click(function() {
        $("#list >li").remove();
        load();
    });
});



//懒加载
function load() {
    var num = 8;
    var list = document.getElementById('list');
    $.ajax({
        url: 'http://mmb.ittun.com/api/getinlanddiscount',
        data: {},
        dataType: 'json',
        beforeSend: function() {
            beforeSend();
        },
        complete: function() {
            complete();
        },
        success: function(data) {
            for (var i = 0; i < num; i++) {
                //调用拼接字符串的方法
                addGoods(data, i);
            }
            //延时加载
            var distance = $(".layout").height() - window.innerHeight;
            window.onresize = function() {
                distance = $(".layout").height() - window.innerHeight;
            };
            window.onscroll = function() {
                if (document.body.scrollTop == distance && data.result.length > num + 1) {
                    $("#list").append('<div id="loading" style="position: absolute; width:100%; max-width:640px; min-width:300px; color:#FF841D; font-size:20px; font-weight:900; text-align: center; bottom: -30px; z-index:10000">加载中 · · ·</div>')
                    var timeOut = setTimeout(function() {
                        $("#loading").remove();
                        for (var i = num; i < num + 4; i++) {
                            //调用拼接字符串的方法
                            addGoods(data, i);
                        }
                        distance += $('li')[0].offsetHeight * 2;
                        num += 4;
                        clearTimeout(timeOut);
                    }, 1000);
                }
            };
        },
        error: function() {
            error();
        }
    });
}

function addGoods(data, i) {
    var li = document.createElement('li');
    list.appendChild(li);
    li.className = 'f_left clearfix';
    li.innerHTML = '<a href="discount/discount-details.html#' + data.result[i].productId + '">' +
        data.result[i].productImg +
        '<div class="goods-title">' + data.result[i].productName + '</div>' +
        '<div class="goods-price">' + data.result[i].productPrice + '</div>' +
        '<div class="goods-from"><span>' + data.result[i].productFrom + '</span> | <span> ' + data.result[i].productTime + '</span></div>' +
        '</a>'
}

//              用模板的方法（ 达不到懒加载的效果 ）
//$( function() {
//    $.ajax( {
//        url: 'http://mmb.ittun.com/api/getinlanddiscount',
//        data: {},
//        dataType: 'json',
//        beforeSend: function () {
//            $(".layout").append('<div id="pload" style="position:fixed;top:48px;z-index:1000;background-color:#FF841D ;width:100%;height:100%;max-width:640px;margin:0 auto;color: white;font-size: 50px;text-align: center;padding-top: 50%;">Loading......</div>');
//            var timer = setTimeout( function() {
//                $( "#pload").html( '服务器爆炸了</br>你还要等吗？' );
//                clearTimeout( timer );
//            }, 1000 );
//            var timer1 = setTimeout( function() {
//                $( "#pload").html( '骚年</br>放弃吧' );
//                clearTimeout( timer1 );
//            }, 3000 );
//        },
//        complete: function () {
//            $("#pload").remove();
//        },
//        success: function( data ) {
//            var html = template('template-list', data);
//            var list = document.getElementById( 'list' );
//            list.innerHTML = html;
//            console.log(data);
//        },
//        error: function() {
//            $(".layout").append('<div id="ploaderror" style="position:fixed;top:48px;z-index:1200;background-color:#FF841D ;width:100%;height:100%;max-width:640px;margin:auto auto;color: white;font-size: 50px;text-align: center;padding-top: 50%;">骚年</br>上不起网</br>还是回家种田吧</div>');
//        }
//    } );
//} );