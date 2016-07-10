var named = require('named-regexp').named;

//var generics = {};

var re = named(/(:<tone1>b|#)?(:<roman>[iI][Vv]|[Vv]?[Ii]{0,3})(:<quality>aug|dim|ma|m)?(:<tension1>6|7|9|11|13)?(?:(:<tone2>b|#)(:<tension2>5|7|9|11|13))?/);

var match = re.exec("IIma7");


generics.verification = function(){
    
    
}
