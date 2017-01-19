/**
 * Created by Administrator on 2017/1/12.
 */
$.ajax({
    //url: 'http://192.168.20.144:9090/api/getsitenav',
    url: 'http://mmb.ittun.com/api/getsitenav',
    success: function (data) {
        var html = template('navModel', data);
        $('.content').append('<div class="link"></div>');
        $('.link').append(html);
    }
});
