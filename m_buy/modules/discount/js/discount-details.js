$(function() {
    var hash = window.location.hash;
    //当前商品的id
    var val = hash.substr(1, hash.length);
    $.ajax({
        url: 'http://mmb.ittun.com/api/getdiscountproduct',
        data: { productid: val },
        dataType: 'json',
        beforeSend: function() {
            beforeSend();
        },
        complete: function() {
            complete();
        },
        success: function(data) {
            console.log(data);
            $("#g-title").html(data.result[0].productName);
            $("#g-price").html(data.result[0].productPrice);
            $("#g-from").html(data.result[0].productFrom);
            $("#g-time").html(data.result[0].productTime);
            $("#g-person").html(data.result[0].productTips);
            $("#introduce").html(data.result[0].productInfo).after(data.result[0].productImg);
            $("#goods-comment").html(data.result[0].productComment);
        },
        error: function() {
            error();
        }
    });
});