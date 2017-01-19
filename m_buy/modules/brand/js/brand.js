/**
 * Created by Administrator on 2017/1/10.
 */
$(function () {
    //第一级
    $.ajax({
        url: 'http://mmb.ittun.com/api/getbrandtitle',
        //url: 'http://192.168.20.144:9090/api/getbrandtitle',
        type: 'get',
        data: {},
        dataType: 'jsonp',
        beforeSend: function() {
                        bLoad();
            },
        complete: function() {
                setTimeout(function() {
                     $('#bload').remove();
                },3000);
            },
        success: function (data) {
            var html = template('template', data);
            var con = document.getElementById('content');
            con.innerHTML = html;
            ////第二级
            //var arr = data.result;
            //$.each(arr, function (i, n) {
            //    var brandId = n.brandTitleId;
            //    //console.log(brandId);
            //    $('#brand' + i + '').click(function () {
            //        $('.first').remove();
            //        $('.brand').append('<div class="second"></div>');
            //        $('.second').append('<div class="titleTwo">' + n.brandTitle
            //            + '</div>')
            //        $.ajax({
            //            url: 'http://mmb.ittun.com/api/getbrand',
            //            type: 'get',
            //            data: {brandtitleid: brandId},
            //            dataType: 'jsonp',
            //            success: function (data) {
            //                console.log(data);
            //                var html = template('test', data);
            //                $('.titleTwo').after(html);
            //                $('#sort' + 0 + '').css('backgroundColor', '#F10E0E');
            //                $('#sort' + 1 + '').css('backgroundColor', '#FF9314');
            //                $('#sort' + 2 + '').css('backgroundColor', '#8ADF5B');
            //            }
            //        });
            //    });
            //});
        }
    });
function bLoad() {
    //追加一个对象
    $(document.body).append('<div id="bload"><img src="load.gif" /></div>');
    $('#bload').css({
        'width': '100%',
        'height': '100%',
        'maxWidth': '640px',
        'minWidth': '320px',
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