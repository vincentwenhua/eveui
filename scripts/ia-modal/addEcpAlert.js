(function () {
    'use strict';

    angular.module('addEcpAlert', [])
        .directive('addEcpAlert', function () {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    element.on('click', 'a', function () {
                        angular.element('#add-ecp-btn').click();
                        return false;
                    });
                }
            };
        });
})();
