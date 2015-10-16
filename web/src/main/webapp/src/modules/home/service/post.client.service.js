mainApp.factory('PostService', function ($http) {
    return {
        signin: function (params) {

        },
        getAllPostData: function () {
            return $http.get(SERVICE_URL + '/post').then(function (posts) {
                return posts = posts.data;

            });
        },
        getPostMore: function (mpost) {
            return $http.get(SERVICE_URL + '/post/' + mpost.id).then(function (posts) {
                return posts = posts.data;
            });
        },
        allPostPaging: function (page) {
            return $http.get(SERVICE_URL + '/post?page=' + page).then(function (data) {
                return data.data;
            })
        }
    };
});
