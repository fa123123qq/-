(function (angular) {
    // "use strict";

    // start your ride
    var app = angular.module('heima',[]);

    app.service('heimaJsonp',['$window',function ($window) { 
        this.hmJsonp = function(opts) { 
            //可以发起跨域请求
            var url = opts.url+"?";
            for(var key in opts.params){
                url += (key + '=' + opts.params[key]+'&');
            }

            var callbackName = 'jsonp_'+$window.Math.random().toString().slice(2);
            // url += ('callback=' + callbackName);
            $window[callbackName] = opts.callback;

            url += 'callback='+callbackName;

            var script = document.createElement('script');
            script.src = url;
            $window.document.body.appendChild(script);
            
         }
     }])
    


})(angular);