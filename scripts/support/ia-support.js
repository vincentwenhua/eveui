(function () {
    'use strict';

    angular.module('iaSupport', [])
    /***************************
     * Support Data Factories
     ****************************/
     .factory('iaCollection', [function () {

        var methods = ['filter', 'all', 'every', 'find', 'toArray', 'where', 'findWhere'];

        var Collection = function (items) {
            this.items = items;
        };

        _.each(methods, function (method) {
            Collection.prototype[method] = function () {
                var args = [].slice.call(arguments);
                args.unshift(this.items);
                return _[method].apply(_, args);
            };
        });

        return Collection;
    }])

     .factory('Genders', ['iaCollection', function (iaCollection) {
        var genders = [
        {id:1, name: 'Male', name_en: 'Male', name_zh: '男', name_pinyin: 'nan'},
        {id: 2, name: 'Female', name_en: 'Female', name_zh: '女', name_pinyin: 'nv'}
        ];

        return new iaCollection(genders);
    }])

     .factory('SupportLanguages', ['iaCollection', function(iaCollection) {
       var supportLanguages = [
       {id: 1, name_en: '中文', name_zh: '中文', name_pinyin: 'zhongwen', value: 'zh'},
       {id:2, name_en: 'English', name_zh: 'English', name_pinyin: 'yingwen', value: 'en'}
       ];

       return new iaCollection(supportLanguages);
   }])

     .factory('LocationTrack', ['iaCollection', function (iaCollection) {

        var location_tracks = [
        {name: 'On', name_en: 'On', name_zh: '打开', value: 1},
        {name: 'Off', name_en: 'Off', name_zh: '关闭', value: 0}
        ];

        return new iaCollection(location_tracks);
    }])

     .factory('EmergencyChannel', ['iaCollection', function (iaCollection) {

        var channels = [
        {id: 1, name_en: 'Email', name_zh: '邮件箱', type: 'email'},
        {id: 3, name_en: 'Twitter notification', name_zh: 'Twitter推送', type: 'twitter'}
        ];

        return new iaCollection(channels);
    }])

     .factory('EmailAddresses', function () {

        return [
        {pattern: 'gmail.com', url: 'http://www.gmail.com', domain: 'www.gmail.com'},
        {pattern: '126.com', url: 'http://mail.126.com', domain: 'mail.126.com'},
        {pattern: '163.com',    url: 'mail.163.com', domain: 'mail.163.com' },
        {pattern: 'aol.com', url: 'http://www.aol.com', domain: 'www.aol.com'},
        {pattern: 'hotmail.com', url: 'http://www.hotmail.com', domain: 'www.hotmail.com'},
        {pattern: 'mail.com', url: 'http://www.mail.com', domain: 'www.mail.com'},
        {pattern: 'msn.com', url: 'http://www.msn.com', domain: 'www.msn.com'},
        {pattern: 'outlook.com', url: 'http://www.outlook.com', domain: 'www.outlook.com'},
        {pattern: 'qq.com', url: 'http://mail.qq.com', domain: 'mail.qq.com'},
        {pattern: 'sina.com', url: 'http://mail.sina.com.cn', domain: 'mail.sina.com.cn'},
        {pattern: 'sohu.com', url: 'http://mail.sohu.com', domain: 'mail.sohu.com'},
        {pattern: 'yahoo.com', url: 'http://www.yahoo.com', domain: 'www.yahoo.com'},
        {pattern: 'bigpond.com',    url: 'http://webmail.bigpond.com/webedge/do/oldlogin', domain: 'www.webmail.bigpond.com' },
        {pattern: 'bigpond.com.au', url: 'http://webmail.bigpond.com/webedge/do/oldlogin', domain: 'www.webmail.bigpond.com' },
        {pattern: 'bigpond.net.au', url: 'http://webmail.bigpond.com/webedge/do/oldlogin', domain: 'www.webmail.bigpond.com' },
        {pattern: 'gmx.com',    url: 'http://gmx.com', domain: 'www.gmx.com' },
        {pattern: 'gmx.com',    url: 'http://gmx.com', domain: 'www.gmx.com' },
        {pattern: 'gmx.de', url: 'http://gmx.de', domain: 'www.gmx.de' },
        {pattern: 'gmx.fr', url: 'http://gmx.fr', domain: 'www.gmx.fr' },
        {pattern: 'gmx.net',    url: 'http://gmx.net', domain: 'www.gmx.net' },
        {pattern: 'gmx.net',    url: 'http://gmx.net', domain: 'www.gmx.net' },
        {pattern: 'googlemail.com', url: 'http://googlemail.com', domain: 'www.googlemail.com' },
        {pattern: 'hotmail.be', url: 'http://hotmail.be', domain: 'www.hotmail.be' },
        {pattern: 'hotmail.co.il',  url: 'http://hotmail.co.il', domain: 'www.hotmail.co.il' },
        {pattern: 'hotmail.co.uk',  url: 'http://hotmail.co.uk', domain: 'www.hotmail.co.uk' },
        {pattern: 'hotmail.com',    url: 'http://hotmail.com', domain: 'www.hotmail.com' },
        {pattern: 'hotmail.com.ar', url: 'http://hotmail.com.ar', domain: 'www.hotmail.com.ar' },
        {pattern: 'hotmail.com.mx', url: 'http://hotmail.com.mx', domain: 'www.hotmail.com.mx' },
        {pattern: 'hotmail.de', url: 'http://hotmail.de', domain: 'www.hotmail.de' },
        {pattern: 'hotmail.es', url: 'http://hotmail.es', domain: 'www.hotmail.es' },
        {pattern: 'hotmail.fr', url: 'http://hotmail.fr', domain: 'www.hotmail.fr' },
        {pattern: 'hotmail.kz', url: 'http://hotmail.kz', domain: 'www.hotmail.kz' },
        {pattern: 'hotmail.ru', url: 'http://hotmail.ru', domain: 'www.hotmail.ru' },
        {pattern: 'hushmail.com',   url: 'http://hushmail.com', domain: 'www.hushmail.com' },
        {pattern: 'live.be',    url: 'http://live.be', domain: 'www.live.be' },
        {pattern: 'live.co.uk', url: 'http://live.co.uk', domain: 'www.live.co.uk' },
        {pattern: 'live.com',   url: 'http://live.com', domain: 'www.live.com' },
        {pattern: 'live.com.ar',    url: 'http://live.com.ar', domain: 'www.live.com.ar' },
        {pattern: 'live.com.mx',    url: 'http://live.com.mx', domain: 'www.live.com.mx' },
        {pattern: 'live.de',    url: 'http://live.de', domain: 'www.live.de' },
        {pattern: 'live.fr',    url: 'http://live.fr', domain: 'www.live.fr' },
        {pattern: 'lycos.co.uk',    url: 'http://mail.lycos.co.uk', domain: 'www.mail.lycos.co.uk' },
        {pattern: 'lycos.com',  url: 'http://mail.lycos.com', domain: 'www.mail.lycos.com' },
        {pattern: 'lycos.es',   url: 'http://mail.lycos.com', domain: 'www.mail.lycos.com' },
        {pattern: 'lycos.it',   url: 'http://mail.lycos.com', domain: 'www.mail.lycos.com' },
        {pattern: 'lycosemail.com', url: 'http://mail.lycos.com', domain: 'www.mail.lycos.com' },
        {pattern: 'lycosmail.com',  url: 'http://mail.lycos.com', domain: 'www.mail.lycos.com' },
        {pattern: 'rocketmail.com', url: 'http://rocketmail.com', domain: 'www.rocketmail.com' },
        {pattern: 'yahoo.ca',   url: 'http://mail.yahoo.ca', domain: 'www.mail.yahoo.ca' },
        {pattern: 'yahoo.co.id',    url: 'http://mail.yahoo.co.id', domain: 'www.mail.yahoo.co.id' },
        {pattern: 'yahoo.co.in',    url: 'http://mail.yahoo.co.in', domain: 'www.mail.yahoo.co.in' },
        {pattern: 'yahoo.co.jp',    url: 'http://mail.yahoo.co.jp', domain: 'www.mail.yahoo.co.jp' },
        {pattern: 'yahoo.co.kr',    url: 'http://mail.yahoo.co.kr', domain: 'www.mail.yahoo.co.kr' },
        {pattern: 'yahoo.co.nz',    url: 'http://mail.yahoo.co.nz', domain: 'www.mail.yahoo.co.nz' },
        {pattern: 'yahoo.co.uk',    url: 'http://mail.yahoo.co.uk', domain: 'www.mail.yahoo.co.uk' },
        {pattern: 'yahoo.com',  url: 'http://mail.yahoo.com', domain: 'www.mail.yahoo.com' },
        {pattern: 'yahoo.com.ar',   url: 'http://mail.yahoo.com.ar', domain: 'www.mail.yahoo.com.ar' },
        {pattern: 'yahoo.com.au',   url: 'http://mail.yahoo.com.au', domain: 'www.mail.yahoo.com.au' },
        {pattern: 'yahoo.com.br',   url: 'http://mail.yahoo.com.br', domain: 'www.mail.yahoo.com.br' },
        {pattern: 'yahoo.com.cn',   url: 'http://mail.yahoo.com.cn', domain: 'www.mail.yahoo.com.cn' },
        {pattern: 'yahoo.com.hk',   url: 'http://mail.yahoo.com.hk', domain: 'www.mail.yahoo.com.hk' },
        {pattern: 'yahoo.com.is',   url: 'http://mail.yahoo.com.is', domain: 'www.mail.yahoo.com.is' },
        {pattern: 'yahoo.com.mx',   url: 'http://mail.yahoo.com.mx', domain: 'www.mail.yahoo.com.mx' },
        {pattern: 'yahoo.com.ph',   url: 'http://mail.yahoo.com.ph', domain: 'www.mail.yahoo.com.ph' },
        {pattern: 'yahoo.com.ru',   url: 'http://mail.yahoo.com.ru', domain: 'www.mail.yahoo.com.ru' },
        {pattern: 'yahoo.com.sg',   url: 'http://mail.yahoo.com.sg', domain: 'www.mail.yahoo.com.sg' },
        {pattern: 'yahoo.de',   url: 'http://mail.yahoo.de', domain: 'www.mail.yahoo.de' },
        {pattern: 'yahoo.dk',   url: 'http://mail.yahoo.dk', domain: 'www.mail.yahoo.dk' },
        {pattern: 'yahoo.es',   url: 'http://mail.yahoo.es', domain: 'www.mail.yahoo.es' },
        {pattern: 'yahoo.fr',   url: 'http://mail.yahoo.fr', domain: 'www.mail.yahoo.fr' },
        {pattern: 'yahoo.ie',   url: 'http://mail.yahoo.ie', domain: 'www.mail.yahoo.ie' },
        {pattern: 'yahoo.it',   url: 'http://mail.yahoo.it', domain: 'www.mail.yahoo.it' },
        {pattern: 'yahoo.jp',   url: 'http://mail.yahoo.jp', domain: 'www.mail.yahoo.jp' },
        {pattern: 'yahoo.ru',   url: 'http://mail.yahoo.ru', domain: 'www.mail.yahoo.ru' },
        {pattern: 'yahoo.se',   url: 'http://mail.yahoo.se', domain: 'www.mail.yahoo.se' },
        {pattern: 'yandex.com', url: 'http://mail.yandex.com', domain: 'www.mail.yandex.com' },
        {pattern: 'yandex.ru',  url: 'http://mail.yandex.ru', domain: 'www.mail.yandex.ru' },
        {pattern: 'ymail.com',  url: 'http://mail.ymail.com', domain: 'www.mail.ymail.com' },
        {pattern: 'zoho.com',   url: 'http://mail.zoho.com', domain: 'www.mail.zoho.com' },
        ];
    })

.factory('InsuranceType', ['iaCollection', function (iaCollection) {

    var insurance_types = [
    {id: 1, name_en: 'Medical', name_zh: '医疗', name_pinyin: 'yiliao', value: 'medical'},
    {id: 2, name_en: 'Travel', name_zh: '旅游', name_pinyin: 'lvyou', value: 'travel'},
    {id: 3, name_en: 'Other', name_zh: '其他', name_pinyin: 'qita', value: 'other'}
    ];

    return new iaCollection(insurance_types);
}])

.factory('SecurityQuestions', ['iaCollection', function (iaCollection) {
    var questions = [
    {
        id: 1,
        title_en: 'What is your mother\'s maiden name?',
        title_zh: '您母亲的姓名是什么？',
        title_pinyin: 'Nín mǔqīn de xìngmíng shì shénme?'
    },
    {
        id: 2,
        title_en: 'Which town / city were you born in?',
        title_zh: '您的出生城市在哪里？',
        title_pinyin: 'Nín de chūshēng chéngshì zài nǎlǐ?'
    },
    {
        id: 3,
        title_en: 'What is the name of your first pet?',
        title_zh: '您的第一个宠物叫什么？',
        title_pinyin: 'Nín de dì yī gè chǒngwù jiào shénme?'
    },
    {
        id: 4,
        title_en: 'Who was your first kiss?',
        title_zh: '您的初吻给了谁？',
        title_pinyin: 'Nín de chūwěn gěile shuí?'
    },
    {
        id: 5,
        title_en: 'What is the name of your first school?',
        title_zh: '您的小学名是什么？',
        title_pinyin: 'Nín de xiǎoxué míng shì shénme?'
    },
    {
        id: 6,
        title_en: 'What is your favorite color?',
        title_zh: '您喜欢的颜色是什么？',
        title_pinyin: 'Nín xǐhuān de yánsè shì shénme?'
    }
    ];

    return new iaCollection(questions);
}])

.factory('iaAddress', function ($window) {
    var cjkRegex = $window.regenerate()
                .addRange(0x4E00, 0x9FFF) // CJK Common.
                .addRange(0x3400, 0x4DFF) // CJK Rare.
                .addRange(0x20000, 0x2A6DF) // CJK Historic.
                .addRange(0xF900, 0xFAFF) // CJK Compatibility.
                .addRange(0x2F800, 0x2FA1F) // CJK Compatibility supplement.
                .toRegExp();

                return {
                    personalAddress: personalAddress
                };

                function personalAddress(building, street, district, city, state, postal, country) {
                    var fullAddress = [building, street, district, city, state, postal, country].join('');
                    return containsCjk(fullAddress) ?
                    buildChineseAddress(building, street, district, city, state, postal, country) :
                    buildEnglishAddress(building, street, district, city, state, postal, country);
                }
                function buildEnglishAddress(building, street, district, city, state, postal, country) {
                    var address = building+' '+street+' '+district+' '+city+' '+state+' '+postal+' '+country;
                    return address;
                }
                function buildChineseAddress(building, street, district, city, state, postal, country) {
                    var address = country+' '+state+' '+city+' '+district+' '+street+' '+building+' '+postal;
                    return address;
                }
                function containsCjk (string) {
                    return cjkRegex.test(string);
                }
            })

        /***************************
         * Support filters
         ****************************/
         .filter('unique', function () {
            return function (input, key) {
                var unique = {};
                var uniqueList = [];
                for (var i = 0; i < input.length; i++) {
                    if (typeof unique[input[i][key]] === 'undefined') {
                        unique[input[i][key]] = '';
                        uniqueList.push(input[i]);
                    }
                }
                return uniqueList;
            };
        })

         .filter('uniquey', function () {

          return function (items, filterOn) {

            if (filterOn === false) {
              return items;
          }

          if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
              var newItems = [];

              var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                  return item[filterOn];
              } else {
                  return item;
              }
          };

          angular.forEach(items, function (item) {
            var isDuplicate = false;

            for (var i = 0; i < newItems.length; i++) {
              if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
          newItems.push(item);
      }

  });
          items = newItems;
      }
      return items;
  };
})

         .filter('countryFilter', ['$rootScope', 'iaSettings', function ($rootScope, iaSettings) {
            return function (input, key) {
                if (input) {
                    var filter = {id: input};
                    var countries = $rootScope.globals.settings.countries || [];

                    if (countries.find(filter)) {
                        return angular.isUndefined(countries.find(filter)[key]) ? countries.find(filter)[key + '_' + iaSettings.getLanguage()] : countries.find(filter)[key];
                    }
                }
            };
        }])

         .filter('languageFilter', ['$rootScope', 'iaSettings', function ($rootScope, iaSettings) {
            return function (input, key) {
                if (input) {
                    var filter = {value: input};
                    var languages = $rootScope.globals.settings.support_languages || [];

                    if (languages.find(filter)) {
                        return languages.find(filter)['name_' + iaSettings.getLanguage()];
                    }
                }
            };
        }])

         .filter('settingsFilter', ['$rootScope', 'iaSettings', function($rootScope, iaSettings) {
            return function(input, key, field) {
                if (input) {
                    var result;
                    var settings = $rootScope.globals.settings;
                    var filter = {id: input};

                    if (_.isArray(key)) {
                        angular.forEach(key, function(k, i) {
                            if (angular.isUndefined(settings[k])) {
                                return;
                            }

                            settings = settings[k];
                        });
                        result = settings;
                    } else {
                        result = settings[key];
                    }

                    if (result.find(filter)) {
                        return angular.isDefined(result.find(filter)[field + '_' + iaSettings.getLanguage()]) ? result.find(filter)[field + '_' + iaSettings.getLanguage()] : result.find(filter)[field];
                    }
                }
            };
        }])

         .filter('optionsTrans', ['$rootScope', 'iaSettings', function ($rootScope, iaSettings) {
            return function (input, keys) {
                if (!_.isArray(input) || input.length <= 0) {
                    return;
                }

                if (!_.isArray(keys)) {
                    keys = [keys];
                }

                var language = iaSettings.getLanguage();
                var options = [];

                _.each(keys, function (key) {
                    var languageKey = key + '_' + language;
                    if (!_.first(input).hasOwnProperty(languageKey)) {
                        return;
                    }

                    _.each(input, function (option, index) {
                        option[key] = option[languageKey];
                        options[index] = option;
                    });
                });

                return options;
            };
        }])

         .filter('optionsSort', ['$rootScope', 'iaSettings', function ($rootScope, iaSettings) {
            return function (input, key) {
                var sortBy = key + '_' + (iaSettings.getLanguage() === 'en' ? 'en' : 'pinyin');
                var others = [];

                var resultArray = _.reject(input, function (item) {
                    if (/^other(.+)?$/i.test(item[key + '_en'])) {
                        others.push(item);
                        return true;
                    }
                });

                resultArray = _.sortBy(resultArray, sortBy);

                return _.union(resultArray, others);
            };
        }])

        /***************************
         * Support directives
         ****************************/

         .directive('ngMatch', ['$parse', function ($parse) {
            return {
                require: '^ngModel',
                restrict: 'A',
                link: function (scope, elem, attrs, ctrl) {

                    attrs.$observe('ngMatch', function(newVal) {
                        var result = newVal === ctrl.$viewValue;
                        ctrl.$setValidity('match', result);
                    });

                    var validator = function (value) {
                        if (value) {
                            var match = attrs.ngMatch,
                            result = (value === match);
                            ctrl.$setValidity('match', result);
                            return value;
                        } else {
                            ctrl.$setValidity('match', true);
                            return value;
                        }
                    };

                    ctrl.$parsers.unshift(validator);
                    ctrl.$formatters.push(validator);
                }
            };
        }])

         .directive('iceid', ['$filter', function ($filter) {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    var INTEGER_REGEXP = /^\-?\d+$/;
                    var value;

                    ctrl.$validators.iceid = function (modelValue, viewValue) {

                        if (ctrl.$isEmpty(modelValue)) {

                            return true;
                        }

                        value = $filter('iceFormat')(modelValue);
                        document.getElementById('ice_id').addEventListener('input', function (e) {
                          e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
                      });

                        return !!(INTEGER_REGEXP.test(value) && value.length === 12);
                    };
                }
            };
        }])

         .directive('syncDevices', ['$modal', '$state','Restangular','$rootScope', function ($modal, $state,Restangular,$rootScope) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;
                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: ['$scope', function ($scope) {

                            function cancel(){
                             modalInstance.dismiss('cancel');
                             var body = angular.element(document).find('body').eq(0);
                             if (body[0].className === 'modal-open') {

                                var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                var modalLayer  = angular.element(document).find('div.modal').eq(0);

                                body.removeClass('modal-open');
                                layer.remove();
                                modalLayer.remove();
                            }
                        }

                        $scope.cancel = function () {
                           cancel();
                       };


                   }]
               };

               elem.on('click', function ($scope) {
                if(opts.scope.member.devices.length>0)
                    modalInstance = $modal.open(opts);
            });
           }
       };
   }])


         .filter('iceFormat', function() {
            return function(input, key) {
                return input ?
                input.trim().replace(/ +/g, '', true) :
                input;
            };
        })

         .directive('iaContacts', ['Account', 'PersonName', 'locale', function (Account, PersonName, locale) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    member: '=',
                    target: '@'
                },
                link: function (scope, elem, attrs) {
                    var token = 'common.dontHaveEmergencyContactsList';
                    scope.haveContacts = false;


                    Account.getAllContacts().then(function (res) {
                        var contact_list = [];
                        scope.contact_list = [];
                        scope.contact_list_filtered = [];

                        switch(scope.target) {
                            case 'guardians':
                            if (angular.isUndefined(scope.$parent.guardians)) {
                                contact_list = res;
                            } else {
                                contact_list = _.filter(res, function(contact) {
                                    return !_.find(scope.$parent.guardians, {email: contact.email});
                                });
                            }
                            break;
                            default:
                            contact_list = _.filter(res, function(contact) {
                                return !_.find(scope.member.contacts, {email: contact.email});
                            });
                            break;
                        }

                        scope.contact_list = contact_list;

                        scope.contact_list = contact_list;
                        _.each(scope.contact_list, function(item){
                            var name = PersonName.build(item.first_name, item.middle_name, item.last_name);
                            scope.contact_list_filtered.push({'name':name, 'email':item.email});
                        });

                        if (_.isEmpty(scope.contact_list)) {
                            if (locale.isToken(token)) {
                                locale.ready(locale.getPath(token)).then(function () {
                                    angular.element(elem).after('<div class="help-block error">' + locale.getString(token, {}) + '</div>');
                                });
                            }
                        }
                        scope.haveContacts = true;
                    })
                    .catch(function (error) {

                    });
                },
                template: '<select ng-disabled="!haveContacts" class="form-control" id="listContact" ng-options="(item.name + \' - \' + item.email) for item in contact_list_filtered">' +
                '<option style="display: none" value="" i18n="common.select"></option>' +
                '</select>'
            };
        }])

         .directive('pageTitle', function ($rootScope, $state, locale, Account, Auth) {
            return {
                restrict: 'EA',
                link: function (scope, element, attrs) {
                    scope.$on('$destroy', onDestroy);
                    var deregister = $rootScope.$on('$viewContentLoaded', getLocalizedTitle);
                    getLocalizedTitle();

                    function onDestroy () {
                        deregister();
                    }

                    function getLocalizedTitle() {
                        var token = 'title.' + $state.current.states;

                        if (!locale.isToken(token)) {
                            return;
                        }

                        locale.ready(locale.getPath(token))
                        .then(function () {
                            if (!Auth.isLogged()) {
                                setTitle({});
                                return;
                            }

                            if ($state.params.member_id) {
                                Account.getMember($state.params.member_id)
                                .then(setTitle);
                            } else {
                                Account.get()
                                .then(setTitle);
                            }
                        })
                        .catch(function (error) {
                        });


                        function setTitle(parameter) {
                            if (!_.contains(token,'undefined')){
                                var titleString = locale.getString(token, parameter);
                                element.text(titleString);
                            }
                        }
                    }
                }
            };
        })

         .directive('accessAlertProfile', ['$location', '$modal', function ($location, $modal) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: ['$scope', function ($scope) {

                            $scope.cancel = function () {
                                modalInstance.close();
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className === 'modal-open') {

                                    var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };

                            $scope.accessMemberProfile = function (url) {
                                modalInstance.close();

                                var body = angular.element(document).find('body').eq(0);

                                if (body[0].className === 'modal-open') {

                                    var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }

                                var a = document.createElement('a');
                                a.href = url;

                                var uri = a.hash.substr(1, a.hash.length);

                                $location.url(uri);
                            };
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        // Partner page
        .directive('apiKeyModal', ['$modal', '$state','Restangular','$rootScope', function ($modal, $state,Restangular,$rootScope) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;
                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: ['$scope', function ($scope) {

                            function cancel(){
                             modalInstance.dismiss('cancel');
                             var body = angular.element(document).find('body').eq(0);
                             if (body[0].className === 'modal-open') {

                                var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                var modalLayer  = angular.element(document).find('div.modal').eq(0);

                                body.removeClass('modal-open');
                                layer.remove();
                                modalLayer.remove();
                            }
                        }

                        $scope.cancel = function () {
                           cancel();
                       };

                       $scope.renewApiKeyForPartner = function (){
                          Restangular.one('partners/key').put().then(
                            function(res){
                               $rootScope.apiKey = res.key;
                               cancel();
                           },
                           function(err){
                            errors = [];
                            errors.push(err.data.error);
                            $scope.errors = errors;
                            cancel();
                        });
                      };
                  }]
              };

              elem.on('click', function () {
                modalInstance = $modal.open(opts);
            });
          }
      };
  }])

         // get PartnerMembers
         .directive('partnerMembersModal', ['$modal', '$state','Restangular','$rootScope','locale', function ($modal, $state,Restangular,$rootScope,locale) {
            return {
                restrict: 'EA',

                link: function (scope, elem, attrs,iaSettings) {
                    var modalInstance = null;
                    scope: {
                      iceId: '='
                  };
                  var opts = {
                    backdrop: true,
                    backdropClick: true,
                    dialogFade: false,
                    keyboard: true,
                    size: attrs.size,
                    scope: scope,
                    templateUrl: attrs.templateurl,
                    controller: ['$scope', function ($scope) {
                        function cancel(){
                         modalInstance.dismiss('cancel');
                         var body = angular.element(document).find('body').eq(0);
                         if (body[0].className === 'modal-open') {

                            var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                            var modalLayer  = angular.element(document).find('div.modal').eq(0);

                            body.removeClass('modal-open');
                            layer.remove();
                            modalLayer.remove();
                        }
                    };

                    $scope.cancel = function () {
                       cancel();
                   };
               }]
           };

           elem.on('click', function () {
                        $rootScope.redirecting=true; // to stop global spinner
                        $rootScope.reqLoading = true;
                        scope.showError = false;
                        var lang = locale.getLocale();
                        var validIceIdNumber = scope.validIceIdNumber.replace(/ /g,'');

                        Restangular.one("partners").one("members").customGET
                        (validIceIdNumber, undefined, {
                            'X-Authorization':$rootScope.apiKey,
                            'Accept-Language':lang,
                        })
                        .then(
                            function(res){
                                scope.partnerMembers ={
                                    first_name:res.first_name,
                                    last_name: res.last_name,
                                    display_name: res.display_name,
                                    qr_code: res.qr_code,
                                    ice_id: scope.validIceIdNumber
                                };
                                modalInstance = $modal.open(opts);
                                $rootScope.reqLoading = false;
                            },
                            function(err){
                             $rootScope.reqLoading = false;
                             scope.showError = true;
                             errors = [];
                             errors.push(err.data.error);
                             scope.errors = errors;
                         })
                    });
       }
   };
}])
                  // get PartnerMembers
                  .directive('getWallpaper', ['$window','$modal', '$state','Restangular','$rootScope','locale','AuthToken','$http','iaSettings', function ($window,$modal, $state,Restangular,$rootScope,locale,AuthToken,$http,iaSettings) {
                    return {
                        restrict: 'EA',

                        link: function (scope, elem, attrs,iaSettings) {
                            var modalInstance = null;
                            var opts = {
                                backdrop: true,
                                backdropClick: true,
                                dialogFade: false,
                                keyboard: true,
                                size: attrs.size,
                                scope: scope,
                                templateUrl: attrs.templateurl,
                                controller: ['$scope', function ($scope) {
                                    function cancel(){
                                     modalInstance.dismiss('cancel');
                                     var body = angular.element(document).find('body').eq(0);
                                     if (body[0].className === 'modal-open') {

                                        var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                        var modalLayer  = angular.element(document).find('div.modal').eq(0);

                                        body.removeClass('modal-open');
                                        layer.remove();
                                        modalLayer.remove();
                                    }
                                };

                                $scope.cancel = function () {
                                   cancel();
                               };
                           }]
                       };

                       elem.on('click', function () {
                        $rootScope.redirecting=true; // to stop global spinner
                        $rootScope.reqLoading = true;
                        scope.showError = false;
                        var token = AuthToken.get();
                        var req = {
                           method: 'GET',
                           url: Config.API_BASE+'/lockscreen',
                           headers: {
                             'X-Authorization':'Bearer ' + token,
                             'Accept-Language': locale
                         }
                     }

                     $http(req)
                     .then(function(res)
                     {
                        var anchor = angular.element('<a/>');
                        anchor.css({display: 'none'});
                        angular.element(document.body).append(anchor);
                        anchor.attr({
                            href: res.data.url,
                            target: '_self',
                            download: 'iCE_wallpaper.jpg'
                        })[0].click();
                        anchor.remove();
                        $rootScope.redirecting=false;
                        $rootScope.reqLoading = false;
                    },
                    function(error)
                    {
                        $rootScope.reqLoading = false;
                        scope.showError = true;
                        errors = [];
                        errors.push(err.data.error);
                        scope.errors = errors;
                    });
                     Restangular.one("wallpaper").customGET
                     (undefined, {
                        'X-Authorization':'Bearer ' + token,
                        'Accept-Language':lang,
                        'content-type': 'image/jpeg',
                        'accept':'image/jpeg',
                        'content-disposition':'attachment; filename=iCE_wallpaper.jpeg'
                    })
                     .then(function(res,headers){
                        var anchor = angular.element('<a/>');
                        anchor.css({display: 'none'});
                        angular.element(document.body).append(anchor);
                        anchor.attr({
                            href: 'data:attachment/jpg;charset=utf-8,' + encodeURIComponent(res),
                            target: '_self',
                            download: 'iCE_wallpaper.jpg'
                        })[0].click();
                        anchor.remove();


                        //  var a = document.createElement('a');
                      // a.href = 'data:attachment/jpeg;charset=utf-8,' + encodeURI(res);
                      // a.target = '_blank';
                     // a.download = 'iCE_wallpaper.jpg';
                     // document.body.appendChild(a);
                      // a.click();

                                        // document.getElementById('imageDownload').appendChild(res);
                                              //  var img = document.createElement('img');
                    //img.src = 'data:image/jpeg;base64,' + btoa(res);
                    //document.body.appendChild(img);

                            // var file = new Blob([res], {type: 'application/Image'});
                          //   scope.image = URL.createObjectURL(file);

                           //  scope.image=res;
                             // modalInstance = $modal.open(opts);
                             $rootScope.redirecting=false;
                             $rootScope.reqLoading = false;
                         },
                         function(err){
                            $rootScope.reqLoading = false;
                            scope.showError = true;
                            errors = [];
                            errors.push(err.data.error);
                            scope.errors = errors;
                        })
});
                   }
               };
           }])

        //login help modal
        .directive('loginHelp', ['$modal', 'Account', function ($modal, Account) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: 'partials/account/templates/send-login-help.html',
                        scope: scope,
                        controller: ['$scope', function ($scope) {

                            $scope.cancel = function () {
                                modalInstance.close();
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className === 'modal-open') {

                                    var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        .directive('editSecurity', ['$modal', '$state', 'Account', function ($modal, $state, Account) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: 'edit-security-modal.html',
                        scope: scope,
                        controller: ['$scope', function ($scope) {

                            $scope.cancel = function () {
                                modalInstance.close();

                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className === 'modal-open') {

                                    var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };

                            $scope.declineGuardian = function (request_id) {
                                Account.declineGuardianRequest(request_id).then(
                                    function (res) {
                                        modalInstance.close();

                                        $state.transitionTo('account.messages', {}, {reload: true});
                                    },
                                    function (err) {
                                        alert(err.data.error.message);
                                    });
                            };
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        .directive('changePassword', ['$modal', '$state', 'Account', function ($modal, $state, Account) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: ['$scope', function ($scope) {

                            $scope.cancel = function () {
                                modalInstance.close();
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className === 'modal-open') {

                                    var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };

                            $scope.changePassword = function (password) {

                                Account.changePassword(password).then(
                                    function (res) {
                                        modalInstance.close();
                                    },
                                    function (err) {
                                        $scope.error = err.data.error;
                                    });
                            };
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        .directive('loginAgain', ['$modal', '$state', 'Account', function ($modal, $state, Account) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: 'login-again.html',
                        scope: scope,
                        controller: ['$scope', function ($scope) {

                            $scope.cancel = function () {
                                modalInstance.close();
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className === 'modal-open') {

                                    var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer  = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };

                            $scope.declineGuardian = function (request_id) {
                                Account.declineGuardianRequest(request_id).then(
                                    function (res) {
                                        modalInstance.close();
                                        $state.transitionTo('account.messages', {}, {reload: true});
                                    },
                                    function (err) {
                                        alert(err.data.error.message);
                                    });
                            };
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        .directive('accountPassword', ['$rootScope', '$modal', function ($rootScope, $modal) {
            return {
                restrict: 'EA',
                scope: {
                    section: '@section'
                },
                link: function (scope, elem, attrs) {

                    var modalInstance = null;

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size || 'sm',
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: attrs.controller
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        .directive('cancelSubscription', ['$rootScope', '$modal','Restangular','AuthToken', function ($rootScope, $modal,Restangular,AuthToken) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;
                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size || 'sm',
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: ['$scope', function ($scope) {
                            $scope.cancelSubscription=function(){
                                var token = AuthToken.get();
                                var data =  {
                                    'X-Authorization': token
                                };
                                Restangular.all('stripe').all('cancel').post(data).then(
                                    function (res) {
                                      $scope.account.subscription_ends_at = res.ends_at;
                                      $scope.cancel();
                                  },
                                  function (err) {

                                  });
                            };

                            $scope.cancel = function () {
                                modalInstance.dismiss('cancel');
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className === 'modal-open') {
                                    var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer  = angular.element(document).find('div.modal').eq(0);
                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        .directive('resumeSubscription', ['$rootScope', '$modal','AuthToken','Restangular', function ($rootScope, $modal,AuthToken,Restangular) {
            return {
                link: function (scope, elem, attrs) {
                    var modalInstance = null;
                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size || 'sm',
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: ['$scope','$rootScope', function ($scope,$rootScope) {
                            $scope.resumeSubscription=function(){
                                var token = AuthToken.get();
                                var data =  {
                                    'X-Authorization': token
                                };
                                Restangular.all('stripe').all('resume').post(data).then(
                                    function (res) {
                                     $scope.account.subscription_ends_at = res.ends_at;
                                     $scope.cancel();
                                 },
                                 function (err) {

                                 });
                            };

                            $scope.cancel = function () {
                                modalInstance.dismiss('cancel');
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className === 'modal-open') {
                                    var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer  = angular.element(document).find('div.modal').eq(0);
                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        .directive('cancelConfirmation', ['$modal', function($modal) {
            return {
                restrict: 'EA',
                scope: {
                    state: '@state',
                    params: '=params'
                },
                link: function(scope, elem, attrs) {
                    var partials = 'partials/modal/cancel-confirmation.html';

                    var modalInstance = null;

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: partials,
                        scope: scope,
                        controller: attrs.controller
                    };

                    elem.on('click', function() {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        /*****************************
         * Partner Page Modal.
         *****************************/
         .directive('actionModal', ['$modal', '$state', 'Account','$rootScope', function ($modal, $state,Account,$rootScope) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;
                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: ['$scope', function ($scope) {
                            $scope.ok=function(iceIdNumber){
                              Account.removeECPFromPartner(iceIdNumber)
                              .then(function (res) {
                                modalInstance.close();
                                $scope.errors = [];

                                Account.getFriends().then(function(friends) {
                                   friends.contacts.forEach(function(friend){
                                    friend.fullDate =  _.compact([friend.birth_date.year, friend.birth_date.month, friend.birth_date.day]).join('-');
                                });
                                   $rootScope.friends = friends;
                               });

                                var removedSuccessfully = angular.element(document).find('div.member-remove-info');

                                removedSuccessfully.fadeIn(500,0).slideDown(500);

                                setTimeout(function() {
                                   removedSuccessfully.fadeOut(500,0).slideUp(500);
                               }, 3000);
                            })
                              .catch(function (err) {
                                alert(err.data.error.message);
                                modalInstance.close();
                                $state.reload();
                            });
                          };
                          $scope.cancel = function () {
                            modalInstance.dismiss('cancel');
                            var body = angular.element(document).find('body').eq(0);
                            if (body[0].className === 'modal-open') {

                                var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                var modalLayer  = angular.element(document).find('div.modal').eq(0);

                                body.removeClass('modal-open');
                                layer.remove();
                                modalLayer.remove();
                            }
                        };
                    }]
                };

                elem.on('click', function () {
                    modalInstance = $modal.open(opts);
                });
            }
        };
    }])

        /*****************************
         * Remove delete member modal.
         *****************************/
         .directive('deleteMember', ['$modal', '$state', 'Account', function ($modal, $state, Account) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: function () {
                            scope.cancel = function () {
                                modalInstance.close();
                            };

                            scope.ok = function (id) {

                                Account.removeMember(id).then(
                                    function (res) {

                                        angular.forEach(scope.account.members, function (member, index) {
                                            if (_.find(member.contacts, {id: scope.account.id})) {
                                                scope.account.friends_count--;
                                            }
                                        });

                                        modalInstance.close();
                                        $state.go('account.show');
                                    },
                                    function (err) {
                                        if (err.status == 401) {
                                            $scope.step = 'default';
                                        }
                                        errors = [];
                                        errors.push(err.data.error);
                                        scope.errors = errors;
                                    });
                            };

                            // Todo:: Transfer members.
                            scope.transfer = function (member) {
                                modalInstance.close();
                                alert('Todo Transfer members');
                            };
                        }
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

         .directive('independentAccount', ['$modal', '$state', 'Account', function ($modal, $state, Account) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: [function () {
                            var errors = [];
                            scope.errors = [];

                            scope.cancel = function () {
                                modalInstance.close();
                            };

                            scope.send_transfer_invitation = function (email, member) {
                                email = !_.isUndefined(email)?email: member.email;
                                Account.validateMemberEmail(email, member).then(
                                    function (res) {
                                        Account.transfer(member.id, email).then(
                                            function (res) {
                                                scope.errors = [];
                                                if (res.success) {
                                                    scope.error = null;
                                                    scope.success = true;
                                                    scope.message = res.message;
                                                }
                                            },
                                            function (err) {
                                                errors = [];
                                                errors.push(err.data.error);
                                                scope.errors = errors;
                                            });
                                    },
                                    function (err) {
                                        errors = [];
                                        errors.push(err.data.error);
                                        scope.errors = errors;
                                    }
                                    );
                            };
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

         .directive('printIceId', ['$modal', '$state', 'Account','$filter','$rootScope', function ($modal, $state, Account,$filter,$rootScope) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;
                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: ['$scope', function ($scope) {

                            $scope.cancel = function () {
                                modalInstance.dismiss('cancel');
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className === 'modal-open') {

                                    var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer  = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };

                            $scope.printIceId = function (member) {
                                Account.memberShareEvent(member, 'download').then(
                                    function (res) {
                                        var w = window.open(res[0]);
                                    }
                                    );
                            };
                        }]
                    };

                    elem.on('click', function () {
                        if($rootScope.browserName==true){
                            alert($filter('i18n')('common.cardIdNotDownload'));
                        }
                        else
                        {
                        modalInstance = $modal.open(opts);

                        modalInstance.result.then(function (res) {
                        }, function () {
                            elem.find('button').attr('disabled');
                        });
                    }
                    });
                }
            };
        }])


       .directive('accessRecords', ['$modal', '$state', '$timeout', 'Account', '$rootScope', function ($modal, $state, $timeout, Account, $rootScope) {
            return {
                restrict: 'A',
                replace: true,
                link: function (scope, elem, attrs) {
                    attrs.$observe('accessRecords', function(value) {
                        if(value!=="")
                            {
                                $modal.is_premium = $.parseJSON(value).is_premium;
                                if($modal.is_premium===false && !angular.isUndefined($rootScope.promo)){
                                    setTimeout(function(){
                                        $('#promoClick').trigger('click');
                                         // modalInstance = $modal.open(opts);
                                          // modalInstance.result.then(function (res) {
                                          //       }, function () {
                                          //           elem.find('button').attr('disabled');
                                          //   });
                                    //     var a = $('#promoCouponId').length;
                                    //    $('#promoCouponId').val($rootScope.promo);
                                    // var a = $('#promoCouponId').val();                              
                                     }, 5000);
                                    
                                }                                
                            }
                          });
                    scope.cardNameLanguage = $rootScope.globals.language;
                    var modalInstance = null;

                    var opts = {
                        backdrop: false,
                        backdropClick: false,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: attrs.templateurl,
                        scope: scope,
                        controller: ['$scope','$rootScope','$filter', function ($scope,$rootScope,$filter) {
                            scope.couponCodeInvalideMessage = false;
                            scope.transactionFailed = false;
                        $timeout(function () {
                            // scope.submitCard = submitCard;
                            var self = this;
                            var stripe = Stripe(Config.STRIPE_PUBLIC_KEY);
                            var elements = stripe.elements({locale: $rootScope.globals.language});
                            var style = {   
                                                    base: {
                                                      iconColor: '#666EE8',
                                                      color: '#31325F',
                                                      lineHeight: '40px',
                                                      fontWeight: 300,
                                                      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                                      fontSize: '15px',

                                                      '::placeholder': {
                                                        color: '#CFD7E0',
                                                      },
                                                    },
                                                      invalid: {
                                                        color: '#fa755a',
                                                        iconColor: '#fa755a'
                                                      }
                                                  
                                            };

                                // self.card = elements.create('card', {style: style});
                                // self.card.mount('#card-element');

                                scope.cardNumberElement = elements.create('cardNumber', {
                                  iconStyle: 'solid', style: style, classes: {focus: 'is-focused', empty: 'is-empty'}

                                });
                                scope.cardNumberElement.mount('#card-number-element');

                                scope.cardExpiryElement = elements.create('cardExpiry', {
                                  iconStyle: 'solid', style: style, classes: {focus: 'is-focused', empty: 'is-empty'}
                                });
                                scope.cardExpiryElement.mount('#card-expiry-element');

                                scope.cardCvcElement = elements.create('cardCvc', {
                                  iconStyle: 'solid', style: style, classes: {focus: 'is-focused', empty: 'is-empty'}
                                });
                                scope.cardCvcElement.mount('#card-cvc-element');

                                // self.postalCodeElement = elements.create('postalCode', {
                                //   iconStyle: 'solid', style: style, classes: {focus: 'is-focused', empty: 'is-empty'}
                                // });
                                // self.postalCodeElement.mount('#postal-code-element');

                            var inputs = document.querySelectorAll('input.field');
                            Array.prototype.forEach.call(inputs, function(input) {
                              input.addEventListener('focus', function() {
                                input.classList.add('is-focused');
                              });
                              input.addEventListener('blur', function() {
                                input.classList.remove('is-focused');
                              });
                              input.addEventListener('keyup', function() {
                                if (input.value.length === 0) {
                                  input.classList.add('is-empty');
                                } else {
                                  input.classList.remove('is-empty');
                                }
                              });
                            });

                            function setOutcome(result) {
                              var successElement = document.querySelector('.success');
                              var errorElement = document.querySelector('.error');
                              successElement.classList.remove('visible');
                              errorElement.classList.remove('visible');

                              if (result.token) {
                                // Use the token to create a charge or a customer
                                // https://stripe.com/docs/charges

                                var coupon = document.querySelector('input[name=coupon-element]').value;
                                Account.subscribePayment($rootScope.account.id, result.token, coupon).then(function (returnValue){
                                    //TODO: disable button
                                    var status = '';
                                    $rootScope.account.is_premium=true;
                                    scope.couponCodeInvalidMessage = false;

                                    if (returnValue.success){
                                        status = $filter('i18n')('common.cardPaymentSuccessful');
                                        if (returnValue.promo=='bin' || returnValue.promo=='coupon'){
                                            status =$filter('i18n')('common.couponCodeSuccessful');                                         
                                        }
                                    }else{
                                        $rootScope.account.is_premium=false;
                                    }

                                    successElement.querySelector('.result').textContent = status;
                                    successElement.classList.add('visible');
                                    $timeout(function () {
                                        $scope.cancel();
                                    }, 5000);

                                }, function(e){
                                    //TODO: re-enable button, allow retry                               
                                    if(e.status==404){
                                     successElement.querySelector('.result').textContent = $filter('i18n')('errors.invalidCouponCode');   
                                    }
                                    else{
                                        successElement.querySelector('.result').textContent = $filter('i18n')('errors.transactionFailed');   
                                    }
                                    successElement.classList.add('visible');
                                });
                              } else if (result.error) {

                                errorElement.textContent = result.error.message;
                                errorElement.classList.add('visible');
                              }
                            }

                            scope.cardNumberElement.on('change', function(event) {
                              setOutcome(event);
                            });

                            document.querySelector('form').addEventListener('submit', function(e) {
                              e.preventDefault();
                              var form = document.querySelector('form');
                              var extraDetails = {
                                name: form.querySelector('input[name=cardholder-name]').value,
                              };
                            
                              // TODO: capture and pass coupon to API call
                              // document.querySelector('input[name=coupon-element]').value

                              stripe.createToken(scope.cardNumberElement, extraDetails).then(setOutcome)                            
                            });
                        });

                            $scope.cancel = function () {
                                modalInstance.dismiss('cancel');
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className === 'modal-open') {

                                    var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer  = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass('modal-open');
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };

                            $scope.printIceId = function (member) {
                                Account.memberShareEvent(member, 'download').then(
                                    function (res) {
                                        var w = window.open(res[0]);
                                    }
                                    );
                            };
                        }]
                    };
                    
        elem.on('click', function (element) {
            if($modal.is_premium===false)
            {
                modalInstance = $modal.open(opts);
                modalInstance.result.then(function (res) {
                }, function () {
                    elem.find('button').attr('disabled');
                });
            }
            else
            {
                if(element.target.className==='add_member_record'){
                    $state.transitionTo('account.member', {});
                }
                else
                {
                    $state.transitionTo('account.viewMember', {member_id: $rootScope.account.members[0].id});
                }
            }
        });
        }
        };
        }])


.directive('sendMessenger', ['$modal', '$state', 'Account', function ($modal, $state, Account) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            var modalInstance = null;

            var opts = {
                backdrop: true,
                backdropClick: true,
                dialogFade: false,
                keyboard: true,
                size: attrs.size,
                templateUrl: attrs.templateurl,
                scope: scope,
                controller: ['$scope', function ($scope) {

                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                        var body = angular.element(document).find('body').eq(0);
                        if (body[0].className === 'modal-open') {

                            var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                            var modalLayer  = angular.element(document).find('div.modal').eq(0);

                            body.removeClass('modal-open');
                            layer.remove();
                            modalLayer.remove();
                        }
                    };

                    $scope.printIceId = function (member) {
                        Account.memberShareEvent(member, 'download').then(
                            function (res) {
                                var w = window.open(res[0]);
                            }
                            );
                    };
                }]
            };

            elem.on('click', function () {
                modalInstance = $modal.open(opts);

                modalInstance.result.then(function (res) {
                }, function () {
                    elem.find('button').attr('disabled');
                });
            });
        }
    };
}])
.directive('deleteAccount', ['$modal', '$state', 'Account', 'Auth', function ($modal, $state, Account, Auth) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            var modalInstance = null;

            var opts = {
                backdrop: true,
                backdropClick: true,
                dialogFade: false,
                keyboard: true,
                size: attrs.size,
                templateUrl: attrs.templateurl,
                scope: scope,
                controller: 'DeleteAccountController'
            };

            elem.on('click', function () {
                modalInstance = $modal.open(opts);
            });
        }
    };
}])

.directive('wechatModal', ['$modal', '$state', function ($modal, $state) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            var modalInstance = null;
            var opts = {
                backdrop: true,
                backdropClick: true,
                dialogFade: false,
                keyboard: true,
                size: attrs.size,
                templateUrl: attrs.templateurl,
                scope: scope,
                controller: ['$scope', function ($scope) {

                 $scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                    var body = angular.element(document).find('body').eq(0);
                    if (body[0].className === 'modal-open') {

                        var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                        var modalLayer  = angular.element(document).find('div.modal').eq(0);

                        body.removeClass('modal-open');
                        layer.remove();
                        modalLayer.remove();
                    }
                };
            }]
        };

        elem.on('click', function () {
            modalInstance = $modal.open(opts);
        });
    }
};
}])

.directive('appStoreModal', ['$modal', '$state', function ($modal, $state) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            var modalInstance = null;
            var opts = {
                backdrop: true,
                backdropClick: true,
                dialogFade: false,
                keyboard: true,
                size: attrs.size,
                templateUrl: attrs.templateurl,
                scope: scope,
                controller: ['$scope', function ($scope) {

                 $scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                    var body = angular.element(document).find('body').eq(0);
                    if (body[0].className === 'modal-open') {

                        var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                        var modalLayer  = angular.element(document).find('div.modal').eq(0);

                        body.removeClass('modal-open');
                        layer.remove();
                        modalLayer.remove();
                    }
                };
            }]
        };

        elem.on('click', function () {
            modalInstance = $modal.open(opts);
        });
    }
};
}])

.directive('emailconfirmationModal', ['$modal', '$state', function ($modal, $state) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            var modalInstance = null;
            var opts = {
                backdrop: true,
                backdropClick: true,
                dialogFade: false,
                keyboard: true,
                size: attrs.size,
                templateUrl: attrs.templateurl,
                scope: scope,
                controller: ['$scope', function ($scope) {

                 $scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                    var body = angular.element(document).find('body').eq(0);
                    if (body[0].className === 'modal-open') {

                        var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                        var modalLayer  = angular.element(document).find('div.modal').eq(0);

                        body.removeClass('modal-open');
                        layer.remove();
                        modalLayer.remove();
                    }
                };

                $scope.gotoSettings = function(){
                    $scope.cancel();
                    $state.transitionTo('account.settings', {});
                };
            }]
        };

        elem.on('click', function () {
            modalInstance = $modal.open(opts);
        });
    }
};
}])

.directive('desktopHeader', function () {
    return {
        restrict: 'E',
        scope: {
            account: '=',
            newMessagesCount: '=',
            language: '=',
            isHome: '=',
            logout: '&',
            showPartner: '='
        },
        templateUrl: 'partials/header/desktop.html'
    };
})

.directive('mobileHeader', function () {
    return {
        restrict: 'E',
        scope: {
            account: '=',
            newMessagesCount: '=',
            logged: '=',
            isHome: '=',
            logout: '&',
            language: '=',
            showPartner: '='
        },
        templateUrl: 'partials/header/mobile.html',
        link: function (scope, element, attrs) {
            var menuMobile = element.find('.menu-mobile');

            menuMobile.bind('click', function() {
                menuMobile.collapse('hide');
            });
            scope.hrefbase = Config.API_BASE;
            if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
                scope.iswechat = true;
            }
            else{
                scope.iswechat = false;
            }

            scope.$on('$stateChangeStart', function () {
                menuMobile.collapse('hide');
            });
        }
    };
})

.filter('emailAddress', ['$log', '$filter', 'EmailAddresses', function ($log, $filter, EmailAddresses) {
    return function (input, key) {

        var emailPattern = new RegExp('@(.*)'),
        emailDomain = emailPattern.exec(input);


        return emailDomain ? _.find(EmailAddresses, {pattern: emailDomain[1]}) : null;
    };
}])

.filter('timeAgo', ['iaSettings', function (iaSettings) {
    return function (input, key) {
        if (input) {
            moment().local();

            var alertTime = moment(input.date).format('YYYY-MM-DDTHH:mm:ss'),
            currentTime = moment().tz(input.timezone).format('YYYY-MM-DDTHH:mm:ss');

            return moment(alertTime).locale(iaSettings.getFormatLanguage()).from(currentTime);
        }
    };
}])

.filter('phoneNumber', ['iaSettings', function (iaSettings) {
    return function (input, key) {
        if(!_.isUndefined(input)){
            return input.replace(' ', '-');
        }else{
            return null;
        }
    };
}])

.directive('timeAgo', function(iaSettings) {
    return {
        restrict: 'A',
        controller: function($window, $scope, $element, $attrs, $interval) {
            var interval = null;

            function renderTime(date) {
                moment().local();

                var alertTime = moment(date.date).format('YYYY-MM-DDTHH:mm:ss'),
                currentTime = moment().tz(date.timezone).format('YYYY-MM-DDTHH:mm:ss');

                $element.html(moment(alertTime).locale(iaSettings.getFormatLanguage()).from(currentTime));
            }

            $attrs.$observe('timeAgo', function() {
                var time = angular.fromJson($attrs.timeAgo);

                renderTime(time);

                if (interval) {
                    $interval.cancel(interval);
                } else {
                    interval = $interval(function() {
                        renderTime(time);
                    }, 60000);
                }
            });

            $scope.$on('$destroy', function() {
                $interval.cancel(interval);
            });
        }
    };
})

.filter('integerFilter', [function () {
    return function (items, key, reverse) {
        return _.filter(items, function (item, index) {
            return !reverse ? item.id === key.id : item.id !== key.id;
        });
    };
}])

.directive('phoneCode', function($filter, $timeout) {
    return {
        require: 'ngModel',
        restrict: 'A',
        priority: 1,
        link: function(scope, element, attrs, ngModel) {
            var phoneCode;

            ngModel.$render = function() {
                element.prop('value', ngModel.$viewValue);
            };

            scope.$watch(attrs.phoneCode, function (newVal, oldVal) {
                if(newVal==47 && oldVal==47)
                {
                            oldVal=0;   // for default phone code in phone number textbox
                        }
                        if (angular.isUndefined(newVal) || (newVal === oldVal)) {
                           return;
                       }

                       var newPhoneCode = $filter('settingsFilter')(newVal, 'countries', 'phonecode');
                       if (newPhoneCode === phoneCode) {
                        return;
                    }

                    var newPhoneCodeString = '+' + newPhoneCode + ' ';

                    if (!angular.isString(ngModel.$modelValue)) {
                        updateValue(newPhoneCodeString);
                    } else if (angular.isString(newPhoneCode)) {

                        if (!_.contains(ngModel.$modelValue, ' ')){
                            newModelValue = newPhoneCodeString;
                        }else{
                            var currentPhoneCode = ngModel.$modelValue.split(" ")[0];
                            var newModelValue = ngModel.$modelValue.replace(new RegExp('^((\\+)|(00))' + currentPhoneCode + ' ?'), newPhoneCodeString);
                            if (ngModel.$modelValue === newModelValue) {

                                newModelValue = newPhoneCodeString + ngModel.$modelValue.substr(ngModel.$modelValue.indexOf(' ')+1);
                            }
                        }

                        updateValue(newModelValue);
                    }

                    phoneCode = newPhoneCode;
                });

            function updateValue(value) {
                ngModel.$setViewValue(value);
                        ngModel.$render(); // This actually shouldn't be necessary. What's going on?
                    }
                }
            };
        })

.directive('phoneNumber', [function() {
    return {
        require: '^ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, ctrl) {

            var INTEGER_REGEXP = /\d+$/;

            ctrl.$validators.phonenumber = function (modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue)) {

                    return true;
                }

                var phNumber = angular.element(element);
                var target = phNumber.attr('ng-model');


                scope.$watch(target, function(newVal, oldVal, el) {
                    scope.beforeSpaceChar= modelValue.split(" ")[0];
                    scope.beforeSpaceChar = scope.beforeSpaceChar+ ' ';
                });

                scope.cursorPosVal = -1;
                scope.checkLength = function(event) {

                    var myEl = event.target;
                    scope.doGetCaretPosition(myEl);

                    var selectionStart = scope.cursorPosVal;


                    if(event.which === 37 || event.which === 39){
                        return event.preventDefault();
                    }

                    if ((event.which != 37 && (event.which != 39))
                        && ((selectionStart < scope.beforeSpaceChar.length)
                            || ((selectionStart == scope.beforeSpaceChar.length) && (event.which == 8)))) {
                        return event.preventDefault();
                }

            }

            scope.doGetCaretPosition = function(oField) {

                var iCaretPos = 0;

                                // IE Support
                                if (document.selection) {
                                  oField.focus ();
                                  var oSel = document.selection.createRange ();
                                  oSel.moveStart ('character', -oField.value.length);
                                  iCaretPos = oSel.text.length;
                              }

                                // Firefox support
                                else if (oField.selectionStart || oField.selectionStart == '0')
                                  iCaretPos = oField.selectionStart;
                              scope.cursorPosVal = iCaretPos;
                          };


                          return !!INTEGER_REGEXP.test(modelValue);
                      };
                  }
              };
          }])

.directive('fullPhoneNumber', function($filter) {
    return {
        restrict: 'EA',
        scope: {
            phonecode: '=',
            phonenumber: '='
        },
        template: '<a class="phone_code_mobile" ng-if="phonenumber" href="tel:{{phonenumber | phoneNumber}}"><span class="full-phone-number">{{ phonenumber }}</span></a>'
    };
})

.directive('fullAddress', function($filter, iaAddress) {
    return {
        restrict: 'EA',
        scope: {
            building: '=',
            street:'=',
            district: '=',
            city: '=',
            state: '=',
            postal: '=',
            country: '='
        },
        link: function (scope){
            scope.building = angular.isUndefined(scope.building) ? '' : scope.building;
            scope.street = angular.isUndefined(scope.street) ? '' : scope.street;
            scope.district = angular.isUndefined(scope.district) ? '' : scope.district;
            scope.city = angular.isUndefined(scope.city) ? '' : scope.city;
            scope.state = angular.isUndefined(scope.state) ? '' : scope.state;
            scope.postal = angular.isUndefined(scope.postal) ? '' : scope.postal;
            scope.country = angular.isUndefined(scope.country) ? '' : _.isNumber(scope.country) ? $filter('countryFilter')(scope.country, 'name') : scope.country;
            scope.personalAddress = iaAddress.personalAddress(scope.building, scope.street, scope.district, scope.city, scope.state,scope.postal, scope.country);
        },
        template: '<span>{{ personalAddress }}</span>'
    };
})

.directive('fullDate', function($filter) {
    return {
        restrict: 'EA',
        scope: {
            year: '=',
            month: '=',
            day: '='
        }, link: function (scope){
            scope.fullDate = _.compact([scope.year, scope.month, scope.day]).join('-');
        },
        template: '<span id="full-date">{{ fullDate }}</span>'
    };
})


.directive('iaGoEmail', ['$log', '$filter', 'locale', function ($log, $filter, locale) {
    return {
        restrict: 'E',
        replace: true,
        template: '<a open-in-app-browser ng-href="{{address.url}}?external=1" target="_blank">{{emailText}}</a>',
        scope: {
            ngModel: '=ngModel'
        },
        link: function (scope) {
            var blankAddress = 'http://about:blank';
            scope.address = $filter('emailAddress')(scope.ngModel);

            var emailTextToken = _.isObject(scope.address) ? 'common.goTo' : 'common.goToMyEmail';

            if (locale.isToken(emailTextToken)) {
                locale.ready(locale.getPath(emailTextToken)).then(function () {
                    var text = locale.getString(emailTextToken, {});

                    scope.emailText = _.isObject(scope.address) ? text + scope.address.domain : text;

                    if (scope.address === null) {
                        scope.address = {
                            url : blankAddress
                        };
                    }
                });
            }
        }
    };
}])

.directive('ngFile', ['fileUpload', function (fileUpload) {
    return {
        require: '?ngModel',
        restrict: 'EA',
        replace: true,
        link: function (scope, elem, attrs, ctrl) {
            var model, result, file;


            elem.on('change', function (event) {
                scope.spinner=true;
                file = (event.srcElement || event.target).files[0];

                        // Change file status back
                        scope.$apply(function () {
                            ctrl.$setPristine();
                            ctrl.$setValidity('filesize', true);
                        });

                        scope.errors = [];

                        // Change file status back

                        if (file) {

                            var maxSize = attrs.maxSize ? attrs.maxSize : Config.MaxFileSize;

                            // Stop file upload when exceed the maximal file size.
                            if (file.size > (maxSize * 1024)) {
                                event.preventDefault();
                                scope.$apply(function () {
                                    ctrl.$setValidity('filesize', false);
                                });
                                return;
                            }

                            // Upload file.
                            fileUpload.upload(file, attrs.name).then(
                                function (res) {
                                    model = attrs.model.split('.') || [];

                                    result = scope;

                                    for (var i = 0; i < model.length; i++) {
                                        if (typeof result[model[i]] === 'undefined') {
                                            result[model[i]] = {};
                                        }

                                        result = result[model[i]];
                                    }

                                    result[attrs.name] = res.data.url;
                                    scope.spinner=false;
                                }, function(err){
                                    errors = [];
                                    errors.push(err.data.error);
                                    scope.errors = errors;
                                    scope.spinner=false;
                                });
                        }
                    });
        },
        template: '<input type="file" class="no-uniform">'
    };
}])

.service('fileUpload', ['$http', '$q', 'API_BASE', function ($http, $q, API_BASE) {
    var upload = function (file, type) {

        var deferred = $q.defer();

        var fd = new FormData();
        fd.append('file', file);

        $http.post(API_BASE + '/upload?type='+type, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(
        function (res) {
            deferred.resolve(res);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    return {
        upload: upload
    };
}])

.directive('ngCsvFile', ['partnerCsvFileUpload','Account','$rootScope', function (partnerCsvFileUpload,Account,$rootScope) {
    return {
        require: '?ngModel',
        restrict: 'EA',
        replace: true,
        link: function (scope, elem, attrs, ctrl) {
            var model, result, file;
            elem.on('change', function (event) {
                    	// set false all errors
                    	scope.csvErrors = [];
                    	scope.showCsvFileError = false;
                    	scope.showExceedError =false;
                    	scope.showEmptyFileError =false;
                     $rootScope.redirecting = true; // Hide full screen loader
                     file = (event.srcElement || event.target).files[0];

                     var sFileName = file.name;
                     var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();

                     if(sFileExtension!=="csv")
                     {
                      scope.showCsvFileError = true;
                      return ;
                  }

                  $(this).prop("value", "")
                        // Change file status back
                        scope.$apply(function () {
                            ctrl.$setPristine();
                            ctrl.$setValidity('filesize', true);
                        });

                        scope.errors = [];

                        // Change file status back

                        if (file) {

                            var maxSize = attrs.maxSize ? attrs.maxSize : Config.MaxFileSize;

                        // Stop file upload when exceed the maximal file size.
                        if (file.size > (maxSize * 1024)) {
                        	event.preventDefault();
                         scope.$apply(function () {
                            ctrl.$setValidity('filesize', false);
                        });
                         scope.showExceedError =true;
                         return;
                     }

                        // Stop file upload when file is empty.
                        if (file.size < 1) {
                        	event.preventDefault();
                         scope.$apply(function () {
                            ctrl.$setValidity('filesize', false);
                        });
                         scope.showEmptyFileError =true;
                         return;
                     }

                     scope.csvUploadLoading = true;
                     scope.showWaitingText = true;

                        // Upload file.
                        partnerCsvFileUpload.upload(file, attrs.name).then(
                        	function (res) {
                                model = attrs.model.split('.') || [];
                                result = scope;
                                scope.visiblemodel = true;
                                for (var i = 0; i < model.length; i++) {
                                   if (typeof result[model[i]] === 'undefined') {
                                       result[model[i]] = {};
                                   }
                                   result = result[model[i]];
                               }

                               $('#CsvResult').modal('show');
                               Account.getFriends().then(function(friends) {
                                   friends.contacts.forEach(function(friend){
                                     friend.fullDate =  _.compact([friend.birth_date.year, friend.birth_date.month, friend.birth_date.day]).join('-');
                                 });
                                   $rootScope.friends = friends;
                                   $rootScope.redirecting = false;
                               });

                               if(res.failed.length>0)
                               {
                                 errors = [];
                                 res.failed.forEach(function(item){
                                   errors.push(item);
                               })
                                 scope.csvErrors = errors;
                             }
                             scope.createdRecords=res.created;
                             scope.csvUploadLoading = false;
                             scope.showWaitingText = false;
                         }, function(err){
                             errors = [];
                             errors.push(err.data.error);
                             scope.errors = errors;
                         });
                    }
                });
},
template: '<input type="file" class="no-uniform">'
};
}])

.service('partnerCsvFileUpload', ['Restangular', '$q', '$rootScope', function (Restangular, $q, $rootScope) {
    var upload = function (file, type) {

        var deferred = $q.defer();

        var fd = new FormData();
        fd.append('file', file);

        Restangular.all('partners/account/upload')
        .customPOST(fd,undefined,{
            'X-Authorization':$rootScope.apiKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .then(
            function (res) {
                deferred.resolve(res);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    return {
        upload: upload
    };
}])

.directive('img', ['CDN_BASE', function (CDN_BASE) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
                    // show an image-missing image
                    element.error(function () {
                        var w = element.width();
                        var h = element.height();

                        // after this error function has been called
                        var url = _.contains(attrs.ngShow,'photo') || _.contains(attrs.ngSrc,'photo')  ?
                        CDN_BASE+'static/images/avatar.png' : '';

                        element.prop('src', url);
                        element.css('border', 'double 1px #7b7b7b');
                    });
                }
            };
        }])

.directive('iceangelIdDownload', ['API_BASE', 'Auth', function (API_BASE, Auth) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            member: '=model'
        },
        link: function (scope, elem, attrs) {
            scope.token = Auth.getToken();
            scope.API_BASE = API_BASE;
        },
        template: '<a download="iceangel_id.pdf" class="btn btn-primary btn-lg btn-block btn-web" ng-href="{{API_BASE}}/pdf/print/iceangel_id/{{member.id}}?token={{token}}">Download PDF</a>'
    };
}])

.directive('ecpExist', ['$filter', function ($filter) {
    return {
        restrict: 'A',
        scope: {
            member: '=',
            account: '='
        },

        link: function (scope, elem, attrs) {

            scope.exist = !_.isEmpty($filter('filter')(scope.account.members[0].contacts, {id: scope.account.id}));

            if (scope.exist) {
                elem.addClass('hide');
            }
        }
    };
}])

.directive('twitterFollowButton', ['$timeout', function ($timeout) {

    return {
        restrict: 'AE',
        scope: {
            screenName: '@'
        },
        link: link,
        templateUrl: 'partials/directives/twitter-follow-button.html'
    };

    function link(scope, elem, attrs) {
        elem.on('click', function (event) {
            window.open('https://twitter.com/intent/follow?screen_name=' + attrs.screenName + '&tw_p=followbutton', '_blank');
        });
    }

}])

.directive('fixHeaderPosition', ['$document', '$window', function ($document, $window) {
    return function (scope, elem, attrs) {

        var header;

        function getHeader() {
            return header || (header = angular.element('.tab-mobile'));
        }

        elem.on('focus', 'input, select, textarea', function (e) {
            if ($window.scrollY > 0) {
                getHeader().addClass('fix-header');
            }
        });

        elem.on('blur', 'input, select, textarea', function (e) {
            getHeader().removeClass('fix-header');
        });
    };
}])

.directive('iaLabelMain', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            message: '@',
            translation: '@'
        },
        link: function (scope, element, attrs) {
            element.addClass('ia-label');

            var translation = $compile('<span class="ia-label-text" i18n="{{ translation }}"></span>')(scope);
            element.append(translation);

            if (attrs.required !== undefined) {
                element.append('<span class="ia-label-require"><i class="icon-star_icon"></i></span>');
            }

            if (attrs.message) {

                var tooltip = $compile('<a class="ia-label-tooltip-icon-container" tooltip="" data-i18n-attr="{ tooltip: \'{{ message }}\' }" ng-show="message"><i class="ia-label-tooltip-icon icon-question_icon"></i></a>')(scope);
                element.append(tooltip);
            }
        }
    };
}])

.directive('iaLabel', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            message: '@',
            translation: '@'
        },
        link: function (scope, element, attrs) {
            element.addClass('ia-label');

            var translation = $compile('<span class="ia-label-text" i18n="{{ translation }}"></span>')(scope);
            element.append(translation);

            if (attrs.required !== undefined) {
                element.append('<span class="ia-label-require"><i class="icon-star_icon"></i></span>');
            }

            if (attrs.message) {

                var tooltip = $compile('<a class="ia-label-tooltip-icon-container" ng-click = "tooltipToggle();" tooltip="" data-i18n-attr="{ tooltip: \'{{ message }}\' }" ng-show="message"><i class="fa fa-question-circle" aria-hidden="true"></i></a>')(scope);
                element.append(tooltip);
            }

            scope.tooltipToggle = function(){
             if (jQuery.browser && jQuery.browser.mobile){
                var elem = $('.tooltip');
                if(elem.hasClass('in')){
                    elem.removeClass('in');
                }
                else{
                    elem.addClass('in');
                }
            }
        }

    }
};
}])

.directive('localeLink', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            content: '@'
        },
        link: function (scope, element, attrs) {
            element.addClass('terms-link');

            scope.$watch('content', function () {
                if (!scope.content) {
                    return;
                }

                var result = '<div>' + scope.content + '</div>';
                result = $compile(result)(scope);
                element.html(result);
            });
        }
    };
}])

.directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    };
})

.directive('attachment', ['MEDIA_BASE', 'CDN_BASE', function (MEDIA_BASE, CDN_BASE) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            file: '=file'
        },
        link: function(scope, elem, attrs) {
            scope.$watch('file', function() {
                if (scope.file == '' || scope.file == null){
                    scope.url = '';
                }else{
                    scope.url = scope.file.replace(CDN_BASE+'media/', MEDIA_BASE);
                }
            });
        },
        templateUrl: 'partials/member/attachment.html'
    };
}])

.filter('formatRowResult', function() {
    return function(input, key) {

        if (!input) { return; }
        var formattedResults = [];

        angular.forEach(input, function (element, key) {
            key = (key%2 === 0) ? key/2 : (key-1)/2;

            if (angular.isUndefined(formattedResults[key])) {
                formattedResults[key] = [];
            }

            formattedResults[key].push(element);
        });

        return formattedResults;

    };
})

.directive('clearfix', function() {
    return {
        restrict: 'EA',
        link: function(scope, element, attr) {

            var clearfix = '<div class="clearfix"></div>';

            scope.$watch('$index', function(newVal, oldVal) {
                if(newVal && newVal%2 === 1) {
                    element.after(clearfix);
                }
            });
        }
    };
})

.filter('fileName', function() {
    return function(input, key) {
        if (input) {
            return input.split('/').pop();
        }
    };
})

.directive('iaFormErrorScroller', function() {
    return {
        require: '^form',
        restrict: 'EA',
        link: function (scope, elem, attrs, ctrl) {
            angular.element(elem).submit(function (event) {
                event.preventDefault();

                if (ctrl.$submitted) {

                    if (ctrl.$invalid) {

                        var errorPosition = $(angular.element('input.ng-invalid, select.ng-invalid, textarea.ng-invalid')[0]).offset().top - 50;

                        $('html, body').animate({
                            scrollTop: errorPosition
                        }, 1000);
                    }

                    return;
                }
            });
        }
    };
})

.directive('validateEmailAvailable', ['Account', function(Account) {
    return {
        require: '?ngModel',
        restrict: 'EA',
        link: function(scope, element, attrs, ctrl) {

            function validate() {
                Account.validateEmailAvailable(ctrl.$viewValue, attrs.accountId).then(
                    function(res) {
                        if (res === undefined) {
                            ctrl.$setValidity('available', true);
                        } else if(res === "taken"){
                            ctrl.$setValidity('available', false);
                            ctrl.$setValidity('member', true);
                            ctrl.$setValidity('active', true);
                        }
                        else if(res === "inactive"){
                            ctrl.$setValidity('available', true);
                            ctrl.$setValidity('member', true);
                            ctrl.$setValidity('active', false);
                        }
                        else if(res === "member"){
                            ctrl.$setValidity('available', true);
                            ctrl.$setValidity('active', true);
                            ctrl.$setValidity('member', false);
                        }
                    });
            }
        }
    }
}])



.directive('validateEmailAvailable', ['Account', function(Account) {
    return {
        require: '?ngModel',
        restrict: 'EA',
        link: function(scope, element, attrs, ctrl) {

            function validate() {
                    Account.validateEmailAvailable(ctrl.$viewValue, attrs.accountId).then(
                        function(res) {
                        if (res === undefined) {
                            ctrl.$setValidity('available', true);
                                ctrl.$setValidity('member', true);          // if another member have same email then bug is produced so fixed by setting member.
                            } else if(res === "taken"){
                                ctrl.$setValidity('available', false);
                                ctrl.$setValidity('member', true);
                                ctrl.$setValidity('active', true);
                            }else if(res === "inactive"){
                                    ctrl.$setValidity('available', true);
                                    ctrl.$setValidity('member', true);
                                    ctrl.$setValidity('active', false);
                            }
                            else if(res === "member"){
                                    ctrl.$setValidity('available', true);
                                    ctrl.$setValidity('active', true);
                                    ctrl.$setValidity('member', false);
                                }
                            });
                    }

            element.on('blur', validate);
            scope.$on('validate.email', validate);
        }
    };
}])

.directive('useAccountEmail', function($rootScope, $timeout) {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
            var email;

            scope.$watch('member', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    email = angular.copy(scope.member.email);
                }
            });

            scope.$on('member.updated', function(event, member) {
                email = member.email;
            });

            element.on('click', function(event) {
                var checked = element.prop('checked');

                if (element.prop('checked')) {
                    scope.member.use_account_email = checked;
                    scope.member.email = scope.$parent.account.email;

                    $timeout(function() {
                        $rootScope.$broadcast('validate.email');
                    }, 0);
                }
                else {
                    if (email === scope.$parent.account.email) {
                        scope.member.email = null;
                    } else {
                        scope.member.email = email || null;
                    }
                }
            });
        }
    };
})

