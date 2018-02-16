(function () {
    'use strict';

    angular.module('iaPersonName', [])
        .run(function ($rootScope, PersonName) {
            $rootScope.PersonName = PersonName;
        })

        .factory('PersonName', function ($window) {
            var cjkRegex = $window.regenerate()
                .addRange(0x4E00, 0x9FFF) // CJK Common.
                .addRange(0x3400, 0x4DFF) // CJK Rare.
                .addRange(0x20000, 0x2A6DF) // CJK Historic.
                .addRange(0xF900, 0xFAFF) // CJK Compatibility.
                .addRange(0x2F800, 0x2FA1F) // CJK Compatibility supplement.
                .toRegExp();

            return {
                build: build
            };

            function build (first, middle, last) {
                var concatenatedName = [first, last].join('');
                return containsCjk(concatenatedName) ?
                    buildChineseName(first, middle, last) :
                    buildAmericanName(first, middle, last);
            }

            function buildAmericanName (first, middle, last) {
                var name = (first || '') + ' ' + (middle || '') + ' ' + (last || '');
                name = name.trim();
                name = name.replace(/ +/, ' ');

                return name;
            }

            function buildChineseName (first, middle, last) {
                var name = (last || '') + '' + (first || '') + '' + (middle || '');
                name = name.trim();
                name = name.replace(/ +/, containsLatinLetters(name) ? ' ' : '');

                return name;
            }

            function containsLatinLetters (string) {
                return /[a-z]/i.test(string);
            }

            function containsCjk (string) {
                return cjkRegex.test(string);
            }
        })

        .directive('personName', function ($rootScope, locale, PersonName) {
            return {
                restrict: 'A',
                scope: {
                    firstName: '@',
                    middleName: '@',
                    lastName: '@',
                    append: '@',
                    email: '@'
                },
                link: function (scope, element) {
                    function updateName() {
                        var token = scope.append;
                        var name = PersonName.build(scope.firstName,
                                scope.middleName,
                                scope.lastName);

                        if (!name && scope.email) {
                            name = scope.email;
                        }

                        if (!token || !locale.isToken(token)) {
                            element.html(name);
                            return;
                        }

                        locale.ready(locale.getPath(token))
                            .then(function () {
                                var append = locale.getString(token, {});
                                element.html(name + append);
                            });
                    }

                    scope.$watch('firstName', updateName);
                    scope.$watch('middleName', updateName);
                    scope.$watch('lastName', updateName);
                    scope.$watch('email', updateName);
                }
            };
        });
})();
