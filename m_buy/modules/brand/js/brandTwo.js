/**
 * Created by Administrator on 2017/1/11.
 */
$(function () {
    var hash = window.location.hash;
    var val = hash.substr(1, hash.length);
    var brandId = val;
    $('.brand').append('<div class="second"></div>');
    $('.brand').append('<div class="third"></div>');
    $('.brand').append('<div class="fourth"></div>');
    $.ajax({
        url: 'http://mmb.ittun.com/api/getbrand',
        //url: 'http://192.168.20.144:9090/api/getbrand',
        type: 'get',
        data: {brandtitleid: brandId},
        dataType: 'jsonp',
        success: function (data) {
            var arr = data.result[0].brandName;
            var str = arr.substr(2, arr.length);
            $('.second').append('<div class="titleTwo">' + str + '哪家强'
                + '</div>')
            var html = template('test', data);
            $('.titleTwo').after(html);
            $('.third').append('<div class="titleTwo">' + str + '产品销量排行'
                + '</div>');
            $('.fourth').append('<div class="titleTwo">' + str + '最新评论'
                + '</div>');
            $('#sort' + 0 + '').css('backgroundColor', '#F10E0E');
            $('#sort' + 1 + '').css('backgroundColor', '#FF9314');
            $('#sort' + 2 + '').css('backgroundColor', '#8ADF5B');
        }
    });
    $.ajax({
        url: 'http://mmb.ittun.com/api/getbrandproductlist',
        //url: 'http://192.168.20.144:9090/api/getbrandproductlist',
        type: 'get',
        data: {brandtitleid: val, pagesize: 4},
        dataType: 'jsonp',
        success: function (data) {
            var arr = data.result[0];
            var num = arr.productId;
            var html = template('sale', data);
            $('.third>.titleTwo').after(html);
            $.ajax({
                url: 'http://mmb.ittun.com/api/getproductcom',
                //url: 'http://192.168.20.144:9090/api/getproductcom',
                data: {productid: num},
                success: function (data) {
                    //console.log(data);
                    var html = template('comment', data);
                    $('.fourth').append(html);
                    $('.fourth .pic').html(arr.productImg);
                    $('.fourth .tite').html(arr.productName);
                }
            });
        }
    });
});