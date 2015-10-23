'use strict';

mainApp.controller('LogoutController', ['$rootScope', '$scope','$http','PostService', 'UserService','$location',
    function ($rootScope, $scope,$http,PostService, AuthService,$location) {
        AuthService.logout();
    }
]);
