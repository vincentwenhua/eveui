'use strict';

angular.module('iaDate')
    .directive('iaYear', [function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'partials/ia-date/ia-year.html',
            controller: function($scope,$filter, $element) {
                
                $element.on('change', function () {
                    $scope.$digest(function () {
                        $scope.model || ($scope.model = {});
                        $scope.model.month = null;
                        $scope.model.day = null;
                    });
                });

                if ($scope.type === 'now-future' || $scope.type === 'past-future') {
                    $scope.$watch('finalLimit', buildYears);
                    $scope.$watch('initialLimit', buildYears);
                }

                if($scope.type === 'past-16' || $scope.type === 'past-now' )
                {
                    $scope.$watch('finalLimit', buildYearsDescRegister);
                    $scope.$watch('initialLimit', buildYearsDescRegister);
                }

                if ($scope.type === 'now-birth') {
                    $scope.$watch('finalLimit', buildYearsDesc);
                    $scope.$watch('initialLimit', buildYearsDesc);
                }

                if ($scope.type === 'birth-now') {
                    var fromTime = angular.fromJson($scope.minDate);
                    $scope.initialLimit = moment([fromTime.year, fromTime.month - 1, fromTime.day]);
                    $scope.$watch('finalLimit', buildYearsFromTo);
                    $scope.$watch('initialLimit', buildYearsFromTo);
                }
                
                if ($scope.model === null){
                    $scope.model        = {};
                    $scope.model.year   = null;
                    $scope.model.month  = null;
                    $scope.model.day    = null;
                }
                
                function buildYears () {
                    var years = [];
                    years.push({id:null,name:$filter('i18n')('common.year')});
                    for (var i = $scope.initialLimit.year(); i <= $scope.finalLimit.year(); i++) {
                        years.push({id:i,name:i});
                    }
                    $scope.years            = years;
                }

                function buildYearsDescRegister() {
                    var years = [];
                    years.push({id:null,name:$filter('i18n')('common.year')});
                    for (var i = $scope.finalLimit.year(); i >= $scope.initialLimit.year(); i--) {
                        years.push({id:i,name:i});
                    }
                    $scope.years = years;
                }

                function buildYearsDesc() {
                    var years = [];
                    years.push({id:null,name:$filter('i18n')('common.year')});
                    for (var i = $scope.initialLimit.year(); i >= $scope.finalLimit.year(); i--) {
                        years.push({id:i,name:i});
                    }
                    $scope.years = years;
                }

                function buildYearsFromTo() {
                    var years = [];
                    years.push({id:null,name:$filter('i18n')('common.year')});
                    for (var i = $scope.finalLimit.year(); i >= $scope.initialLimit.year(); i--) {
                        years.push({id:i,name:i});
                    }

                    //Fix for TO dates without FROM in view mode
                    if (years.length == 1 && $scope.model.year){
                        years.push({id:$scope.model.year, name: $scope.model.year});
                    }

                    $scope.years = years;
                }
            }
        };
    }]);
