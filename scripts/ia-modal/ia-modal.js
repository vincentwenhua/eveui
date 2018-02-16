(function() {
    'use strict';

    angular.module('iaModal', [])

        .controller('ModalHelpController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
            $scope.cancel = function() {
                
                $modalInstance.close();
                var body                = angular.element(document).find('body').eq(0);
                
                if (body[0].className == "modal-open"){
                    
                    var layer               = angular.element(document).find('div.modal-backdrop').eq(0);
                    var modalLayer          = angular.element(document).find('div.modal').eq(0);
                    
                    body.removeClass("modal-open");
                    layer.remove();
                    modalLayer.remove();
                }
                
            };
        }])

        .controller('ChangeSecurityModal', ['$rootScope', '$scope', '$controller', '$state', '$modalInstance', 'Account', function($rootScope, $scope, $controller, $state, $modalInstance, Account) {

            $controller('ModalHelpController', {$scope: $scope, $modalInstance: $modalInstance});

            $scope.checkPassword = function (password) {
                Account.checkPassword(password).then(
                    function (res) {
                        $rootScope.$emit('password.verified');

                        $modalInstance.dismiss('cancel');

                        $state.go('account.security-questions.question1');
                    },
                    function (err) {
                        $scope.error = err.data.error;
                    });
            };
        }])

        .controller('ChangeEmailModal', ['$rootScope', '$scope', '$controller', '$state', '$modalInstance', 'Account', function($rootScope, $scope, $controller, $state, $modalInstance, Account) {

            $controller('ModalHelpController', {$scope: $scope, $modalInstance: $modalInstance});

            $scope.checkPassword = function (password) {
                Account.checkPassword(password).then(
                    function (res) {

                        $rootScope.$emit('password.verified');

                        //$modalInstance.dismiss('cancel');
                        $modalInstance.close();
                        
                        var body = angular.element(document).find('body').eq(0);
                        if (body[0].className == "modal-open") {

                            var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                            var modalLayer = angular.element(document).find('div.modal').eq(0);

                            body.removeClass("modal-open");
                            layer.remove();
                            modalLayer.remove();
                        }
                        
                        $state.go('account.change-email');
                    },
                    function (err) {
                        $scope.error = err.data.error;
                    });
            };
        }])

        .controller('CancelConfirmationModal', ['$rootScope', '$scope', '$controller', '$modalInstance', '$state', function($rootScope, $scope, $controller, $modalInstance, $state) {

            $controller('ModalHelpController', {$scope: $scope, $modalInstance: $modalInstance});

            $scope.yes = function(uri, params) {
                $modalInstance.dismiss('cancel');
                $state.transitionTo(uri, (params || {}));
            };
        }])


        .controller('DeleteAccountController', ['$rootScope', '$scope', '$state', '$modalInstance', 'Restangular', 'Account', 'Auth', 'locale', function ($rootScope, $scope, $state, $modalInstance, Restangular, Account, Auth, locale) {
            var errors = [];
            var noPasswordToken = 'errors.passwordRequired';

            $scope.step = 'default';
            $scope.delete = {};
            $scope.errors = [];

            $scope.next = function (password) {

                if (!password) {
                    if (locale.isToken(noPasswordToken)) {
                        locale.ready(locale.getPath(noPasswordToken)).then(function () {
                            var errorMessage = locale.getString(noPasswordToken, {});
                            $scope.errors.push({message: errorMessage});
                        });
                    }

                    return;
                }

                $scope.errors = [];
                $scope.step = 'reason';
            };

            $scope.checkPass = function(password){
                 Restangular.one("account/checkPassword").customPOST({password:password}).then(
                    function(res){
                        $scope.next(password);
                    },
                    function(err){
                        errors = [];
                        errors.push(err.data.error);
                        $scope.passwordErr = errors;
                    }

                )
            }

            $scope.handle = function (reason) {
                Account.destroy(reason).then(
                    function (res) {
                        $scope.errors = [];
                        $modalInstance.close();
                        Auth.logout();
                        $rootScope.logout();
                        $rootScope.account = null;
                        $rootScope.farewell = true;
                        $state.go('base.home', {exit: 1});
                    },
                    function (err) {
                        if (err.status == 401) {
                            $scope.step = 'default';
                        }
                        errors = [];
                        errors.push(err.data.error);
                        $scope.errors = errors;
                    });
            };

            $scope.cancel = function () {
                
                $modalInstance.dismiss('cancel');
                var body = angular.element(document).find('body').eq(0);
                if (body[0].className == "modal-open") {

                    var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                    var modalLayer  = angular.element(document).find('div.modal').eq(0);

                    body.removeClass("modal-open");
                    layer.remove();
                    modalLayer.remove();
                }
            };

        }])
})();
