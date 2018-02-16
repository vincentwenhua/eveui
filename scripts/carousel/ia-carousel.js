(function () {
    'use strict';

    angular.module('iaCarousel', [])
        .controller('HomeCarouselController', ['$scope', function ($scope) {
            $scope.myInterval = 5000;
        }]);

})();
