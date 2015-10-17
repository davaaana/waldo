'use strict';

mainApp.controller('OwnPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService) {

        $scope.auth = AuthService.getAuthentication();

        $scope.ownPost = function () {
            PostService.getOwnPostList().then(function (res) {
                $scope.ownPosts = res.data;
            });
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
