$(function() {
    //通过href传递上一个页面的id
    var menuName = document.getElementById('menuName');
    var hash = window.location.hash;
    var val = hash.substr(1, hash.length);
    $.ajax({
        url: 'http://mmb.ittun.com/api/getcategorybyid',
        type: 'get',
        data: { categoryid: val },
        dataType: 'jsonp',
        success: function(data) {
            menuName.innerHTML = data.result[0].category;
            var pageid = 1;
            //渲染商品列表
            $.ajax({
                url: 'http://mmb.ittun.com/api/getproductlist',
                type: 'get',
                data: {
                    categoryid: val,
                    pageid: pageid
                },
                dataType: 'jsonp',
                beforeSend: function() {
                    beforeSend();
                },
                complete: function() {
                    complete();
                },
                success: function(data) {
                    var html = template('template', data);
                    var list = document.getElementById('list');
                    list.innerHTML = html;
                },
            });
            //创建下拉框
            var select = document.getElementById('select');
            $.ajax({
                url: 'http://mmb.ittun.com/api/getproductlist',
                type: 'get',
                data: {
                    categoryid: val,
                    pageid: 1
                },
                dataType: 'jsonp',
                success: function(data) {
                    var pageNum = Math.ceil(data.totalCount / data.pagesize);
                    for (var m = 0; m < pageNum; m++) {
                        var opt = document.createElement('option');
                        select.appendChild(opt);
                    }
                    var options = document.getElementsByTagName('option');
                    for (var n = 0; n < options.length; n++) {
                        options[n].innerHTML = n + 1 + '/' + pageNum;
                        pageid = n + 1;
                        $('#select').change(function() {
                            for (var n = 0; n < options.length; n++) {
                                pageid = options[n].innerHTML.substr(0, 1);
                                if (options[n].selected) {
                                    $.ajax({
                                        url: 'http://mmb.ittun.com/api/getproductlist',
                                        type: 'get',
                                        data: {
                                            categoryid: val,
                                            pageid: pageid
                                        },
                                        dataType: 'jsonp',
                                        success: function(data) {
                                            var html = template('template', data);
                                            var list = document.getElementById('list');
                                            list.innerHTML = html;
                                        }
                                    });
                                }
                            }
                        });
                    }
                    var pageUp = document.getElementById('pageUp');
                    var pageDown = document.getElementById('pageDown');
                    var options = document.getElementsByTagName('option');
                    pageid = 1;
                    //向下翻页
                    pageDown.onclick = function() {
                        pageid++;
                        if (pageid >= pageNum) {
                            pageid = pageNum;
                        }
                        for (var i = 0; i < options.length; i++) {
                            if (options[i].innerHTML.substr(0, 1) == pageid) {
                                options[i].selected = true;
                                $.ajax({
                                    url: 'http://mmb.ittun.com/api/getproductlist',
                                    type: 'get',
                                    data: {
                                        categoryid: val,
                                        pageid: pageid
                                    },
                                    dataType: 'jsonp',
                                    success: function(data) {
                                        var html = template('template', data);
                                        var list = document.getElementById('list');
                                        list.innerHTML = html;
                                    }
                                });
                            }
                        }
                        document.body.scrollTop = 0;
                    };
                    //向上翻页
                    pageUp.onclick = function() {
                        pageid--;
                        if (pageid <= 1) {
                            pageid = 1;
                        }
                        for (var i = 0; i < options.length; i++) {
                            if (options[i].innerHTML.substr(0, 1) == pageid) {
                                options[i].selected = true;
                                $.ajax({
                                    url: 'http://mmb.ittun.com/api/getproductlist',
                                    type: 'get',
                                    data: {
                                        categoryid: val,
                                        pageid: pageid
                                    },
                                    dataType: 'jsonp',
                                    success: function(data) {
                                        var html = template('template', data);
                                        var list = document.getElementById('list');
                                        list.innerHTML = html;
                                    }
                                });
                            }
                        }
                        document.body.scrollTop = 0;
                    };
                }
            });
        },
        error: function() {
            error();
        }
    });
});