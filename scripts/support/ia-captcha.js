(function () {
    'use strict';

    angular.module('iaCaptcha', [])
        .directive('captchaValidator', ['$rootScope', '$parse', '$timeout', function ($rootScope, $parse, $timeout) {
            return {
                restrict: 'AE',
                scope: {
                    ngModel: '@ngModel'
                },
                require: ['^captcha', '^ngModel'],
                link: function (scope, elem, attrs, controllers) {
                    scope.$on('$destroy', onDestroy);

                    var captchaCtrl = controllers[0],
                        modelCtrl = controllers[1];

                    var validator = function (value) {
                        var result;
                        if (value) {
                            var match = captchaCtrl.getCaptchaValue();
                            result = angular.equals(value.toLowerCase(), match.toLowerCase());
                        } else {
                            result = false;
                        }

                        modelCtrl.$setValidity('captcha', result);

                        return value;
                    };

                    modelCtrl.$parsers.unshift(validator);
                    modelCtrl.$formatters.push(validator);

                    var deregister = $rootScope.$on('captchaRefresh', function () {
                        $timeout(function() {
                            modelCtrl.$setValidity('captcha', false);
                        }, 0);
                    });

                    function onDestroy () {
                        deregister();
                    }
                }
            };
        }])

        .directive('captcha', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                controller: ['$scope', function ($scope) {
                    $scope.captcha_value = "";

                    this.getCaptchaValue = function () {
                        return $scope.captcha_value;
                    };

                    this.setCaptchaValue = function (value, refresh) {
                        $scope.captcha_value = value;
                        if (refresh) {
                            $rootScope.$broadcast('captchaRefresh', value);
                        }
                    };
                }],
                template: '<div ng-transclude></div>'
            };
        }])

        .directive('iaCaptcha', ['$rootScope', 'CaptchaService', function ($rootScope, CaptchaService) {
            return {
                restrict: 'EA',
                replace: true,
                scope: true,
                require: '^captcha',
                link: function (scope, elem, attrs, ctrl) {
                    scope.$on('$destroy', onDestroy);
                    scope.canvas = angular.element(elem)[0];
                    scope.context = scope.canvas.getContext('2d');
                    scope.context.font = 'bold 16pt arial';
                    scope.context.textBaseline = 'middle';
                    scope.context.textAlign = 'center';
                    function refreshCaptcha(refresh) {
                        scope.context.clearRect(0, 0, scope.canvas.width, scope.canvas.height);

                        // var captchaCode = scope.captcha_value = CaptchaService.generateRandomString();
                        var operation = CaptchaService.generateRandomOperation();
                        var captchaCode = operation.formula;
                        scope.captcha_value = ''+operation.result;
                        ctrl.setCaptchaValue(scope.captcha_value, refresh);

                        var x = 10;

                        for (var i = 0; i < captchaCode.length; i++) {
                            scope.context.fillStyle = CaptchaService.getRandomColor();

                            scope.context.fillText(captchaCode[i], x + 12 * i, 18);
                        }
                    }

                    refreshCaptcha();

                    elem.on('click', function () {
                        refreshCaptcha(true);
                    });

                    var deregister = $rootScope.$on('captcha_error', function () {
                        refreshCaptcha(true);
                    });

                    function onDestroy () {
                        deregister();
                    }
                }
            };
        }])

        .service('CaptchaService', function () {

            /**
             * Generate random captcha code.
             *
             * @returns {string}
             */
            var generateRandomString = function () {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                var string_length = 4;
                var randomstring = '';
                for (var i = 0; i < string_length; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum, rnum + 1);
                }

                return randomstring;
            };

            /**
             * Generate random captcha code.
             *
             * @returns {string}
             */
            var generateRandomOperation = function () {

                var operand1 = Math.floor(Math.random() * 12 + 1);
                var operand2 = Math.floor(Math.random() * 12 + 1);

                if (operand1 < operand2){
                    operand2 = [operand1, operand1 = operand2][0];
                }

                var operators = [{
                        sign: "+",
                        method: function(a,b){ return a + b; }
                    },{
                        sign: "-",
                        method: function(a,b){ return a - b; }
                    }];

                var operator = Math.floor(Math.random()*operators.length);

                return {'formula': [operand1, operators[operator].sign, operand2].join(''),
                        'result': operators[operator].method(operand1, operand2) };
            };

            /**
             * Captcha get random color
             *
             * @returns {string}
             */
            var getRandomColor = function () {
                var letters = '0123456789ABC'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            };

            return {
                generateRandomString: generateRandomString,
                generateRandomOperation: generateRandomOperation,
                getRandomColor: getRandomColor
            };
        })

}());
