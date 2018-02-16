(function () {
    'use strict';

    angular.module('iaAvatar', [])
        .directive('iaAvatar', function () {
            return {
                restrict: 'E',
                scope: {
                    avatar: '@',
                    badge: '='
                },
                templateUrl: 'partials/ia-avatar/ia-avatar.html',
                link: function (scope) {
                    // TODO: check IE
                    // scope.useDiv = Modernizr.backgroundsize;
                    scope.useDiv = false;
                }
            };
        });
})();
