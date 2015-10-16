'use strict';

mainApp.controller('UserController', ['$rootScope', '$scope','$http','$mdDialog', 'UserService','$location',
    function ($rootScope, $scope,$http,dialog, UserService,$location) {

        $scope.errorMessage = 'nevter';

        $scope.auth = UserService.getAuthentication();
        $scope.signin = function () {
            UserService.loginTo($scope);
        };

        $scope.$watch('auth', function (el) {
            console.log(el);
        });

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
