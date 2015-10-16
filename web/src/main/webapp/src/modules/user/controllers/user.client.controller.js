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
        }catch (e){}

        $scope.signin = function () {
            UserService.loginTo($scope);
        };

        $scope.$watch('auth', function (el) {
            console.log(el);
        });

        $scope.updateUser = function () {
            UserService.editProfile($scope).then(function(res){
                console.log(res);
            })
        }
        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
