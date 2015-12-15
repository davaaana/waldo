'use strict';

mainApp.controller('ContactedPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q', '$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q, $mdToast, AuthService) {

        $scope.$parent.filterArea = false;

        $scope.minDate = new Date();
        $scope.minDate.setDate($scope.minDate.getDate()-1);
        AuthService.getUserInfo($scope).then(function (data) {
            if (data.success == true) {
                $scope.auth = true;
                $scope.user = data.data;
            } else {
                $scope.auth = false;
            }
        });

        $scope.$watch('$parent.filter.toDate',function (el) {
            PostService.getContactedPostListFilter($scope.$parent.filter).then(function (data) {
                $scope.contactedPosts = data.data;
            });
        });

        $scope.$watch('$parent.filter.fromDate',function (el) {
            PostService.getContactedPostListFilter($scope.$parent.filter).then(function (data) {
                $scope.contactedPosts = data.data;
            });
        });

        $scope.$watch('$parent.filter.fromCityId',function (el) {
            PostService.getContactedPostListFilter($scope.$parent.filter).then(function (data) {
                $scope.contactedPosts = data.data;
            });
        });

        $scope.$watch('$parent.filter.toCityId',function (el) {
            PostService.getContactedPostListFilter($scope.$parent.filter).then(function (data) {
                $scope.contactedPosts = data.data;
            });
        });

        $scope.$watch('$parent.filter.type',function (el) {
            PostService.getContactedPostListFilter($scope.$parent.filter).then(function (data) {
                $scope.contactedPosts = data.data;
            });
        });

        $scope.contactedNextBtn = true;
        $scope.rateStep = 1;
        $scope.hideAds = true;

        $scope.conFilter = {
            fromDate: '',
            toDate: ''
        };

        $scope.paging = 0;
        if (!$scope.auth) {
            window.location.href = '/';
        }

        $scope.hideCPostsShow = function (bool) {
            if (bool == false) {
                $scope.hideAds = true;
                $scope.contactedPosts = $scope.parentContacted
                $scope.contactedPosts = $scope.contactedPosts.filter(function (obj) {
                    var when = obj.when;
                    var today = new Date().toJSON().slice(0, 10);
                    if (new Date(obj.when) >= new Date(today)) {
                        return true;
                    }
                })
            }
            if (bool == true) {
                $scope.hideAds = false;
                $scope.contactedPosts = $scope.parentContacted
                $scope.contactedPosts = $scope.contactedPosts.filter(function (obj) {
                    var when = obj.when;
                    var today = new Date().toJSON().slice(0, 10);
                    if (new Date(obj.when) < new Date(today)) {
                        return true;
                    }
                })
            }

        };

        $scope.contactedPost = function () {
            PostService.getContactedPostList($scope.paging).then(function (data) {
                $scope.parentContacted = data.data;
                $scope.contactedPosts = $scope.parentContacted
                $scope.contactedPosts = $scope.contactedPosts.filter(function (obj) {
                    var when = obj.when;
                    var today = new Date().toJSON().slice(0, 10);
                    if (new Date(obj.when) >= new Date(today)) {
                        return true;
                    }
                })
            });
        };

        $scope.$watch('conFilter.toDateTime', function (el) {
            try {
                var date = new Date(el);
                date.setDate(date.getDate() - 1)
                $scope.conFilter.toDate = date.toJSON().slice(0, 10);
                PostService.getContactedPostListFilter($scope.conFilter).then(function (data) {
                    $scope.contactedPosts = data.data;
                });
            } catch (e) {
            }
        });

        $scope.$watch('conFilter.fromDateTime', function (el) {
            try {
                var date = new Date(el);
                date.setDate(date.getDate() - 1)
                $scope.conFilter.fromDate = date.toJSON().slice(0, 10);
                PostService.getContactedPostListFilter($scope.conFilter).then(function (data) {
                    $scope.contactedPosts = data.data;
                });
            } catch (e) {
            }
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
