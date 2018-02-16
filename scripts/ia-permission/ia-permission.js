(function() {
    'use strict';

    angular.module('iaPermission', [])
        .run(['$rootScope', 'PermissionService', 'RequestCache', function($rootScope, PermissionService, RequestCache) {
            $rootScope.$on('updated.member', function(event, member) {
                _.each(member.contacts, function(c, index) {
                    RequestCache.clear('/members/'+ member.id +'/contacts/'+ c.id + '/permissions', {});
                });
            });
        }])

        .controller('EcpPermissionController', function($rootScope, $scope, $controller, $state, $stateParams, permission, PermissionService, Account) {
            $rootScope.setEcpPermission = true;

            $scope.permission = permission ? PermissionService.process(permission) : {};


            $scope.personalDataContent = function(){
                var permissionCount = 0;
                $scope.hasPersonalData = false;
                var personalPermissionRecord = $scope.permission.personal;
                var personalAdditionalRecord;
                if($scope.member===undefined)
                {
                    personalAdditionalRecord = null;
                }
                else
                {
                    personalAdditionalRecord = $scope.member.additional_information.personal;
                }
                
                if(personalAdditionalRecord!==null){
                if(personalPermissionRecord.passports && personalAdditionalRecord.passports.length>0)
                    permissionCount++;
                if(personalPermissionRecord.social_securities && personalAdditionalRecord.social_securities.length>0)
                    permissionCount++;
                if(personalPermissionRecord.address && (!_.isEmpty(personalAdditionalRecord.address.building)|| !_.isEmpty(personalAdditionalRecord.address.street)||!_.isEmpty(personalAdditionalRecord.address.district)
                    || !_.isEmpty(personalAdditionalRecord.address.city)|| !_.isEmpty(personalAdditionalRecord.address.state)|| !_.isEmpty(personalAdditionalRecord.address.postal)|| !_.isEmpty(personalAdditionalRecord.address.country)))
                    permissionCount++;
                if(personalPermissionRecord.home_phone && personalAdditionalRecord.home_phone)
                    permissionCount++;
                if(personalPermissionRecord.marital_status && personalAdditionalRecord.marital_status != null)
                    permissionCount++;
                if(personalPermissionRecord.secondary_email && personalAdditionalRecord.secondary_email != null)
                    permissionCount++;
                if(personalPermissionRecord.workplace_address && personalAdditionalRecord.workplace_address != null)
                    permissionCount++;
                if(personalPermissionRecord.workplace_phone && personalAdditionalRecord.workplace_phone)
                    permissionCount++;
                 }
                if((!personalPermissionRecord.passports || !personalPermissionRecord.social_securities || !personalPermissionRecord.address || 
                    !personalPermissionRecord.home_phone || !personalPermissionRecord.marital_status || !personalPermissionRecord.secondary_email
                    || !personalPermissionRecord.workplace_address || !personalPermissionRecord.workplace_phone) && (permissionCount != 0)){
                    $scope.hasPersonalData = true;
                }
                else{
                    $scope.hasPersonalData = false;
                }

            }

            $scope.insuranceDataContent = function(){
                var count = 0;
                $scope.hasInsuranceData = false;
                var insuranceRecord = $scope.permission.insurances;
                _.forEach(insuranceRecord, function(rec){
                    if(!rec.company_name|| !rec.company_phone || !rec.expiry_date || !rec.insurance_type || !rec.notes || !rec.number || !rec.plan_type){
                        $scope.hasInsuranceData = true;
                        count++;
                    }
                    if(count === insuranceRecord.length){
                        $scope.hasInsuranceData = false;
                    }

                });
            }

            $scope.medicalDataContent = function(){
                var count = 0;
                $scope.hasMedicalData = false;
                var medicalRecord = $scope.permission.medical;

                var allergReclength=medicalRecord.allergies.length;
                var docReclength=medicalRecord.doctors.length;
                var famReclength=medicalRecord.family_medical_history.length;
                var immReclength=medicalRecord.immunizations.length;
                var medconReclength=medicalRecord.medical_conditions.length;
                var medicReclength=medicalRecord.medications.length;
                var surgReclength=medicalRecord.surgical_history.length;

                var actualMedicalData = allergReclength+docReclength+famReclength+immReclength+medconReclength+medicReclength+surgReclength+2;


                if(!medicalRecord.organ_donor.card || !medicalRecord.organ_donor.condition || !medicalRecord.organ_donor.notes 
                   || !medicalRecord.organ_donor.status || !medicalRecord.organ_donor.isAllSelected ){
                    $scope.hasMedicalData = true;
                        count++;
                }

                if(!medicalRecord.blood.blood_type || !medicalRecord.blood.notes || !medicalRecord.blood.isAllSelected){
                    $scope.hasMedicalData = true;
                        count++;
                }

                _.forEach(medicalRecord.allergies, function(allergRec){
                     if(!allergRec.name || !allergRec.notes || !allergRec.reaction || !allergRec.severity){
                        $scope.hasMedicalData = true;
                        count++;
                    }
                })
                _.forEach(medicalRecord.doctors, function(docRec){
                    if(!docRec.first_name || !docRec.last_name || !docRec.notes || !docRec.phone || !docRec.specialty){
                        $scope.hasMedicalData = true;
                        count++;
                    }
                })
                _.forEach(medicalRecord.family_medical_history , function(famRec){
                    if(!famRec.relationship || !famRec.severity || !famRec.type || !famRec.notes){
                        $scope.hasMedicalData = true;
                        count++;
                    }
                })
                _.forEach(medicalRecord.immunizations , function(immRec){
                    if(!immRec.date || !immRec.name || !immRec.series || !immRec.notes){
                        $scope.hasMedicalData = true;
                        count++;
                    }
                })
                _.forEach(medicalRecord.medical_conditions , function(medconRec){
                    if(!medconRec.from || !medconRec.to || !medconRec.name || !medconRec.status || !medconRec.notes){
                        $scope.hasMedicalData = true;
                        count++;
                    }
                })
                _.forEach(medicalRecord.medications , function(medicRec){
                    if(!medicRec.from || !medicRec.to || !medicRec.name || !medicRec.status || !medicRec.notes 
                        || !medicRec.dosage || !medicRec.frequency || !medicRec.purpose){
                        $scope.hasMedicalData = true;
                        count++;
                    }
                })
                _.forEach(medicalRecord.surgical_history, function(surgRec){
                    if(!surgRec.date || !surgRec.notes || ! surgRec.reason || !surgRec.type){
                        $scope.hasMedicalData = true;
                        count++;
                    }
                })


                if(count === actualMedicalData){
                    $scope.hasMedicalData = false;
                }
            }

            $scope.recordDataContent = function(){
                var count = 0;
                $scope.hasRecordData = false;

                var emergencyRecLength = $scope.permission.records.emergency_messages.length;
                var hospitalRecLength = $scope.permission.records.hospital_records.length;
                var actualRecordLength = emergencyRecLength+hospitalRecLength+1;

                var records = $scope.permission.records;
                _.forEach(records.emergency_messages, function(emergencyRec){
                    if(!emergencyRec.file || !emergencyRec.notes){
                        $scope.hasRecordData = true;
                        count++;
                    }
                })

                _.forEach(records.hospital_records, function(hospitalRec){
                    if(!hospitalRec.category || !hospitalRec.date || !hospitalRec.file || !hospitalRec.notes || !hospitalRec.practitioner){
                        $scope.hasRecordData = true;
                        count++;
                    }
                })

                if(!records.living_will.date || !records.living_will.document || !records.living_will.notes || !records.living_will.isAllSelected){
                    $scope.hasRecordData = true;
                    count++;
                }

                if(count === actualRecordLength){
                    $scope.hasRecordData = false;
                }

            }

            $scope.insuranceDataContent();
            $scope.medicalDataContent();
            $scope.recordDataContent();
            $scope.personalDataContent();


            $scope.toggleLivingWillInfo = function(){

                var toggleStatus = $scope.permission.records.living_will.isAllSelected;
                $scope.permission.records.living_will.date = toggleStatus;
                $scope.permission.records.living_will.document = toggleStatus;
                $scope.permission.records.living_will.notes = toggleStatus;
            };

            $scope.toggleBloodInfo = function() {
                var toggleStatus = $scope.permission.medical.blood.isAllSelected;
                $scope.permission.medical.blood.blood_type = toggleStatus;
                $scope.permission.medical.blood.notes = toggleStatus;
            };

            $scope.toggleOrganInfo = function() {
                var toggleStatus = $scope.permission.medical.organ_donor.isAllSelected;
                $scope.permission.medical.organ_donor.status = toggleStatus;
                $scope.permission.medical.organ_donor.condition = toggleStatus;
                $scope.permission.medical.organ_donor.card = toggleStatus;
                $scope.permission.medical.organ_donor.notes = toggleStatus;
            };

            $scope.toggleMedication = function(med_permission) {
                med_permission.frequency_unit = med_permission.frequency;
                med_permission.dosage_unit = med_permission.dosage;

            }
       
            $scope.handle = function(postPermissions) {
                var formattedPermissions = postPermissions ? PermissionService.process(postPermissions, true) : {};
                $rootScope.permissionSaved = false;
                Account.setEmergencyContactPermission($stateParams.member_id, $stateParams.contact_id, formattedPermissions).then(
                    function(res) {
                        
                        $scope.permission = PermissionService.process(res.permissions);
                        PermissionService.setPermission(res.member_id, res.contact_id, res.permissions);
                        if(!$rootScope.previewMode){
                            $rootScope.permissionSaved = true;
                            $state.transitionTo('account.editMember', {member_id: res.member_id});
                        }

                    })
                    .catch(function (err) {
                        var errors = [];
                         errors.push(err.data.error);
                    });
            };

            $scope.preview = function (member, permission) {
                $scope.handle(permission);
                PermissionService.setEcpPreviewPermission(member.id, $stateParams.contact_id, permission);
                $state.transitionTo('account.ecp-preview-profile', {member_id: $stateParams.member_id, contact_id: $stateParams.contact_id});
            };

            $controller('MemberHelperController', { $scope: $scope });
            $scope.onMemberLoaded
                .then(function (member) {
                    $scope.contact = _.find(member.contacts, {id: parseInt($stateParams.contact_id)});
                });
           
        })

        .factory('PermissionService', ['$q', '$stateParams', 'Account', function($q, $stateParams, Account) {
            var tmpPermission = [];
            var previewPermission = [];
            var ecpPreviewPermission = [];
            var EcpAccessPreviewPermission = {};
            
            /**
             * Format the single object.
             *
             * @param permission
             * @param server
             * @returns {*}
             */
            function formatObject(permission, server) {
                if (angular.isUndefined(permission) || _.isEmpty(permission)) {
                    return;
                }

                var obj = {};

                obj.id = permission.id;

                if (server) {
                    var keys = [];

                    _.each(permission, function(value, key) {
                        if (value === true) {
                            keys.push(key);
                        }
                    });

                    obj.fields = _.remove(keys, function(key) { 
                        return (key !== 'id');
                    });
                    
                    return obj;
                    
                } else {
                    
                    var properties = {};

                    if (!_.isEmpty(permission.fields)){
                        properties['isAllSelected'] = true;
                    }

                    _.each(permission.fields, function(field) {
                        properties[field] = true;
                    });

                    var objMerge = _.merge(obj, properties);
                    return objMerge;
                }
            }

            /**
             * Format the collection of objects.
             *
             * @param collections
             * @param server
             * @returns {Array}
             */
            function formatCollection(collections, server) {
                var newCollections = [];

                _.each(collections, function(collection, index) {
                    newCollections.push(formatObject(collection, server));
                });

                return newCollections;
            }

            /**
             * Process the permissions data.
             *
             * @param permissions
             * @param server
             * @returns {*}
             */
            function process(permissions, server) {
                var permission = {};
                
                server || (server = false);
                permissions.personal || (permissions.personal = {});
                permission.personal || (permission.personal = {});
                permission.personal = formatObject(permissions.personal, server);
                
                permissions.insurances || (permissions.insurances = []);
                permission.insurances || (permissions.insurance = []);
                permission.insurances = formatCollection(permissions.insurances, server);

                permissions.medical || (permissions.medical = {});
                permission.medical || (permission.medical = {});
                permission.medical.doctors = formatCollection(permissions.medical.doctors, server);
                permission.medical.blood = formatObject(permissions.medical.blood, server);
              
               if(permission.medical.blood===undefined){
                    permission.medical.blood = {
                        "blood_type":true,
                        "id":null,
                        "isAllSelected":true,
                        "notes":true
                    }
                }
                permission.medical.allergies = formatCollection(permissions.medical.allergies, server);
                permission.medical.medications = formatCollection(permissions.medical.medications, server);
                permission.medical.immunizations = formatCollection(permissions.medical.immunizations, server);
                permission.medical.medical_conditions = formatCollection(permissions.medical.medical_conditions, server);
                permission.medical.surgical_history = formatCollection(permissions.medical.surgical_history, server);
                permission.medical.family_medical_history = formatCollection(permissions.medical.family_medical_history, server);
                permission.medical.organ_donor = formatObject(permissions.medical.organ_donor, server);

                if(permission.medical.organ_donor===undefined){
                    permission.medical.organ_donor = {
                        "card":true,
                        "condition":true,
                        "id":null,
                        "isAllSelected":true,
                        "notes":true,
                        "status":true
                    }
                }           
                permissions.records  || (permissions.records = {});
                permission.records  || (permission.records = {});
                permission.records.emergency_messages = formatCollection(permissions.records.emergency_messages, server);
                permission.records.living_will = formatObject(permissions.records.living_will, server);
                
                if(permission.records.living_will===undefined){
                    permission.records.living_will = {
                        "date":true,
                        "document":true,
                        "id":null,
                        "isAllSelected":true,
                        "notes":true
                    }
                }
                permission.records.hospital_records = formatCollection(permissions.records.hospital_records, server);

                return permission;
            }

            /**
             * Set permissions.
             *
             * @param member_id
             * @param contact_id
             * @param permissions
             */
            function setPermission(member_id, contact_id, permissions) {
                var obj = {member_id: parseInt(member_id), contact_id: parseInt(contact_id)};
                var exist;

                if (exist = _.filter(tmpPermission, obj)) {
                    exist.permissions = permissions;
                } else {
                    tmpPermission.push({member_id: parseInt(member_id), contact_id: parseInt(contact_id), permissions: permissions});
                }
            }

            /**
             * Ger permission.
             *
             * @param params
             * @returns {*}
             */
            function getPermission(params) {
                var deferred = $q.defer();
                var exist = _.find(tmpPermission, {member_id: parseInt(params.member_id), contact_id: parseInt(params.contact_id)});

                if (exist) {
                    deferred.resolve(exist);
                } else {
                    Account.getEmergencyContactPermission(params.member_id, params.contact_id).then(
                        function (res) {

                            tmpPermission.push(res);
                            deferred.resolve(res);
                            
                        }
                    );
                }

                return deferred.promise;
            }

            /**
             * Set preview permission.
             *
             * @param member_id
             * @param permission
             */
            function setPreviewPermission(member_id, permission) {
                var preview = _.find(previewPermission, {member_id: member_id});
                if (preview) {
                    preview.permission = permission;
                } else {
                    previewPermission.push({member_id: parseInt(member_id), permission: permission});
                }
            }

            /**
             * Get preview permission.
             *
             * @param member_id
             * @returns {*|.scope.permission|number|.resolve.permission|$scope.permission}
             */
            function getPreviewPermission(member_id) {
                var permissionRecord = _.find(previewPermission, {member_id: parseInt(member_id)});
                return permissionRecord ? permissionRecord.permission : {};
            }

            /**
             * Get ecp preview permission.
             *
             * @param member_id
             * @param contact_id
             * @returns {*|.scope.permission|number|.resolve.permission|$scope.permission}
             */
            function getEcpPreviewPermission(member_id, contact_id) {
                var permissionRecord = _.find(ecpPreviewPermission, {previewed: true, member_id: parseInt(member_id), contact_id: parseInt(contact_id)});
                return permissionRecord ? permissionRecord.permission : {};
            }

            /**
             * Set ecp preview permission.
             *
             * @param member_id
             * @param contact_id
             * @param permission
             */
            function setEcpPreviewPermission(member_id, contact_id, permission) {
                var preview = _.find(ecpPreviewPermission, {previewed: true, member_id: parseInt(member_id), contact_id: parseInt(contact_id)});

                if (preview) {
                    preview.permission = permission;
                } else {
                    ecpPreviewPermission.push({previewed: true, member_id: parseInt(member_id), contact_id: parseInt(contact_id), permission: permission});
                }
            }

            /**
             * Check the ecp previewed.
             *
             * @param member_id
             * @param contact_id
             * @returns {boolean}
             */
            function checkEcpPreviewed(member_id, contact_id) {
                var previewed = _.find(ecpPreviewPermission, {previewed: true, member_id: parseInt(member_id), contact_id: parseInt(contact_id)});

                return !!previewed;
            }

            /**
             * Filter share data.
             *
             * @param profiles
             * @param permissions
             * @returns {{}}
             */
            function filterShareData(profiles, permissions) {
                var filteredData = {};
                permissions || (permissions = {});

                filteredData.personal || (filteredData.personal = {});
                permissions.personal || (permissions.personal = {});
                filteredData.personal = filterObject(profiles.personal, permissions.personal);

                filteredData.insurances || (filteredData.insurances = {});
                permissions.insurances || (permissions.insurances = {});
                filteredData.insurances = filterCollection(profiles.insurances, permissions.insurances);

                filteredData.medical || (filteredData.medical = {});
                permissions.medical || (permissions.medical = {});
                filteredData.medical.doctors = filterCollection(profiles.medical.doctors, permissions.medical.doctors);
                filteredData.medical.blood = filterObject(profiles.medical.blood, permissions.medical.blood);
                filteredData.medical.allergies = filterCollection(profiles.medical.allergies, permissions.medical.allergies);
                filteredData.medical.medications = filterCollection(profiles.medical.medications, permissions.medical.medications);
                filteredData.medical.immunizations = filterCollection(profiles.medical.immunizations, permissions.medical.immunizations);
                filteredData.medical.medical_conditions = filterCollection(profiles.medical.medical_conditions, permissions.medical.medical_conditions);
                filteredData.medical.surgical_history = filterCollection(profiles.medical.surgical_history, permissions.medical.surgical_history);
                filteredData.medical.family_medical_history = filterCollection(profiles.medical.family_medical_history, permissions.medical.family_medical_history);
                filteredData.medical.organ_donor = filterObject(profiles.medical.organ_donor, permissions.medical.organ_donor);

                filteredData.records || (filteredData.records = {});
                permissions.records || (permissions.records = {});
                filteredData.records.emergency_messages = filterCollection(profiles.records.emergency_messages, permissions.records.emergency_messages);
                filteredData.records.living_will = filterObject(profiles.records.living_will, permissions.records.living_will);
                filteredData.records.hospital_records = filterCollection(profiles.records.hospital_records, permissions.records.hospital_records);

                return filteredData;
            }

            /**
             * Filter collection
             *
             * @param collection
             * @param permission
             * @returns {Array}
             */
            function filterCollection(collection, permission) {
                var filterCollection = [];

                if (angular.isUndefined(permission)) {
                    return filterCollection;
                } else {
                    _.each(collection, function(profile, index) {
                        if (!_.isEmpty(filterObject(profile, permission[index]))) {
                            filterCollection[index] = filterObject(profile, permission[index]);
                        }
                    });
                }

                return filterCollection;
            }

            /**
             * Filter objects.
             *
             * @param profile
             * @param permission
             * @returns {{}}
             */
            function filterObject(profile, permission) {
                var filterData = {};
                var permissionKeys = _.keys(permission) || [];

                _.each(profile, function(value, key) {

                    if (_.indexOf(permissionKeys, key) != -1 && permission[key] != false) {
                        // Special Situation when set the permission for frequency and dosage.

                        if (key == 'frequency') {
                            filterData['frequency_unit'] = profile['frequency_unit']
                        }

                        if (key == 'dosage') {
                            filterData['dosage_unit'] = profile['dosage_unit']
                        }

                        filterData[key] = profile[key];
                    }

                    if (_.has(filterData, 'dosage_unit') && !_.has(filterData, 'dosage') ){
                        delete filterData['dosage_unit'];
                    }

                    if (_.has(filterData, 'frequency_unit') && !_.has(filterData, 'frequency') ){
                        delete filterData['frequency_unit'];
                    }

                });

                return filterData;
            }

            /**
             * Set temp preview permissions.
             *
             * @param permission
             */
            function setTempPermission(permission) {
                EcpAccessPreviewPermission = permission;
            }

            /**
             * Get temp preview permissions
             *
             * @returns {{}}
             */
            function getTempPermission() {
                return EcpAccessPreviewPermission || {};
            }

            /**
             * Clear temp preview permission
             */
            function clearTempPermission() {
                EcpAccessPreviewPermission = {};
            }

            return {
                setPermission: setPermission,
                getPermission: getPermission,
                setPreviewPermission: setPreviewPermission,
                getPreviewPermission: getPreviewPermission,
                setEcpPreviewPermission: setEcpPreviewPermission,
                getEcpPreviewPermission: getEcpPreviewPermission,
                checkEcpPreviewed: checkEcpPreviewed,
                filterShareData: filterShareData,
                process: process,
                setTempPermission: setTempPermission,
                getTempPermission: getTempPermission,
                clearTempPermission: clearTempPermission
            }
        }])
})();
