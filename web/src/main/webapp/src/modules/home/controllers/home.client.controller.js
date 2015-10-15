'use strict';

mainApp.controller('HomeController', ['$rootScope', '$scope','$http','$mdDialog', 'UserService','$location',
    function ($rootScope, $scope,$http,dialog,AuthService,$location) {
        $('#category').modal('show');
        $scope.logout = function () {
            AuthService.logout();
        };

        $scope.openMenu = function ($mdOpenMenu, ev) {
            $scope.originatorEv = ev;
            $mdOpenMenu(ev);
        };


        $scope.login = function () {
            dialog.show({
                templateUrl: './src/modules/dialogs/login.client.view.html',
                controller: 'UserController'
            })
        }

        setInterval(function () {
            $scope.clock = Date.now();
        }, 1000);

        $scope.getProfileDialog = function () {
            $scope.profileFilter.more = false;
            $mdDialog.show({
                templateUrl: 'src/modules/users/exsiting-user/dialog.profile.html'
            });
        };
    }
]);
