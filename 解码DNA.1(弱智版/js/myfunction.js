
var yh = (function () {
    var my = {};

    my.set = function(key,value){
    	plus.storage.setItem(key,value);
    };
    my.get = function (key) {
    return   plus.storage.getItem(key)
    };

    return my;
} ());


