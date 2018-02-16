(function () {
    'use strict';


    angular.module('iaAuth', [])

        .factory('AuthToken', ['$q', '$window', '$rootScope', 'Store',  function ($q, $window, $rootScope, Store) {

            var accountKey = 'auth-account';
            var tokenKey = 'auth-token';
            var cachedAccount,cachedToken;

            function isExpired(current, expires_at) {
                return current > expires_at;
            }

            return {
                set: function (token) {
                    cachedToken = token;
                    return Store.put(tokenKey, token);
                },

                setAccount: function(account){
                    cachedAccount = account;
                    return Store.put(accountKey, account);
                },

                get: function () {
                  var url = $window.location.href;
                  var startToken = url.indexOf("auth/");
                  var endToken =url.lastIndexOf("?redirect-to");
                  var newToken = url.substring(startToken+5,endToken);

                    if (cachedToken) {
                         return isExpired(moment().format('X'), cachedToken['expires_at']) ? null: cachedToken['token'];
							var url = $window.location.href;
							var startToken = url.indexOf("auth/");
							var endToken =url.lastIndexOf("?redirect-to");
							var newToken = url.substring(startToken+5,endToken);
                    }

                    if (Store.get(tokenKey) && angular.isDefined(Store.get(tokenKey)['token'])) {
                        return isExpired(moment().format('X'), Store.get(tokenKey)['expires_at']) ? null: Store.get(tokenKey)['token'];
                    }

                    return null;
                },

                getAccount: function(){
                    if (cachedAccount) {
                        return isExpired(moment().format('X'), cachedAccount['expires_at']) ? null: cachedAccount['is_partner'];
                    }

                    if (Store.get(accountKey) && angular.isDefined(Store.get(accountKey)['is_partner'])) {
                        return isExpired(moment().format('X'), Store.get(accountKey)['expires_at']) ? null: Store.get(accountKey)['is_partner'];
                    }

                    return null;
                },

                clear: function () {
                    cachedAccount=null;
                    cachedToken = null;
                    Store.remove(accountKey);
                    return Store.remove(tokenKey);
                }
            };

        }])

        .provider('Auth', function () {

            this.init = function (config) {

                if (!config.LOGIN_URL) {
                    throw Error('Login URI is required.');
                }

                if (!config.AUTH_URL) {
                    throw Error('Auth URI is required.');
                }

                this.LOGIN_URL = config.LOGIN_URL;
                this.AUTH_URL = config.AUTH_URL;

            };

            this.$get = function ($rootScope, $http, AuthToken, iaSettings, Store) {
                var auth = this;

                auth.isAuthenticated = false;

                auth.login = function (credentials, successCallback, errorCallback) {

                    if (Store.get($rootScope.nomination)) {
                        credentials.nomination = Store.get($rootScope.nomination);
                    }

//                  return $http.post(auth.LOGIN_URL, credentials, {headers: {'Accept-Language': iaSettings.getLanguage(), 'Access-Control-Allow-Credentials': true}, withCredentials:true})
                    return $http.post(auth.LOGIN_URL, credentials, {headers: {'Accept-Language': iaSettings.getLanguage()}})
                        .success(function (res) {

                            AuthToken.set(res);

                            auth.isAuthenticated = true;

                            //Remove nomination localStorage
                            Store.remove($rootScope.nomination);

                            if (angular.isFunction(successCallback)) {
                                successCallback.call(res);
                            }
                        })
                        .error(function (err) {
                            console.log(err)
                            AuthToken.clear();
                            if (angular.isFunction(errorCallback)) {
                                errorCallback.call(err);
                            }
                        });
                };

                auth.authenticate = function (token, successCallback, errorCallback) {

                    return $http.get(auth.AUTH_URL, {
                        params: token,
                        headers: {'Accept-Language': iaSettings.getLanguage()}
                    })
                        .success(function (res) {
                            AuthToken.set(res);

                            auth.isAuthenticated = true;

                            //Remove nomination localStorage
                            Store.remove($rootScope.nomination);

                            if (angular.isFunction(successCallback)) {
                                successCallback.call(res);
                            }
                        })
                        .error(function (err) {

                            AuthToken.clear();
                            if (angular.isFunction(errorCallback)) {
                                errorCallback.call(err);
                            }
                        });
                };

                auth.logout = function () {
                    $.ajax({
                        type: 'GET',
                        url: Config.API_BASE + '/logout',
                        dataType: 'json',
                        success: function(result){

                        }
                    });
                    auth.isAuthenticated = false;
                    AuthToken.clear();
                };

                auth.getToken = function () {
                    return AuthToken.get();
                };

                auth.isLogged = function () {
                    return AuthToken.get() ? true : false;
                };

                auth.isPartner = function(){
                    return AuthToken.getAccount() ? true : false;
                }

                return auth;
            };
        })

        .factory('AuthInterceptor', ['$rootScope', '$q', '$log', 'AuthToken', function ($rootScope, $q, $log, AuthToken) {
            return {
                request: function (config) {
                    var token = AuthToken.get();

                    if (token) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                },
                response: function (response) {

                    if (response.status === 401) {
                        $log.warn('user not authenticated', response);
                        $rootScope.$broadcast('user.unauthorized');
                    } else if (response.status === 403) {
                        $log.warn('user not allowed', response);
                        $rootScope.$broadcast('user.forbidden');
                    }
                    return response || $q.when(response);
                }
            };
        }])

        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        }])

        .controller('AuthController', ['$rootScope', '$window', '$scope', '$state', '$location', 'Auth', 'Socket', 'Account', function ($rootScope, $window, $scope, $state, $location, Auth, Socket, Account) {
            var errors;
            var credentials;
            var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            $scope.remember = false;
            $scope.$parent.account = null;
            $scope.errors = [];
            $rootScope.logged = false;
            $scope.iswechat = false;

            function is_weChat() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    $scope.iswechat = true;
                    $.ajax({
                        type: 'GET',
                        url: Config.API_BASE,
                        dataType: 'json',
                        success: function(result){

                        }
                    })
                }
            }
            is_weChat();
            angular.element(document).find('body').eq(0).removeClass('wechat-popupcon');
            if($location.$$path.indexOf('ACC_bind') != -1){

            }

            var redirectTo = $state.params['redirect-to'];
            var searchParams = {};

            if (!_.isUndefined($state.params['ref'])){
                searchParams ={'ref': $state.params['ref']};
            }

            if ($location.$$search.emailUpdated) {
                $scope.emailUpdated = true;
            }

            $scope.login = function (username, password) {
                $scope.errors = [];
                username = username.toLowerCase();
                credentials = $scope.remember ?
                    (pattern.test(username) ? {email: username, password: password, remember: true} : {ice_id: username, password: password, remember: true}) :
                    (pattern.test(username) ? {email: username, password: password} : {ice_id: username, password: password});


                $rootScope.loginTransition = true;
                return Auth.login(credentials).then(
                        function (res) {

                        $scope.errors = [];
                        // Socket.getConnection();

                        // Fire logged events
                        $rootScope.$broadcast('account.login', res.data);
                        Account.get()
                            .then(function(res) {
                                
                                if (redirectTo) {
                                  $location.path(redirectTo).search(searchParams).replace();
                                  $window.location.reload();  // we chat click on account page after login not showing username need to refresh fixed
                                } else if (res.is_partner) {
                                    Account.getApiKeyForPartner()
                                    .then(function(){
                                         $state.transitionTo('base.partner', {});
                                     });
                                }
                                else if($location.$$path.indexOf('map') != -1){
                                    $state.transitionTo('base.map', {});
                                }
                                else{
                                    $state.transitionTo('account.show', {});
                                }

                                $rootScope.loginTransition = false;
                            });
                    },
                    function (err) {
                        errors = [];
                        if (err.data && err.data.error) {
                            errors.push(err.data.error);
                        }
                        $scope.errors = errors;
                    });
                    $rootScope.redirecting = false;

            };

            $scope.acclogin = function (username, password,wechat) {
                $scope.errors = [];
                username = username.toLowerCase();
                is_weChat();
                credentials = $scope.remember ?
                    (pattern.test(username) ? {email: username, password: password,wechat:wechat, remember: true} : {ice_id: username, password: password,wechat:wechat, remember: true}) :
                    (pattern.test(username) ? {email: username, password: password,wechat:wechat} : {ice_id: username, password: password,wechat:wechat});

                $rootScope.loginTransition = true;
                $rootScope.iswechat = false;
                function is_weChat() {
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == "micromessenger") {
                        wechat = 1;
                    }
                    else wechat = 0;
                }

                return Auth.login(credentials).then(
                        function (res) {
                        $scope.errors = [];
                        // Socket.getConnection();
                        // Fire logged events
                        $rootScope.$broadcast('account.login', res.data);

                        Account.get()
                            .then(function(res) {
                                if (redirectTo) {
                                    $location.path(redirectTo).search(searchParams);
                                // } else if (res.is_partner) {
									//Vincent Start
										$location.path(redirectTo).search(searchParams).replace();
										$window.location.reload();  // wechat click on account page after login not showing username need to refresh fixed
									//Vincent End
                                } else if (parseInt(res.is_partner)) {
                                    Account.getApiKeyForPartner()
                                    .then(function(){
                                         $state.transitionTo('base.partner', {});
                                     });
                                }
                                else if($location.$$path.indexOf('map') != -1){
                                    $state.transitionTo('base.map', {});
                                }
                                else{
                                    $state.transitionTo('account.show', {});
                                }

                                $rootScope.loginTransition = false;
                            });
                            $rootScope.redirecting = false;
                    },
                    function (err) {
                        errors = [];
                        if (err.data && err.data.error) {
                            errors.push(err.data.error);
                        }
                        $scope.errors = errors;
                        $rootScope.redirecting = false;
                    });                   

                };
            }])

        .controller('AuthTokenController', ['$rootScope', '$window', '$scope', '$state', '$location', 'Auth', 'Socket', 'Account','Store', function ($rootScope, $window, $scope, $state, $location, Auth, Socket, Account,Store) {
            var redirectTo = $state.params['redirect-to'];
            var token = $state.params['token'];
            $rootScope.tokenKey = token;
            var tokenKey = 'auth-token';
            var tokenKeyInfo = Store.get(tokenKey);
            if (tokenKeyInfo !== null && (tokenKeyInfo.token !== $rootScope.tokenKey)) {
                $rootScope.logged = false;
                Store.put(tokenKey, token);
            }


            if ($rootScope.logged){
                $location.url(redirectTo);
                return;
            }

            var errors;
            $scope.$parent.account = null;
            $scope.errors = [];
            $rootScope.logged = false;

            if ($location.$$search.emailUpdated) {
                $scope.emailUpdated = true;
            }


                $scope.errors = [];

                return Auth.authenticate({'access_token': token}).then(
                        function (res) {

                        $rootScope.redirecting = true;
                        $scope.errors = [];
                        // Socket.getConnection();

                        // Fire logged events
                        $rootScope.$broadcast('account.login', res.data);
//AuthToken.setAccount(null);
//var a = $window.history;

                        Account.get()
                            .then(function() {
                                if (redirectTo) {
                                    $location.url(redirectTo).replace();
                                    $window.location.reload();
                                } else {
                                    $state.transitionTo('account.show', {});
                                }
                            });
                    },
                    function (err) {
                        errors = [];
                        if (err.data && err.data.error) {
                            errors.push(err.data.error);
                        }
                        $scope.errors = errors;
                        $location.url('/login');
                    });
        }]);

})();
