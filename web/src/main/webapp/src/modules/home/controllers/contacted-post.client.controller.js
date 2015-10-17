'use strict';

mainApp.controller('ContactedPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService) {

        $scope.auth = AuthService.getAuthentication();

        if(!$scope.auth) {window.location.href = '/';}

        $scope.contactedPost = function () {
            PostService.getContactedPostList().then(function (data) {
                $scope.contactedPosts = data.data;
            });
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
