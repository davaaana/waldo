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

        $scope.ownPostDeactivate = function (postId) {
            PostService.ownPostDeactivate(postId,$mdToast);
        };

        $scope.ownPostContact = function (postId) {
            $http.get(SERVICE_URL + '/contact/' + postId).success(function (data) {
                for (var i = 0; i < $scope.ownPosts.length; i++) {
                    var ownPosts = $scope.ownPosts[i];
                    if (ownPosts.id == postId) {
                        if (ownPosts.ownPostContactBoolean) {
                            ownPosts.ownPostContactBoolean = false;
                            break;
                        }
                        ownPosts.data = data.data;
                        ownPosts.ownPostContactBoolean = true;
                        break;
                    }
                }
            }).error(function (data) {

                //console.log('error: ' + data.data);
            })
        };

        $scope.getPost = function (ownPosts) {
            PostService.getOwnPost(ownPosts).then(function (data) {
                console.log(data);
                if (data.success == true) {
                    $scope.newPostData = data.data;
                    dialog.show({
                        parent: angular.element(document.body),
                        scope: $scope.$new(),
                        templateUrl: 'src/modules/dialogs/post-create.client.view.html',
                        controller: 'HomeController'
                    })
                } else {
                    $mdToast.showSimple('Мэдээлэл алга байна');
                }
            });
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
