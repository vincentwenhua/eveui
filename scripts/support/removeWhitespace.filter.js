(function () {
    'use strict';

    angular.module('removeWhitespace', [])
        .filter('removeWhitespace', function () {
            return function (value) {
                if (!angular.isString(value)) {
                    return value;
                }

                return value.replace(/\s+/g, '');
            };
        });
})();
