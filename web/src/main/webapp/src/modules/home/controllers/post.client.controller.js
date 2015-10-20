'use strict';

mainApp.controller('PostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService', '$location',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService, $location) {
        $scope.filter = {
            fromDate: '',
            toDate: ''
        };

        PostService.getActivateCountPost().then(function (res) {
            $scope.activatePostCount = res.data;
        });

        $scope.simulateQuery = false;
        $scope.isDisabled = false;
        $scope.postNextBtn = true;
        $scope.auth = AuthService.getAuthentication();

        $scope.page = 1;

        $scope.postType = [
            {
                display: 'Бүх зар',
                value: ''
            },
            {
                display: 'Зөвхөн ачаа илгээх',
                value: 'SENDER'
            },
            {
                display: 'Зөвхөн ачаа авч явах',
                value: 'CARRIER'
            }
        ]

        $scope.simulateQueryType = false;
        $scope.isDisabledType = false;

        $scope.$watch('filter.toDateTime', function (el) {
            try{
                var date = new Date(el);
                date.setDate(date.getDate()-1)
                $scope.filter.toDate = date.toJSON().slice( 0, 10);
                PostService.allPostFilter($scope.filter).then(function (data) {
                    $scope.posts = data.data;
                });
            }catch(e){}
        });

        $scope.$watch('filter.fromDateTime', function (el) {
            try{
                var date = new Date(el);
                date.setDate(date.getDate()-1)
                $scope.filter.fromDate = date.toJSON().slice( 0, 10);
                PostService.allPostFilter($scope.filter).then(function (data) {
                    $scope.posts = data.data;
                });
            }catch(e){}
        });

        $scope.filterChange = function () {
            PostService.allPostFilter($scope.filter).then(function (data) {
                $scope.posts = data.data;
            });
        };
        
        $scope.getAllPostData = function () {
            PostService.getAllPostData().then(function (posts) {
                $scope.posts = posts.data;
            });
        }

        PostService.getCity().then(function (data) {
            var cit = [{id: 0, name: 'Бүх аймаг'}];
            for (var i = 0; i < data.length - 1; i++) {
                cit.push(data[i]);
            }
            $scope.cities = cit;
        });

        $scope.convertToDate = function (string) {
            return convertToDate(string);
        };

        $scope.$watch('filter.fromLocation', function (el) {
            $scope.filter.fromLocation = el == 'Бүх аймаг' ? '' : el;
        });

        $scope.$watch('filter.toLocation', function (el) {
            $scope.filter.toLocation = el == 'Бүх аймаг' ? '' : el;
        });

        $scope.onSelection = function (item) {
            $scope.selectedItemType = item;
        }

        $scope.filterClear = function () {
            $scope.getAllPostData();
            $scope.filter = {};
            $scope.searchTextType = '';
            $scope.posts = $scope.posts;
            $scope.searchText = '';
            $scope.searchText1 = '';
        };

        $scope.more = function (post) {
            if (AuthService.getAuthentication() == true) {
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
                        dialog.show({
                            templateUrl: './src/modules/dialogs/post-more.client.view.html',
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

        $scope.closeDialog = function () {
            dialog.cancel();
        }

        $scope.paging = function () {
            PostService.allPostPaging($scope.page).then(function (data) {

                for (var i = 0; i < data.data.length; i++) {
                    $scope.posts.push(data.data[i]);
                }
                if (data.data.length != 0) {
                    $scope.page++;
                }
                else {
                    //$mdToast.showSimple("Tsaash medeelel baikhgui bna")
                    $scope.postNextBtn = false;
                }
            })
        }
    }
]);
