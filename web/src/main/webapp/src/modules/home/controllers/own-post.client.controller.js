'use strict';

mainApp.controller('OwnPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService) {

        $scope.ownNextBtn = true;
        $scope.paging = 0;
        $scope.auth = AuthService.getAuthentication();

        $scope.ownPost = function () {
            PostService.getOwnPostList($scope.paging).then(function (res) {
                $scope.ownPosts = res.data;
            });
        };

        $scope.ownPostPaging = function () {
            $scope.paging++;
            PostService.getOwnPostList($scope.paging).then(function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    $scope.ownPosts.push(data.data[i]);
                }

                if (data.data.length == 0) {
                    $scope.ownNextBtn = false;
                    $mdToast.showSimple('Цааш мэдээлэл байхгүй байна');
                }
            });
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
