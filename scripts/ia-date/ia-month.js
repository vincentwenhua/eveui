'use strict';

angular.module('iaDate')
    .directive('iaMonth', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'partials/ia-date/ia-month.html',
            controller: function ($scope, $filter ,$element) {
                if ($scope.type === 'now-birth') {
                    $scope.$watch('model.year', buildMonthsListDesc);
                    $scope.$on('shouldUpdate', buildMonthsListDesc);
                    buildMonthsListDesc();
                } else {
                    $scope.$watch('model.year', buildMonthsList);
                    $scope.$on('shouldUpdate', buildMonthsList);
                    buildMonthsList();
                }


                $element.on('change', function () {
                    $scope.$digest(function () {
                        $scope.model || ($scope.model = {});
                        $scope.model.day = null;
                    });
                });

                function buildMonthsList () {
                    var months = [];
                    
                    var firstValidMonth = $scope.isInitialLimitYear() ?
                            $scope.initialLimit.month() + 1:
                            1;
                    var lastValidMonth = $scope.isFinalLimitYear() ?
                            $scope.finalLimit.month() + 1 :
                            12;
                    months.push({ id: null, name: $filter('i18n')('common.month') });
                    for (var count = firstValidMonth; count <= lastValidMonth; count++) {
                        months.push({ id: count, name: count });
                    }

                    if ($scope.selectedDate.isBefore($scope.initialLimit.clone().date(1))) {
                        $scope.model.month = null;
                    }
                    
                    $scope.months = months;
                }

                function buildMonthsListDesc () {
                    var months = [];

                    var firstValidMonth = $scope.isInitialLimitYear() ?
                    $scope.initialLimit.month() + 1 :
                        12;
                    var lastValidMonth = $scope.isFinalLimitYear() ?
                    $scope.finalLimit.month() + 1 :
                        1;
                    months.push({ id: null, name: $filter('i18n')('common.month') });
                    for (var count = lastValidMonth; count <= firstValidMonth; count++) {
                        months.push({ id: count, name: count });
                    }
                    if ($scope.selectedDate.isBefore($scope.finalLimit.clone().date(1))) {
                        $scope.model.month = null;
                    }

                    $scope.months = months;
                }
            }
        };
    });
