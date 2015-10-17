'use strict';

mainApp.controller('PostController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService', '$location',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService, $location) {
        $scope.filter = {
            froomDate: '',
            tooDate: ''
        };

        $scope.simulateQuery = false;
        $scope.isDisabled = false;
        $scope.postNextBtn = true;
        $scope.auth = AuthService.getAuthentication();

        $scope.ownBool = false;
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

        $scope.querySearchType = function (query) {
            var results = query ? $scope.postType.filter($scope.createFilterForType(query)) : $scope.postType,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                setTimeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        $scope.createFilterForType = function (query) {
            return function filterFn(state) {
                return (state.display.indexOf(query) === 0);
            };
        }

        $scope.simulateQuery1 = false;
        $scope.isDisabled1 = false;

        $scope.querySearch = function (query) {
            var results = query ? $scope.cities.filter($scope.createFilterFor(query)) : $scope.cities,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                setTimeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        $scope.createFilterFor = function (query) {
            return function filterFn(state) {
                return (state.name.indexOf(query) === 0);
            };
        }

        $scope.simulateQuery1 = false;
        $scope.isDisabled1 = false;

        $scope.querySearch1 = function (query) {
            var results = query ? $scope.cities.filter($scope.createFilterFor1(query)) : $scope.cities,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                setTimeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        $scope.createFilterFor1 = function (query) {
            return function filterFn(state) {
                return (state.name.indexOf(query) === 0);
            };
        }
        $scope.getAllPostData = function () {
            PostService.getAllPostData().then(function (posts) {
                $scope.postsArray = posts.data;
                $scope.posts = $scope.postsArray;
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

        $scope.$watch('filter.toDate', function (el) {
            $scope.posts = $scope.postsArray

            var date = (new Date(el));
            date = date.setDate(date.getDate() - 1);

            try {
                if ($scope.filter.fromDate) {
                    $scope.posts = $scope.posts.filter(function (els) {
                        return new Date(els.when) >= date && new Date(els.when) <= new Date($scope.filter.fromDate);
                    })
                } else {
                    if (el) {
                        $scope.posts = $scope.posts.filter(function (els) {
                            return new Date(els.when) >= date;
                        })
                    }
                }

            } catch (e) {

            }
        });

        $scope.$watch('filter.fromDate', function (el) {
            $scope.posts = $scope.postsArray;
            var date = (new Date($scope.filter.toDate));
            date = date.setDate(date.getDate() - 1);
            try {
                if ($scope.filter.toDate) {
                    $scope.posts = $scope.posts.filter(function (els) {
                        return new Date(els.when) <= new Date(el) && new Date(els.when) >= date;
                    })
                } else {
                    if (el) {
                        $scope.posts = $scope.posts.filter(function (els) {
                            return new Date(els.when) <= new Date(el);
                        })
                    }
                }

            } catch (e) {

            }
        });

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
            console.log($scope.postType[0]);
            $scope.filter = {};
            $scope.searchTextType = '';
            $scope.posts = $scope.postsArray;
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
                        var user;
                        try {
                            user = JSON.parse(window.sessionStorage['userInfo']).username;
                        } catch (e) {
                            user = window.sessionStorage['userInfo'].username;
                        }

                        if (user == $scope.mpost.username) {
                            $scope.ownBool = false;
                        }
                        else {
                            $scope.ownBool = true;
                        }

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
                    $scope.postsArray.push(data.data[i]);
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
