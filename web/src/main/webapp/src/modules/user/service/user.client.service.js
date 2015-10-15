mainApp.factory('UserService', function ($http) {
    var isAuth = false;
    return {
        logout: function () {
            $http.post(SERVICE_URL + '/security/signout', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).success(function () {
                isAuth = false;
                sessionStorage.removeItem("isAuth");
                sessionStorage.removeItem("userInfo");
                //$mdToast.showSimple('Амжилттай гарлаа');
                window.location.reload();
            }).error(function (data) {
                //$mdToast.showSimple(data.message);
            });
        },
        getUserInfo: function (successFunc, errorFunc) {
            $http.get(SERVICE_URL + '/profile').success(function (data) {
                if (data.success == true) {
                    window.sessionStorage["userInfo"] = JSON.stringify(data.data);
                }
            }).then(successFunc, errorFunc);
        },
        loginTo: function (scope) {
            var me = this;
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
                data: {username: scope.username, password: scope.password}
            }).then(function () {
                isAuth = true;
                me.getUserInfo();
                window.sessionStorage["isAuth"] = JSON.stringify(isAuth);
                scope.closeDialog();
            }, function () {
                alert("Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!");
            })
        },
        changePassword: function () {
            $http.post(SERVICE_URL + '/profile/password', $scope.profilePass).success(function (data) {
                if (data.success == true) {
                    //$mdDialog.hide();
                }
                else {
                    console.log('change passwor error:' + data.message);
                }
            }).error(function (data, status) {
                //sign();
                //errorResponse(data, status)
            })
        },
        uploadFile: function (files, $scope) {
            console.log(files[0]);
            var fd = new FormData();
            //Take the first selected file
            fd.append("image", files[0]);
            console.log(fd);

            $http({
                url: SERVICE_URL + '/profile/image',
                method: "POST",
                data: fd,
                cache: false,
                processData: false,
                contentType: false,
                headers: {
                    'Content-Type': undefined,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                },
                transformRequest: angular.identity
            }).success(function (response) {
                $scope.response = response;
            }).error(function (error) {
                $scope.error = error;
            });
        },
        updateProfile: function ($scope) {
            $http.put(SERVICE_URL + '/profile', $scope.profileInfo).success(function (data) {
                    if (data.success == true) {
                        if ($scope.profilePass) {

                            $http.post(SERVICE_URL + '/profile/password', $scope.profilePass).success(function (data) {
                                if (data.success == true) {
                                    alert('Нууц үг амжилттай солигдлоо');
                                }
                                else {
                                    console.log('update profile error' + data.message);
                                }
                            })
                        }
                        this.getUserInfo();
                    }
                    else {
                        console.log('update profile error' + data.message);
                    }
                }
            ).
                error(function (data) {
                })
        },
        signup: function ($scope) {
            $http.post(SERVICE_URL + '/profile', $scope.register).success(function (data) {
                if(data.success){
                    $scope.formHide = true;
                    //$mdToast.showSimple('Амжилттай бүртгэгдлээ');
                }
                else{
                    $scope.errorMessage = data.message;
                }
            }).error(function (data, status) {
                //console.log('Бүртгүүлэх хуудасны алдаа : '+data);
            });
        }
    };
});
