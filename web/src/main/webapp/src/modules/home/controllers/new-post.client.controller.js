'use strict';

mainApp.controller('NewPostController', ['$rootScope', '$scope','$http','$mdDialog','$mdToast', 'UserService','PostService','$location',
    function ($rootScope, $scope,$http,dialog,$mdToast,UserService,PostService,$location) {

        $scope.adsType = function(){
            alert('hello');
        }

        $scope.newPostProgress = 0;

        $scope.minDate = new Date();

        $scope.minDate.setDate($scope.minDate.getDate()-1);

        console.log($scope.newPost.when);

            UserService.getUserInfo($scope).then(function (data) {
            if(data.success == true){
                $scope.auth = true;
                $scope.user = data.data;
            }else{
                $scope.auth = false;
            }
        });

        $scope.toDistricts = {};
        $scope.fromDistricts = {};
        $scope.createData = {};
        $scope.init = function () {
            PostService.getTransportation().then(function (res) {
                    $scope.transportation = JSON.parse(angular.toJson(res.data));
            });

            PostService.getCity().then(function (res) {
                $scope.cities = res;
            });

            PostService.getPolicy().then(function (res) {
                $scope.policy = JSON.parse(JSON.stringify(res.data));
            })
        };

        $scope.toDistrictGetName = function (id) {
            for(var i in $scope.toDistricts){
                if($scope.toDistricts[i].id == id)
                    return $scope.toDistricts[i].name;
            }
        };

        $scope.$watch('step', function (el) {
            switch (el){
                case 1 : $scope.newPostProgress = 33;break;
                case 2 : $scope.newPostProgress = 66;break;
                case 3 : $scope.newPostProgress = 66;break;
                case 4 : $scope.newPostProgress = 100;break;
                case 5 : $scope.newPostProgress = 100;break;
                default :$scope.newPostProgress = 0;break;
            }
        });

        $scope.transportGetName = function (id) {
            for(var i in $scope.transportation){
                if($scope.transportation[i].id == id)
                    return $scope.transportation[i].name;
            }
        };

        $scope.fromDistrictGetName = function (id) {
            for(var i in $scope.fromDistricts){
                if($scope.fromDistricts[i].id == id)
                    return $scope.fromDistricts[i].name;
            }
        };

        $scope.cityGetName = function (id) {
            for(var i in $scope.cities){
                if($scope.cities[i].id == id)
                    return $scope.cities[i].name;
            }
        };

        $scope.completePost = function (el) {

            for(var i in $scope.policy){
                if($scope.policy[i].id == el){
                    $scope.newPost.policies = [$scope.policy[i]];
                }
            }

            $scope.newPost.when = $scope.newPost.when.toJSON().slice(0, 10)
            $scope.newPost.arrive = $scope.newPost.arrive.toJSON().slice(0, 10)
            if ($scope.newPost.transportationId != null)
            {
                $scope.newPost.transportationId;
            }

            if ($scope.newPost.description == null) {
                $scope.newPost.description = "";
            }

            if ($scope.newPost.contact == null) {
                $scope.newPost.contact = "";
            }
            var data = {};
            if($scope.newPost.id){
                data = {
                    animal:$scope.newPost.animal,
                    arrive:$scope.newPost.arrive,
                    contact:$scope.newPost.contact,
                    description:$scope.newPost.description,
                    fromCityId:$scope.newPost.fromCityId,
                    fromDistrictId:$scope.newPost.fromDistrictId,
                    passanger:$scope.newPost.passanger,
                    policies:$scope.newPost.policies,
                    stuff:$scope.newPost.stuff,
                    toCityId:$scope.newPost.toCityId,
                    toDistrictId:$scope.newPost.toDistrictId,
                    transportationId:$scope.newPost.transportationId,
                    type:$scope.newPost.type,
                    when:$scope.newPost.when,
                    id:$scope.newPost.id
                }
            }else{
                data = {
                    animal:$scope.newPost.animal,
                    arrive:$scope.newPost.arrive,
                    contact:$scope.newPost.contact,
                    description:$scope.newPost.description,
                    fromCityId:$scope.newPost.fromCityId,
                    fromDistrictId:$scope.newPost.fromDistrictId,
                    passanger:$scope.newPost.passanger,
                    policies:$scope.newPost.policies,
                    stuff:$scope.newPost.stuff,
                    toCityId:$scope.newPost.toCityId,
                    toDistrictId:$scope.newPost.toDistrictId,
                    transportationId:$scope.newPost.transportationId,
                    type:$scope.newPost.type,
                    when:$scope.newPost.when
                }
            }


            $http.post(SERVICE_URL + '/post', data).success(function (data) {
                if (data.success == true) {
                    dialog.cancel();

                    setTimeout(function () {
                        $mdToast.showSimple('Зар амжилттай хадгалагдлаа');
                    }, 1000);

                    window.location.reload(true);
                }
                else {
                    $mdToast.showSimple('Баазад хадгалхад алдаа өглөө : ' + data);
                }
            }).error(function (data, status) {

                //console.log('Баазын хадгалах функ алдаа өглөө : ' + data);
            });
            $scope.newPostData2 = null;
        }

        $scope.$watch('newPost.fromCityId', function (el) {
            if(el){
                PostService.getDistrict(el).then(function (res) {
                    $scope.fromDistricts = {};
                    $scope.fromDistricts = res;
                });
            }

        });

        $scope.$watch('newPost.toCityId', function (el) {
            if(el){
                PostService.getDistrict(el).then(function (res) {
                    $scope.toDistricts = {};
                    $scope.toDistricts = res;
                });
            }

        });

        $scope.step = 1;

        $scope.stepChange = function (value) {
            if(value == 'CARRIER'){
                $scope.step = 2;
            }else{
                $scope.step = 3;
            }
        }

        $scope.newPostSteps = function (number,datacheck) {
            console.log($scope);
            $scope.newPostDataCheck = datacheck;
            $scope.step = number;
        }

        $scope.$watch('step', function (el) {
        });

        $scope.closeDialog = function () {
            dialog.cancel();
        };
    }
]);
