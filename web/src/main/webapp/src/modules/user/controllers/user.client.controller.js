'use strict';

mainApp.controller('UserController', ['$rootScope', '$scope','$http','$mdDialog','$mdToast', 'UserService','$location',
    function ($rootScope, $scope,$http,dialog,$mdToast, UserService,$location) {

        $scope.errorMessage = '';

        UserService.getUserInfo($scope).then(function (data) {
            if(data.success == true){
                $scope.auth = true;
                $scope.user = data.data;
            }else{
                $scope.auth = false;
            }
        });

        var originatorEv;
        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        setInterval(function () {
            $scope.imageDate = new Date().getTime();
        },1000);

        $scope.auth = UserService.getAuthentication();

        try{
            $scope.user = JSON.parse(window.sessionStorage["userInfo"]);
            $scope.pro = JSON.parse(window.sessionStorage["userInfo"]);
        }catch (e){}

        $scope.uploadImage = function (file) {
            UserService.uploadFile(file,$scope).then(function (res) {
                if(res.status == 200) {

                    UserService.getUserInfo($scope).then(function (data) {
                        if(data.success == true){
                            $scope.pro = {};
                            $scope.pro = data.data;
                            $scope.imageDate = new Date().getTime();
                            $scope.user = {};
                            $scope.user = data.data;
                            $("#proImage").attr("src", "ws/profile/image/"+$scope.pro.username+".png?s="+$scope.imageDate);
                        }else{
                            $scope.auth = false;
                        }
                    });

                    try{

                    }catch (e){}
                }
            });
        };

        $scope.changePassword = function () {
            if($scope.proPass.oldPassword == '' || $scope.proPass.newPassword==''){
                $mdToast.showSimple('Нууц үгээ үнэн зөв оруулана уу?');
                return;
            }
            UserService.changePassword($scope,$mdToast);
        };

        $scope.changePasswordDialog = function () {
            dialog.show({
                templateUrl: './src/modules/dialogs/change-password.client.view.html'
            });
        };

        $scope.signup = function () {
            dialog.show({
                templateUrl: './src/modules/dialogs/signup.client.view.html'
            });
        };

        $scope.saveSignup = function () {
            UserService.signup($scope);
        }

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
                UserService.getUserInfo($scope).then(function (data) {
                    if(data.success == true){
                        window.sessionStorage["userInfo"] = JSON.stringify(data.data);
                        window.location.reload();
                    }else{
                        $scope.auth = false;
                    }
                });

            }, function () {
                alert("Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!");
            })
        };

        $scope.signins = function () {
            UserService.loginTo($scope);
        };

        $scope.$watch('auth', function (el) {
        });

        $scope.updateProfile = function () {
            UserService.updateProfile($scope, $mdToast)
        }
        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
