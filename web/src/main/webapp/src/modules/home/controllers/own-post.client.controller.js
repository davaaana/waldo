'use strict';

mainApp.controller('OwnPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService) {

        $scope.auth = AuthService.getAuthentication();

        $scope.ownPost = function () {
            $http.get(SERVICE_URL + '/post/own').success(function (data) {
                $scope.ownPosts = data.data;
                $mdToast.showSimple('Миний зар хэсэг сонгогдлоо');
            }).error(function (data) {

                //console.log('error: ' + data.data);
            })
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
