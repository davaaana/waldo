'use strict';

mainApp.controller('PostController', ['$rootScope', '$scope','$http','$mdDialog','PostService','$log','$q', 'UserService','$location',
    function ($rootScope, $scope,$http,dialog,PostService,$log,$q,AuthService,$location) {
        $scope.filter = {
            froomDate:'',
            tooDate:''
        };

        $scope.simulateQuery = false;
        $scope.isDisabled    = false;
        $scope.auth = AuthService.getAuthentication();

        $scope.ownBool = false;
        $scope.page = 1;

        $scope.postType = [
            {
                display:'Бүх зар',
                value:''
            },
            {
                display:'Зөвхөн ачаа илгээх',
                value:'SENDER'
            },
            {
                display:'Зөвхөн ачаа авч явах',
                value:'CARRIER'
            }
        ]

        $scope.simulateQueryType = false;
        $scope.isDisabledType = false;

        $scope.querySearchType = function (query) {
            var results = query ? $scope.postType.filter( $scope.createFilterForType(query) ) : $scope.postType,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                setTimeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        $scope.createFilterForType = function(query) {
            return function filterFn(state) {
                return (state.display.indexOf(query) === 0);
            };
        }

        $scope.simulateQuery1 = false;
        $scope.isDisabled1    = false;

        $scope.querySearch = function (query) {
            var results = query ? $scope.cities.filter( $scope.createFilterFor(query) ) : $scope.cities,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                setTimeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        $scope.createFilterFor = function(query) {
            return function filterFn(state) {
                return (state.name.indexOf(query) === 0);
            };
        }

        $scope.simulateQuery1 = false;
        $scope.isDisabled1    = false;

        $scope.querySearch1 = function (query) {
            var results = query ? $scope.cities.filter( $scope.createFilterFor1(query) ) : $scope.cities,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                setTimeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        $scope.createFilterFor1 = function(query) {
            return function filterFn(state) {
                return (state.name.indexOf(query) === 0);
            };
        }

        PostService.getAllPostData().then(function(posts){
            $scope.posts = posts.data;
        });

        PostService.getCity().then(function (data) {
            var cit = [{id:0,name:'Бүх аймаг'}];
            for(var i=0; i<data.length-1;i++){
                cit.push(data[i]);
            }
            $scope.cities = cit;
        });

        $scope.convertToDate = function (string) {
            return convertToDate(string);
        };

        $scope.$watch('filter.toDate', function (el) {
            try{
                var date = new Date(el).toJSON().slice(0, 10);
                $scope.filter.tooDate = date;
            }catch (e){

            }

        });

        $scope.$watch('filter.fromDate', function (el) {
            try{
                var date = new Date(el).toJSON().slice(0, 10);
                $scope.filter.froomDate = date;
            }catch(e){

            }

        });

        $scope.onSelection = function(item) {
            $scope.selectedItemType = item;
        }

        $scope.filterClear = function () {
            console.log($scope.postType[0]);
            $scope.filter={};
            $scope.searchTextType = '';
            //$scope.selectedItemType = $scope.postType[0];
            $scope.searchText = '';
            $scope.searchText1 = '';
        };

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
