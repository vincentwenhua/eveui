(function () {
    'use strict';

    angular.module('iaAlert', [])
        .factory('Alert', ['Restangular', function (Restangular) {
            var alerts = {
                all: [],
                friends: []
            };

            /**
             * Trigger an alert for member.
             *
             * @param alert
             * @returns {*}
             */
            var triggerAlert = function (alert) {
                return Restangular.all('alerts').post(alert);
            };

            /**
             * Get alert histories of the member.
             *
             * @param member_id
             * @returns {*|Array|ng.ui.IState|ng.ui.IState[]|Object|Mixed}
             */
            var getAlertHistory = function (member_id, page) {
                return Restangular.one('members', member_id).one('alerts').get({page: page || 0});
            };

            /**
             * Add alerts
             *
             * @param alert
             */
            var addAlert = function (alert) {

                if (!exist(alerts.all, alert)) {
                    alerts.all.push(decorate(alert));
                }

            };

             function verifyMemberById (member_id){
                Restangular.one('members', member_id).get().then(
                    function(res){
                        console.log(res);
                    },
                    function(err){
                        console.log(err);
                    }

                    )
                   
            }
            /**
             * get alert display limit
             *
             */
            var getLimit = function () {

                return 3;
            };


            /**
             * Add friend alerts.all.
             *
             * @param alert
             */
            var addFriendAlert = function(alert) {
                if (!exist(alerts.friends, alert)) {
                    alerts.friends.push(decorate(alert));
                }
            };

            /**
             * Check whether item in collection
             *
             * @param collection
             * @param item
             * @returns {boolean}
             */
            var exist = function (collection, item) {
                if (_.isEmpty(item)) {
                	return true;
                }

                return (_.findIndex(collection, function (alert) {
                    return item.id == alert.id && item.member.id == alert.member_id;
                })) !== -1;
            };

            /**
             * Decorate the alert object.
             *
             * @param alert
             * @returns {{id: (*|exports.expected.id|id|exports.expected.attribs.id|rs.id|creds.id), first_name: (*|document.editAccountForm.first_name|document.LoginHelpForm.first_name|getMember.first_name|getMember.additional_information.medical.first_name|getMember.additional_information.records.practitioner.first_name), last_name: (*|document.editAccountForm.last_name|document.LoginHelpForm.last_name|getMember.last_name|getMember.additional_information.medical.last_name|getMember.additional_information.records.practitioner.last_name), photo: (*|exports.SingularToPlural.photo|document.editAccountForm.photo|getMember.photo|document.registrationForm.photo|document.addMemberForm.photo), phone: *, alerted_at: (created_at|*), member_id: (*|exports.expected.id|id|exports.expected.attribs.id|rs.id|creds.id), location: (*|location|details.location|exports.browser.location|DOMLocator|f.location), token: (*|token|setup.token|raccsign.oauth.token|rupsign.oauth.token|S.token), show: boolean}}
             */
            var decorate = function (alert) {
                return {
                    id: alert.id,
                    email: alert.member.email,
                    type: alert.type,
                    first_name: alert.member.first_name,
                    last_name: alert.member.last_name,
                    photo: alert.member.photo,
                    phone: alert.angel,
                    alerted_at: alert.created_at,
                    member_id: alert.member.id,
                    location: alert.location,
                    url: alert.url,
                    token: alert.token,
                    show: true
                };
            };

            /**
             * Get all alerts include friend alerts.
             *
             * @returns {Array}
             */
            var getAlerts = function () {
                return alerts.all;
            };

            /**
             * Get exist friend alerts.
             *
             * @returns {Array}
             */
            var getFriendAlerts = function() {
                return alerts.friends;
            };

            /**
             * Get friend alerts.
             *
             * @param member_id
             * @returns {*}
             */
            var getFriendAlertsHistory = function(member_id, collection) {
                collection || (collection = 'friends');
                return _.filter(alerts[collection], {member_id: parseInt(member_id)});
            };

            var clearAll = function () {
                alerts = {
                    all: [],
                    friends: []
                };
            };

            return {
                triggerAlert: triggerAlert,
                getAlertHistory: getAlertHistory,
                addAlert: addAlert,
                getAlerts: getAlerts,
                decorate: decorate,
                exist: exist,
                getLimit: getLimit,
                verifyMemberById: verifyMemberById,

                // Friend alerts
                addFriendAlert: addFriendAlert,
                getFriendAlerts: getFriendAlerts,
                getFriendAlertsHistory: getFriendAlertsHistory,

                clearAll: clearAll
            };
        }])

        .filter('friendHistory', function() {
            var history = [];
            return function (input, key) {
                if (input) {
                    history = _.find(input, {member_id: parseInt(input.member_id)});
                    return history;
                }
            };
        });
})();
