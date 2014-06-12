'use strict';

angular.module('phonebookApp')
  .factory('ContactAPI', ['$http', function ($http) {
    var BASE_URL = 'http://your_backend:9999/contact';
    function patchDeferred(defer) {
        defer.always = function (callback) {
            defer.then(callback, callback);
        };
        return defer;
    }

    return {
        get: function (id) {
            var url = BASE_URL;
            if (id !== undefined) {
               url = url + '/' + id;
            }
            var defer = $http.get(url);
            return patchDeferred(defer);
        },
        create: function (data) {
            var defer = $http.post(BASE_URL, data);
            return patchDeferred(defer);
        },
        update: function (id, data) {
            var url = BASE_URL + '/' + id;
            var defer = $http.put(url, data);
            return patchDeferred(defer);
        },
        delete: function (id) {
            var url = BASE_URL + '/' + id;
            var defer = $http.delete(url);
            return patchDeferred(defer);
        },
    };
  }
]);
