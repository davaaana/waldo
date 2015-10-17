'use strict';

mainApp.controller('UserController', ['$rootScope', '$scope','$http','$mdDialog', 'UserService','$location',
    function ($rootScope, $scope,$http,dialog, UserService,$location) {

        $scope.errorMessage = 'nevter';

        var originatorEv;

        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        $scope.auth = UserService.getAuthentication();

        try{
            $scope.user = JSON.parse(window.sessionStorage["userInfo"]);
            $scope.pro = JSON.parse(window.sessionStorage["userInfo"]);
        }catch (e){}

        $scope.uploadImage = function (file) {
            UserService.uploadFile(file,$scope).then(function (res) {
                console.log(res);
            });
        };

        $scope.signin = function () {
            UserService.loginTo($scope);
        };

        $scope.$watch('auth', function (el) {
            console.log(el);
        });

        $scope.updateProfile = function () {
            UserService.updateProfile($scope)
        }
        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
