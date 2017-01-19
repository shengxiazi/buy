//    慢慢买： 比较搜索分类页面    author： Yc   Begin at： 2017/1/10 15：57   
$(function() {
    $.ajax({
        //商品栏一级菜单
        url: 'http://mmb.ittun.com/api/getcategorytitle',
        type: 'get',
        data: {},
        dataType: 'jsonp',
        beforeSend: function() {
            beforeSend();
        },
        complete: function() {
            complete();
        },
        error: function() {
            error();
        },
        success: function(data) {
            var html = template('template', data);
            var accordion = document.getElementById('accordion');
            accordion.innerHTML = html;
            //商品栏二级菜单
            var arr = data.result;
            $.each(arr, function(i, n) {
                var t_id = n.titleId;
                $(".panel-title")[t_id].onclick = function() {
                    $.ajax({
                        url: 'http://mmb.ittun.com/api/getcategory',
                        type: 'get',
                        data: { titleid: t_id },
                        dataType: 'jsonp',
                        success: function(data) {
                            var html = template('template-details', data);
                            var rows = document.getElementsByClassName('row-body');
                            for (var i = 0; i < 8; i++) {
                                rows[i].innerHTML = html;
                                rows[i].style.borderLeft = '1px solid #cccccc';
                            }
                            $(".row-body > .col-xs-4").css({
                                'borderRight': '1px solid #cccccc',
                                'borderBottom': '1px solid #cccccc',
                                'textAlign': 'center',
                                'padding': '10px 0'
                            });
                            $(".row-body > .col-xs-4 > a").css({
                                'color': '#333333',
                                'textDecoration': 'none'
                            });
                        }
                    });
                };
            });
        }
    });
});