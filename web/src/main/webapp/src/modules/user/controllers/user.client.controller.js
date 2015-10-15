'use strict';

mainApp.controller('UserController', ['$rootScope', '$scope','$http','$mdDialog', 'UserService','$location',
    function ($rootScope, $scope,$http,dialog, UserService,$location) {
        $scope.errorMessage = 'nevter';
        $scope.signin = function () {
            UserService.loginTo($scope);
            //UserService.getUserInfo();
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
