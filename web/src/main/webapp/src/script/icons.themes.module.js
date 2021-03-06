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
            .icon("view", "./assets/svg/icons/view.svg", 20)
            .icon("down", "./assets/svg/icons/down.svg", 24)
            .icon("up", "./assets/svg/icons/up.svg", 24)
            .icon("passenger", "./assets/svg/icons/passenger.svg", 24)
            .icon("view", "./assets/svg/icons/view.svg", 24)
            .icon("star-empty", "./assets/svg/icons/star-empty.svg", 24)
            .icon("star", "./assets/svg/icons/star.svg", 24)
            .icon("pass", "./assets/svg/pass.svg", 24)
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
            .icon("from-location", "/assets/svg/icons/ic_my_location_black_24px.svg", 12)
            .icon("calendar-check", "/assets/svg/icons/calendar-check.svg", 12)
            .icon("to-location", "/assets/svg/icons/ic_place_black_24px.svg", 12)
            .icon("passanger", "/assets/svg/icons/ic_supervisor_account_black_24px.svg", 12)
            .icon("carrier-icon", "/assets/svg/icons/delivery22.svg", 12)
            .icon("sender-icon", "/assets/svg/icons/send_3d-01.svg", 12)
            .icon("poster-contacted", "/assets/svg/icons/link-variant.svg", 12)
            .icon("poster-contacted-off", "/assets/svg/icons/link-variant-off.svg", 12)
            .icon("no-passanger", "/assets/svg/icons/no_ic_supervisor_account_black_24px-01.svg", 12)
            .icon("cow", "/assets/svg/icons/cow.svg", 12)
            .icon("no-cow", "/assets/svg/icons/no-cow.svg", 12)
            .icon("stuff", "/assets/svg/icons/package.svg", 12)
            .icon("no-stuff", "/assets/svg/icons/no-package-01.svg", 12)
            .icon("no-cash", "/assets/svg/icons/no-cash-01.svg", 12)
            .icon("cash", "/assets/svg/icons/cash.svg", 12)
            .icon("comment", "/assets/svg/icons/comment-multiple-outline.svg", 12)
            .icon("compare", "/assets/svg/icons/ic_compare_arrows_black_24px.svg", 12)
            .icon("account-plus", "/assets/svg/icons/account-plus.svg", 12)
            .icon("account-key", "/assets/svg/icons/account-key.svg", 12)
            .icon("facebook-icon", "/assets/svg/icons/facebook-icon.svg", 12)
            .icon("plus", "/assets/svg/comment-plus-outline.svg", 44)
            .icon("drop_down", "/assets/svg/ic_arrow_drop_down_black_24px.svg", 12)
            .icon("up", "/assets/svg/up.svg", 12)
            .icon("disconnect", "/assets/svg/plainicon.com-46153-svg.svg", 12)
            .icon("list", "/assets/svg/icons/list.svg", 12)
            .icon("tooltip", "/assets/svg/icons/tooltip-edit.svg", 12)
            .icon("account-network", "/assets/svg/icons/account-network.svg", 12)
            .icon("close-network", "/assets/svg/icons/close-network.svg", 12)
            .icon("eye-off", "/assets/svg/icons/eye-off.svg", 12)

        $mdThemingProvider.theme('default')
            .primaryPalette('orange')
            .accentPalette('blue');

    });