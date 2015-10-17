'use strict';

mainApp.controller('ContactedPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService) {

        $scope.auth = AuthService.getAuthentication();

        $scope.contactedPost = function () {
            $http.get(SERVICE_URL + '/post/contacted').success(function (data) {
                $scope.contactedPosts = data.data;
                $mdToast.showSimple('Холбогдсон зар хэсэг сонгогдлоо');
            }).error(function (data) {

                //console.log('error: ' + data.data);
            })
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
