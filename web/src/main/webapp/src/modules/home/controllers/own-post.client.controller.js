'use strict';

mainApp.controller('OwnPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService) {

        $rootScope.filterArea = false;

        AuthService.getUserInfo($scope).then(function (data) {
            if(data.success == true){
                $scope.auth = true;
                $scope.user = data.data;
            }else{
                $scope.auth = false;
            }
        });

        $scope.ownNextBtn = true;
        $scope.hideOwnAds = true;
        $scope.paging = 0;

        $scope.newPostDataCheck = {
            animal:null,
            stuff:null,
            passanger:null
        }

        $scope.ownFilter = {
            fromDate: '',
            toDate: ''
        };

        $scope.$watch('ownFilter.toDateTime', function (el) {
            try{
                var date = new Date(el);
                date.setDate(date.getDate()+1)
                $scope.ownFilter.toDate = date.toJSON().slice( 0, 10);
                PostService.getOwnPostFilter($scope.ownFilter).then(function (data) {
                    $scope.ownPosts = data.data;
                });
            }catch(e){}
        });

        $scope.$watch('ownFilter.fromDateTime', function (el) {
            try{
                var date = new Date(el);
                date.setDate(date.getDate()-1)
                $scope.ownFilter.fromDate = date.toJSON().slice( 0, 10);
                PostService.getOwnPostFilter($scope.ownFilter).then(function (data) {
                    $scope.ownPosts = data.data;
                });
            }catch(e){}
        });

        $scope.clearFilterOwn = function () {
            $scope.ownFilter = {};
            $scope.ownPost();
        }

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
                    $scope.newPost = data.data;
                    $scope.newPost.when = new Date($scope.newPost.when);
                    $scope.newPost.arrive = new Date($scope.newPost.arrive);
                    $scope.newPostDataCheck.policyId = $scope.newPost.policies[0].id;
                    if($scope.newPost.passanger){
                        $scope.newPostDataCheck.passanger = true;
                    }
                    if($scope.newPost.animal){
                        $scope.newPostDataCheck.animal = true;
                    }
                    if($scope.newPost.stuff){
                        $scope.newPostDataCheck.stuff = true;
                    }

                    dialog.show({
                        parent: angular.element(document.body),
                        scope: $scope.$new(),
                        templateUrl: 'src/modules/dialogs/post-create.client.view.html',
                        controller: 'NewPostController'
                    })
                } else {
                    $mdToast.showSimple('Мэдээлэл алга байна');
                }
            });
        };

        $scope.hidePostsShow = function(bool){
            $http.get(SERVICE_URL + '/post/own?closed='+bool).success(function (data) {
                $scope.ownPosts = data.data;
                $mdToast.showSimple('Миний зар хэсэг сонгогдлоо');
                if(bool==true){
                    $scope.hideOwnAds = false;
                }
                if(bool==false){
                    $scope.hideOwnAds = true;
                }
            });
        };

        $scope.hideLine = function (id,codes,ids) {
            PostService.hideLine(id).then(function (data) {
                if(data.success ==true){
                    document.getElementById(codes+"-"+ids).style.display='none';
                    $mdToast.showSimple('Хэрэглэгч идэвхгүй боллоо');
                }
                else if(data.success ==false){
                    $mdToast.showSimple('Амжилтгүй боллоо');
                }
            });

        };

        $scope.filterChange = function () {
            PostService.getOwnPostFilter($scope.ownFilter).then(function (data) {
                $scope.ownPosts = data.data;
            });
        };

        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
