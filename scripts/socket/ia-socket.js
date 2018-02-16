(function () {
    'use strict';

    angular.module('iaSocket', [])
        .provider('Socket', function () {
            var self = this;
            var userSession = null;
            var retry = true;
            var status = 'not_connected';
            self.wsuri = "";

            this.init = function (opts) {
                if (angular.isDefined(opts.WS_BASE)) {
                    self.wsuri = opts.WS_BASE;
                }
            };

            this.$get = ['$rootScope', 'AuthToken', 'iaSettings', '$window', '$interval', function ($rootScope, AuthToken, iaSettings, $window, $interval) {
                var socket = this;

                var onAlertReceived = function (topic, event) {
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast('alerts.received', event);
                    });
                };

                var onMessageReceived = function (topic, event) {
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast('messages.received', event);
                    });
                };

                var onEventReceived = function (topic, event) {
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast('events.received', event);
                    });
                };

                var onConnect = function (session) {
                    userSession = session;

                    status = 'connected';

                    session.subscribe('messages', onMessageReceived);

                    session.subscribe('alerts', onAlertReceived);

                    session.subscribe('events', onEventReceived);
                };

                var onError = function (code, reason) {
                    status = 'not_connected';

                    if (retry) {
                       self.connectSocket();
                    }
                };

                socket.getConnection = function () {
                    self.connectSocket();
                };

                socket.canConnect = function () {
                    return status == 'not_connected';
                };

                // Close the session after user logout
                $rootScope.$on('logout', function () {
                    retry = false;

                    if (userSession) {
                        userSession.close();
                        userSession = null;
                    }

                    status = 'not_connected';
                });

                $rootScope.$on('account.login', function () {
                    retry = true;
                    socket.connectSocket();
                });

                socket.connectSocket = function () {
                    if (self.canConnect()) {
                        status = 'connecting';
                        ab.connect(self.wsuri + '?token=' + AuthToken.get() + '&language=' + iaSettings.getLanguage(), onConnect, onError);
                    }
                };

                return socket;
            }];
        });
})();
