var mainApp = angular.module('waldoApp', ['ui.router','iconsAndThemes', 'ngMaterial','blockUI','djds4rce.angular-socialshare']);
/*

mainApp.config(function($locationProvider){

});
*/

mainApp.run(function($FB){
    $FB.init('376391122550690');
});

mainApp.config(['blockUIConfig',
    function(blockUIConfig) {
        //$mdDateLocaleProvider.formatDate =  $mdDateLocaleProvider.formatDate = function(date) {
        //    return moment().format('YYYY-MM-DD');
        //};
        //blockUIConfig.templateUrl = 'src/modules/dialogs/loading.client.view.html';
        blockUIConfig.message = 'Ачааллаж байна...';
        //blockUIConfig.requestFilter = function (response) {
        //    console.log(response);
        //}
        //blockUIConfig.autoBlock  = false;
    }
]);

mainApp.config(['$httpProvider',
    function ($httpProvider) {
        // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(['$q', '$location',
            function ($q, $location) {
                return {
                    responseError: function (rejection) {
                        switch (rejection.status) {
                            case 401:
                                if(window.sessionStorage["userInfo"]){
                                    sessionStorage.removeItem("isAuth");
                                    sessionStorage.removeItem("userInfo");
                                    window.location.reload();
                                }
                                break;
                        }
                        return $q.reject(rejection);
                    }
                };
            }
        ]);
    }
])

var SERVICE_URL = '/ws';

var filterOptions = {
    postType: '',
    toLocation: '',
    fromLocation: '',
    toDate: '',
    fromDate: '',
    transportationType: '',
    quickFilter: ''
}

var auth = false;
var filterArea = true;

function differentDay(from,to){
    var oneDay = 24*60*60*1000;
    var firstDate = new Date(from);
    var secondDate = new Date(to);
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

function convertToDate(stringDate) {
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate() + 1);
    return dateOut;
}

