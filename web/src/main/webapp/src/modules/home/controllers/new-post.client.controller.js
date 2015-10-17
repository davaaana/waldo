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
    }
]);
