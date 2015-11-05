'use strict';

mainApp.controller('PostMoreController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService) {

        $scope.ownBool = false;
        $scope.auth = AuthService.getAuthentication();

        $scope.minDate = new Date();
        $scope.minDate.setDate($scope.minDate.getDate()-1);

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
        $scope.convertToDate = function (string) {
            return convertToDate(string);
        };

        $scope.exchangePost = function (id) {
            $scope.contactPost2 = {
                id: id,
                call: true,
                sms: true,
                note: 'null'
            };
            $http.post(SERVICE_URL + '/contact', $scope.contactPost2).success(function (data) {
                if (data.success == true) {
                    $scope.contact = data.data;
                    $scope.stepExchange = 2;
                    $mdToast.showSimple('Холбоо барих хаяг амжилттай солигдлоо');
                }
            })
                .error(function (data) {
                });

        }
        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