.directive('useAccountPhone', function() {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
            var phone = {};

            scope.$watch('member', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    phone = angular.copy(scope.member.phone);
                }
            });

            scope.$on('member.updated', function(event, member) {
                phone = member.phone;
            });

            element.on('click', function(event) {
                var checked = element.prop('checked');
                scope.member.use_account_phone = checked;

                if (checked) {
                    scope.member.phone = scope.$parent.account.phone;
                    phone              = scope.$parent.account.phone;
                }
                else {

                    if (phone.number === scope.$parent.account.phone.number && phone.code === scope.$parent.account.phone.code) {

                        scope.member.phone = {};
                        document.getElementsByName('phonenumber')[0].value='';

                    } else {

                        scope.member.phone = phone || {};
                        document.getElementsByName('phonenumber')[0].value='';

                    }
                }
            });

        }
    };
})

.directive('iaViewLocation', function($window, $modal) {
    return {
        restrict: 'EA',
        scope: {
            location: '=location'
        },
        link: function(scope, elem, attrs) {
            elem.on('click', function () {
                if (!scope.location) {
                    return;
                }

                var modalInstance = $modal.open({
                    backdrop: true,
                    backdropClick: true,
                    dialogFade: false,
                    keyboard: true,
                    size: attrs.size,
                    templateUrl: 'partials/modal/open-map.html',
                    scope: scope,
                    controller: function () {
                        scope.cancel = function () {
                            modalInstance.close();
                        };

                        scope.bingMapLink = 'http://www.bing.com/ditu/default.aspx?where1='+
                        scope.location.latitude + ','+ scope.location.longitude + '&cp='+
                        scope.location.latitude + '~'+ scope.location.longitude + '&lvl=17&style=r&sp=point.' +
                        scope.location.latitude + '_'+ scope.location.longitude + '&external=1';
                    }
                });
            });
        }
    };
})

