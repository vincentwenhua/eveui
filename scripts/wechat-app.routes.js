(function () {
    'use strict';
				
					
    angular.module('iaApp.routes', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('base', {
                    name: 'base',
                    url: '',
                    templateUrl: 'partials/base.html',
                    controller: 'MainController',
                    abstract: true
                })
                .state('base.home', {
                    name: 'base.home',
                    parent: 'base',
                    url: '/?back&exit',
                    hideHeader: true,
                    params: {
                            back : {
                                value: null,
                                squash:true
                            },
                            exit : {
                                value: null,
                                squash:true
                            }
                    },
                    templateUrl: 'partials/home.html',
                    controller: 'MainController',
                    states: 'home'
                })

                .state('base.wct_ecp_invitation', {
                    name: 'base.wct_ecp_invitation',
                    url: '/:invitation_id/wct_ecp_invitation',
                    templateUrl: 'partials/login/wct_ecp_invitation.html',
                    controller: 'AuthController',
                    isLoggedIn: true,
                    isLoginPage: true,
                    states: 'ECPInvitation',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })
                .state('base.login', {
                    name: 'base.login',
					url: '/login?back&ref',
					
					//Vincent Start
					params: {
                    back : {
                        value: null,
                        squash:true
                    },
                    
                    ref:{
                        value: null,
                        squash: true
                    }
                },
                templateUrl: 'partials/login/normal-container.html',
                controller: 'AuthController',
                isLoggedIn: false,
                isLoginPage: true,
                states: 'login',
                ncyBreadcrumb: {
                    parent: 'base.home'
                }
            })

            .state('base.DEV_bind', {
                name: 'base.DEV_bind',
                url: '/DEV_bind?back&ref',
					//Vincent End
                     params: {
                            back : {
                                value: null,
                                squash:true
                            },
                            
                            ref:{
                                value: null,
                                squash: true
                            }
                    },
					templateUrl: 'partials/login/DEV_bind_login.html',//Vincent
                    controller: 'AuthController',
                    isLoggedIn: false,
                    isLoginPage: true,
                    states: 'login',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

				//Vincent Start
		    .state('base.wct_login', {
             name: 'base.wct_login',
             url: '/wct_login?back&ref',
             params: {
                 back : {
                     value: null,
                     squash:true
                 },
                 
                 ref:{
                     value: null,
                     squash: true
                 }
             },
             templateUrl: 'partials/login/wct_login.html',
             controller: 'AuthController',
             isLoggedIn: false,
             isLoginPage: true,
             states: 'login',
             ncyBreadcrumb: {
                 parent: 'base.home'
             }
         })

         .state('base.ACC_bind', {
             name: 'base.ACC_bind',
             url: '/ACC_bind',
             templateUrl: 'partials/login/ACC_bind.html',
             controller: 'AuthController',
             isLoggedIn: false,
             isLoginPage: true,
             states: 'login',
             ncyBreadcrumb: {
                 parent: 'base.home'
             }
         })
         .state('base.map-login', {
             name: 'base.map-login',
             url: '/map-login',
             templateUrl: 'partials/map/map-login.html',
             controller: 'AuthController',
             isLoggedIn: false,
             isLoginPage: true,
             states: 'map'
         })
				//Vincent End

                .state('base.auth', {
                    name: 'base.auth',
                    url: '/auth/:token',
                    templateUrl: 'partials/login/auth.html',
                    controller: 'AuthTokenController',
                    states: 'login',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

				//Vincent Start
				.state('base.registration.wct_sign_up', {
               name: 'registration.wct_sign_up',
               url: '/wct_sign_up',
               views: {
                   'register@base.registration': {
                       templateUrl: 'partials/account/registration/wct_sign_up.html'
                   }
               },
               isLoggedIn: false,
               states: 'register',
               ncyBreadcrumb: {
                   skip: true
               }
           })
            .state('base.registration.wct_ecp_registration', {
                name: 'registration.wct_ecp_registration',
                url: '/:invitation_id/wct_ecp_registration',
                views: {
                    'register@base.registration': {
                        templateUrl: 'partials/account/registration/wct_ecp_registration.html'
                    }
                },
                isLoggedIn: false,
                states: 'ECPInvitation',
                ncyBreadcrumb: {
                    skip: true
                }
            })
           .state('base.registration.wct_active', {
               name: 'registration.wct_active',
               url: '/wct_active',
               views: {
                   'register@base.registration': {
                       templateUrl: 'partials/account/registration/wct_active.html'
                   }
               },
               isLoggedIn: false,
               states: 'active-account',
               ncyBreadcrumb: {
                   skip: true
               }
           })
				//Vincent End

                .state('base.registration', {
                    name: 'base.registration',
                    url: '/registration',
                    templateUrl: 'partials/account/registration/form.html',
                    controller: 'RegisterAccountController',
                    isLoggedIn: false,
                    states: 'register',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('base.registration.register', {
                    name: 'registration.register',
                    url: '/register',
                    views: {
                        'register@base.registration': {
                            templateUrl: 'partials/account/registration/register.html'
                        }
                    },
                    isLoggedIn: false,
                    states: 'register',
                    ncyBreadcrumb: {
                        skip: true
                    }
                })

                .state('base.registration.active-account', {
                    name: 'registration.active-account',
                    url: '/active-account?invitation',
                    params: {
                        'invitation': {
                            value: null,
                            squash:true
                        }
                    },
                    views: {
                        'register@base.registration': {
                            templateUrl: 'partials/account/registration/active-account.html'
                        }
                    },
                    isLoggedIn: false,
                    states: 'active-account',
                    ncyBreadcrumb: {
                        skip: true
                    }
                })

                // Active account notify url.
                .state('account-active', {
                    name: 'account-active',
                    url: '/account/active',
                    controller: 'ActiveAccountController',
                    states: 'account-active',
                    isLoggedIn: false,
                    data: {
                        title: 'Active Account'
                    }
                })

                .state('base.resend-active-email', {
                    name: 'base.resend-active-email',
                    url: '/resend/active-email',
                    isLoggedIn: false,
                    states: 'resend-active-email',
                    templateUrl: 'partials/account/resend-active-email/form.html',
                    controller: 'ResendActiveEmailController',
                    ncyBreadcrumb: {
                        parent: 'base.login'
                    }
                })

                .state('base.forgot-password', {
                    name: 'forget-password',
                    url: '/forget-password',
                    templateUrl: 'partials/account/forget-password/form.html',
                    controller: 'ForgetPasswordController',
                    isLoggedIn: false
                })

                .state('base.forgot-password.email', {
                    name: 'forget-password.email',
                    url: '/email',
                    views: {
                        'forgetPassword@base.forgot-password': {
                            templateUrl: 'partials/account/forget-password/email.html'
                        }
                    },
                    isLoggedIn: false,
                    states: 'forget-password-1',
                    ncyBreadcrumb: {
                        parent: 'base.login'
                    }
                })

                .state('base.forgot-password.question1', {
                    name: 'forget-password.question1',
                    url: '/question1',
                    views: {
                        'forgetPassword@base.forgot-password': {
                            templateUrl: 'partials/account/forget-password/question1.html'
                        }
                    },
                    isLoggedIn: false,
                    states: 'forget-password-2',
                    ncyBreadcrumb: {
                        parent: 'base.login'
                    }
                })

                .state('base.forgot-password.question2', {
                    name: 'forgot-password.question2',
                    url: '/question1',
                    views: {
                        'forgetPassword@base.forgot-password': {
                            templateUrl: 'partials/account/forget-password/question2.html'
                        }
                    },
                    isLoggedIn: false,
                    states: 'forget-password-2',
                    ncyBreadcrumb: {
                        parent: 'base.login'
                    }
                })

                .state('base.forgot-password.success', {
                    name: 'forgot-password.success',
                    url: '/success',
                    views: {
                        'forgetPassword@base.forgot-password': {
                            templateUrl: 'partials/account/forget-password/success.html'
                        }
                    },
                    isLoggedIn: false,
                    states: 'forget-password-3',
                    ncyBreadcrumb: {
                        parent: 'base.login'
                    }
                })

                .state('base.reset-password', {
                    name: 'reset-password',
                    url: '/password/reset/:reset_code',
                    templateUrl: 'partials/account/forget-password/password-reset.html',
                    controller: 'ResetPasswordController',
                    isLoggedIn: false,
                    states: 'reset-password',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('base.trigger-alert', {
                    name: 'trigger-alert',
                    url: '/trigger-alert',
                    templateUrl: 'partials/alert/form.html',
                    controller: 'TriggerAlertController'
                })

                .state('base.trigger-alert.iceid', {
                    views: {
                        'triggerAlert@base.trigger-alert': {
                            templateUrl: 'partials/alert/iceid.html'
                        }
                    },
                    name: 'trigger-alert.iceid',
                    url: '/iceid',
                    states: 'trigger-alert-1',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('base.trigger-alert.contacts', {
                    views: {
                        'triggerAlert@base.trigger-alert': {
                            templateUrl: 'partials/alert/contacts.html'
                        }
                    },
                    name: 'alert-contacts',
                    url: '/contacts',
                    states: 'trigger-alert-2',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('base.trigger-alert.success', {
                    views: {
                        'triggerAlert@base.trigger-alert': {
                            templateUrl: 'partials/alert/success.html'
                        }
                    },
                    name: 'alert-success',
                    states: 'trigger-alert-3',
                    url: '/success',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                // View friend in need profile.
                .state('base.shared-profile',{
                    name: 'base.shared-profile',
                    url: '/members/public/:profile_token',
                    templateUrl: 'partials/member/preview-profile.html',
                    controller: 'ViewSharedProfileController',
                    showAlertsHistory: true,
                    //isLoggedIn: false,
                    states: 'view-shared-profile',
                    resolve: {
                        member: ['$q','$stateParams', '$location', 'Account','$state', '$rootScope', function ($q,$stateParams, $location, Account, $state, $rootScope) {

                            var deferred = $q.defer();

                               Account.getSharedProfile($stateParams.profile_token).then(
                                    function(res) {
                                        deferred.resolve(res);
                                    },
                                    function(err) {
                                        $rootScope.linkExpired = true;
                                        $state.transitionTo('base.home', {});
                                    }
                                );

                            return deferred.promise;

                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'account.show'
                    }
                })

				//Vincent Start
				.state('base.shared-profile-wechat',{
                name: 'base.shared-profile-wechat',
                url: '/members/public/shared-profile-wechat',
                templateUrl: 'partials/member/preview-profile.html',
                controller: 'ViewSharedProfileController',
                showAlertsHistory: true,
                //isLoggedIn: false,
                states: 'view-shared-profile',
                resolve: {
                    member: ['$q','$stateParams', '$location', 'Account','$state', '$rootScope', function ($q,$stateParams, $location, Account, $state, $rootScope) {

                        var deferred = $q.defer();

                        // Account.getSharedProfile($stateParams.profile_token).then(
                        //     function(res) {
                        //         deferred.resolve(res);
                        //     },
                        //     function(err) {
                        //         $rootScope.linkExpired = true;
                        //         $state.transitionTo('base.home', {});
                        //     }
                        // );

                        return deferred.promise;

                    }]
                },
                ncyBreadcrumb: {
                    parent: 'account.show'
                }
            })
				//Vincent End

                /**
                 * Account route
                 */
                .state('account', {
                    name: 'account',
                    abstract: true,
                    url: '/account?back',
                    params: {
                            back : {
                                value: null,
                                squash:true
                            }
                    },
                    templateUrl: 'partials/base.html',
                    controller: 'AccountController',
                    isLoggedIn: true,
                    isPartner:true,
                    visibleUnsync:true,
					showAlerts: true //Vincent
                })

                .state('account.show', {
                    name: 'account.show',
                    url: '',
                    templateUrl: 'partials/account/show.html',
                    isLoggedIn: true,
                    isPartner:false,
                    showAlerts: true,
                    visibleUnsync:true,
					states: 'my-account'
                })

                .state('base.partner', {

                    name: 'base.partner',
                    url: '/partner',
                    templateUrl: 'partials/partner/partner.html',
                    controller: 'PartnerController',
                    isLoggedIn: true,
                    isPartner:true,
                    showAlerts: true,
                    states: 'show-partner'
                })

                .state('account.settings', {
                    name: 'account.settings',
                    url: '/settings?ref',
                    params: {
                            ref : {
                                value: null,
                                squash:true
                            }
                    },
                    templateUrl: 'partials/account/settings.html',
                    controller: 'SecurityRedirectController',
                    isLoggedIn: true,
                    isPartner:true,
                    showAlerts: true,
                    states: 'account-settings',
                    ncyBreadcrumb: {
                        parent: 'account.show'
                    }
                })
				//Vincent Start
				.state('base.woaqrcode', {
                 name: 'base.woaqrcode',
                 parent: 'base',
                 url: '/woaqrcode',
                 templateUrl: 'partials/wechat/woaqrcode.html',
                 controller: 'WoaQrcode'
             })
             .state('base.map', {
                 name: 'base.map',
                 parent: 'base',
                 url: '/map/:alert_id',
                 templateUrl: 'partials/map/map.html',
                 controller: 'ShowMapInfo',
                 isLoggedIn: true,
                 states: 'map'
             })

				//Vincent End

                .state('account.change-email', {
                    name: 'account.change-email',
                    url: '/change-email',
                    templateUrl: 'partials/account/change-email/form.html',
                    controller: 'ChangeEmailController',
                    isLoggedIn: true,
                    showAlerts: true,
                    states: 'change-email',
                    ncyBreadcrumb: {
                        parent: 'account.settings'
                    }
                })

                // View friend in need profile.
                .state('account.friend-in-need-profile',{
                    name: 'account.friend-in-need-profile',
                    url: '/members/profile/:profile_token',
                    templateUrl: 'partials/member/share-third-party.html',
                    controller: 'ViewFinProfileController',
                    showAlertsHistory: true,
                    isLoggedIn: true,
                    states: 'friend-in-need-profile',
                    resolve: {
                        member: ['$stateParams', 'Account', function($stateParams, Account) {
                            return Account.getSharedProfile($stateParams.profile_token);
                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'account.show'
                    }
                })

                // Share friend in need profile.
                .state('account.share-friend-in-need-profile',{
                    name: 'account.share-friend-in-need-profile',
                    url: '/members/profile/:profile_token/share',
                    templateUrl: 'partials/member/share-profile.html',
                    controller: 'ShareViewFinProfileController',
                    isLoggedIn: true,
                    states: 'share-friend-in-need-profile',
                    resolve: {
                        member: ['$stateParams', 'Account', function($stateParams, Account) {
                            return Account.getSharedProfile($stateParams.profile_token);
                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'account.friend-in-need-profile'
                    }
                })

                .state('account.preview-friend-in-need-profile',{
                    name: 'account.preview-friend-in-need-profile',
                    url: '/members/profile/:profile_token/preview',
                    templateUrl: 'partials/member/preview-profile.html',
                    controller: 'PreviewFinProfileController',
                    isLoggedIn: true,
                    states: 'preview-profile',
                    resolve: {
                        member: ['$stateParams', 'Account', function($stateParams, Account) {
                            return Account.getSharedProfile($stateParams.profile_token);
                        }],
                        permission: ['PermissionService', function(PermissionService) {
                            return PermissionService.getTempPermission();
                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'account.friend-in-need-profile'
                    }
                })

                .state('account.security-questions', {
                    name: 'account.security-questions',
                    url: '/security-questions',
                    templateUrl: 'partials/account/security-questions/form.html',
                    controller: 'ChangeSecurityQuestionsController',
                    isLoggedIn: true,
                    data: {
                        title: 'Change Security Questions'
                    },
                    ncyBreadcrumb: {
                        label: 'Change Security Questions',
                        parent: 'account.settings'
                    }
                })

                .state('account.security-questions.question1', {
                    name: 'account.security-questions.question1',
                    url: '/question1',
                    views: {
                      'securityQuestions@account.security-questions': {
                          templateUrl: 'partials/account/security-questions/question1.html'
                      }
                    },
                    isLoggedIn: true,
                    states: 'change-security-question-1',
                    ncyBreadcrumb: {
                        parent: 'account.settings'
                    }
                })

                .state('account.security-questions.question2', {
                    name: 'account.security-questions.question2',
                    url: '/question2',
                    views: {
                        'securityQuestions@account.security-questions': {
                            templateUrl: 'partials/account/security-questions/question2.html'
                        }
                    },
                    isLoggedIn: true,
                    states: 'change-security-question-2',
                    ncyBreadcrumb: {
                        parent: 'account.settings'
                    }
                })

                .state('account.security-questions.update', {
                    name: 'account.security-questions.update',
                    url: '/update',
                    views: {
                        'securityQuestions@account.security-questions': {
                            templateUrl: 'partials/account/security-questions/update.html'
                        }
                    },
                    isLoggedIn: true,
                    states: 'update-security-questions',
                    data: {
                        title: 'Update Security Questions'
                    },
                    ncyBreadcrumb: {
                        label: 'Update Security Questions',
                        parent: 'account.settings'
                    }
                })

                .state('account.edit', {
                    name: 'account.edit',
                    url: '/edit',
                    templateUrl: 'partials/account/edit.html',
                    controller: 'EditAccountController',
                    isLoggedIn: true,
                    showAlerts: true,
                    isPartner:true,
                    states: 'account-edit',
                    ncyBreadcrumb: {
                        parent: 'account.show'
                    }
                })

                .state('account.member', {
                    name: 'account.member',
                    url: '/member',
                    templateUrl: 'partials/member/member.html',
                    controller: 'AddMemberController',
                    isLoggedIn: true,
                    showAlerts: true,
                    states: 'new-member',
                    ncyBreadcrumb: {
                        parent: 'account.show'
                    }
                })

                .state('account.viewMember', {
                    name: 'account.viewMember',
                    url: '/member/:member_id',
                    templateUrl: 'partials/member/show.html',
                    controller: 'ShowMemberController',
                    isLoggedIn: true,
                    showAlerts: false,
                    showAlertsHistory: true,
                    showAddEcpAlert: true,
                    states: 'view-member',
                    ncyBreadcrumb: {
                        parent: 'account.show'
                    }
                })

                .state('account.editMember', {
                    name: 'member',
                    url: '/member/:member_id/edit',
                    templateUrl: 'partials/member/member.html',
                    controller: 'EditMemberController',
                    isLoggedIn: true,
                    showAlerts: false,
                    showAlertsHistory: true,
                    showAddEcpAlert: true,
                    states: 'edit-member',
                    data: {
                        title: 'Edit Member',
                        title_zh: '编辑成员'
                    },
                    ncyBreadcrumb: {
                        parent: 'account.viewMember'
                    }
                })

                .state('account.viewMemberHistory', {
                    name: 'account.viewMemberHistory',
                    url: '/member/:member_id/history',
                    templateUrl: 'partials/member/history.html',
                    controller: 'ViewMemberHistoryController',
                    isLoggedIn: true,
                    states: 'view-member-history',
                    ncyBreadcrumb: {
                        parent: 'account.viewMember'
                    }
                })

                .state('account.setEcpPermission', {
                    name: 'account.setEcpPermission',
                    url: '/member/:member_id/ecp/:contact_id/permission',
                    templateUrl: 'partials/member/ecp-permission.html',
                    controller: 'EcpPermissionController',
                    isLoggedIn: true,
                    states: 'set-ecp-permission',
                    resolve: {
                        permission: ['$q', '$stateParams', 'Account', 'PermissionService', function($q, $stateParams, Account, PermissionService) {
                            var deferred = $q.defer();

                            Account.getEmergencyContactPermission($stateParams.member_id, $stateParams.contact_id).then(
                                function(res) {
                                    res.permissions = res.permissions || {};

                                    /* This block keeps checked permissions state between pages (removed) */

                                    // if (PermissionService.checkEcpPreviewed($stateParams.member_id, $stateParams.contact_id) && PermissionService.getEcpPreviewPermission($stateParams.member_id, $stateParams.contact_id)) {
                                    //     res.permissions = PermissionService.process(PermissionService.getEcpPreviewPermission($stateParams.member_id, $stateParams.contact_id), true);
                                    // }

                                    /* end block */

                                    deferred.resolve(res.permissions);
                                },
                                function(err) {
                                    console.log('ECP Permissions Error');
                                }
                            );

                            return deferred.promise;
                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'account.editMember'
                    }
                })

                .state('account.share-profile', {
                    name: 'account.share-profile',
                    url: '/member/:member_id/share-profile',
                    templateUrl: 'partials/member/share-profile.html',
                    controller: 'ShareMemberProfileController',
                    isLoggedIn: true,
                    states: 'share-member-profile',
                    resolve: {
                        permission: ['PermissionService', '$stateParams', function(PermissionService, $stateParams) {
                            return PermissionService.getPreviewPermission($stateParams.member_id) || {};
                        }]
                    },
                    data: {
                        title: 'Share Profile'
                    },
                    ncyBreadcrumb: {
                        label: 'Share {{member.first_name}}\'s profile',
                        parent: 'account.viewMember'
                    }
                })

                .state('account.preview-profile', {
                    name: 'preview-profile',
                    url: '/member/:member_id/preview-profile',
                    templateUrl: 'partials/member/preview-profile.html',
                    controller: 'PreviewProfileController',
                    isLoggedIn: true,
                    states: 'preview-profile',
                    resolve: {
                        permission: function($stateParams, PermissionService) {
                            return PermissionService.getPreviewPermission($stateParams.member_id);
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'account.viewMember'
                    }
                })

                .state('account.ecp-preview-profile', {
                    name: 'preview-profile',
                    url: '/member/:member_id/ecp/:contact_id/preview-profile',
                    templateUrl: 'partials/member/preview-profile.html',
                    controller: 'PreviewProfileController',
                    isLoggedIn: true,
                    states: 'preview-profile',
                    resolve: {
                        permission: ['$stateParams', 'PermissionService', function($stateParams, PermissionService) {
                            return PermissionService.getEcpPreviewPermission($stateParams.member_id, $stateParams.contact_id) ? PermissionService.getEcpPreviewPermission($stateParams.member_id, $stateParams.contact_id): PermissionService.getPermission($stateParams.member_id, $stateParams.contact_id);
                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'account.viewMember'
                    }
                })

                .state('account.showGuardians', {
                    name: 'guardians',
                    url: '/guardians',
                    templateUrl: 'partials/guardian/show.html',
                    controller: 'ShowGuardianController',
                    isLoggedIn: true,
                    resolve: {
                        guardians: ['Account', function(Account) {
                            return Account.getAllGuardians();
                        }]
                    },
                    states: 'guardians',
                    ncyBreadcrumb: {
                        parent: 'account.show'
                    }
                })

                .state('account.friends', {
                    name: 'friends',
                    url: '/friends',
                    templateUrl: 'partials/account/friends.html',
                    controller: 'ShowAccountFriendsController',
                    isLoggedIn: true,
                    states: 'friends',
                    resolve: {
                        friends: ['Account', function(Account) {
                          return Account.getFriends();
                        }]
                    },
                    data: {
                        title: 'Friends'
                    },
                    ncyBreadcrumb: {
                        label: 'Friends',
                        parent: 'account.show'
                    }
                })

                .state('account.messages', {
                    name: 'messages',
                    url: '/messages',
                    templateUrl: 'partials/account/messages.html',
                    controller: 'ShowAccountMessagesController',
                    isLoggedIn: true,
                    isPartner: true,
                    states: 'messages',
                    resolve: {
                        messages: ['Account', function(Account) {
                            return Account.getCurrentMessages();
                        }]
                    },
                    data: {
                        title: 'Message Center'
                    },
                    ncyBreadcrumb: {
                        label: 'Message Center',
                        parent: 'account.show'
                    }
                })

                /***************************
                 * Panic Section
                 ***************************/
                .state('account.panic-setup', {
                    name: 'account.panic-setup',
                    url: '/panic',
                    templateUrl: 'partials/panic/setup-scan.html',
                    controller: 'PanicController',
                    showAlerts: false,
                    states: 'panic-setup',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('account.unsync', {
                    name: 'account.unsync',
                    url: '/unsync',
                    templateUrl: 'partials/panic/unsync-panic.html',
                    controller: 'PanicController',
                    showAlerts: false,
                    states: 'unsync',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('account.waiting-sync-approve', {
                    name: 'account.waiting-sync-approve',
                    url: '/panic-sync-confirm/:ice_id',
                    templateUrl: 'partials/panic/panic-sync-confirm.html',
                    controller: 'SyncWaitingApproveController',
                    showAlerts: false,
                    states: 'waiting-sync-approve',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('trigger-panic', {
                    name: 'trigger-panic',
                    url: '/trigger-panic',
                    templateUrl: 'partials/panic/trigger-panic.html',
                    controller: 'TriggerPanicController',
                    showAlerts: false,
                    states: 'trigger-panic',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('trigger-panic-success', {
                    name: 'trigger-panic-success',
                    url: '/trigger-success',
                    templateUrl: 'partials/panic/trigger-success.html',
                    controller: 'TriggerPanicSuccessController',
                    showAlerts: false,
                    hideHeader: true,
                    states: 'trigger-panic-success',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                /*******************************
                 * Static pages
                 *******************************/
                .state('base.terms', {
                    name: 'terms',
                    url: '/terms',
                    templateUrl: 'partials/static/terms.html',
                    states: 'terms',
                    controller: 'PagesController',
                    resolve: {
                        pages: ['iaPages', function(iaPages) {
                            return iaPages.get('terms');
                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('base.privacy', {
                    name: 'privacy',
                    url: '/privacy',
                    templateUrl: 'partials/static/privacy.html',
                    states: 'privacy',
                    controller: 'PagesController',
                    resolve: {
                        pages: ['iaPages', function(iaPages) {
                            return iaPages.get('privacy');
                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('base.about', {
                    name: 'base.about',
                    url: '/about-iceangel?back',
                    params: {
                            back : {
                                value: null,
                                squash:true
                            }
                    },
                    templateUrl: 'partials/static/about-iceangel.html',
                    states: 'about',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('base.aboutus', {
                    name: 'base.aboutus',
                    url: '/aboutus',
                    templateUrl: 'partials/static/aboutus.html',
                    states: 'aboutus',
                    controller: 'PagesController',
                    resolve: {
                        pages: ['iaPages', function(iaPages) {
                            return iaPages.get('about');
                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })

                .state('base.contactus', {
                    name: 'base.contactus',
                    url: '/contactus',
                    templateUrl: 'partials/static/contactus.html',
                    controller: 'HelpController',
                    states: 'contactus',
                    ncyBreadcrumb: {
                        label: 'Contact US'
                    }
                })

                .state('base.faq', {
                    name: 'faq',
                    url: '/faq',
                    templateUrl: 'partials/static/faq.html',
                    states: 'faq',
                    controller: 'PagesController',
                    resolve: {
                        pages: ['iaPages', function(iaPages) {
                            return iaPages.get('faq');
                        }]
                    },
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                })
                .state('base.loginWechat', {
                    name: 'base.loginWechat',
                    url: '/login-wechat',
                    controller: 'LoginWechatController',
                    isLoggedIn: false,
                    isLoginPage: true,
                    states: 'loginWechat',
                    ncyBreadcrumb: {
                        parent: 'base.home'
                    }
                });

                $urlRouterProvider.when('/account/alerts', '/account');
        }]);
})
();
