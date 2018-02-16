(function () {
    'use strict';

    angular.module('iaGuardian', [])
        .directive('addGuardianModal', ['$state', '$modal', 'Account', function ($state, $modal, Account) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;
                    var templates = {
                        add: 'partials/guardian/templates/addGuardian.html',
                        success: 'partials/guardian/templates/addGuardianSuccess.html'
                    };

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: templates.add,
                        scope: scope,
                        controller: function () {
                            var errors = [];
                            scope.errors = [];

                            scope.slideTo = function (content) {
                                scope.modalContent = content;
                            };

                            scope.ok = function () {
                                modalInstance.close();
                            };

                            scope.cancel = function () {
                                modalInstance.close();
                            };

                            scope.email_nomination = function (email) {
                                Account.sendGuardianEmailNomination(email).then(
                                    function (res) {
                                        modalInstance.close();
                                        success.scope.guardian = res;
                                        modalInstance = $modal.open(success);
                                    },
                                    function (err) {
                                        errors = [];
                                        errors.push(err.data.error);
                                        scope.errors = errors;
                                    });
                            };
                        }
                    };

                    var success = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: templates.success,
                        scope: scope,
                        controller: function () {
                            scope.errors = [];

                            scope.yes = function() {
                                modalInstance.close();
                            };
                        }
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);

                        modalInstance.result.then(function (res) {
                            scope.errors = [];
                            scope.modalContent = 'default';
                        }, function () {
                            scope.modalContent = 'default';
                        });
                    });
                }
            }
        }])

        .directive('removeGuardian', ['$state', '$modal', 'Account', function ($state, $modal, Account) {
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
                            scope.slideTo = function (content) {
                                scope.modalContent = content;
                            };

                            scope.cancel = function () {
                                //modalInstance.close();
                                modalInstance.dismiss('cancel');
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className == "modal-open") {

                                    var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass("modal-open");
                                    layer.remove();
                                    modalLayer.remove();
                                }
                            };

                            scope.ok = function () {
                                if (scope.guardian.status == 'accepted') {

                                    Account.removeGuardian(scope.guardian.id, scope.$index).then(
                                        function (res) {
                                            modalInstance.close();
                                        },
                                        function (err) {
                                            alert(err.data.error.message);
                                            modalInstance.close();
                                            $state.reload();
                                        });
                                } else {
                                    Account.cancelGuardianRequest(scope.guardian.email, scope.$index).then(
                                        function (res) {
                                            modalInstance.close();
                                        },
                                        function (err) {
                                            alert(err.data.error.message);
                                            modalInstance.close();
                                            $state.reload();
                                        });
                                }
                            };
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);

                        modalInstance.result.then(function (res) {
                            scope.modalContent = 'default';
                        }, function () {
                            scope.modalContent = 'default';
                        });
                    });
                }
            };
        }])

        .directive('removeGuardianFor', ['$state', '$modal', 'Account', function ($state, $modal, Account) {
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
                            scope.slideTo = function (content) {
                                scope.modalContent = content;
                            };

                            scope.cancel = function () {
                                modalInstance.close();
                            };

                            scope.ok = function () {
                                Account.removeGuardianFor(scope.guardian.id, scope.$index).then(
                                    function (res) {
                                        scope.friends.guardians.splice(scope.$index, 1);
                                        modalInstance.close();
                                    },
                                    function (err) {
                                        alert(err.data.error.message);
                                        modalInstance.close();
                                        $state.reload();
                                    });
                            };
                        }
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);

                        modalInstance.result.then(function (res) {
                        }, function () {
                            scope.modalContent = 'default';
                        });
                    });
                }
            };
        }])

        .directive('acceptGuardianRequest', ['$rootScope', '$state', '$modal', 'Account', function ($rootScope, $state, $modal, Account) {
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

                            scope.cancel = function () {
                                modalInstance.close();
                            };

                            scope.ok = function () {
                                modalInstance.close();

                                // Fire event for remove message of accepted guardian.
                                $rootScope.$broadcast('message.guardian.request.accepted', scope.res.message_id);
                            };
                        }]
                    };

                    scope.acceptGuardian = function (request_id, message_id) {

                        Account.acceptGuardianRequest(request_id, message_id).then(
                            function (res) {
                                scope.res = res;
                                modalInstance = $modal.open(opts);
                            },
                            function (err) {
                                alert(err.data.error.message);
                                modalInstance.close();
                                $state.reload();
                            });
                    }
                }
            };
        }])

        .directive('declineGuardianRequest', ['$modal', '$state', 'Account', function ($modal, $state, Account) {
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
                        controller: ['$rootScope', function ($rootScope) {

                            scope.cancel = function () {
                                modalInstance.close();
                            };

                            scope.declineGuardian = function (request_id, message_id) {
                                Account.declineGuardianRequest(request_id).then(
                                    function (res) {
                                        modalInstance.close();

                                        // Fire event for remove message of declined guardian.
                                        $rootScope.$broadcast('message.guardian.request.declined', message_id);
                                    },
                                    function (err) {
                                        alert(err.data.error.message);
                                        modalInstance.close();
                                        $state.reload();
                                    });
                            }
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])

        .directive('acceptSyncRequest', ['$rootScope', '$state', '$modal', 'Account', function ($rootScope, $state, $modal, Account) {
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

                            scope.cancel = function () {
                                modalInstance.close();
                            };

                            scope.ok = function () {
                                modalInstance.close();

                                // Fire event for remove message of accepted guardian.
                                // $rootScope.$broadcast('message.sync.request.accepted', scope.res.message_id);
                            };
                        }]
                    };

                    scope.acceptSync = function (uu_id, message_id) {

                        Account.acceptSync(uu_id, message_id).then(
                            function (res) {
                                scope.res = res;
                                //TODO: Fix modal
                                // modalInstance = $modal.open(opts);
                                $rootScope.$broadcast('message.sync.request.accepted', scope.res.message_id);
                            },
                            function (err) {
                                alert(err.data.error.message);
                                modalInstance.close();
                                $state.reload();
                            });
                    }
                }
            };
        }])

        .directive('declineSyncRequest', ['$modal', '$state', 'Account', function ($modal, $state, Account) {
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
                        controller: ['$rootScope', function ($rootScope) {

                            scope.cancel = function () {
                                modalInstance.close();
                            };

                            scope.declineSync = function (uu_id, message_id) {

                                Account.declineSync(uu_id).then(
                                    function (res) {
                                        modalInstance.close();

                                        // Fire event for remove message of declined guardian.
                                        $rootScope.$broadcast('message.sync.request.declined', message_id);
                                    },
                                    function (err) {
                                        alert(err.data.error.message);
                                        modalInstance.close();
                                        $state.reload();
                                    });
                            }
                        }]
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);
                    });
                }
            };
        }])
})();
