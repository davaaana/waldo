'use strict';

mainApp.controller('HomeController', ['$rootScope', '$scope', '$http', '$mdDialog', 'UserService', '$location',
    function ($rootScope, $scope, $http, dialog, AuthService, $location) {

        AuthService.getUserInfo($scope);
        $scope.init = function () {

            try {
                var url = window.location.hash.split('/');
                url = url[url.length - 1];
                console.log(url);
                if (url == "index") {
                    document.getElementById('index').className = "select";
                    document.getElementById('own-post').className = "un-select";
                    document.getElementById('contacted-post').className = "un-select";
                    document.getElementById('about').className = "un-select";
                    $scope.filterArea = true;
                }
                else if (url == 'own-post') {
                    document.getElementById('index').className = "un-select";
                    document.getElementById('own-post').className = "select";
                    document.getElementById('contacted-post').className = "un-select";
                    document.getElementById('about').className = "un-select";
                    $scope.filterArea = false;
                }
                else if (url == 'contacted-post') {
                    document.getElementById('index').className = "un-select";
                    document.getElementById('own-post').className = "un-select";
                    document.getElementById('contacted-post').className = "select";
                    document.getElementById('about').className = "un-select";
                    $scope.filterArea = false;
                }
                else if (url == 'about') {
                    document.getElementById('index').className = "un-select";
                    document.getElementById('own-post').className = "un-select";
                    document.getElementById('contacted-post').className = "un-select";
                    document.getElementById('abouthttp://localhost:8080/#/index').className = "select";
                    $scope.filterArea = false;
                }
            } catch (e) {
                setInterval(function () {
                    $scope.init();
                }, 100);
            }
        }

        $scope.signup = function () {
            dialog.show({
                templateUrl: './src/modules/dialogs/signup.client.view.html'
            });
        };

        $scope.logout = function () {
            AuthService.logout();
        };

        $scope.newPost = function () {
            if (AuthService.getAuthentication() == true) {
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
