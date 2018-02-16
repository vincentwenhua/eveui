(function() {
    'use strict';

    angular.module('iaSettings', [])

        // .run(['$rootScope', 'iaSettings', 'locale', function($rootScope, iaSettings, locale) {
        //     $rootScope.globals || ($rootScope.globals = {});
        //     $rootScope.globals.language = iaSettings.getFormatLanguage();
        // }])

        .factory('iaSettings', ['$rootScope', '$http', 'API_BASE', 'iaCache', 'locale', 'localeConf', 'localeEvents', 'iaCollection', 'InsuranceType', 'Genders', 'LocationTrack', 'EmergencyChannel', 'SupportLanguages', 'Countries', 'SecurityQuestions', function ($rootScope, $http, API_BASE, iaCache, locale, localeConf, localeEvents, iaCollection, InsuranceType, Genders, LocationTrack, EmergencyChannel, SupportLanguages, Countries, SecurityQuestions) {
            var language;

            var settings = {};

            settings.get = function () {
                return $http.get(API_BASE + '/contents', {cache: iaCache('iceangel')});
            };

            settings.init = function () {
                $rootScope.globals.settings || ($rootScope.globals.settings = {});
                $rootScope.globals.settings.insurance_types || ($rootScope.globals.settings.insurance_types = InsuranceType);
                $rootScope.globals.settings.genders || ($rootScope.globals.settings.genders = Genders);
                $rootScope.globals.settings.location_tracks || ($rootScope.globals.settings.location_tracks = LocationTrack);
                $rootScope.globals.settings.emergency_channels || ($rootScope.globals.settings.emergency_channels = EmergencyChannel);
                $rootScope.globals.settings.support_languages || ($rootScope.globals.settings.support_languages = SupportLanguages);
                $rootScope.globals.settings.countries || ($rootScope.globals.settings.countries = Countries);
                $rootScope.globals.settings.security_questions || ($rootScope.globals.settings.security_questions = SecurityQuestions);

                // for china site
              // var countries_sort = $rootScope.globals.settings.countries.toArray();
              // var exist = countries_sort.filter(function(element) 
              //   {                
              //       if(element.phonecode === "86"){
              //           $rootScope.globals.settings.countries.items.pop(element);
              //           $rootScope.globals.settings.countries.items.unshift(element);                        
              //       }
              //  });
          
                settings.get().then(
                    function(res) {
                        _.each(res.data, function(items, key) {

                            if (!_.isEmpty($rootScope.globals.settings[key])) {
                                return;
                            }

                            if (_.isArray(res.data[key])) {
                                $rootScope.globals.settings[key] = new iaCollection(items);
                            } else {
                                $rootScope.globals.settings[key] = {};

                                _.each(items, function (subItems, subKey) {
                                    $rootScope.globals.settings[key][subKey] || ($rootScope.globals.settings[key][subKey] = []);

                                    _.each(subItems, function (subSubItems) {
                                        if (subKey === 'categories') {
                                            _.each(subSubItems.allergies, function (finalItem) {
                                                $rootScope.globals.settings[key][subKey].push(angular.extend(finalItem, {category: subSubItems['name_' + settings.getLanguage()]}));
                                            });
                                        } else {
                                            $rootScope.globals.settings[key][subKey].push(subSubItems);
                                        }

                                    });

                                    $rootScope.globals.settings[key][subKey] = new iaCollection($rootScope.globals.settings[key][subKey]);
                                });
                            }
                        });

                    }
                );
            };

            /**
             * iaSettings get current language setting.
             *
             * @returns {Object|*}
             */
            settings.getLanguage = function () {
                language = locale.getLocale();

                return language.split('-')[0];
            };

            settings.getFormatLanguageFromSQLite = function() {
            };

            /**
             * iaSettings get language with format.
             *
             * @returns {Object|defaultLocale|*|exports.i18n.defaultLocale}
             */
            settings.getFormatLanguage = function() {
                return locale.getLocale();
            };

            /**
             * Switch the language
             *
             * @param lang
             */
            settings.setLanguage = function (lang) {
                locale.setLocale(lang);

                return lang;
            };

            return settings;
        }])

        .service('iaPages', ['Restangular', function(Restangular) {
            function get(pages) {
                return Restangular.one('pages', pages).get();
            }

            return {
                get: get
            };
        }])

        .controller('iaSettingsController', ['$rootScope', '$scope', '$window', '$document', 'iaSettings', 'Account', 'Auth', function($rootScope, $scope, $window, $document, iaSettings, Account, Auth) {
            $scope.setLanguage = function(lang) {
                $rootScope.globals.language = iaSettings.setLanguage(lang);
                if (Auth.isLogged()) {
                    Account.updateLanguage(lang);
                }
            };

            $scope.switchLanguage = function(){
                var langKey = $scope.selectedLang;
                    $rootScope.globals.language = iaSettings.setLanguage(langKey);
            };

            angular.element($window).bind("scroll", function() {
                 var elem = $('.landing-menu');
                if(elem.hasClass('in')){
                    elem.removeClass('in');
                }
            });

        }]);
})();
