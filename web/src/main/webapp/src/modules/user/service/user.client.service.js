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
        getUserInfo: function (scope) {
            var me = this;
            var promise = $http.get(SERVICE_URL + '/profile').then(function (data) {
                return data.data;
                //if (data.success == true) {
                //
                //    //scope.user = data.data;
                //    //scope.auth = me.getAuthentication();
                //    //window.location.reload();
                //    return data.data;
                //}else{
                //    window.sessionStorage["userInfo"] = {};
                //}
            })
            return promise;
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
                me.getUserInfo(scope).then(function (data) {
                    if(data.success == true){
                        window.sessionStorage["userInfo"] = JSON.stringify(data.data);
                        scope.closeDialog();
                        window.location.reload();
                    }else{
                        scope.auth = false;
                    }
                });
                scope.closeDialog();
            }, function () {
                scope.errorMessage = "Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!";
            })
        },
        changePassword: function ($scope,mdToast) {
            $http.post(SERVICE_URL + '/profile/password', $scope.proPass).then(function (data) {
                if (data.data.success == true) {
                    $scope.closeDialog();
                    mdToast.showSimple("Нууц үг амжилттай солигдолоо");
                }
                else {
                    mdToast.showSimple("Нууц үг солиход алдаа гарлаа");
                }
            });
        },
        uploadFile: function (files, $scope) {
            console.log(files[0]);
            var fd = new FormData();
            //Take the first selected file
            fd.append("image", files[0]);
            console.log(fd);

            var promise = $http({
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
            }).then(function (response) {
                return response;
            });
            return promise;
        },
        updateProfile: function ($scope, mdToast) {
            var me = this;
            $http.put(SERVICE_URL + '/profile', $scope.pro).then(function (data) {
                    if (data.data.success == true) {
                        $scope.closeDialog();
                        me.getUserInfo($scope);
                        mdToast.showSimple("Мэдээлэл амжилттай солигдолоо");
                    }
                    else {
                        console.log('update profile error' + data.message);
                    }
                }
            );
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
        },
        getAuthentication: function () {
            var user = {};
            try{
                user = JSON.parse(window.sessionStorage["userInfo"]);
            }catch (e){
                user = window.sessionStorage["userInfo"];
            }

            if(user && user.username && user.username != ''){
                return true;
            }else{
                return false;
            }
        }
    };
});
