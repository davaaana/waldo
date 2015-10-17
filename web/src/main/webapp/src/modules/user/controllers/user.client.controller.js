'use strict';

mainApp.controller('UserController', ['$rootScope', '$scope','$http','$mdDialog','$mdToast', 'UserService','$location',
    function ($rootScope, $scope,$http,dialog,$mdToast, UserService,$location) {

        $scope.errorMessage = '';

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

        $scope.changePassword = function () {
            UserService.changePassword($scope,$mdToast);
        };

        $scope.changePasswordDialog = function () {
            dialog.show({
                templateUrl: './src/modules/dialogs/change-password.client.view.html'
            });
        };

        $scope.signin = function () {
            $http({
                method: 'POST',
                url: SERVICE_URL + '/security/signin',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {username: $scope.username, password: $scope.password}
            }).then(function () {
                UserService.getUserInfo($scope);
                $scope.closeDialog();
            }, function () {
                alert("Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!");
            })
        };

        $scope.signins = function () {
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
