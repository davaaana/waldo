'use strict';

mainApp.controller('PostMoreController', ['$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService',
    function ($rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService) {

        $scope.auth = AuthService.getAuthentication();
        $scope.ownBool = false;

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
                else {
                    console.log('exchangepost:' + data.message);
                }
            })
                .error(function (data) {
                    console.log('exchangepost:' + data.message);
                });

        }
        $scope.closeDialog = function () {
            dialog.cancel();
        }
    }
]);
