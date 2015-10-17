mainApp.factory('PostService', function ($http) {
    return {
        getAllPostData: function () {
            return $http.get(SERVICE_URL + '/post').then(function (posts) {
                return posts = posts.data;

            });
        },
        getPostMore: function (mpost) {
            var promise = $http.get(SERVICE_URL + '/post/' + mpost.id).then(function (posts) {
                return posts = posts.data;
            });
            return promise;
        },
        allPostPaging: function (page) {
            return $http.get(SERVICE_URL + '/post?page=' + page).then(function (data) {
                return data.data;
            })
        },
        getCity: function () {
            var promise = $http.get(SERVICE_URL + '/location/city').then(function (data) {
                return data.data;
            });
            return promise;
        },
        getDistrict: function (cityId) {
            if (cityId != '') {
                var promise = $http.get(SERVICE_URL + '/location/district/' + cityId).then(function (data) {
                    return data.data;
                });
                return promise;
            }
        },
        getTransportation: function () {
            return $http.get(SERVICE_URL + '/transportations').then(function (data) {
                return data.data;
            });
        },
        getPolicy: function () {
            return $http.get(SERVICE_URL + '/policy').then(function (data) {
                return data.data;
            });
        },
        getOwnPostList: function (page) {
            var promise = $http.get(SERVICE_URL + '/post/own?page='+page).then(function (data) {
                return data.data;
            });
            return promise;
        },
        getContactedPostList: function (page) {
            var promise = $http.get(SERVICE_URL + '/post/contacted?page='+page).then(function (data) {
                return data.data;
            });
            return promise;
        }
    };
});
