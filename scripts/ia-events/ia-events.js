(function() {
    'use strict';

    angular.module('iaEvents', [])

        .run(['$rootScope', '$timeout', 'Account', '$state', function($rootScope, $timeout, Account, $state) {

            $rootScope.$on('events.received', function(event, payload) {
                switch(payload.data.action) {
                    case 'ecp.accepted':
                        Account.updateEcp(payload.data);
                        break;

                    case 'ecp.declined':
                    case 'ecp.deleted':
                        Account.updateEcp(payload.data, true);
                        break;

                    case 'guardian.accepted':
                        Account.updateGuardian(payload.data);
                        break;

                    case 'guardian.declined':
                    case 'guardian.deleted':
                        Account.updateGuardian(payload.data, true);
                        break;

                    case 'fin.guardian.deleted':
                        Account.removeFinGuardian(payload.data);
                        break;

                    case 'fin.ecp.deleted':
                        Account.removeFinEcp(payload.data);
                        break;

                    case 'account.updated':
                        $timeout(function () {
                            Account.accountUpdated(payload.data);
                        }, 0);
                        //$state.reload();
                        break;
                    default:;
                }
            });
        }]);
})();
