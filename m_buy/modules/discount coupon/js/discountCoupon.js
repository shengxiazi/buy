/**
 * Created by Administrator on 2017/1/12.
 */
$(function () {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getcoupon',
        //url: 'http://192.168.20.144:9090/api/getcoupon',
        success: function (data) {
            console.log(data);
            var html = template('discount', data);
            $('.content').append(html);
        }
    });
});
