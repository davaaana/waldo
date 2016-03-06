'use strict';

mainApp.controller('ShareCtrl', ['$stateParams','$rootScope', '$scope', '$http', '$mdDialog', 'PostService', '$log', '$q','$mdToast', 'UserService', '$location',
    function ($stateParams,$rootScope, $scope, $http, dialog, PostService, $log, $q,$mdToast, AuthService, $location) {

        $scope.error = false;
        $scope.init = function () {
            $http.get(SERVICE_URL + '/post/' + $stateParams.id).success(function (posts) {
                console.log(posts);
                if(posts.success == true){
                    var data;
                    try {
                        data = JSON.parse(posts.data);
                    } catch (e) {
                        data = JSON.parse(JSON.stringify(posts.data));
                    }
                    $scope.post = data;
                    $scope.error = false;
                }
                else{
                    $scope.error = true;
                }
            });
        }
    }
]);
