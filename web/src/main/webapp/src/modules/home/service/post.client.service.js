mainApp.factory('PostService', function ($http) {
    return {
        getAllPostData: function (scope) {
            return $http.get(SERVICE_URL + '/post/gets/'+scope.auth).then(function (posts) {
                return posts = posts.data;
            });
        },
        getPostMore: function (mpost) {
            var promise = $http.get(SERVICE_URL + '/post/' + mpost.id).then(function (posts) {
                return posts = posts.data;
            });
            return promise;
        },
        allPostPaging: function (scope,page) {
            return $http.get(SERVICE_URL + '/post/gets/'+scope.auth+'?page=' + page).then(function (data) {
                return data.data;
            })
        },
        allPostFilter: function (scope,filter) {
            return $http({url:SERVICE_URL + '/post/gets/'+scope.auth,method:'GET',params:filter}).then(function (data) {
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
            var promise = $http.get(SERVICE_URL + '/transportations').then(function (data) {
                return data.data;
            });
            return promise;
        },
        getPolicy: function () {
            return $http.get(SERVICE_URL + '/policy').then(function (data) {
                return data.data;
            });
        },
        getActivateCountPost: function () {
            var promise = $http.get(SERVICE_URL + '/post/getActivateCountPost').then(function (data) {
                return data.data;
            });
            return promise;
        },
        getOwnPostList: function (page) {
            var promise = $http.get(SERVICE_URL + '/post/own?page=' + page).then(function (data) {
                return data.data;
            });
            return promise;
        },
        getContactedPostList: function (page) {
            var promise = $http.get(SERVICE_URL + '/post/contacted?page=' + page).then(function (data) {
                return data.data;
            });
            return promise;
        },
        getContactedPostListFilter: function (filter) {
            var promise = $http({url:SERVICE_URL + '/post/contacted',method:'GET',params:filter}).then(function (data) {
                return data.data;
            });
            return promise;
        },
        ownPostDeactivate: function (postId, mdToast,scope) {
            $http.post(SERVICE_URL + '/post/close/' + postId).success(function (data) {
                if (data.success == true) {
                    scope.closeDialog();
                    scope.ownPost();
                }
                else if (data.success == false) {
                    mdToast.showSimple('Амжилтгүй боллоо');
                }
            }).error(function (data) {

            });
        },
        getOwnPost: function (ownPosts) {
            var promise = $http.get(SERVICE_URL + '/post/get/' + ownPosts.id).then(function (data) {
                return data.data;
            });
            return promise;
        },

        getOwnPostFilter: function (filter) {
            var promise = $http({url:SERVICE_URL + '/post/own',method:'GET',params:filter}).then(function (data) {
                return data.data;
            });
            return promise;
        },
        hideLine: function (id) {
            var promise = $http.post(SERVICE_URL + '/contact/hide/' + id).then(function (data) {
                return data.data;
            });
            return promise;
        }
    };
});
