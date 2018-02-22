/**
 * Created by  on 2017/10/28.
 */

var get_timer = function (fun, countdown, delay, immediately) {
    var timer = null;
    var count=function () {
        if(countdown<0){
            clearTimeout(timer);
            return;
        }
        
        if(immediately && !timer){
            fun.call(null,countdown,timer);
            countdown--;
        }
        timer = setTimeout(function () {
            fun.call(null,countdown,timer);
            countdown--;
            count();
        }, delay);
    };
    return count;
};

var fun=function (time,timer) {
    console.info(time,timer);
}

var test = get_timer(fun, 10, 1000, false);
test();