$(function() {
    product($("#list" ));
    function product(dom) {
        //ͨ��href������һ��ҳ���id
        // var hash =  window.location.hash;
        // var val = hash.substr( 1, hash.length );
        var pageid = 1;
        $.ajax({
            // url:'http://192.168.20.144:9090/api/getmoneyctrl',
            url:'http://mmb.ittun.com/api/getmoneyctrl',
            data: {'pageid': pageid},
            dataType: 'json',
            beforeSend: function() {
                        bLoad();
            },
            complete: function() {
                setTimeout(function() {
                     $('#bload').remove();
                },3000);
            },
            success:function(data) {
                var html = template("productId",data);
                dom.html(html);
                //����������
                var select = document.getElementById( 'select' );
                $.ajax( {
                    url: 'http://mmb.ittun.com/api/getmoneyctrl',
                    // url: 'http://192.168.20.144:9090/api/getmoneyctrl',
                    type: 'get',
                    data: {'pageid': pageid},
                    dataType: 'json',
                    success: function( data ) {
                        //��ҳ�� = ���������� / ÿҳ��������
                        var pageNum = Math.ceil( data.totalCount / data.pagesize );
                        for ( var m = 0; m < pageNum; m ++ ) {
                            var opt = document.createElement( 'option' );
                            select.appendChild( opt );
                        }
                        //����ѡ��
                        var options = document.getElementsByTagName( 'option' );
                        for ( var n = 0; n < options.length; n++ ) {
                            options[ n ].innerHTML = n + 1 + '/' + pageNum;
                            pageid = n + 1;
                            //������ı�ʱ
                            $( '#select' ).change( function() {
                                for ( var n = 0; n < options.length; n++ ) {
                                    pageid = options[ n ].innerHTML.substr( 0, 1 );
                                    if ( options[ n ].selected ) {
                                    $.ajax( {
                                        url: 'http://mmb.ittun.com/api/getmoneyctrl',
                                        // url: 'http://192.168.20.144:9090/api/getmoneyctrl',
                                        type: 'get',
                                        data: { 'pageid': pageid},
                                        dataType: 'json',
                                        success: function( data ) {
                                            var html = template( 'productId', data );
                                            var list = document.getElementById( 'list' );
                                            list.innerHTML = html;
                                        }
                                    } );
                                }
                            }
                            } );
                        }
                        var pageUp = document.getElementById( 'pageUp' );
                        var pageDown = document.getElementById( 'pageDown' );
                        var options = document.getElementsByTagName( 'option' );
                        pageid = 1;
                         //��һҳ
                        pageDown.onclick = function () {
                            pageid ++;
                            if ( pageid >= pageNum ) {
                                pageid = pageNum;
                            }
                            for ( var i = 0; i < options.length; i ++ ) {
                                if ( options[ i ].innerHTML.substr( 0, 1 ) == pageid ) {
                                    options[ i ].selected = true;
                                    $.ajax( {
                                        url: 'http://mmb.ittun.com/api/getmoneyctrl',
                                      // url: 'http://192.168.20.144:9090/api/getmoneyctrl',
                                        type: 'get',
                                        data: {  'pageid': pageid },
                                        dataType: 'json',
                                        success: function( data ) {
                                            var html = template( 'productId', data );
                                            var list = document.getElementById( 'list' );
                                            list.innerHTML = html;
                                        }
                                    } );
                                }
                            }
                            document.body.scrollTop = 0;
                        };
                        //��һҳ
                        pageUp.onclick = function () {
                            pageid --;
                            if ( pageid <= 1 ) {
                                pageid = 1;
                            }
                            for ( var i = 0; i < options.length; i ++ ) {
                                if ( options[ i ].innerHTML.substr( 0, 1 ) == pageid ) {
                                    options[ i ].selected = true;
                                    $.ajax( {
                                        url: 'http://mmb.ittun.com/api/getmoneyctrl',
                                        // url: 'http://192.168.20.144:9090/api/getmoneyctrl',
                                        type: 'get',
                                        data: {'pageid': pageid },
                                        dataType: 'json',
                                        success: function( data ) {
                                            var html = template( 'productId', data );
                                            var list = document.getElementById( 'list' );
                                            list.innerHTML = html;
                                        }
                                    });
                                }
                            }
                            //���ض���
                            document.body.scrollTop = 0;
                        };
                    }
                });
            }
        });
    }
function bLoad() {
    //׷��һ������
    $('.index_layout').append('<div id="bload"><img src="load.gif" /></div>');
    $('.index_layout #bload').css({
        'width': '100%',
        'maxWidth': '640px',
        'minWidth': '320px',
        'height': '100%',
        'backgroundColor': 'rgba(0,0,0,0.2)',
        'position': 'fixed',
        'top': '44px',
        'zIndex': '10000'
    });
    var w = $('.index_layout #bload').width();
    var h = w * 0.75;
    h = h -70;
    $('.index_layout #bload img').css({
        'width': w + 'px',
        'height': h + 'px'
    });
}
});



