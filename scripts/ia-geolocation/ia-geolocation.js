(function (angular, _) {

    'use strict';

    angular.module('iaGeolocation', [])

        .constant('GeoConfig', Config.Geolocation)


        .factory('UserLocation', ['$q', '$window', 'GeoConfig', function ($q, $window, GeoConfig) {

            return {
                getCurrentPosition: getCurrentPosition
            };


            /**
             * Get the user current location by using either Baidu Geolocation API or the browser native API
             *
             * @returns {Promise}
             */
            function getCurrentPosition() {
                var deferred = $q.defer();

                try {
                    useAmapGeolocationApi(deferred);
                    //useBaiduGeolocationApi(deferred);
                } catch (err) {
                    useBrowserNativeGeolocationApi(deferred);
                }

                return deferred.promise;
            }

            /**
             * Use Baidu API to geolocate the user
             *
             * @param {Promise} deferred
             */
            function useBaiduGeolocationApi(deferred) {
                (new BMap.Geolocation())
                    .getCurrentPosition(
                    function (result) {
                        deferred.resolve({
                            latitude: result.latitude,
                            longitude: result.longitude,
                            source: 'baidu'
                        });
                    },
                    function (error) {
                        throw error;
                    },
                    GeoConfig.options
                );
            }

            /**
             * Use native API to geolocate the user
             *
             * @param {Promise} deferred
             */
            function useBrowserNativeGeolocationApi(deferred) {
                $window.navigator
                    .geolocation
                    .getCurrentPosition(
                    function (result) {
                        deferred.resolve({
                            latitude: result.coords.latitude,
                            longitude: result.coords.longitude,
                            source: 'native'
                        });
                    },
                    function (error) {
                        deferred.reject(error);
                    },
                    GeoConfig.options
                );
            }

            /**
             * Use aMap API to geolocate the user
             *
             * @param {Promise} deferred
             */
            function useAmapGeolocationApi(deferred) {
                var options = angular.extend({}, GeoConfig.options, {convert: true});

                (new AMap.Map('amap-container')).plugin('AMap.Geolocation', function () {
                    var geolocation = new AMap.Geolocation(options);

                    // Register event handlers
                    AMap.event.addListener(geolocation, 'complete', function (result) {
                        deferred.resolve({
                            latitude: result.position.getLat(),
                            longitude: result.position.getLng(),
                            source: 'amap'
                        });
                    });
                    AMap.event.addListener(geolocation, 'error', function (error) {
                        deferred.reject(error);
                    });

                    // Call the geolocation API
                    geolocation.getCurrentPosition();
                });
            }

        }])

        .directive('iaBaiduMapApi', ['$window', 'GeoConfig', function ($window, GeoConfig) {
            return {
                restrict: "E",
                replace: true,
                scope: false,
                link: function (scope, elem, attrs) {
                    if (!GeoConfig.useBaidu) {
                        return false;
                    }

                    var script = document.createElement('script');
                    script.src = GeoConfig.BaiduApiUrl;
                    script.defer = 'defer';
                    elem.html(script);
                }
            }
        }])

        .directive('iaAmapApi', ['$window', 'GeoConfig', function ($window, GeoConfig) {
            return {
                restrict: "E",
                replace: true,
                scope: false,
                template: '<div id="amap-container" class="hide"></div>',
                link: function (scope, elem, attrs) {
                    if (!GeoConfig.useAmap) {
                        return false;
                    }

                    var script = document.createElement('script');
                    script.src = GeoConfig.AmapApiUrl;
                    script.defer = 'defer';
                    elem.append(script);
                }
            }
        }]);

}(angular, _));
