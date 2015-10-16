'use strict';

mainApp.controller('PostController', ['$rootScope', '$scope','$http','$mdDialog','PostService', 'UserService','$location',
    function ($rootScope, $scope,$http,dialog,PostService,AuthService,$location) {

        $scope.ownBool = false;
        $scope.page = 1;
        $scope.filterResult = filterOptions;

        PostService.getAllPostData().then(function(posts){
            $scope.posts = posts.data;
        });

        $scope.convertToDate = function (string) {
            return convertToDate(string);
        }
        $scope.more = function (mpost) {
            PostService.getPostMore(mpost).then(function(data){
                if (data.success === false) {
                    dialog.show({
                        templateUrl: './src/modules/users/sign-in/dialog.sign.html',
                        controller: 'signInCtrl'
                    });
                }
                else if (data.success === true) {

                    $scope.stepExchange = 1;
                    $scope.mpost = data.data;
                    var user;
                    try{
                        user = JSON.parse(window.sessionStorage['userInfo']).username;
                    }catch (e){
                        user = window.sessionStorage['userInfo'].username;
                    }

                    if(user==$scope.mpost.username) {
                        $scope.ownBool = true;
                    }
                    else{
                        $scope.ownBool = false;
                    }

                    dialog.show({
                        parent: angular.element(document.body),
                        scope: $scope.$new(),
                        controller: 'postCtrl',
                        templateUrl: 'src/modules/post/dialog-more.html'
                    });

                }
            })
        };

        $scope.paging = function () {

            PostService.allPostPaging($scope.page).then(function(data){

                for (var i = 0; i < data.data.length; i++) {
                    $scope.posts.push(data.data[i]);
                }
                if(data.data.length!=0){
                    $scope.page++;
                }
                else{
                    //$mdToast.showSimple("Tsaash medeelel baikhgui bna")
                    $scope.allPostBoolean=false;
                }
            })
        }
    }
]);
