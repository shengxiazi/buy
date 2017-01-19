/**
 * Created by Administrator on 2017/1/13.
 */
$(function () {
    var hash = window.location.hash;
    var val = hash.substr(1, hash.length);
    $.ajax({
        url: 'http://mmb.ittun.com/api/getcouponproduct',
        //url: 'http://192.168.20.144:9090/api/getcouponproduct',
        data: {couponid: val},
        beforeSend: function() {
                        bLoad();
            },
        complete: function() {
                setTimeout(function() {
                     $('#bload').remove();
                },3000);
            },
        success: function (data) {
            var arr = data.result;
            var html = template('detail', data);
            $('.couponList').append(html);
            cSlideToggle(arr);
        }
    });
    function cSlideToggle(arr) {
        for (var i = 0; i < arr.length; i++) {
            $('.cSlide' + i + '').click(function () {
                $('.img').html(arr[this.id].couponProductImg);
                $('.slide').css('display', 'block');
                $('.slideBox').slideToggle('slow');
                Slide(arr, this.id);
            });
        }
    }

    function Slide(arr, index) {
        $('.arrowR').click(function () {
            if (index == arr.length) {
                index = 0;
            }
            index++;
            $('.img').html(arr[index].couponProductImg);
        });
        $('.arrowL').click(function () {
            if (index == 0) {
                index = arr.length;
            }
            index--;
            $('.img').html(arr[index].couponProductImg);
        });
    }

    Close();
    function Close() {
        $('.img').click(function () {
            $('.slide').css('display', 'none');
            $('.slideBox').css('display', 'none');
        });
    }
function bLoad() {
    //追加一个对象
    $(document.body).append('<div id="bload"><img src="../load.gif" /></div>');
    $('#bload').css({
        'width': '100%',
        'maxWidth': '640px',
        'minWidth': '320px',
        'height': '100%',
        'backgroundColor': 'rgba(0,0,0,0.2)',
        'position': 'fixed',
        'top': '44px',
        'zIndex': '10000'
    });
    var w = $('#bload').width();
    var h = w * 0.75;
    h = h -70;
    $('#bload img').css({
        'width': w + 'px',
        'height': h + 'px'
    });
}
});