angular
    .module('iconsAndThemes', ['ngMaterial'])
    .config(function ($mdThemingProvider, $mdIconProvider) {

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("account", "./assets/svg/ic_account_circle_24px.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/icons/twitter.svg", 24)
            .icon("facebook", "./assets/svg/icons/facebook.svg", 24)
            .icon("phone", "./assets/svg/icons/phone.svg", 512)
            .icon("filter", "./assets/svg/icons/filter.svg", 24)
            .icon("filter-remove", "/assets/svg/icons/filter-remove.svg", 24)
            .icon("mail", "./assets/svg/icons/mail.svg", 24)
            .icon("car", "./assets/svg/icons/car.svg", 24)
            .icon("carry", "./assets/svg/icons/carry.svg", 24)
            .icon("view", "./assets/svg/icons/view.svg", 24)
            .icon("down", "./assets/svg/icons/down.svg", 24)
            .icon("up", "./assets/svg/icons/up.svg", 24)
            .icon("passenger", "./assets/svg/icons/passenger.svg", 24)
            .icon("view", "./assets/svg/icons/view.svg", 24)
            .icon("star-empty", "./assets/svg/icons/star-empty.svg", 24)
            .icon("star", "./assets/svg/icons/star.svg", 24)
            .icon("plus-circle", "./assets/svg/icons/plus-circle.svg", 24)
            .icon("unfold-more", "./assets/svg/icons/unfold-more.svg", 24)
            .icon("unfold-less", "./assets/svg/icons/unfold-less.svg", 24)
            .icon("close", "./assets/svg/icons/close.svg", 24)
            .icon("map-marker", "./assets/svg/icons/gps.svg", 24)
            .icon("calendar-blank", "./assets/svg/icons/calendar-blank.svg", 24)
            .icon("crosshairs-gps", "./assets/svg/icons/crosshairs-gps.svg", 24)
            .icon("package-with-hand", "/assets/svg/icons/package11.svg", 44)
            .icon("package", "/assets/svg/icons/box49.svg", 44)
            .icon("user-female", "/assets/svg/icons/woman25.svg", 70)
            .icon("user-male", "/assets/svg/icons/male79.svg", 70)

        $mdThemingProvider.theme('default')
            .primaryPalette('orange')
            .accentPalette('blue');

    });