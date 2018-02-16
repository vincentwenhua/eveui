(function () {
    'use strict';

    angular.module('iaMember', [])

        .controller('MemberHelperController', function($rootScope, $scope, $state, $stateParams, Account, Alert, locale, MEDIA_BASE, CountriesUtils) {
            $rootScope.isMobile = false;
            angular.element(document).ready(function () {
                 if(jQuery.browser && jQuery.browser.mobile){
                    $rootScope.isMobile = true;
                }
            });
            $scope.isVisible = function isElementInViewport (el) {

                    if (typeof jQuery === "function" && el instanceof jQuery) {
                        el = el[0];
                    }

                    var rect = el.getBoundingClientRect();

                    return (
                        rect.top >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 /*or $(window).height() */
                    );
            }

            $scope.locationTracking = false;

            $scope.expandTab = function(){
                angular.element('.panel-collapse').collapse('show');
                $scope.addInfoItems('Insurance', 'Insurances');
                $scope.addInfoItems('Medical', 'Doctors');
                $scope.addInfoItems('Medical', 'Allergies');
                $scope.addInfoItems('Medical', 'Medications');
                $scope.addInfoItems('Medical', 'Immunizations');
                $scope.addInfoItems('Medical', 'Medical_conditions');
                $scope.addInfoItems('Medical', 'Surgical_history');
                $scope.addInfoItems('Medical', 'Family_medical_history');
                $scope.addInfoItems('Records', 'Emergency_messages');
                $scope.addInfoItems('Records', 'Hospital_records');
            }

            $scope.collapseTab = function(){
                angular.element('.panel-collapse').collapse('hide');
            }
            $scope.storeScroll = function(){
                if ($state.current.name == 'account.viewMember'){
                    var tab = $rootScope['tabGroup'];
                    if (tab){
                        $rootScope.editPosition =
                            _.isNull(angular.element('#collapse'+tab['tab'])) ?
                                        angular.element('#collapse'+tab['tab']).position().top :
                                        angular.element('#collapse'+tab['group']).position().top;

                        $rootScope.editPosition += (window.innerHeight || document.documentElement.clientHeight);

                    }else {
                        $rootScope.editPosition = window.scrollY + (window.scrollY > 500 ? 480 : 0 );
                    }
                }
                $scope.dockEditFooter();
            }

            $scope.storeTab = function(groupName, tabName){
                if ($state.current.name == 'account.viewMember'){
                    $rootScope['tabGroup'] = {'group': groupName, 'tab': tabName};
                }
            }

            $scope.dockEditFooter = function(){
                if (jQuery.browser && !jQuery.browser.mobile && angular.element('#footer-include').css('display') !== 'none'){
                    setTimeout(function() {
                        $scope.isVisible(angular.element('#footer-include')) ? angular.element('#edit-footer').addClass('docked')
                                                                        : angular.element('#edit-footer').removeClass('docked');
                    }, 80); /* accordion transition completed */
                }
            }

            window.onscroll = function(){
                $scope.storeScroll();
            };

            var target;

            $scope.$on('$destroy', onDestroy);
            $scope.$watch('member', function (newVal) {
                $rootScope.member = newVal;
            });

            $scope.onAccountLoaded = Account.get()
                .then(function onAccountLoaded (account) {
                    if ($stateParams.member_id) {
                        updateMember(_.find(account.members, { id: parseInt($stateParams.member_id) }));
                    }
                });

            var deregister = $rootScope.$watch('account', function (newVal) {
                if (newVal && $stateParams.member_id) {
                    updateMember(_.find(newVal.members, { id: parseInt($stateParams.member_id) }));
                }
            });

            $scope.openImageLoad = false;

            $scope.onMemberLoaded = $scope.onAccountLoaded
                .then(function onMemberLoaded () {
                    $scope.openImage =  MEDIA_BASE + 'media/qr/iCE_' +$scope.member.ice_id+'.png';
                    $scope.openImageLoad = true;

                    if (!$scope.member) {
                        $state.transitionTo('account.show');
                        throw 'Member doesn\'t exist!';
                    }

                    $rootScope.alert_histories = Alert.getFriendAlertsHistory($scope.member.id, 'all') || [];

                    return $scope.member;
                });

            $scope.changeFrequencyUnit = function(index) {
                var medicalFrequency = angular.element(document).find('input.medication_frequency').eq(index);
                if($scope.member.additional_information.medical.medications[index]['frequency_unit'] == 6) {
                    medicalFrequency.val('');
                    $scope.member.additional_information.medical.medications[index]['frequency'] = null;
                }
                 if($scope.member.additional_information.medical.medications[index]['frequency_unit'] != 6) {
                    angular.element(document).find('input.medication_frequency').removeProp("disabled");
                }
            };

            $scope.getInsuranceCount = function(){
                   var total = 0;
                   if(!$rootScope.publicMode){
                        _.forEach($scope.permission.insurances, function(rec){
                        if(rec.company_name || rec.company_phone || rec.expiry_date || rec.insurance_type || rec.notes || rec.number || rec.plan_type){
                            total += 1;
                            }
                        });

                   }
                   else {
                        var grayout = angular.element(document).find('div.grayout').eq(0);
                        grayout.removeClass("grayout");
                        for(var i = 0; i < $scope.member.additional_information.insurances.length; i++){
                            if($scope.member.additional_information.insurances[i].insurance_type){
                            total ++;
                            }
                        }
                   }

                    return total;
            }

            $scope.getDoctorCount = function(){
                   var total = 0;
                   if(!$rootScope.publicMode){
                        for(var i = 0; i < $scope.permission.medical.doctors.length; i++){
                            var all = $scope.permission.medical.doctors[i].all;
                            total += all;
                        }
                   }
                   else {
                        var grayout = angular.element(document).find('div.grayout').eq(0);
                        grayout.removeClass("grayout");
                        for(var i = 0; i < $scope.member.additional_information.medical.doctors.length; i++){
                            if($scope.member.additional_information.medical.doctors[i].first_name || $scope.member.additional_information.medical.doctors[i].last_name){
                            total ++;
                            }
                        }
                   }

                    return total;
            }

            $scope.getBloodCount = function(){
                if($rootScope.publicMode){
                    return $scope.member.additional_information.medical.blood.blood_type ? 1 : 0;
                }
                else{
                    return $scope.permission.medical.blood.isAllSelected ? 1 : 0;
                }
            }

            $scope.getOrganDonorCount = function(){
                if($rootScope.publicMode){
                    return $scope.member.additional_information.medical.organ_donor.status ? 1 : 0;
                }
                else{
                    return $scope.permission.medical.organ_donor.isAllSelected ? 1 : 0;
                }
            }

             $scope.getLivingWillCount = function(){
                if($rootScope.publicMode){
                   var living_will = $scope.member.additional_information.records.living_will;
                    if(_.isNull(living_will) || !_.isUndefined(living_will)){
                       return (living_will.date || living_will.document || living_will.notes) ? 1 : 0;
                    }
                }
                else{
                    return $scope.permission.records.living_will.isAllSelected ? 1 : 0;
                }
            }

            $scope.getAllergiesCount = function(){
                   var total = 0;

                   if(!$rootScope.publicMode){
                    _.forEach($scope.permission.medical.allergies, function(rec){
                        if(rec.name || rec.notes || rec.reaction || rec.severity){
                            total += 1;
                        }
                    });

                   }
                   else {
                        var grayout = angular.element(document).find('div.grayout').eq(0);
                        grayout.removeClass("grayout");
                       for(var i = 0; i < $scope.member.additional_information.medical.allergies.length; i++){
                            if($scope.member.additional_information.medical.allergies[i].name){
                            total ++;
                            }
                        }
                   }

                    return total;
            }

            $scope.getMedicationCount = function(){
                var total = 0;
                if(!$rootScope.publicMode){
                    _.forEach($scope.permission.medical.medications, function(rec){
                        if(rec.dosage || rec.frequency || rec.from || rec.to || rec.name || rec.notes || rec.purpose || rec.status){
                            total += 1;
                        }
                    });

                }
                else {
                     var grayout = angular.element(document).find('div.grayout').eq(0);
                     grayout.removeClass("grayout");
                     for(var i = 0; i < $scope.member.additional_information.medical.medications.length; i++){
                        if($scope.member.additional_information.medical.medications[i].name){
                        total ++;
                        }
                    }
                }
                    return total;
            }

            $scope.getImmunizationCount = function(){
                var total = 0;
                if(!$rootScope.publicMode){
                    _.forEach($scope.permission.medical.immunizations, function(rec){
                        if(rec.date || rec.name || rec.notes || rec.series){
                            total += 1;
                        }
                    });
                }
                else {
                    var grayout = angular.element(document).find('div.grayout').eq(0);
                    grayout.removeClass("grayout");
                    for(var i=0; i<$scope.member.additional_information.medical.immunizations.length; i++){
                        if($scope.member.additional_information.medical.immunizations[i].name){
                            total++;
                        }
                    }
                }
                return total;
            }

            $scope.getSurgicalHistoryCount = function(){
                var total = 0;
                 if(!$rootScope.publicMode){
                    _.forEach($scope.permission.medical.surgical_history, function(rec){
                        if(rec.date || rec.notes || rec.reason || rec.type){
                            total += 1 ;
                        }
                    });

                  }
                 else {
                        var grayout = angular.element(document).find('div.grayout').eq(0);
                        grayout.removeClass("grayout");
                        for(var i=0; i<$scope.member.additional_information.medical.surgical_history.length; i++){
                            if($scope.member.additional_information.medical.surgical_history[i].type){
                                total ++;
                            }
                        }
                    }

                return total;
            }

            $scope.getMedicalConditionCount = function(){
                var total = 0;
                if(!$rootScope.publicMode){
                    _.forEach($scope.permission.medical.medical_conditions, function(rec){
                        if(rec.from || rec. to || rec.name || rec.status || rec.notes){
                            total += 1;
                        }
                    });
                }
                else{
                    var grayout = angular.element(document).find('div.grayout').eq(0);
                    grayout.removeClass("grayout");
                    for(var i=0; i<$scope.member.additional_information.medical.medical_conditions.length; i++){
                        if($scope.member.additional_information.medical.medical_conditions[i].name){
                            total ++;
                        }
                    }
                }
                return total;
            }

            $scope.getFamilyMedHistCount = function(){
                var total = 0;
                if(!$rootScope.publicMode){
                    _.forEach($scope.permission.medical.family_medical_history, function(rec){
                        if(rec.notes ||rec.relationship || rec.severity || rec.type){
                            total += 1;
                        }
                    });
                }
                else{
                    var grayout = angular.element(document).find('div.grayout').eq(0);
                    grayout.removeClass("grayout");
                    for(var i = 0; i<$scope.member.additional_information.medical.family_medical_history.length; i++){
                        if($scope.member.additional_information.medical.family_medical_history[i].type){
                            total ++;
                        }
                    }
                }
                return total;
            }

            $scope.getEmergencyMessages = function(){
                var total = 0;
                if(!$rootScope.publicMode){
                    for(var i=0; i<$scope.permission.records.emergency_messages.length; i++){
                        var all = $scope.permission.records.emergency_messages[i].file
                                    || $scope.permission.records.emergency_messages[i].notes ? 1 : 0;
                        total += all;
                    }
                }
                else{
                    var grayout = angular.element(document).find('div.grayout').eq(0);
                    grayout.removeClass("grayout");
                    for(var i=0; i<$scope.member.additional_information.records.emergency_messages.length; i++){
                        if($scope.member.additional_information.records.emergency_messages[i].file
                                || $scope.member.additional_information.records.emergency_messages[i].notes){
                            total ++;
                        }
                    }
                }
                return total;
            }

            $scope.getHospitalRecordsCount = function(){
                var total =0;
                if(!$rootScope.publicMode){
                    _.forEach($scope.permission.records.hospital_records, function(rec){
                        if (rec.date  || rec.category || rec.practitioner || rec.notes || rec.file){
                            total += 1;
                        }
                    });

                }
                else{
                    var grayout = angular.element(document).find('div.grayout').eq(0);
                    grayout.removeClass("grayout");

                    _.forEach($scope.member.additional_information.records.hospital_records, function(rec){
                        if (rec.date  || rec.category || rec.practitioner || rec.notes || rec.file){
                            total += 1;
                        }
                    });
                }
                return total;
            }





            $scope.changeType = function() {
                $scope.member.additional_information.medical.organ_donor.condition = null;
                $scope.member.additional_information.medical.organ_donor.card = null;
                $scope.member.additional_information.medical.organ_donor.notes = null;
            };

            $scope.hasSynced = function (devices){

                return _.isArray(devices) ? devices.length > 0 : 0;
            };

            $scope.editMode = function (){
                return $rootScope.editMode;
            };

            $scope.addInfoItems = function(groupName, tabName){

                var itemCount = tabName.toLowerCase() + '_item_count';

                if(_.isUndefined($scope[itemCount])){
                    $scope[itemCount] = 0;
                }

                $scope[itemCount] = groupName == 'Insurance' ? $scope.member.additional_information[tabName.toLowerCase()].length
                                         : $scope.member.additional_information[groupName.toLowerCase()][tabName.toLowerCase()].length;

                $scope.storeTab(groupName, tabName);

                $scope.dockEditFooter();

            }


            $scope.onMemberLoaded.then(function () {
                $scope.addMore = addMore;
                $scope.remove = remove;
                $scope.resetStatus = resetStatus;
                $scope.getFormData = getFormData;
                $scope.hasAdditionalInfo = hasAdditionalInfo;
                $scope.infoAvailable = infoAvailable;
                $scope.shouldShow = shouldShow;
                $scope.memberHasTwoContacts = memberHasTwoContacts;
                $scope.resendContactNomination = resendContactNomination;
                $scope.olderThen18 = olderThen18;
                $scope.goPermissionPage = goPermissionPage;
                $scope.showField = showField;
                $scope.hasPermission = hasPermission;
                $scope.getPermissionIndex = getPermissionIndex;
                $scope.sync = sync;
                $scope.unsync = unsync;

            });


            function onDestroy () {
                deregister();
            }

            function updateMember (newMember) {

                if (typeof(newMember) == 'object'){
                    $scope.member = angular.copy(newMember);
                } else {
                    $state.transitionTo('account.show', {});
                }

                if (typeof(newMember) == 'undefined') {
                    $state.transitionTo('account.show');
                    throw 'This member doesn\'t exists!';
                }

                if ($scope.member == null){
                    $scope.member = {
                      "additional_information":{}
                    };
                };

                target = $scope.member.additional_information || {};
            }

            var passports="passports",social_securities = "social_securities";

            function addMore (attribute, parent) {
                target = $scope.member.additional_information || {};

                if (angular.isUndefined(target[parent])) {
                    target[parent] = (attribute === parent) ? [] : {};
                }

                if (attribute === parent) {
                    target[parent].push({
                        company_phone:{
                            code: CountriesUtils.chinaCode()  // for china server making default
                        }
                    });                
                } else {
                    if(attribute!== passports && attribute!== social_securities){
                        if ((angular.isUndefined(target[parent][attribute]) || _.isEmpty(target[parent][attribute]))) {
                         target[parent][attribute].push({
                            phone:{
                                    code: CountriesUtils.chinaCode()  // for china server making default for doctor
                                }
                        });                        
                    }
                    else{   // for medical doctor
                          target[parent][attribute].push({
                            phone:{
                                    code: CountriesUtils.chinaCode()  // for china server making default for doctor
                                }
                        });
                    }
                    }

                    if(attribute === passports || attribute === social_securities){
                        if(target[parent][attribute] === false)
                            target[parent][attribute] = [];

                    target[parent][attribute].push({
                        nationality: CountriesUtils.chinaCode()  // for china server making default for ssn and passport
                    });
                }
                }

                $scope[attribute+'_item_count'] += 1;
            }

            /**
             * Remove data from scope.
             *
             * @param attribute
             * @param parent
             * @param index
             */
            function remove (attribute, parent, index) {
                if (attribute === parent) {
                    if (angular.isDefined(target[parent][index]['id'])) {
                        target[parent][index]['deleted'] = true;
                    } else {
                        target[parent].splice(index, 1) ;
                    }
                } else {
                    if (angular.isDefined(target[parent][attribute][index]['id'])) {
                        target[parent][attribute][index]['deleted'] = true;
                    } else {
                        target[parent][attribute].splice(index, 1);
                    }
                }

                $scope.memberForm.$submitted = false;
            }

            function resetStatus(attribute2, parent,attribute1)
            {
                target = $scope.member.additional_information || {};
                if(attribute2==='marital_status')
                {
                     target[parent][attribute2]=null;
                }
                else if(attribute1==='phone')
                {
                    target[parent][attribute2].number='';
                    target[parent][attribute2].code=null;
                }
                else
                {
                     target[parent][attribute2][attribute1]=null;
                }

                $scope.memberForm.$submitted = false;
            }

            function getFormData (attribute, parent, index) {
              var data = {};
              data.id = $scope.member.id;
              data.additional_information = {};

              if (attribute === parent) {
                data.additional_information[parent] = [];

                data.additional_information[parent].push(target[parent][index]);

              } else {
                data.additional_information[parent] = {};
                data.additional_information[parent][attribute] = [];

                data.additional_information[parent][attribute].push(target[parent][attribute][index]);
              }

              return data;
            }

            /**
             * Check whether scope value length > 0
             *
             * @param attribute
             * @param parent
             * @returns {boolean}
             */
            function hasAdditionalInfo (attribute, parent) {
                if (angular.isUndefined(target[parent])) {
                    return false;
                } else {
                    return (attribute === parent) ?
                            angular.isDefined(target[parent]) :
                            angular.isDefined(target[parent][attribute]);
                }
            }

            function infoAvailable (attribute, parent, index) {
                if (angular.isUndefined(index)) {
                    if (angular.isUndefined(target['permission']) || angular.isUndefined(target['permission']['category'])) {
                    	return false;
                    }

                    return angular.isUndefined(target['permission']['category'][parent]) || target['permission']['category'][parent];
                } else {
                    return attribute === parent ? target['permission'][parent][index] : target['permission'][parent][attribute][index];
                }
            }

            function shouldShow (attribute, parent, index) {
                return $scope.hasAdditionalInfo(attribute, parent) && $scope.infoAvailable(attribute, parent, index);
            }

            function memberHasTwoContacts (member) {
                return member.contacts.length === 2;
            }

            function resendContactNomination (member_id, contact_email) {
                Account.resendContactNomination(member_id, contact_email).then(function(res) {
                    var token = 'messages.resendNominationSuccess';

                    if (locale.isToken(token)) {
                        locale.ready(locale.getPath(token)).then(function () {
                            setTimeout(function() {
                                window.alert(locale.getString(token, {}));
                            }, 500);
                        });
                    }
                });
            }

            function olderThen18 (member) {

                var today = new Date();
                if (!angular.isUndefined(member.birth_date)){
                    var birthDate = new Date(member.birth_date.year, member.birth_date.month, member.birth_date.day);
                    return today >= new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
                }else{
                    return today;
                }
            }

            function goPermissionPage (account_id, member_id, contact) {
                if ($rootScope.previewMode) {
                    return false;
                }

                if (account_id == contact.id) {
                    return false;
                } else {

                    if (contact.status == 'accepted') {
                        $state.transitionTo('account.setEcpPermission', {member_id: member_id, contact_id: contact.id});
                    } else {
                        return false;
                    }
                }
            }

            function showField (field, permission) {

                if (!field
                    || (_.isObject(field) && _.every(field, _.isNull))
                    || (_.isObject(field) && !_.every(field, _.isNumber) && _.every(field, _.isEmpty))
                    || (_.isArray(field) && _.isEmpty(field)) ) {
                    return false;
                }

                return ($rootScope.publicMode) || ($rootScope.thirdPartyMode && permission) || ($rootScope.setEcpPermission) || ($rootScope.shareMode) || ($rootScope.previewMode && permission);
            }

            function hasPermission (collection, id, field) {
                var item = _.find(collection, {id: parseInt(id)});

                return (item) ? item[field] : false;
            }

            function getPermissionIndex (collection, id) {
                var index = null;

                _.each(collection, function(c, i) {
                    if (c.id == id) {
                        index = i;
                    }
                });

                return (index) ? index : collection.length + 1;
            }

            function sync (uuid, member_id) {
                Account.sync(uuid, member_id)
                    .then(function (res) {
                        angular.extend(_.find($scope.member.devices, {uuid: res.uuid}), res);
                    });
            }

            function unsync (uuid, member_id) {
                Account.unsync(uuid, member_id)
                    .then(function () {
                        angular.forEach($scope.member.devices, function (device, index) {
                            if (device.uuid === uuid) {
                                $scope.member.devices.splice(index, 1);
                                $rootScope.$broadcast('account.updated', $scope.member);
                                $state.transitionTo('account.viewMember', {member_id: $scope.member.id});
                            }
                        });
                    })
                    .catch(function () {
                        $state.reload();
                    });
            }
        })

        .controller('AddMemberController', function ($scope, $controller, $state, Account,CountriesUtils) {
            Account.get()
                .then(function onAccountLoaded (account) {
                    if(!account.is_premium){
                        $state.go('base.home');
                    }
                });
            var errors = [];
            $scope.errors = [];
             Account.get()
               .then(function onAccountLoaded (account) {
                   if(!account.is_premium){
                       $state.go('base.home');                    }
               });

            $scope.member = {
                additional_information: {
                    personal: {
                        location_track: 1,
                        home_phone:{
                            code:CountriesUtils.chinaCode(),
                            number:''
                        },
                        workplace_phone:{
                            code:CountriesUtils.chinaCode(),
                            number:''
                        },
                        address:{
                            country: CountriesUtils.chinaCode()
                        }
                    },
                    insurances: [],
                    records:{
                        emergency_messages: [],
                        living_will:{

                        },
                        hospital_records: []
                    },


                    medical:{
                        doctors:[],
                        blood:{

                        },
                        allergies:[],
                        medications:[],
                        immunizations:[],
                        medical_conditions:[],
                        surgical_history:[],
                        family_medical_history:[],
                        organ_donor:{
                        }

                    }

                }
            };

            // for china site set defafult code 47 for create member
            $scope.member.phone ={
                code:CountriesUtils.chinaCode(),
                number:''
            };
            $scope.member.nationality = CountriesUtils.chinaCode(); // for create member

            $controller('MemberHelperController', { $scope: $scope });

            $scope.handle = function (member) {

                if(!_.isUndefined(member.phone.number)|| !_.isNull(member.phone.number)) {
                    member.phone.number = $scope.formatPhoneNumber(member.phone.number);
                }
                if(!_.isUndefined(member.additional_information.personal.home_phone)){
                    if(!_.isUndefined(member.additional_information.personal.home_phone.number)){
                         member.additional_information.personal.home_phone.number = $scope.formatPhoneNumber(member.additional_information.personal.home_phone.number);
                      }
                }
                if(!_.isUndefined(member.additional_information.personal.workplace_phone) ){
                    if(!_.isUndefined(member.additional_information.personal.workplace_phone.number)  ){
                        member.additional_information.personal.workplace_phone.number = $scope.formatPhoneNumber(member.additional_information.personal.workplace_phone.number);
                     }
                }

                if(member.additional_information.insurances.length>0){
                    _.forEach(member.additional_information.insurances, function(rec){
                       if(!_.isUndefined(rec.company_phone)){
                            if(!_.isUndefined(rec.company_phone.number)){
                             rec.company_phone.number = $scope.formatPhoneNumber(rec.company_phone.number);
                             }
                        }
                    })
                }

                if(member.additional_information.medical.doctors.length>0){
                    _.forEach(member.additional_information.medical.doctors, function(rec){
                        if(!_.isUndefined(rec.phone.number)){
                             if(!_.isUndefined(rec.phone.number)){
                                 rec.phone.number = $scope.formatPhoneNumber(rec.phone.number);
                            }
                         }
                    })
                }

                var postData = angular.copy(member);
                $scope.memberError = " ";

                if (postData.use_account_email) {
                    postData.email = null;
                }

                Account.addMember(postData)
                    .then(function () {
                        $scope.errors = [];
                        $state.transitionTo('account.show', {});
                    })
                    .catch(function (err) {
                        errors = [];
                        errors.push(err.data.error);

                         _.each(errors, function(error) {
                            if (!_.isNull(error.message) || !_.isEmpty(error.message)) {
                                $scope.memberError = error.message;
                            }
                         });


                        var errorMsg = angular.element(document).find('div.danger-class');
                        errorMsg.fadeIn(500,0).slideDown(500);
                        setTimeout(function() {
                                errorMsg.fadeOut(500,0).slideUp(500);
                            }, 2000);
                        $scope.errors = errors;
                    });
<<<<<<< HEAD
=======
            };

             $scope.formatPhoneNumber = function(phoneNumber){
                var code = phoneNumber.substr(0, phoneNumber.indexOf(' '))+' ';
                var number = phoneNumber.substr(phoneNumber.indexOf(' ')+1);
                number = number.replace(/\D/g,'');
                return code+number;

>>>>>>> master
            };

            $scope.formatPhoneNumber = function(phoneNumber){
                var code = phoneNumber.substr(0, phoneNumber.indexOf(' '))+' ';
                var number = phoneNumber.substr(phoneNumber.indexOf(' ')+1);
                number = number.replace(/\D/g,'');
                return code+number;

            };
			//Vincent Start
			$scope.formatPhoneNumber = function(phoneNumber){
              var code = phoneNumber.substr(0, phoneNumber.indexOf(' '))+' ';
              var number = phoneNumber.substr(phoneNumber.indexOf(' ')+1);
              number = number.replace(/\D/g,'');
              return code+number;
          };
			//Vincent End
        })

        .controller('ShowMemberController', function ($rootScope, $scope, $controller, $stateParams, Account, Alert) {
            $rootScope.viewMode = true;

            $controller('MemberHelperController', { $scope: $scope });

            $scope.$on('events.received', onEventsReceived);

            function onMemberLoaded () {
                $scope.$on('alerts.received', getAlertHistory);
                getAlertHistory();
            }

            function onEventsReceived () {
                Account.getMember($stateParams.member_id)
                    .then(function (member) {
                        $scope.member = member;

                    });
            }

            function getAlertHistory () {
                $rootScope.alert_histories = Alert.getFriendAlertsHistory($scope.member.id, 'all') || [];
            }

			//Vincent Start
			 console.log($rootScope)
      })

      .controller('ShowMapInfo',function($rootScope,$scope,$location,$controller,$stateParams,Account,Alert){
          $rootScope.viewMode = true;
          $rootScope.stateParams = $stateParams.alert_id;
          $controller('ShowMemberController', { $scope: $scope });
			//Vincent End

        })

        .controller('EditMemberController', function ($rootScope, $scope, $controller, $state, $stateParams, $window, $filter, Account, MEDIA_BASE) {
            $rootScope.editMode = true;
            $scope.transition = false;

            $controller('MemberHelperController', {$scope: $scope});

            $scope.onMemberLoaded
                .then(function () {

                    if (!$scope.member.nationality) {
                        $scope.member.nationality = null;
                    }

                    if ($state.current.name == 'account.editMember'){

                        if (_.isObject($rootScope['tabGroup'])){

                            setTimeout(function() {

                                    if ($rootScope['tabGroup']['group'])
                                        angular.element('.panel-heading div[href="#collapse'+$rootScope['tabGroup']['group']+'"]'). trigger('click');

                                    if ($rootScope['tabGroup']['tab'])
                                        angular.element('div[href="#collapse'+$rootScope['tabGroup']['tab']+'"]').trigger('click');

                                    $rootScope['tabGroup'] = null;
                                }, 200);

                        }

                        setTimeout(function() {
                            $('html, body').animate({scrollTop : $rootScope.editPosition}, 800);
                            $rootScope.editPosition = null;

                        }, 600);

                        if($rootScope.permissionSaved){

                            $window.alert($filter('i18n')('common.saveSuccessfully'));
                        }
                        $rootScope.permissionSaved = false;

                    }
                });

            $scope.handle = function (data, options) {

                if(!_.isUndefined(data.phone.number)|| !_.isNull(data.phone.number)){
                    data.phone.number = $scope.getNumber(data.phone.number);
                }
                if(!_.isUndefined(data.additional_information.personal.home_phone.number)){
                    data.additional_information.personal.home_phone.number = $scope.getNumber(data.additional_information.personal.home_phone.number);
                }
                if(!_.isUndefined(data.additional_information.personal.workplace_phone.number)  ){
                    data.additional_information.personal.workplace_phone.number = $scope.getNumber(data.additional_information.personal.workplace_phone.number);
                }

                if(data.additional_information.insurances.length>0){
                    _.forEach(data.additional_information.insurances, function(rec){
                        if(!_.isUndefined(rec.company_phone.number)){
                            rec.company_phone.number = $scope.getNumber(rec.company_phone.number);
                        }
                    })
                }

                if(data.additional_information.medical.doctors.length>0){
                    _.forEach(data.additional_information.medical.doctors, function(rec){
                        if(!_.isUndefined(rec.phone.number)){
                            rec.phone.number = $scope.getNumber(rec.phone.number);
                        }
                    })
                }

<<<<<<< HEAD
                if(data.additional_information.personal.home_phone!==false && !_.isUndefined(data.additional_information.personal.home_phone) && (data.additional_information.personal.home_phone.code===null) && (data.additional_information.personal.home_phone.number===""))//Vincent
=======
                if(data.additional_information.personal.home_phone!==false && !_.isUndefined(data.additional_information.personal.home_phone) && (data.additional_information.personal.home_phone.code===null) && (data.additional_information.personal.home_phone.number===""))
>>>>>>> master
                {
                    data.additional_information.personal.home_phone=false;
                }

                if(data.additional_information.personal.workplace_phone!==false && !_.isUndefined(data.additional_information.personal.workplace_phone) && data.additional_information.personal.workplace_phone.code===null && data.additional_information.personal.workplace_phone.number==="")
                {
                    data.additional_information.personal.workplace_phone=false;
                }

                var postData = angular.copy(data);

                if (!options && postData.use_account_email) {
                    postData.email = null;
                }


                $scope.errorSaving = false;

                Account.updateMember(postData)
                    .then(function (res) {
                        angular.extend(_.find($scope.account.members, {id: res.id}), res);
                        angular.extend($rootScope.member.additional_information, res.additional_information);
                        $rootScope.$broadcast('member.updated', res);

                        if (!options) {
                            if($scope.member.additional_information.personal.home_phone.number==" ")
<<<<<<< HEAD
                            {
                                scope.member.additional_information.personal.home_phone.number=null;
                            }
=======
                        {
                            $scope.member.additional_information.personal.home_phone.number=null;
                        }
                        if($scope.member.additional_information.personal.workplace_phone.number==" ")
                        {
                            $scope.member.additional_information.personal.workplace_phone.number=null;
                        }
>>>>>>> master
                            
                            if($scope.member.additional_information.personal.workplace_phone.number==" ")
                            {
                                $scope.member.additional_information.personal.workplace_phone.number=null;
                            }                            

                             $state.transitionTo('account.editMember', {member_id: res.id});
                             var saveSuccessfully = angular.element(document).find('div.member-save-info');
                             saveSuccessfully.fadeIn(500,0).slideDown(500);
                             setTimeout(function() {
                                 saveSuccessfully.fadeOut(500,0).slideUp(500);
                                $state.transitionTo('account.show', {});
                             }, 3000);
							 //Vincent Start
							  $state.transitionTo('account.editMember', {member_id: res.id});
                         var saveSuccessfully = angular.element(document).find('div.member-save-info');
                         saveSuccessfully.fadeIn(500,0).slideDown(500);
                         setTimeout(function() {
                             saveSuccessfully.fadeOut(500,0).slideUp(500);
                         }, 3000);
							 //Vincent End

                        } else if (angular.isArray(options)) {
                            if ((options[0] !== options[1]) && !postData.additional_information[options[1]][options[0]][0].id) {
                                $scope.member.additional_information[options[1]][options[0]][options[2]] = _.last(res.additional_information[options[1]][options[0]]);
                            } else if ((options[0] === options[1]) && !postData.additional_information[options[0]][0].id) {
                                $scope.member.additional_information[options[0]][options[2]] = _.last(res.additional_information[options[0]]);
                            }
                        }

                        $scope.memberForm.$submitted = false;                        
                    })
                    .catch(function (err) {

                        var errors = [];

                         if (_.isNull(err.data)){

                            $scope.memberError = $filter('i18n')('errors.systemError');

                         }else{
                            errors.push(err.data.error);
                            _.each(errors, function(error) {
                                if (!_.isNull(error.message) || !_.isEmpty(error.message)) {
                                    $scope.memberError = error.message;
                                }
                            });
                         }
                        $scope.errorSaving = true;
                        var errorMsg = angular.element(document).find('div.danger-class');
                        errorMsg.fadeIn(500,0).slideDown(500);
                        setTimeout(function() {
                            errorMsg.fadeOut(500,0).slideUp(500);
                        }, 3000);
                    });
                return false;
            };

            $scope.editMemberPermission = function (member_id) {
                $state.go('account.editMemberPermission', {member_id: member_id});
            };
            $scope.getNumber = function(phoneNumber){
                if(phoneNumber!=null)
                {
                var code = phoneNumber.substr(0, phoneNumber.indexOf(' '))+' ';
                var number = phoneNumber.substr(phoneNumber.indexOf(' ')+1);
                number = number.replace(/\D/g,'');
                return code+number;
                }

            };
        })

        .controller('ViewMemberHistoryController', function($stateParams, $scope, Account) {
            var page = 1;
            $scope.more_histories = true;
            Account.getMemberHistory($stateParams.member_id, 0)
                .then(function (histories) {
                    $scope.histories = histories.data;
                    $scope.loadMore = loadMore;
                });
            // The member is needed for the breadcrumb.
            Account.getMember($stateParams.member_id)
                .then(function (member) {
                    $scope.member = member;
                });

            function loadMore () {
                if ($scope.more_histories) {
                    page = page + 1;
                    Account.getMemberHistory($stateParams.member_id, page).then(function(res) {
                        if (_.isEmpty(res.data)) {
                            $scope.more_histories = false;
                        } else {
                            $scope.histories = $scope.histories.concat(res.data);
                        }
                    });
                }
            }
        })

        /**
         * Preview profile controller
         */
        .controller('ShareMemberProfileController', function ($rootScope, $scope, $controller, $state, $stateParams, Account, permission, PermissionService) {
            $rootScope.shareMode = true;
            $scope.permission = permission || {};

            $controller('MemberHelperController', { $scope: $scope });

                $scope.permission["personal"]       = {};
                $scope.permission["insurances"]     = [];
                $scope.permission["medical"]        = {
                    "doctors":[],
                    "blood":{},
                    "allergies":[],
                    "medications":[],
                    "immunizations":[],
                    "medical_conditions":[],
                    "surgical_history":[],
                    "family_medical_history":[],
                    "organ_donor":{}

                };

                $scope.permission.records           = {
                    "living_will":{},
                    "emergency_messages":[],
                    "hospital_records":[]
                };


                // assign permission personal by default

                $scope.permission.personal.passports = true;
                $scope.permission.personal.social_securities = true;
                $scope.permission.personal.marital_status = true;
                $scope.permission.personal.secondary_email = true;
                $scope.permission.personal.address = true;
                $scope.permission.personal.home_phone = true;
                $scope.permission.personal.workplace_address = true;
                $scope.permission.personal.workplace_phone = true;

                if (angular.isDefined($scope.member) && ( "additional_information" in $scope.member )) {

                    // assign permission insurances by default

                    for (var element in $scope.member.additional_information.insurances) {
                        $scope.permission.insurances[element] = {
                            "company_name": true,
                            "insurance_type": true,
                            "number":true,
                            "plan_type": true,
                            "company_phone": true,
                            "expiry_date": true,
                            "notes": true
                        };
                    };



                    // assign permission medical/doctors by default

                    for (var element in $scope.member.additional_information.medical.doctors) {

                        $scope.permission.medical.doctors[element] = {
                            "first_name": true,
                            "last_name": true,
                            "phone": true,
                            "specialty": true,
                            "notes": true
                        };

                    };

                    // assign permission medical/blood by default

                    $scope.permission.medical.blood.isAllSelected = true;
                    $scope.permission.medical.blood.blood_type = true;
                    $scope.permission.medical.blood.notes = true;
                    $scope.toggleBloodInfo = function() {
                        var toggleStatus = $scope.permission.medical.blood.isAllSelected;
                        $scope.permission.medical.blood.blood_type = toggleStatus;
                        $scope.permission.medical.blood.notes = toggleStatus;
                    }

                    for (var element in $scope.member.additional_information.medical.allergies) {
                        $scope.permission.medical.allergies[element] = {
                            "name": true,
                            "reaction": true,
                            "severity": true,
                            "notes": true
                        };
                    };


                    // assign permission medical/medications by default

                    for (var element in $scope.member.additional_information.medical.medications) {
                        $scope.permission.medical.medications[element] = {
                            "name": true,
                            "status": true,
                            "dosage": true,
                            "frequency": true,
                            "purpose": true,
                            "from": true,
                            "to": true,
                            "notes": true
                        };
                    };

                    // assign permission medical/immunizations by default

                    for (var element in $scope.member.additional_information.medical.immunizations) {

                        $scope.permission.medical.immunizations[element] = {
                            "name": true,
                            "date": true,
                            "series": true,
                            "notes": true
                        };

                    };

                    // assign permission medical/medical_conditions by default

                    for (var element in $scope.member.additional_information.medical.medical_conditions) {

                        $scope.permission.medical.medical_conditions[element] = {
                            "name": true,
                            "status": true,
                            "from": true,
                            "to": true,
                            "notes": true
                        };

                    };

                    // assign permission medical/surgical_history by default

                    for (var element in $scope.member.additional_information.medical.surgical_history) {
                        $scope.permission.medical.surgical_history[element] = {
                            "type": true,
                            "date": true,
                            "reason": true,
                            "notes": true
                        };
                    };

                    // assign permission medical/family_medical_history by default

                    for (var element in $scope.member.additional_information.medical.family_medical_history) {

                        $scope.permission.medical.family_medical_history[element] = {
                                    "type": true,
                                    "relationship": true,
                                    "severity": true,
                                    "notes": true
                        };
                    };


                    $scope.permission.medical.organ_donor = {
                        "status": true,
                        "condition": true,
                        "card": true,
                        "notes": true,
                        "isAllSelected": true
                    };

                     $scope.toggleOrganInfo = function() {
                        var toggleStatus = $scope.permission.medical.organ_donor.isAllSelected;
                        $scope.permission.medical.organ_donor.status = toggleStatus;
                        $scope.permission.medical.organ_donor.condition = toggleStatus;
                        $scope.permission.medical.organ_donor.card = toggleStatus;
                        $scope.permission.medical.organ_donor.notes = toggleStatus;
                    }

                    // assign permission records.living_will by default

                    $scope.permission.records.living_will = {
                        "date": true,
                        "document": true,
                        "notes": true,
                        "isAllSelected":true
                    };

                    $scope.toggleLivingWillInfo = function() {
                        var toggleStatus = $scope.permission.records.living_will.isAllSelected;
                        $scope.permission.records.living_will.date = toggleStatus;
                        $scope.permission.records.living_will.document = toggleStatus;
                        $scope.permission.records.living_will.notes = toggleStatus;
                    }

                    for (var element in $scope.member.additional_information.records.emergency_messages){

                        $scope.permission.records.emergency_messages[element] = {
                            "file":true,
                            "notes":true
                        };

                    };


                    for (var element in $scope.member.additional_information.records.hospital_records){

                        $scope.permission.records.hospital_records[element] = {
                            "date":true,
                            "category":true,
                            "practitioner":true,
                            "notes":true,
                            "file":true
                        };

                    }
            }

            /* show preview */

            $scope.preview = function (permission) {

                PermissionService.setPreviewPermission($stateParams.member_id, permission);
                $state.transitionTo('account.preview-profile', {member_id: $stateParams.member_id});
            };
        })

        .controller('PreviewProfileController', function ($rootScope, $scope, $controller, $state, $stateParams, Account, permission) {
            $rootScope.previewMode = true;
            $scope.permission = permission;
            $controller('MemberHelperController', {$scope: $scope});
			//Vincent Start
			$rootScope.wechatMode = false;
         $rootScope.wechatModePop = false;
         is_weChat();
        // console.log($rootScope);

         function is_weChat() {
             var ua = navigator.userAgent.toLowerCase();
             if (ua.match(/MicroMessenger/i) == "micromessenger") {
                 $rootScope.wechatMode = true;
             }
         }
			//Vincent End

        })


        /**
         * FIN's profiles
         */
        .controller('ViewFinProfileController', ['$rootScope', '$controller', '$scope', '$stateParams', 'member', 'PermissionService', 'Alert', function ($rootScope, $controller, $scope, $stateParams, member, PermissionService, Alert) {

            $rootScope.previewMode = true;
            $rootScope.thirdPartyMode = true;
            $rootScope.shareMode = true;

            $scope.member = member;

            $rootScope.alert_histories = Alert.getFriendAlertsHistory(member.id, 'all') || [];

            $scope.profile_token = $stateParams.profile_token;

            $scope.permission = {};

            $scope.$on('alerts.received', function(event, alerts) {

                $rootScope.alert_histories = Alert.getFriendAlertsHistory(member.id, 'all') || [];
            });

            $scope.$watch('member', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $rootScope.member = newVal;
                }
            });

            // $controller('MemberHelperController', {$scope: $scope});
        }])

        .controller('ShareViewFinProfileController', ['$rootScope', '$scope', '$state', '$controller', '$stateParams', 'member', 'Alert', 'PermissionService', function ($rootScope, $scope, $state, $controller, $stateParams, member, Alert, PermissionService) {
            $rootScope.shareMode = true;
            $rootScope.thirdPartyMode = true;

            $scope.member = member;

            $scope.permission = PermissionService.getTempPermission() || {};

            $scope.alert_histories = Alert.getFriendAlerts() || [];

            $controller('MemberHelperController', {$scope: $scope});

            $scope.preview = function (permission) {
                PermissionService.setTempPermission(permission);
                $state.transitionTo('account.preview-friend-in-need-profile', {profile_token: $stateParams.profile_token});
            };
        }])

        .controller('PreviewFinProfileController', ['$rootScope', '$scope', '$controller', 'member', 'permission', function($rootScope, $scope, $controller, member, permission) {
            $rootScope.previewMode = true;
            $rootScope.thirdPartyMode = true;

            $scope.member = member;

            $scope.permission = permission;

            $controller('MemberHelperController', {$scope: $scope});
        }])

        /**
         * FIN's profiles
         */
        .controller('ViewSharedProfileController', ['$rootScope', '$scope', '$controller', '$timeout', 'Alert', 'member', function ($rootScope, $scope, $controller, $timeout, Alert, member) {

            $rootScope.previewMode = true;
            $rootScope.publicMode = true;

            $scope.member = member;

            $rootScope.alert_histories = Alert.getFriendAlertsHistory(member.id, 'all') || [];

            $rootScope.$on('alerts.received', function(event, alerts) {
                $timeout(function () {
                    $rootScope.alert_histories = Alert.getFriendAlertsHistory(member.id, 'all') || [];
                }, 100);
            });

            $controller('MemberHelperController', {$scope: $scope});

			//Vincent Start
			$rootScope.wechatMode = false;
         $rootScope.wechatModePop = false;
         is_weChat();
        // console.log($rootScope);

         function is_weChat() {
             var ua = navigator.userAgent.toLowerCase();
             if (ua.match(/MicroMessenger/i) == "micromessenger") {
                 $rootScope.wechatModePop = true;
             }
         }
			//Vincent Start
        }])

        .directive('emailProfile', ['$modal', '$timeout', 'Account', 'PermissionService', function ($modal, $timeout, Account, PermissionService) {

            return {
                restrict: 'A',
                scope: {
                    member: '=',
                    permission: '='
                },
                link: link
            };

            function link(scope, elem, attrs) {
                var emailModalTemplate = 'partials/member/share-member-profile/email.html';

                var modalInstance = null;

                var opts = {
                    backdrop: true,
                    backdropClick: true,
                    dialogFade: false,
                    keyboard: true,
                    size: attrs.size,
                    templateUrl: emailModalTemplate,
                    scope: scope,
                    controller: ['$scope', function ($scope) {
                        var additional;
                        var additional_information = $scope.member.additional_information;
                        $scope.profile = angular.copy($scope.member);

                        $scope.$watch('permission', function(newVal, oldVal) {
                            additional = PermissionService.filterShareData(additional_information, $scope.permission);
                            $scope.profile.additional_information = additional;
                        }, true);

                        $scope.cancel = function () {
                            modalInstance.close();

                            var body = angular.element(document).find('body').eq(0);
                            if (body[0].className == "modal-open") {

                                var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                                var modalLayer = angular.element(document).find('div.modal').eq(0);

                                body.removeClass("modal-open");
                                layer.remove();
                                modalLayer.remove();
                            }

                        };

                        $scope.shareByEmail = function(member, email) {
                            Account.shareByEmail(member, email, $scope.profile).then(
                                function(res) {
                                    if (res.success) {
                                        $scope.error = null;
                                        $scope.success = true;
                                    }
                                },
                                function(err) {
                                    $scope.error = err.data.error;
                                });

<<<<<<< HEAD
                            amplitude.logEvent('share-email');
							amplitude.getInstance(Config.AMPLITUDE_APP).logEvent('share-email');//Vincent
=======
                            amplitude.getInstance(Config.AMPLITUDE_APP).logEvent('share-email');
>>>>>>> master

                        };
                    }]
                };

                elem.on('click', function () {
                    modalInstance = $modal.open(opts);

                });
            }
        }])

        .directive(
            "insuranceLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/insurance/insurance.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "insurance-link" , scope, element, attributes);
                }

            }
        )

        .directive(
            "doctorLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/medical/doctor.html"
                });

                // console.log('SCOPE', scope);

                function link( scope, element, attributes ) {
                    // console.log( "doctor-link" );
                     // console.log(scope, element, attributes);

                }

            }
        )

        .directive(
            "bloodLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/medical/blood.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "blood-link" );
                }

            }
        )

        .directive(
            "allergyLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/medical/allergy.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "allergy-link" );
                }

            }
        )

        .directive(
            "medicationLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/medical/medication.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "medication-link" );
                }

            }
        )

        .directive(
            "immunizationLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/medical/immunization.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "immunization-link" );
                }

            }
        )

        .directive(
            "medicalConditionLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/medical/medicalcondition.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "medicalCondition-link" );
                }

            }
        )

        .directive(
            "surgicalLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/medical/surgical.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "surgical-link" );
                }

            }
        )

        .directive(
            "familyHistoryLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/medical/familyhistory.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "familyHistory-link" );
                }

            }
        )

        .directive(
            "organDonorLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/medical/organdonorstatus.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "organDonor-link" );
                }

            }
        )

        .directive(
            "willRecordLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/record/willrecord.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "willrecord-link", scope, element, attributes );
                }

            }
        )

        .directive(
            "messageRecordLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/record/messagerecord.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "messageRecord-link" );
                }

            }
        )

        .directive(
            "hospitalRecordLayout",
            function() {
                return({
                    link: link,
                    restrict: "A",
                    templateUrl: "partials/member/record/hospitalrecord.html"
                });

                function link( scope, element, attributes ) {
                    // console.log( "hospitalrecord-link" );
                }

            }
        )


        .directive('emailForwardProfile', ['$modal', '$timeout', 'Account', 'PermissionService', function ($modal, $timeout, Account, PermissionService) {

            return {
                restrict: 'A',
                scope: {
                    member: '=',
                    permission: '='
                },
                link: link
            };

            function link(scope, elem, attrs) {
                var emailModalTemplate = 'partials/member/share-member-profile/email-forward.html';

                var modalInstance = null;

                var opts = {
                    backdrop: true,
                    backdropClick: true,
                    dialogFade: false,
                    keyboard: true,
                    size: attrs.size,
                    templateUrl: emailModalTemplate,
                    scope: scope,
                    controller: ['$scope', function ($scope) {
                        var additional;
                        var additional_information = $scope.member.additional_information;
                        $scope.profile = angular.copy($scope.member);

                        $scope.$watch('permission', function(newVal, oldVal) {
                            additional = PermissionService.filterShareData(additional_information, $scope.permission);
                            $scope.profile.additional_information = additional;
                        }, true);

                        $scope.cancel = function () {
                            modalInstance.close();
                            var body = angular.element(document).find('body').eq(0);
                            if (body[0].className == "modal-open") {

                                var layer = angular.element(document).find('div.modal-backdrop').eq(0);
                                var modalLayer = angular.element(document).find('div.modal').eq(0);

                                body.removeClass("modal-open");
                                layer.remove();
                                modalLayer.remove();
                            }
                        };

                        $scope.forwardByEmail = function(email) {
                            var token = $scope.profile.route || null;
                            Account.forwardByEmail(email, token).then(
                                function(res) {
                                    if (res.success) {
                                        $scope.error = null;
                                        $scope.success = true;
                                    }
                                },
                                function(err) {
                                    $scope.error = err.data.error;
                                });
                        };
                    }]
                };

                elem.on('click', function () {
                    modalInstance = $modal.open(opts);
                });
            }
        }])

        .filter('formatId', function() {
            return function (input) {
                input = input || '';
                input = input.replace(/\s+/g, '');
                input = input.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');

                return input;
            };
        })

        .filter('rounded', function(){
            return function(val){
                return !_.isNull(val) && !_.isUndefined(val)?val.toFixed():val;
            }
        })

        .filter('unique', function() {
               return function(collection, keyname) {
                  var output = [],
                      keys = [];

                  angular.forEach(collection, function(item) {
                      var key = item[keyname];
                      if(keys.indexOf(key) === -1) {
                          keys.push(key);
                          output.push(item);
                      }
                  });

                  return output;
               };
            })


        .directive('memberId', function() {
            return {
                restrict: "AE",
                replace: true,
                transclude: true,
                scope: {
                    model: "=model"
                },
                template:'<div class="member-id"> <span class="hideId_mobile" i18n="common.id"></span>{{model.ice_id | formatId}} </div>',
                controller: function($scope,Account,$window) {
                    $('div.popover__wrapper').click(function(){
                        var visibility = $('.push.popover__content').css('visibility');
                    if(visibility=='visible'){
                        $('.push.popover__content').css('visibility','hidden');
                    }
                    else{
                        $('.push.popover__content').css('visibility','visible');
                    }
                });
              }
          }
      })

        .directive('shareMemberProfileForm', function() {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    type: '@',
                    member: '=',
                    permission: '='
                },
                controller: function($scope, $element, $sce, API_BASE, Auth, PermissionService, iaSettings,Account) {

                    $scope.isPrintLoading = false;

                    $scope.$watch('member', function (newValue, oldValue) {
                        if (angular.isDefined($scope.member)){
                            var url = [API_BASE, 'members',  $scope.member.id, 'share?access_token=' + Auth.getToken()].join('/') + '&lang=' + iaSettings.getLanguage() + '&pdfcard=1';
                            var additional;
                            $scope.action = $sce.trustAsUrl(url);

                            var additional_information = $scope.member.additional_information;

                            $scope.profile = angular.copy($scope.member);

                            if ($scope.type == 'download-member-profile') {
                                $scope.$watch('permission', function(newVal, oldVal) {
                                    additional = PermissionService.filterShareData(additional_information, $scope.permission);
                                    $scope.profile.additional_information = additional;
                                }, true);
                            }

                        }else{

                        }

                    });

                    $element.on('click', 'button', function(e) {
                        if($scope.type == 'download-member-profile') {
                            $element.submit();
                            var pdfDownload = angular.element(document).find('div.pdf-download').eq(0);
                            pdfDownload.fadeIn(500,0).slideDown(500);
                            setTimeout(function() {
                                pdfDownload.fadeOut(500,0).slideUp(500);
                            }, 6000);
                        }
                        if ($scope.type == 'download-member-id') {

                            $scope.isPrintLoading = true;
                            angular.element(e.target).attr('disabled', 'disabled');
                            $element.submit();

                            setTimeout(function() {


                                var layer       = angular.element(document).find('div.modal-backdrop').eq(0);
                                    var modalLayer  = angular.element(document).find('div.modal').eq(0);


                                    layer.remove();
                                    modalLayer.remove();

                            }, 11000);
                        }
                    });
                },
                templateUrl: 'partials/member/share-member-profile/form.html'
            };
        })

        .directive('confirmUnsync',['$rootScope', '$state', '$modal', 'Account', function ($rootScope, $state, $modal, Account) {

            return {
                restrict: 'A',
                scope: {
                    uuid: '='
                },
                link: link
            };

            function link(scope, elem, attrs) {

                var modalInstance = null;
                var opts = {
                    backdrop: true,
                    backdropClick: true,
                    dialogFade: false,
                    keyboard: true,
                    size: attrs.size,
                    templateUrl: 'partials/panic/unsync-panic.html',
                    scope: scope,
                    controller: ['$scope', '$controller', '$rootScope', function ($scope, $controller, $rootScope) {
                   //     $controller('MemberHelperController', { $scope: $scope });//Vincent

                        scope.cancel = function () {
                            modalInstance.close();
                        };
                        scope.ok = function () {
                            modalInstance.close();
                            Account.unsync(scope.uuid, $rootScope.account.id);
							$scope.unsync(scope.uuid, $rootScope.member.id);//Vincent
							 Account.unsync(scope.uuid, $rootScope.account.id);
                        };
                    }]
                };

                elem.on('click', function () {
                    modalInstance = $modal.open(opts);
                });
            }
        }])

        .directive('ngPrint',['$http',function($http){ //Action for printing

            var url     = "";
            var lang    = "";
            var scope   = "";
            return {
                link:link,
                scope:true,
                controller:function($scope, $element, $sce, API_BASE, Auth, PermissionService, iaSettings, $filter, $location){
                    $scope.$watch('member', function (newValue, oldValue) {
                        if (angular.isDefined($scope.member)){
                            try{
                                lang = iaSettings.getLanguage();

                                if ($scope.account){
                                    url = [API_BASE, 'members',  $scope.member.id , 'share?access_token=' + Auth.getToken()].join('/') + '&lang=' + lang;
                                }else{
                                    url = [API_BASE, 'members/public',  $scope.member.route, 'print'].join('/') + '';
                                }
                                var additional;
                                var additional_information = $scope.member.additional_information;
                                $scope.profile = angular.copy($scope.member);
                                $scope.message =  $filter('i18n')('common.loading');

                                // check for permissions only if not a shared public profile
                                if (_.isUndefined($scope.profile.route) || $location.$$path.indexOf('/account/member/'+ $scope.member.id +'/ecp')>-1){
                                    $scope.$watch('permission', function(newVal, oldVal) {
                                        additional = PermissionService.filterShareData(additional_information, $scope.permission);
                                        $scope.profile.additional_information = additional;
                                    }, true);
                                }
                                scope = $scope.profile;
                            }catch(e){
                                return;
                            }
                        }

<<<<<<< HEAD
                        amplitude.logEvent('share-print');
						amplitude.getInstance(Config.AMPLITUDE_APP).logEvent('share-print');//Vincent
=======
                        amplitude.getInstance(Config.AMPLITUDE_APP).logEvent('share-print');
>>>>>>> master

                    });
                }
            };

            function link(scope, element, attrs){


                element.on('click',function(child){
                    var windowOpenPrint = window.open();
                    windowOpenPrint.document.write("<p>"+scope.message+"</p>");
                    $http({
                        "url":url,
                        "method":"POST",
                        "data":{
                            "profile":scope.profile,
                            "type":"print",
                            "language": lang
                        }
                    }).then(function(response){
                        windowOpenPrint.document.open();
                        windowOpenPrint.document.write(response.data);
                        windowOpenPrint.print();
                        windowOpenPrint.document.close();
                        windowOpenPrint.close();

                    });



                });

            }

        }]);

})();
