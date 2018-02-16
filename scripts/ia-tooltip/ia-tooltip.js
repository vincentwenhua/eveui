'use strict';

angular.module('iaTooltip', [])
    .directive('iaTooltip', function ($compile, locale) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                locale.ready('tooltips')
                    .then(function () {
                        var string = locale.getString(attrs.iaTooltip);
                        element.attr('tooltip', string);
                        element.removeAttr('ia-tooltip');
                        $compile(element)(scope);
                    });
            }
        };
    });
