var mainApp = angular.module('waldoApp', ['ui.router','iconsAndThemes', 'ngMaterial','blockUI']);

mainApp.config(['blockUIConfig','$mdDateLocaleProvider',
    function(blockUIConfig,$mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate =  $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('yyyy/MM/dd');
        };
        //blockUIConfig.templateUrl = 'src/modules/dialogs/loading.client.view.html';
        blockUIConfig.message = 'Ачааллаж байна...';
        //blockUIConfig.requestFilter = function (response) {
        //    console.log(response);
        //}
        //blockUIConfig.autoBlock  = false;
    }
]);

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

function convertToDate(stringDate) {
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate() + 1);
    return dateOut;
}

