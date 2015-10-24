'use strict';

mainApp.controller('HomeController', ['$rootScope', '$scope', '$http', '$mdDialog', 'UserService', '$location',
    function ($rootScope, $scope, $http, dialog, AuthService, $location) {

        $scope.filterArea = true;

        $scope.filterClear = function () {
            $scope.$$childHead.filterClear();
        }

        AuthService.getUserInfo($scope).then(function (data) {
            if(data.success == true){
                $scope.auth = true;
                window.sessionStorage["userInfo"] = JSON.stringify(data.data);
                $scope.user = data.data;
            }else{
                $scope.auth = false;
            }
        });

        $scope.signup = function () {
            dialog.show({
                templateUrl: './src/modules/dialogs/signup.client.view.html'
            });
        };

        $scope.logout = function () {
            AuthService.logout();
        };

        $scope.newPost = function () {
            if ($scope.auth == true) {
                dialog.show({
                    parent: angular.element(document.body),
                    scope: $scope.$new(),
                    templateUrl: './src/modules/dialogs/post-create.client.view.html',
                    controller: 'NewPostController'
                });
            } else {
                dialog.show({
                    templateUrl: './src/modules/dialogs/login.client.view.html',
                    controller: 'UserController'
                });
            }
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        };

        $scope.openMenu = function ($mdOpenMenu, ev) {
            $scope.originatorEv = ev;
            $mdOpenMenu(ev);
        };

        $scope.login = function () {
            dialog.show({
                templateUrl: './src/modules/dialogs/login.client.view.html',
                controller: 'UserController'
            });
        };

        $scope.editProfile = function () {
            if ($scope.auth == true) {
                dialog.show({
                    templateUrl: './src/modules/dialogs/profile-edit.client.view.html',
                    controller: 'UserController'
                });
            } else {
                dialog.show({
                    templateUrl: './src/modules/dialogs/login.client.view.html',
                    controller: 'UserController'
                });
            }

        };

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
