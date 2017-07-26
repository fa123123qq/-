(function (angular) {  
    var app =angular.module('moivecat_home',['ngRoute']);
    app.config(['$locationProvider',function ($locationProvider) { 
        $locationProvider.hashPrefix('');
     }]);

    app.config(['$routeProvider',function ($routeProvider) { 
        $routeProvider.when('/home',{
            templateUrl:'./home/home.html'
        }).when('/',{
            redirectTo:'/home'
        })
     }]);
     

})(angular);