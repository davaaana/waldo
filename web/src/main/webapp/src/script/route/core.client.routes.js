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
            })
            .state('home.my-post', {
                url: '/my-post',
                templateUrl: 'src/modules/home/views/own-post.html',
                controller: 'OwnPostController'
            }).state('home.contacted-post', {
                url: '/contacted-post',
                templateUrl: 'src/modules/home/views/contacted-post.html',
                controller:'ContactedPostController'
            }).state('home.about', {
                url: '/about',
                templateUrl: 'src/modules/home/views/about.html'
            });
    }
]);
