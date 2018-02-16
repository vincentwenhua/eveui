(function () {
    'use strict';

    angular.module('iaContact', [])
        .directive('addContact', ['$modal', 'Account', function ($modal, Account) {
            return {
                restrict: 'EA',
                link: function (scope, elem, attrs) {
                    var modalInstance = null;
                    var templates = {
                        add: 'partials/contact/templates/addContact.html',
                        success: 'partials/contact/templates/addContactSuccess.html'
                    };

                    var opts = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: templates.add,
                        scope: scope,
                        controller: ['$rootScope', function ($rootScope) {
                            var errors = [];
                            scope.errors = [];
                            $rootScope.emeCount = 0;

                            scope.slideTo = function (content) {

                                scope.modalContent = content;								
								 scope.modalContent == "wechatNomination" && $(".modal-dialog").addClass('wechat-popupcon');//Vincent
                                 scope.modalContent != "wechatNomination" && $(".modal-dialog").removeClass('wechat-popupcon');//Vincent
                            };
                            
                            scope.refresh = function(){
                                var body = angular.element(document).find('body').eq(0);
                                if (body[0].className == "modal-open") {

                                    var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer = angular.element(document).find('div.modal').eq(0);

                                    body.removeClass("modal-open");
                                    layer.remove();
                                    modalLayer.remove();
                                }
                                
                            }
                            
                            scope.ok = function () {
                                modalInstance.close();
                                scope.refresh();
                            };

                            scope.cancel = function () {
                                modalInstance.close();
                                scope.refresh();
                            };

                            scope.ecpCount = function(){
                                var contacts = scope.member.contacts;
                                contacts = _.uniq(contacts);
                                $rootScope.emeCount = contacts.length;
                            };

                            scope.nominateSelf = function (member_id, account_id) {
                                Account.nominateSelfContact(member_id, account_id).then(
                                    function (res) {
                                        scope.member.contacts.push(res);   //  adding one extra contact as contact already added
                                        modalInstance.close();
                                        scope.refresh();
                                        scope.ecpCount();
                                    },
                                    function (err) {
                                        errors = [];
                                        errors.push(err.data.error);
                                        scope.errors = errors;
                                    });
                            };

                            scope.sendEmailNomination = function (member_id, email) {
                                Account.sendContactEmailNomination(member_id, email).then(
                                    function (res) {
                                        scope.member.contacts.push(res);    //  adding one extra contact as contact already added
                                        modalInstance.close();
                                        success.scope.contact = res;
                                        modalInstance = $modal.open(success);
                                        scope.ecpCount();
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

                    var success = {
                        backdrop: true,
                        backdropClick: true,
                        dialogFade: false,
                        keyboard: true,
                        size: attrs.size,
                        templateUrl: templates.success,
                        scope: scope,
                        controller: function () {
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

        .directive('removeContact', ['$state', '$modal', 'Account', function ($state, $modal, Account) {
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
                                if (scope.contact.status == 'accepted') {
                                    Account.removeContact(scope.member.id, scope.contact.id, scope.$index).then(
                                        function (res) {
                                            scope.member.contacts.splice(scope.$index, 1);   // remove extra contact as contact already deleted.
                                            modalInstance.close();
                                        },
                                        function (err) {
                                            alert(err.data.error.message);
                                            modalInstance.close();
                                            $state.reload();
                                        });
                                } else {
                                    Account.cancelContact(scope.member.id, scope.contact.email, scope.$index).then(
                                        function (res) {
                                            scope.member.contacts.splice(scope.$index, 1);
                                            modalInstance.close();
                                        },
                                        function (err) {
                                            alert(err.data.error.message);
                                            modalInstance.close();
                                            $state.reload();
                                        });
                                }
                            };
                        }
                    };

                    elem.on('click', function () {
                        modalInstance = $modal.open(opts);

                        modalInstance.result.then(function (res) {
                            scope.modalContent = 'default';
                        }, function (err) {
                            scope.modalContent = 'default';
                        });
                    });
                }
            };
        }])

        .directive('acceptContactRequest', ['$rootScope', '$state', '$modal', 'Account', function ($rootScope, $state, $modal, Account) {
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

                            scope.ok = function () {
                                modalInstance.close();

                                // Fire event for remove message of accepted guardian.
                                $rootScope.$broadcast('message.contact.request.accepted', scope.res.message_id);
                            };
                        }
                    };

                    scope.acceptContact = function (request_id, message_id) {

                        Account.acceptContactRequest(request_id, message_id).then(
                            function (res) {
                                scope.res = res;
                                modalInstance = $modal.open(opts);
                            },
                            function (err) {
                                alert(err.data.error.message);
                                $state.reload();
                            });
                    }
                }
            };
        }])

        .directive('declineContactRequest', ['$state', '$modal', 'Account', function ($state, $modal, Account) {
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
                                $state.transitionTo('account.messages', {}, {reload: true});
                            };

                            scope.declineContact = function (request_id, message_id, reason) {
                                Account.declineContactRequest(request_id, reason).then(
                                    function (res) {
                                        modalInstance.close();

                                        // Fire event for remove message of declined contact.
                                        $rootScope.$broadcast('message.contact.request.declined', message_id);
                                    },
                                    function (err) {
                                        alert(err.data.error.message);
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

        .directive('removeContactFor', ['$state', '$modal', 'Account', function ($state, $modal, Account) {
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

                                Account.removeContactFor(scope.contact.id, scope.$index).then(
                                    function (res) {
                                        if (angular.element(elem).parent().hasClass('member-alert-triggered')) {
                                            angular.element(elem).parent().removeClass('member-alert-triggered');
                                        }

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
        }]);
})();
