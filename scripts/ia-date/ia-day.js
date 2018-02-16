'use strict';

angular.module('iaDate')
    .directive('iaDay', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'partials/ia-date/ia-day.html',
            controller: function ($scope,$filter) {
                if ($scope.type === 'now-birth') {
                    $scope.$watchCollection('model', getFullDaysDesc);
                    $scope.$on('shouldUpdate', getFullDaysDesc);
                    getFullDaysDesc();
                } else {
                    $scope.$watchCollection('model', getFullDays);
                    $scope.$on('shouldUpdate', getFullDays);
                    getFullDays();
                }

                function getFullDays() {
                    var firstValidDay = $scope.isInitialLimitMonth() ?
                            $scope.initialLimit.date() :
                            1;
                    var lastValidDay = $scope.isFinalLimitMonth() ?
                            $scope.finalLimit.date() :
                            $scope.selectedDate.daysInMonth();
                    var dates = [];
                    dates.push({id:null,name:$filter('i18n')('common.day')});
                    for (var count = firstValidDay; count <= lastValidDay; count++) {
                        dates.push({id:count,name:count});
                    }

                    if ($scope.selectedDate.isBefore($scope.initialLimit)) {
                        $scope.model.day = null;
                    }

                    $scope.dates = dates;
                }

                function getFullDaysDesc() {
                    var firstValidDay = $scope.isInitialLimitMonth() ?
                        $scope.initialLimit.date() :
                        $scope.selectedDate.daysInMonth();

                    var lastValidDay = $scope.isFinalLimitMonth() ?
                        $scope.finalLimit.date() :
                        1;
                    var dates = [];
                    dates.push({ id: null, name: $filter('i18n')('common.day')});
                    for (var count = lastValidDay; count <= firstValidDay; count++) {
                        dates.push({ id: count, name: count});
                    }

                    if ($scope.selectedDate.isBefore($scope.finalLimit)) {
                        $scope.model.day = null;
                    }

                    $scope.dates = dates;
                }
            }
        };
    });
