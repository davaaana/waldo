'use strict';

mainApp.controller('OwnPostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService) {

        $scope.$parent.filterArea = false;
        $scope.$parent.filterClear();
        console.log($scope);
        $scope.minDate = new Date();
        $scope.minDate.setDate($scope.minDate.getDate()-1);

        AuthService.getUserInfo($scope).then(function (data) {
            if(data.success == true){
                $scope.auth = true;
                $scope.user = data.data;
            }else{
                $scope.auth = false;
            }
        });

        $scope.ownMore = function (post) {
            if ($scope.auth == true) {
                PostService.getPostMore(post).then(function (data) {
                    if (data.success === false) {
                        dialog.show({
                            templateUrl: './src/modules/dialogs/login.client.view.html',
                            controller: 'UserController'
                        });
                    }
                    else if (data.success === true) {
                        $scope.stepExchange = 1;
                        $scope.mpost = data.data;
                        $scope.ownPostContact(post.id);
                        dialog.show({
                            templateUrl: './src/modules/dialogs/own-more.client.view.html',
                            controller:'PostMoreController',
                            scope: $scope.$new()
                        });
                    }
                })

            } else {
                dialog.show({
                    templateUrl: './src/modules/dialogs/login.client.view.html',
                    controller: 'UserController'
                });
            }
        };

        $scope.$watch('$parent.filter.toDate',function (el) {
            PostService.getOwnPostFilter($scope.$parent.filter).then(function (data) {
                $scope.ownPosts = data.data;
            });
        });

        $scope.$watch('$parent.filter.fromDate',function (el) {
            PostService.getOwnPostFilter($scope.$parent.filter).then(function (data) {
                $scope.ownPosts = data.data;
            });
        });

        $scope.$watch('$parent.filter.fromCityId',function (el) {
            PostService.getOwnPostFilter($scope.$parent.filter).then(function (data) {
                $scope.ownPosts = data.data;
            });
        });

        $scope.$watch('$parent.filter.toCityId',function (el) {
            PostService.getOwnPostFilter($scope.$parent.filter).then(function (data) {
                $scope.ownPosts = data.data;
            });
        });

        $scope.$watch('$parent.filter.type',function (el) {
            PostService.getOwnPostFilter($scope.$parent.filter).then(function (data) {
                $scope.ownPosts = data.data;
            });
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
            PostService.ownPostDeactivate(postId,$mdToast,$scope);
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
                        $scope.contactedPosts = data.data;
                        ownPosts.ownPostContactBoolean = true;
                        break;
                    }
                }
            }).error(function (data) {
            })
        };

        $scope.getPost = function (ownPosts) {
            PostService.getOwnPost(ownPosts).then(function (data) {
                if (data.success == true) {
                    $scope.newPost = data.data;
                    $scope.newPost.when = '';
                    $scope.newPost.arrive = '';
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
                //$mdToast.showSimple('Зарыг амжилттай '+ bool == true?'идэвхитэй болголоо ':'идэвхигүй болголоо ');
                if(bool==true){$scope.hideOwnAds = false;}
                if(bool==false){$scope.hideOwnAds = true;}
                //$scope.closeDialog();
                //$scope.ownPost();
            });
        };

        $scope.hideLine = function (id,index,ids) {
            PostService.hideLine(id).then(function (data) {
                if(data.success ==true){
                    $scope.contactedPosts.splice(index,1);
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
