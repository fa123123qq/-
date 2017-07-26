(function (angular) {
    //1.创建1个模块.
    var app = angular.module('moivecat_details', ['ngRoute', 'heima']);

    //2.配置路由.
    app.config(['$routeProvider', function ($routeProvider) {
        //   /in_theaters/1   多了?就可以删略page
        $routeProvider.when('/details/:id', {
            templateUrl: "./details/details.html",
            controller: "detailsCtrl"
        });
    }]);
    //3.创建控制器
    app.controller('detailsCtrl', [
        '$scope',
        'heimaJsonp',
        '$routeParams',
        function ($scope, heimaJsonp, $routeParams) {
            $scope.isShow = true;
            var id = $routeParams.id;

            heimaJsonp.hmJsonp({
                 url:"http://api.douban.com/v2/movie/subject/"+id,
            params:{},
            callback:function(data){
                $scope.movie = data;
                $scope.isShow = false;
                $scope.$apply();
            }
            })       
        }])
})(angular);