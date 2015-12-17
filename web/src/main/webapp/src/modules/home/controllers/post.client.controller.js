'use strict';

mainApp.controller('PostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService', '$location',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService, $location) {

        $scope.filter = {
            fromDate: $scope.minDate,
            toDate: ''
        };

        $scope.exchangePost2 = function (id) {
            $scope.contactPost2 = {
                id: id,
                call: true,
                sms: true,
                note: 'null'
            };
            $http.post(SERVICE_URL + '/contact', $scope.contactPost2).success(function (data) {
                if (data.success == true) {
                    $scope.contact = data.data;
                    $scope.getAllPostData();
                    $scope.$$childTail.stepExchange = 2;
                    $mdToast.showSimple('Холбоо барих хаяг амжилттай солигдлоо');
                }
            })
                .error(function (data) {
                });

        }

        $scope.minDate = new Date();
        $scope.minDate.setDate($scope.minDate.getDate());

        $scope.dayAgo = function (from,to) {
            return differentDay(from,to);
        }

        $scope.filter.fromDateTime = $scope.minDate;

        $scope.auth = false;


        $scope.$parent.filterArea = true;

        AuthService.getUserInfo($scope).then(function (data) {
            if(data.success == true){
                $scope.auth = true;
                $scope.user = data.data;
            }else{
                $scope.auth = false;
            }
        });

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
                date.setDate(date.getDate())
                $scope.filter.toDate = date.toJSON().slice( 0, 10);
                PostService.allPostFilter($scope,$scope.filter).then(function (data) {
                    $scope.posts = data.data;
                    $scope.$$childHead.posts = data.data;
                    $scope.$$childTail.posts = data.data;
                });
            }catch(e){}
        });

        $scope.$watch('filter.fromDateTime', function (el) {
            try{
                var date = new Date(el);
                date.setDate(date.getDate())
                $scope.filter.fromDate = date.toJSON().slice( 0, 10);
                PostService.allPostFilter($scope,$scope.filter).then(function (data) {
                    $scope.posts = data.data;
                    $scope.$$childHead.posts = data.data;
                    $scope.$$childTail.posts = data.data;
                });
            }catch(e){}
        });

        $scope.filterChange = function () {
            $scope.$broadcast('filter',$scope.filter);
            PostService.allPostFilter($scope,$scope.filter).then(function (data) {
                $scope.posts = data.data;
                $scope.$$childHead.posts = data.data;
                $scope.$$childTail.posts = data.data;
            });
        };
        
        $scope.getAllPostData = function () {
            PostService.getAllPostData($scope).then(function (posts) {
                $scope.posts = posts.data;
                try{
                    $scope.$$childHead.posts = posts.data;
                    $scope.$$childTail.posts = posts.data;
                }catch (e){}
            });
        }

        PostService.getCity().then(function (data) {
            var cit = [{id: '', name: 'Бүх аймаг'}];
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

        $scope.caHeader =  {
            monday: 'Да',
            tuesday: 'Мя',
            wednesday: 'Лх',
            thursday: 'Пү',
            friday: 'Ба',
            saturday: 'Бя',
            sunday: 'Ня'
        }

        $scope.filterClear = function () {
            $scope.getAllPostData();
            $scope.filter = {};
            $scope.searchTextType = '';
            $scope.posts = $scope.posts;
            $scope.searchText = '';
            $scope.searchText1 = '';
            $scope.filter = {
                fromDate: '',
                toDate: ''
            };
        };

        $scope.more = function (post) {
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

        $scope.filterClear();

        $scope.paging = function () {
            PostService.allPostPaging($scope,$scope.page).then(function (data) {

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