.directive('notesLayout', function() {

    return ({
        link: link,
        restrict: 'A',
        scope: {
            notes: '='
        },
        templateUrl: "partials/member/notes.html"
    });

    function link(scope, elem, attrs) {
        var textarea = angular.element(elem).find('textarea');
        var target = textarea.attr('ng-model');
        var maxLength = textarea.attr('ng-maxlength') || textarea.attr('maxlength') || 500;

        if (textarea.attr('maxlength') === undefined) {
            textarea.attr('maxlength', maxLength);
        }

        scope.notesLength = scope.notesLength ? scope.notesLength : 0;
        scope.maxLength = maxLength;

        scope.$watch(target, function(newVal, oldVal) {

            scope.notesLength = (newVal === undefined || newVal === null) ? 0 : newVal.length;

        });
    }
})

.directive('openInAppBrowser', ['$rootScope', '$window', function ($rootScope, $window) {
   return {
       restrict: 'EA',
       link: function (scope, elem, attrs) {

           scope.language = $rootScope.globals.language;

           elem.on('click', function (e) {
               e.preventDefault();

                       // $cordovaInAppBrowser.open(attrs.href, '_blank');
                       $window.open(attrs.href, '_blank');
                   });
       }
   };
}])

.directive('backButton', function () {
    return {
        restrict: 'A',
        controller: ['$rootScope', '$scope', '$window', '$attrs', '$state', '$element', function ($rootScope, $scope, $window, $attrs, $state, $element) {
            $rootScope.backButton = $attrs.backButton;

            function backState() {
                $rootScope.isPanic = false;
                $attrs.backButton ? $state.go($attrs.backButton) : $window.history.go(-1);
            }

            document.addEventListener('backbutton', backState, false);

            $scope.$on('$destroy', function () {
                $rootScope.backButton = null;
                document.removeEventListener('backbutton', backState);
            });

            $(document).on('back.button.clicked', backState);
        }]
    };
})


