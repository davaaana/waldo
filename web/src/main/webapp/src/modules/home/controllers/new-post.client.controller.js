'use strict';

mainApp.controller('NewPostController', ['$rootScope', '$scope','$http','$mdDialog','$mdToast', 'UserService','PostService','$location',
    function ($rootScope, $scope,$http,dialog,$mdToast,UserService,PostService,$location) {

        $scope.adsType = function(type){

            document.getElementsByClassName('add-ads')[0].style.backgroundColor="";
            if(type=='sender'){
                document.getElementsByClassName('add-ads')[0].className += " md-accent";
                document.getElementsByClassName('ads-text1')[0].style.color="";
                document.getElementsByClassName('ads-text2')[0].style.color="rgb(68,138,255)";

                document.getElementsByClassName('md-container md-mode-determinate')[0].style.backgroundColor="rgb(170,209,249)";
                document.getElementsByClassName('md-bar md-bar2')[0].style.backgroundColor="rgb(68,138,255)";
            }
            if(type=='carrier'){
                document.getElementsByClassName('add-ads')[0].style.backgroundColor="orange";
                document.getElementsByClassName('ads-text2')[0].style.color="";
                document.getElementsByClassName('ads-text1')[0].style.color="orange";

                document.getElementsByClassName('md-container md-mode-determinate')[0].style.backgroundColor="rgb(255,224,178)";
                document.getElementsByClassName('md-bar md-bar2')[0].style.backgroundColor="rgb(255,152,0)";

            }

        }

        $scope.newPostProgress = 0;

        $scope.minDate = new Date();

        $scope.minDate.setDate($scope.minDate.getDate()-1);
            UserService.getUserInfo($scope).then(function (data) {
            if(data.success == true){
                $scope.auth = true;
                $scope.user = data.data;
            }else{
                $scope.auth = false;
            }
        });

        $scope.carrierChangeForm = function () {
            $('select').css("border-bottom-color", "red");
        }


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

        $scope.newPostSteps = function (number,datacheck,sender) {
            $scope.newPostDataCheck = datacheck;
            if(number == 4 || number == 5){
                if($scope.arriveValidation(sender) == true){
                    $scope.step = number;
                }
            }else{
                $scope.step = number;
            }
        }

        $scope.$watch('step', function (el) {
        });

        $scope.closeDialog = function () {
            dialog.cancel();
        };

        $scope.arriveValidation = function (sender) {
            var valid = true;
            if(!$scope.newPost.fromDistrictId){
                $('[name="fromDistrict"]').addClass('md-select-danger');
                $('#fromDistrict').removeClass('element-hide');
                $('#fromDistrict').addClass('element-show');
                valid = false;
            }else{
                $('[name="fromDistrict"]').removeClass('md-select-danger');
                $('#fromDistrict').removeClass('element-show');
                $('#fromDistrict').addClass('element-hide');
            }

            if(!$scope.newPost.toDistrictId){
                $('[name="toDistrict"]').addClass('md-select-danger');
                $('#toDistrict').removeClass('element-hide');
                $('#toDistrict').addClass('element-show');
                valid = false;
            }else{
                $('[name="toDistrict"]').removeClass('md-select-danger');
                $('#toDistrict').removeClass('element-show');
                $('#toDistrict').addClass('element-hide');
            }

            if(!$scope.newPost.fromCityId){
                $('[name="fromCity"]').addClass('md-select-danger');
                $('#fromCity').removeClass('element-hide');
                $('#fromCity').addClass('element-show');
                valid = false;
            }else{
                $('[name="fromCity"]').removeClass('md-select-danger');
                $('#fromCity').removeClass('element-show');
                $('#fromCity').addClass('element-hide');
            }

            if(!$scope.newPost.toCityId){
                $('[name="toCity"]').addClass('md-select-danger');
                $('#toCity').removeClass('element-hide');
                $('#toCity').addClass('element-show');
                valid = false;
            }else{
                $('[name="toCity"]').removeClass('md-select-danger');
                $('#toCity').removeClass('element-show');
                $('#toCity').addClass('element-hide');
            }
            if(!sender){
                if(!$scope.newPost.transportationId){
                    $('[name="transportation"]').addClass('md-select-danger');
                    $('#transportation').removeClass('element-hide');
                    $('#transportation').addClass('element-show');
                    valid = false;
                }else{
                    $('[name="transportation"]').removeClass('md-select-danger');
                    $('#transportation').removeClass('element-show');
                    $('#transportation').addClass('element-hide');
                }
            }

            if(!$scope.newPost.arrive){
                $('[name="arrive"]').addClass('md-select-danger');
                $('#arrive').removeClass('element-hide');
                $('#arrive').addClass('element-show');
                valid = false;
            }else{
                $('[name="arrive"]').removeClass('md-select-danger');
                $('#arrive').removeClass('element-show');
                $('#arrive').addClass('element-hide');
            }

            if(!$scope.newPost.when){
                $('[name="when"]').addClass('md-select-danger');
                $('#when').removeClass('element-hide');
                $('#when').addClass('element-show');
                valid = false;
            }else{
                $('[name="when"]').removeClass('md-select-danger');
                $('#when').removeClass('element-show');
                $('#when').addClass('element-hide');
            }

            if(!$scope.newPost.stuff && !$scope.newPost.passanger && !$scope.newPost.animal){
                $('[name="stuff"]').css('color','red');
                $('[name="passanger"]').css('color','red');
                $('[name="animal"]').css('color','red');
                $('#tree').removeClass('element-hide');
                $('#tree').addClass('element-show');
                valid = false;
            }else{
                $('[name="stuff"]').css('color','black');
                $('[name="passanger"]').css('color','black');
                $('[name="animal"]').css('color','black');
                $('#tree').removeClass('element-show');
                $('#tree').addClass('element-hide');
            }

            return valid;
        }
    }
]);
