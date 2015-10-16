'use strict';

mainApp.controller('FilterController', ['$rootScope', '$scope','$http','PostService', 'UserService','$location',
    function ($rootScope, $scope,$http,PostService, AuthService,$location) {
        var filter = this;

        filter.postType = '';
        filter.toFilter = '';
        filter.fromFilter = '';
        filter.toDateFilter = '';
        filter.fromDateFilter = '';
        filter.transportationTypeFilter = '';
        filter.quickFilter = '-createdDate';

        PostService.getCity().then(function (data) {
            $scope.cities = data;
        });

        $scope.$watch('cityId', function (el) {
            PostService.getDistrict(el).then(function (data) {
                $scope.districts= data;
            });
        });

        filter.changeValue = function () {
            filterOptions.postType = filter.postType;
            filterOptions.toLocation = filter.toFilter;
            filterOptions.fromLocation = filter.fromFilter;
            filterOptions.quickFilter = filter.quickFilter;

            var toDate='';
            var fromDate='';
            if(filter.toDateFilter!==''){
                toDate = new Date(filter.toDateFilter).toJSON().slice( 0, 10 );
            }
            if(filter.fromDateFilter!=='') {
                fromDate = new Date(filter.fromDateFilter).toJSON().slice(0, 10);
            }

            filterOptions.toDate =  toDate;
            filterOptions.fromDate =fromDate;
            filterOptions.transportationType = fromDate;

            $mdToast.showSimple('Шүүлт: ' + filterOptions());

            function filterOptions() {
                var options = '';
                for (var propName in filterOptions) {
                    if (filterOptions[propName] !== undefined) {
                        options += " " + filterOptions[propName];
                    }
                }
                return options;
                console.log(options);
            }
        };

        filter.clearFilterOptions = function () {
            filterOptions.postType = '';
            filterOptions.toLocation = '';
            filterOptions.fromLocation = '';
            filterOptions.toDate = '';
            filterOptions.fromDate = '';
            filterOptions.transportationType = '';
            filterOptions.quickFilter = '';

            filter.postType = '';
            filter.toFilter = '';
            filter.fromFilter = '';
            filter.toDateFilter = '';
            filter.fromDateFilter = '';
            filter.transportationTypeFilter = '';
            filter.quickFilter = '';

            $mdToast.showSimple('Шүүлтийн сонголтууд цэвэрлэгдлээ...');
        };
    }
]);
