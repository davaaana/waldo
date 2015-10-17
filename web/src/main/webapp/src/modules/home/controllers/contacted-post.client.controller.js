'use strict';

mainApp.controller('ContactedPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q', '$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q, $mdToast, AuthService) {

        $scope.auth = AuthService.getAuthentication();
        $scope.contactedNextBtn = true;
        $scope.rateStep = 1;

        $scope.paging = 0;
        if (!$scope.auth) {
            window.location.href = '/';
        }

        $scope.contactedPost = function () {
            PostService.getContactedPostList($scope.paging).then(function (data) {
                $scope.contactedPosts = data.data;
            });
        };

        $scope.contactedPostPaging = function () {
            $scope.paging++;
            PostService.getContactedPostList($scope.paging).then(function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    $scope.contactedPosts.push(data.data[i]);
                }

                if (data.data.length == 0) {
                    $scope.contactedNextBtn = false;
                    $mdToast.showSimple('Цааш мэдээлэл байхгүй байна');
                }
            });
        };

        $scope.contactedPostReadMore = function (contactedPosts) {
            $scope.contact = contactedPosts;
            dialog.show({
                parent: angular.element(document.body),
                scope: $scope.$new(),
                controller: 'ContactedPostController',
                templateUrl: 'src/modules/dialogs/contacted-post-more.client.view.html'
            });
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
