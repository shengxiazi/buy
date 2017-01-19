// beforeSend封装
function beforeSend() {
    // $(".layout").append('<div id="pload" style="position:fixed;top:48px;z-index:1000;background-color:#FF841D ;width:100%;height:100%;max-width:640px;min-width:300px;margin:auto auto;color: white;font-size: 50px;text-align: center;padding-top: 40%;">Loading......</div>');
    // var timer = setTimeout(function() {
    //     $("#pload").html('服务器爆炸了</br>你还要等吗？');
    //     clearTimeout(timer);
    // }, 1000);
    // var timer1 = setTimeout(function() {
    //     $("#pload").html('骚年</br>放弃吧');
    //     clearTimeout(timer1);
    // }, 3000);


    $("#wave").remove();
    $(".layout").append('<section id="wave"><div class="wave"><div>L</div><div>o</div><div>a</div><div>d</div><div>ing</div></div></div></section>');
    var wave = document.getElementById('wave');
    wave.style.height = window.innerHeight + 'px';
    wave.style.width = window.innerWidth + 'px';
}
// complete封装
function complete() {
    setTimeout(function() {
        $("#wave").fadeOut();
        // $("#wave").remove();
    }, 1000)
}
// error封装
function error() {
    // $(".layout").append('<div id="ploaderror" style="position:fixed;top:48px;z-index:1200;background-color:#FF841D ;width:100%;height:100%;max-width:640px;min-width:300px;margin:auto auto;color: white;font-size: 50px;text-align: center;padding-top: 30%;">骚年</br>上不起网</br>还是回家种田吧</div>');
    // 由于实际手机不支持废弃
    $(".layout").append('<section id="waveerror"><div class="wave"><div>网</div><div>络</div><div>故</div><div>障</div><div>了...</div></div></div></section>');
    var waveerror = document.getElementById('waveerror');
    waveerror.style.height = window.innerHeight + 'px';
    waveerror.style.width = window.innerWidth + 'px';
}