.directive('showTwitterBox',['$rootScope','$modal',function($rootScope,$modal){
    return {
       link: function (scope, elem, attrs) {
        var modalInstance = null;
        var opts = {
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: attrs.size,
            templateUrl: attrs.templateurl,
            scope: scope,
            controller: attrs.controller
        }
        scope.cancel = function(){
            modalInstance.close();
        }
        elem.on('click',function(){
         modalInstance = $modal.open(opts);
     });
    }
}
}])

  .directive('headerBackButton', function () {
            return {
                restrict: 'A',
                controller: ['$rootScope', '$element', '$window', '$location', '$state', function ($rootScope, $element, $window, $location, $state) {
                    $element.on('click', function (e) {
                        e.preventDefault();

                        if (!_.isUndefined($rootScope.backbutton) && $rootScope.backButton) {

                            $(document).trigger('back.button.clicked');

                        } else {

                            function matchPath(path) {
                                return _.contains(path, $location.$$path);
                            }

                            var paths = {'/account'               : 'base.home',
                            '/account/settings'      : 'account.show',
                            '/account/messages'      : 'account.show',
                            '/aboutus'               : 'base.about',
                            '/faq'                   : 'base.about',
                            '/contactus'             : 'base.about',
                            '/login'                 : 'base.home',
                            '/terms'                 : 'base.about',
                            '/privacy'               : 'base.about',
                            '/registration/register' : 'base.login',
                            '/forget-password/email' : 'base.login',
                            '/resend/active-email'   : 'base.login'
                        };

                        if(_.any(_.keys(paths), matchPath)){

                            var next = _.isUndefined(paths[$location.$$path]) ? 'account.show' : paths[$location.$$path];
                            $state.go(next, {back: 1});

                        }else{
                            $window.history.go(-1);
                        }
                    }
                });
                }]
            };
        });
     })();
