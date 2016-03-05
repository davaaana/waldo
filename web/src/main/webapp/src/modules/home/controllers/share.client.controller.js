'use strict';

mainApp.controller('ShareCtrl', ['$stateParams','$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService', '$location',
    function ($stateParams,$rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService, $location) {

        $scope.init = function () {
            $http.get(SERVICE_URL + '/post/' + $stateParams.id).success(function (posts) {
                console.log(posts);
                if(posts.success == true)
                    $scope.post = posts.data;
                else{
                    $scope.error = "Та нэвтрэх шаардлагатай"
                }
            });
        }
    }
]);
