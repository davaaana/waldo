'use strict';

mainApp.controller('HomeController', ['$rootScope', '$scope', '$http', '$mdDialog', 'UserService', '$location',
    function ($rootScope, $scope, $http, dialog, AuthService, $location) {

        $scope.init = function () {
            var url = window.location.hash.split('/');
            url = url[url.length - 1];
            if (url == "index") {
                console.log( document.getElementById('index'));
                document.getElementById('index').className = "select";
            }
            else if (url == 'own-post') {
                document.getElementById('own-post').className = "select";
            }
            else if (url == 'contacted-post') {
                document.getElementById('contacted-post').className = "select";
            }
            else if (url == 'about') {
                document.getElementById('about').className = "select";
            }
        }


        $scope.logout = function () {
            AuthService.logout();
        };

        $scope.newPost = function () {
            if (AuthService.getAuthentication() == true) {
                dialog.show({
                    templateUrl: './src/modules/dialogs/post-create.client.view.html'
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
            if (AuthService.getAuthentication() == true) {
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
