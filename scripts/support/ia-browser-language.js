(function () {
    'use strict';
    /*jshint validthis: true */

    angular.module('iaBrowserLanguage', [])
        .service('BrowserLanguage', function ($window, $q) {
            BrowserLanguage.prototype.get = get;
            BrowserLanguage.prototype.getBrowserLanguage = getBrowserLanguage;
            BrowserLanguage.prototype.prefersChinese = prefersChinese;

            return new BrowserLanguage();

            function BrowserLanguage () {
            }

            function get () {
                return this.getBrowserLanguage();
            }

            function prefersChinese () {
                return this.get()
                    .then(function (languages) {
                        if (angular.isString(languages)) {
                            languages = [languages];
                        }

                        if (!angular.isArray(languages)) {
                            return;
                        }

                        var preferred = _.find(languages, function (language) {
                            return /(zh|en)/i.test(language);
                        });

                        return /zh/i.test(preferred);
                    });
            }

            function getBrowserLanguage () {
                return $q(function (resolve, reject) {
                    var navigator = $window.navigator;
                    if (!navigator) {
                        return reject();
                    }

                    if (navigator.languages && navigator.languages.length > 0) {
                        return resolve(navigator.languages);
                    }

                    if (navigator.language) {
                        return resolve(navigator.language);
                    }

                    if (navigator.userLanguage) {
                        return resolve(navigator.userLanguage);
                    }

                    return reject();
                });
            }

        });

})();
