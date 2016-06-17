'use strict';

mainApp.controller('ShareCtrl', ['$stateParams','$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService', '$location',
    function ($stateParams,$rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService, $location) {
        AuthService.getUserInfo($scope).then(function (data) {
            if(data.success == true){
                $scope.auth = true;
                window.sessionStorage["userInfo"] = JSON.stringify(data.data);
                $scope.user = data.data;
            }else{
                $scope.auth = false;
            }
        });

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

        $scope.getProfileDialog = function () {
            $scope.profileFilter.more = false;
            $mdDialog.show({
                templateUrl: 'src/modules/users/exsiting-user/dialog.profile.html'
            });
        };

        $scope.facebookShare= function(post){
            $scope.title=post.to+'-руу '+post.when+'-нд ';
            FB.ui(
                {
                    method: 'feed',
                    name: $scope.title,
                    link: 'http://www.waldo.mn/#/share/'+post.id,
                    picture: 'http://www.waldo.mn/ws/profile/image/neemiineemii@yahoo.com.png',
                    caption: 'www.waldo.mn',
                    description: post.type=="SENDER"?'явна':'явуулна',
                    message: ''
                });

        }

        $scope.signup = function () {
            dialog.show({
                templateUrl: './src/modules/dialogs/signup.client.view.html'
            });
        };

        $scope.logout = function () {
            AuthService.logout();
        };

        $scope.error = false;
        $scope.init = function () {
            $http.get(SERVICE_URL + '/post/' + $stateParams.id).success(function (posts) {
                if(posts.success == true){
                    var data;
                    try {
                        data = JSON.parse(posts.data);
                    } catch (e) {
                        data = JSON.parse(JSON.stringify(posts.data));
                    }
                    $scope.post = data;
                    $scope.error = false;
                }
                else{
                    $scope.error = true;
                }
            });
        }
    }
]);
