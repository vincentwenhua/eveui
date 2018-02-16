(function () {
    'use strict';

    angular.module('iaOffline', [])
        .run(iaOffline);

    function iaOffline ($window, $rootScope) {

        registerBrowserEvents();

        function registerBrowserEvents () {
            $rootScope.connectionUp = ($window.Offline.state === 'up');

            // listen for Online event
            $window.Offline.on('up', onUp);

            // listen for Offline event
            $window.Offline.on('down', onDown);
        }

        function onDown () {
            console.log('Connection down!');
            $rootScope.connectionUp = false;
        }

        function onUp () {
            console.log('Connection up!');
            $rootScope.connectionUp = true;
        }
    }
})();
