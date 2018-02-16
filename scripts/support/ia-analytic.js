(function() {
    'use strict';

    angular.module('iaAnalytic', ['restangular'])
        .constant('AnalyticEvents', [
            'account.static.contactus',
            'account.static.terms',
            'account.static.privacy',
            'account.static.faq',
            'account.static.help'
        ])

        .run(['$rootScope', '$state', 'AnalyticEvents', 'AnalyticService', function($rootScope, $state, AnalyticEvents, AnalyticService) {
            // Listen the events in analytic list.
            angular.forEach(AnalyticEvents, function(name) {
                $rootScope.$on(name, function(event, data) {
                    AnalyticService.analytic(event.name);
                });
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                switch(toState.name) {
                    case 'base.terms':
                        $rootScope.$broadcast('account.static.terms');
                        break;
                    case 'base.faq':
                        $rootScope.$broadcast('account.static.faq');
                        break;
                    case 'base.privacy':
                        $rootScope.$broadcast('account.static.privacy');
                        break;
                    default:
                        break;
                }
            });
        }])

        .factory('AnalyticService', ['Auth', 'Restangular', function(Auth, Restangular) {
            function analytic(name) {
                if (Auth.isLogged()) {
                    return Restangular.one('analytics').customPOST({event: name});
                }
            }

            return {
              analytic: analytic
            };
        }])
    ;
})();