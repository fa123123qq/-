(function (angular) {
    //1.创建1个模块.
    var app = angular.module('moivecat_in_theaters', ['ngRoute', 'heima']);

    //2.配置路由.
    app.config(['$routeProvider', function ($routeProvider) {
        //   /in_theaters/1   多了?就可以删略page
        $routeProvider.when('/in_theaters/:page?', {
            templateUrl: "./in_theaters/in_theaters.html",
            controller: "in_theatersCtrl"
        });
    }]);
    //3.创建控制器
    app.controller('in_theatersCtrl', [
        '$scope',
        'heimaJsonp',
        '$window',
        '$routeParams',
        '$route',
        function ($scope, heimaJsonp, $window, $routeParams, $route) {
            $scope.isShow = true;
            //没有就显示也是就是第一页,-0是转换为数字
            $scope.pageIndex = ($routeParams.page || 1) - 0;
            $scope.pageSize = 10;


            // 向服务器指定页面的数据


            heimaJsonp.hmJsonp({
                url: "http://api.douban.com/v2/movie/in_theaters",
                params: {
                    count: $scope.pageSize,
                    start: ($scope.pageIndex - 1) * $scope.pageSize
                },
                callback: function (data) {
                    $scope.movies = data;
                    //总页数
                    $scope.pageCount = $window.Math.ceil((data.total / $scope.pageSize));
                    //隐藏css动画
                    $scope.isShow = false;
                    $scope.$apply(); //告诉视图 数据模型发生了变化 赶紧刷新你的视图.
                }

            });
            $scope.getPage = function (pageIndex) {
                if (pageIndex < 1 || pageIndex > $scope.pageCount) return;
                // 要page变成2
                //把url地址栏的page参数改成2
                $route.updateParams({
                    page: pageIndex
                })


            }
        }
    ])
})(angular);