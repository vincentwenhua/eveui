'use strict';

angular.module('iaDate')
    .directive('iaDate', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                form: '=',
                disabled: '=',
                type: '@', // now-future,now-birth,birth-now, past-16, past-now or past-future.
                minDate: '@',
                maxDate: '@'
            },
            templateUrl: 'partials/ia-date/ia-date.html',
            controller: function ($scope, DefaultMinDate, DefaultMaxDate) {
                $scope.minDate || ($scope.minDate = DefaultMinDate);
                $scope.maxDate || ($scope.maxDate = DefaultMaxDate);

                $scope.isInitialLimitYear = isInitialLimitYear;
                $scope.isFinalLimitYear = isFinalLimitYear;
                $scope.isInitialLimitMonth = isInitialLimitMonth;
                $scope.isFinalLimitMonth = isFinalLimitMonth;

                switch ($scope.type) {
                    case 'now-future':
                        $scope.initialLimit = moment();
                        $scope.finalLimit = momentFromCustomObject($scope.maxDate);
                        watchMaxDate();
                        break;
                    case 'now-birth':
                        $scope.initialLimit = moment();
                        var birth_year;
                        var birth_month;
                        var birth_day;
                        var birth;
                        birth_year = $scope.$root.member.birth_date.year;
                        birth_month = $scope.$root.member.birth_date.month - 1;
                        birth_day = $scope.$root.member.birth_date.day;
                        $scope.finalLimit = moment([birth_year, birth_month, birth_day]);
                        watchMinDate();
                        break;
                    case 'birth-now':
                        var birth_year;
                        var birth_month;
                        var birth_day;
                        var birth;
                        birth_year = $scope.$root.member.birth_date.year;
                        birth_month = $scope.$root.member.birth_date.month - 1;
                        birth_day = $scope.$root.member.birth_date.day;
                        $scope.initialLimit = moment([birth_year, birth_month, birth_day]);
                        $scope.finalLimit = moment();
                        watchMinDate();
                        break;
                    case 'past-16':
                        $scope.initialLimit = momentFromCustomObject($scope.minDate);
                        $scope.finalLimit = moment().subtract(16, 'years').subtract(1, 'day');
                        watchMinDate();
                        break;
                    case 'past-now':
                        $scope.initialLimit = momentFromCustomObject($scope.minDate);
                        $scope.finalLimit = moment();
                        watchMinDate();
                        break;
                    case 'past-future':
                        $scope.initialLimit = momentFromCustomObject($scope.minDate);
                        $scope.finalLimit = momentFromCustomObject($scope.maxDate);
                        watchMinDate();
                        watchMaxDate();
                        break;
                    default:
                        throw 'Invalid type ' + $scope.type;
                }
                
                
                $scope.$watchCollection('model', update);
                $scope.$on('shouldUdpdate', update);
                update();

                function update() {
                    
                    if (angular.isDefined($scope.model)) {
                        $scope.selectedDate = momentFromCustomObject($scope.model) || moment();
                        return;
                    }

                    $scope.selectedDate = moment();
                    $scope.model = null;
                }

                function isInitialLimitYear() {
                    return $scope.selectedDate.year()  === $scope.initialLimit.year();
                }

                function isFinalLimitYear() {
                    return $scope.selectedDate.year() === $scope.finalLimit.year();
                }

                function isInitialLimitMonth() {
                    return $scope.isInitialLimitYear() && $scope.selectedDate.month() === $scope.initialLimit.month();
                }

                function isFinalLimitMonth() {
                    return $scope.isFinalLimitYear() && $scope.selectedDate.month() === $scope.finalLimit.month();
                }

                function watchMinDate () {
                    $scope.$watch('minDate', function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }

                        newValue = angular.fromJson(newValue);
                        $scope.initialLimit = momentFromCustomObject(newValue);
                        if ($scope.selectedDate.isBefore($scope.initialLimit)) {
                            $scope.model = null;
                        } else {
                            $scope.$broadcast('shouldUpdate');
                        }
                    });
                }

                function watchMaxDate () {
                    $scope.$watch('maxDate', function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }

                        newValue = angular.fromJson(newValue);
                        $scope.finalLimit = momentFromCustomObject(newValue);
                        if ($scope.selectedDate.isAfter($scope.finalLimit)) {
                            $scope.model = null;
                        } else {
                            $scope.$broadcast('shouldUpdate');
                        }
                    });
                }

                function momentFromCustomObject(object) {
                    if (!object) {
                        return;
                    }
                    
                    var model = _.clone(object);
                    if (angular.isString(model)) {
                        model = angular.fromJson(model);
                    }
                    
                    var format = 'YYYY';
                    var date = '' + model.year;

                    if (model.month) {
                        date += '-' + model.month;
                        format += '-M';

                        if (model.day) {
                            date += '-' + model.day;
                            format += '-D';
                        }
                    }
                    
                    return moment(date, format, true);
                }
            },
            link: function (scope, element, attrs) {
                scope.required = angular.isDefined(attrs.required);
            }
        };
    });
