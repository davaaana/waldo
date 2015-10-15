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