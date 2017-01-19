$(function() {
    //通过href传递上一个页面的id
    var menuName = document.getElementById('menuName');
    var secondName = document.getElementById('secondName');
    var hash = window.location.hash;
    var val = hash.substr(1, hash.length);
    $.ajax({
        url: 'http://mmb.ittun.com/api/getproduct',
        type: 'get',
        data: { productid: val },
        dataType: 'jsonp',
        success: function(data) {
            var str = data.result[0].productName;
            arr = str.split(' ');
            var categoryid = data.result[0].categoryId;
            menuName.innerHTML = arr[0];
            var compare = document.getElementById('compare');
            compare.innerHTML = data.result[0].bjShop;
            //商品详情
            var goodsName = document.getElementById('goods-name');
            var goodsPic = document.getElementById('goods-pic');
            goodsName.innerHTML = data.result[0].productName;
            goodsPic.innerHTML = data.result[0].productImg;
            $.ajax({
                url: 'http://mmb.ittun.com/api/getproductlist',
                type: 'get',
                data: { categoryid: categoryid },
                dataType: 'jsonp',
                beforeSend: function() {
                    beforeSend();
                },
                complete: function() {
                    complete();
                },
                success: function(data) {
                    var comment = document.getElementById('comment');
                    comment.innerHTML = data.result[0].productCom;
                },
                error: function() {
                    error();
                }
            });

            //和之前的 search-list 页面 进行交互
            $.ajax({
                url: 'http://mmb.ittun.com/api/getcategorybyid',
                type: 'get',
                data: { categoryid: categoryid },
                dataType: 'jsonp',
                success: function(data) {
                    secondName.innerHTML = data.result[0].category;
                    secondName.href = 'search-list.html#' + data.result[0].categoryId;
                }
            });

            $.ajax({
                url: 'http://mmb.ittun.com/api/getproductcom',
                type: 'get',
                data: { productid: val },
                dataType: 'jsonp',
                success: function(data) {
                    var html = template('template-comment', data);
                    var commentList = document.getElementById('comment_list');
                    commentList.innerHTML = html;
                }
            });
        }
    });
});