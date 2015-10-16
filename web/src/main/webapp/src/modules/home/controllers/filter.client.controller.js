'use strict';

mainApp.controller('FilterController', ['$rootScope', '$scope','$http','PostService', 'UserService','$location',
    function ($rootScope, $scope,$http,PostService, AuthService,$location) {
        $scope.postType = '';
        $scope.toFilter = '';
        $scope.fromFilter = '';
        $scope.toDateFilter = '';
        $scope.fromDateFilter = '';
        $scope.transportationTypeFilter = '';
        $scope.quickFilter = '-createdDate';

        PostService.getCity().then(function (data) {
            $scope.cities = data;
        });

        $scope.changeValue = function () {
            filterOptions.postType = $scope.postType;
            filterOptions.toLocation = $scope.toFilter;
            filterOptions.fromLocation = $scope.fromFilter;
            filterOptions.quickFilter = $scope.quickFilter;

            var toDate='';
            var fromDate='';
            if($scope.toDateFilter!==''){
                toDate = new Date($scope.toDateFilter).toJSON().slice( 0, 10 );
            }
            if($scope.fromDateFilter!=='') {
                fromDate = new Date($scope.fromDateFilter).toJSON().slice(0, 10);
            }

            filterOptions.toDate =  toDate;
            filterOptions.fromDate =fromDate;
            filterOptions.transportationType = fromDate;

            console.log('Шүүлт: ' + filterOptions());

            function filterOptions() {
                var options = '';
                for (var propName in filterOptions) {
                    if (filterOptions[propName] !== undefined) {
                        options += " " + filterOptions[propName];
                    }
                }
                return options;
            }
        };

        $scope.clearFilterOptions = function () {
            filterOptions.postType = '';
            filterOptions.toLocation = '';
            filterOptions.fromLocation = '';
            filterOptions.toDate = '';
            filterOptions.fromDate = '';
            filterOptions.transportationType = '';
            filterOptions.quickFilter = '';

            $scope.postType = '';
            $scope.toFilter = '';
            $scope.fromFilter = '';
            $scope.toDateFilter = '';
            $scope.fromDateFilter = '';
            $scope.transportationTypeFilter = '';
            $scope.quickFilter = '';

            $mdToast.showSimple('Шүүлтийн сонголтууд цэвэрлэгдлээ...');
        };
    }
]);
