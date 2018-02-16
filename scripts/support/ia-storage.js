(function () {
    'use strict';

    function $CacheFactoryProvider() {
        var self = this;
        var support;

        self.init = function() {
            support = 'localStorage';
        };

        this.$get = ['$rootScope', '$window', '$q', 'Store', 'API_BASE', function($rootScope, $window, $q, Store, API_BASE) {
            var caches = {};

            function cacheFactory(cacheId, options) {

                var size = 0,
                    data = {},
                    lruHash = {},
                    freshEnd = null,
                    staleEnd = null;

                return caches[cacheId] = {
                    put: function(key, value) {
                        var cache = Store.get(key);
                        var deferred = $q.defer();

                        if (Config.NonCachable.indexOf(key) == -1) {
                            if (!cache) {
                                Store.put(key, value);
                            } else {
                                if (angular.isArray(cache)) {
                                    cache[1] = angular.toJson(value);
                                    Store.put(key, cache);
                                } else {
                                    Store.put(key, value);
                                }
                            }
                        }

                        deferred.resolve(value);

                        return deferred.promise;
                    },

                    get: function (key) {
                        var cache = Store.get(key);
                        var deferred = $q.defer();

                        if (!cache) {
                            return;
                        }

                        deferred.resolve({
                            data: cache[1],
                            status: cache[0],
                            headers: function () {
                                return cache[2]
                            },
                            statusText: cache[3]
                        });

                        return deferred.promise;
                    },

                    remove: function(key) {
                        Store.remove(key);
                    },

                    removeAll: function() {
                        data = {};
                        size = 0;
                        lruHash = {};
                        freshEnd = staleEnd = null;

                        Store.empty();
                    },

                    destroy: function() {
                        data = null;
                        lruHash = null;
                        delete caches[cacheId];
                    },

                    info: function() {
                        return {};
                    }
                };


                /**
                 * makes the `entry` the freshEnd of the LRU linked list
                 */
                function refresh(entry) {
                    if (entry != freshEnd) {
                        if (!staleEnd) {
                            staleEnd = entry;
                        } else if (staleEnd == entry) {
                            staleEnd = entry.n;
                        }

                        link(entry.n, entry.p);
                        link(entry, freshEnd);
                        freshEnd = entry;
                        freshEnd.n = null;
                    }
                }


                /**
                 * bidirectionally links two entries of the LRU linked list
                 */
                function link(nextEntry, prevEntry) {
                    if (nextEntry != prevEntry) {
                        if (nextEntry) nextEntry.p = prevEntry; //p stands for previous, 'prev' didn't minify
                        if (prevEntry) prevEntry.n = nextEntry; //n stands for next, 'next' didn't minify
                    }
                }
            }


            /**
             * @ngdoc method
             * @name $cacheFactory#info
             *
             * @description
             * Get information about all the caches that have been created
             *
             * @returns {Object} - key-value map of `cacheId` to the result of calling `cache#info`
             */
            cacheFactory.info = function() {
                var info = {};
                forEach(caches, function(cache, cacheId) {
                    info[cacheId] = cache.info();
                });

                return info;
            };


            /**
             * @ngdoc method
             * @name $cacheFactory#get
             *
             * @description
             * Get access to a cache object by the `cacheId` used when it was created.
             *
             * @param {string} cacheId Name or id of a cache to access.
             * @returns {object} Cache object identified by the cacheId or undefined if no such cache.
             */
            cacheFactory.get = function(cacheId) {
                return caches[cacheId];
            };

            cacheFactory.getSupport = function() {
                return support;
            };


            return cacheFactory;
        }];
    }

    angular.module('iaStorage', [])
        .provider('iaCache', $CacheFactoryProvider)

        /*
         * @ngdoc service
         * @name RequestCache
         *
         * @description
         * Access to the request cache factory.
         *
         */
        .factory('RequestCache', ['iaCache', 'API_BASE', function (iaCache, API_BASE) {

            function buildUrl(url, params) {
                if (!params) return url;
                var parts = [];

                forEachSorted(params, function (value, key) {
                    if (value === null || angular.isUndefined(value)) return;
                    if (!angular.isArray(value)) value = [value];

                    angular.forEach(value, function (v) {
                        if (angular.isObject(v)) {
                            v = angular.toJson(v);
                        }
                        parts.push(encodeUriQuery(key) + '=' +
                        encodeUriQuery(v));
                    });
                });
                if (parts.length > 0) {
                    url += ((url.indexOf('?') == -1) ? '?' : '&') + parts.join('&');
                }
                return url;
            }

            function forEachSorted(obj, iterator, context) {
                var keys = sortedKeys(obj);
                for (var i = 0; i < keys.length; i++) {
                    iterator.call(context, obj[keys[i]], keys[i]);
                }
                return keys;
            }

            function sortedKeys(obj) {
                var keys = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        keys.push(key);
                    }
                }
                return keys.sort();
            }

            function encodeUriQuery(val, pctEncodeSpaces) {
                return encodeURIComponent(val).
                    replace(/%40/gi, '@').
                    replace(/%3A/gi, ':').
                    replace(/%24/g, '$').
                    replace(/%2C/gi, ',').
                    replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
            }

            return {
                get: function (uri, params) {
                    return iaCache.get('iceangel').get(buildUrl(API_BASE + uri, angular.extend({}, params || {})));
                },
                clear: function (uri, params) {
                    iaCache.get('iceangel').remove(buildUrl(API_BASE + uri, angular.extend({}, params || {})));
                },
                update: function (uri, params, data) {
                    return iaCache.get('iceangel').put(buildUrl(API_BASE + uri, angular.extend({}, params || {})), data);
                },
                removeAll: function() {
                    iaCache.get('iceangel').removeAll();
                }
            };

        }])

        .factory('Store', ['$window',function ($window) {

            /**
             * Put key => value data.
             *
             * @param key
             * @param value
             */
            function put(key, value) {
                return $window.localStorage.setItem(key, angular.toJson(value));
            };

            /**
             * Get one item.
             *
             * @param key
             * @returns {*}
             */
            function get(key) {
                return angular.fromJson($window.localStorage.getItem(key));
            };

            /**
             * @ngdoc method
             * @name $cacheFactory#get
             *
             * @description
             * Get access to a cache object by the `cacheId` used when it was created.
             *
             * @param {string} cacheId Name or id of a cache to access.
             * @returns {object} Cache object identified by the cacheId or undefined if no such cache.
             */
            function remove(key) {
                return $window.localStorage.removeItem(key);
            };

            /**
             * Empty all store
             */
            function empty() {
                return $window.localStorage.clear();
            }

            return {
                put: put,
                get: get,
                remove: remove,
                empty: empty
            };

        }])
})();
