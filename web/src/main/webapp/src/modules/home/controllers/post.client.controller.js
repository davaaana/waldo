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

        $scope.searchTextChange = function(text) {
            $log.info('Text changed to ' + text);
        }

        $scope.querySearch = function (query) {
            var results = query ? $scope.state.filter( $scope.createFilterFor(query) ) : $scope.states,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                setTimeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        $scope.selectedItemChange = function(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        /**
         * Build `states` list of key/value pairs
         */
        $scope.states = function() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

            return allStates.split(/, +/g).map( function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        $scope.state = $scope.states();
        /**
         * Create filter function for a query string
         */
        $scope.createFilterFor = function(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }

        PostService.getAllPostData().then(function(posts){
            $scope.posts = posts.data;
        });

        PostService.getCity().then(function (data) {
            $scope.cities = data;
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

        $scope.filterClear = function () {
            $scope.filter={};
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
