'use strict';

mainApp.controller('NewPostController', ['$rootScope', '$scope','$http','$mdDialog', 'UserService','$location',
    function ($rootScope, $scope,$http,dialog,AuthService,$location) {

        $scope.closeDialog = function () {
            dialog.cancel();
        };

        $scope.step = 1;

        $scope.stepChange = function (value) {
            if(value == 'CARRIER'){
                $scope.step = 2;
            }else{
                $scope.step = 3;
            }
        }

        $scope.newPostSteps = function (number) {
            $scope.step = number;
        }

        $scope.$watch('step', function (el) {
            console.log(el);
        });

        $scope.callDialog = function (name) {
            switch (name){
                case 'carrierInput':
                    dialog.show({
                        templateUrl: './src/modules/carrier/post-input.client.view.html',
                        controller: 'NewPostController'
                    });break;
                case 'carrierReview':
                    dialog.show({
                        templateUrl: './src/modules/carrier/post-review.client.view.html',
                        controller: 'NewPostController'
                    });break;
                case 'senderInput':
                    dialog.show({
                        templateUrl: './src/modules/sender/post-input.client.view.html',
                        controller: 'NewPostController'
                    });break;
                case 'senderReview':
                    dialog.show({
                        templateUrl: './src/modules/sender/post-review.client.view.html',
                        controller: 'NewPostController'
                    });break;
                default: dialog.show({
                    templateUrl: './src/modules/dialogs/post-create.client.view.html',
                    controller: 'NewPostController'
                });
            }
        }

    }
]);
