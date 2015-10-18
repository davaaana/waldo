'use strict';

mainApp.controller('ContactedPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q', '$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q, $mdToast, AuthService) {

        $scope.auth = AuthService.getAuthentication();
        $scope.contactedNextBtn = true;
        $scope.rateStep = 1;

        $scope.conFilter = {
            fromDate: '',
            toDate: ''
        };

        $scope.paging = 0;
        if (!$scope.auth) {
            window.location.href = '/';
        }

        $scope.contactedPost = function () {
            PostService.getContactedPostList($scope.paging).then(function (data) {
                $scope.contactedPosts = data.data;
            });
        };

        $scope.$watch('conFilter.toDateTime', function (el) {
            try{
                var date = new Date(el);
                date.setDate(date.getDate()-1)
                $scope.conFilter.toDate = date.toJSON().slice( 0, 10);
                PostService.getContactedPostListFilter($scope.conFilter).then(function (data) {
                    $scope.contactedPosts = data.data;
                });
            }catch(e){}
        });

        $scope.$watch('conFilter.fromDateTime', function (el) {
            try{
                var date = new Date(el);
                date.setDate(date.getDate()-1)
                $scope.conFilter.fromDate = date.toJSON().slice( 0, 10);
                PostService.getContactedPostListFilter($scope.conFilter).then(function (data) {
                    $scope.contactedPosts = data.data;
                });
            }catch(e){}
        });

        $scope.conFilterClear = function () {
            $scope.conFilter = {};
            $scope.contactedPost();
        }

        $scope.filterChangeCon = function () {
            PostService.getContactedPostListFilter($scope.conFilter).then(function (data) {
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
