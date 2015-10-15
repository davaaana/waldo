
mainApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        // Home state routing
        $stateProvider.
            state('home', {
                url: '/index',
                abstract: true,
                templateUrl: 'src/modules/home/views/index.html',
                controller: 'HomeController'
            }).
            state('home.index', {
                url: '',
                templateUrl: 'src/modules/home/views/home.html',
                controller: 'HomeController'
            });
    }
]);
