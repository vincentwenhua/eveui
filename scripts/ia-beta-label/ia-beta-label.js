angular.module('iaBetaLabel', [])
    .directive('iaBetaLabel', function () {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'partials/ia-beta-label/ia-beta-label.html'
        };
    });
