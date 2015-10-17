var mainApp = angular.module('waldoApp', ['ui.router','iconsAndThemes', 'ngMaterial']);

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

function convertToDate(stringDate) {
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate() + 1);
    return dateOut;
}

