(function () {
    'use strict';

    angular.module('iaMember')
        .service('SelectAllService', function ($rootScope) {
            function CheckboxCollection() {
                this.checkboxes = {};

                this.add = function (checkbox) {
                    if (!(checkbox instanceof Checkbox)) {
                        throw 'Cannot add an object that is not a Checkbox';
                    }

                    this.checkboxes[checkbox.id] = checkbox;
                };

                this.remove = function (checkbox) {
                    this.checkboxes = _.without(this.checkboxes, checkbox);
                };

                this.get = function (checkboxId) {
                    return this.checkboxes[checkboxId];
                };
            }

            function Checkbox(id, element, ngModel) {
                this.id = id;
                this.element = element;
                this.ngModel = ngModel;
                this.children = {};
                this.parent = null;

                var self = this;

                // check by default empty header tabs
                if (self.element.prop('parentNode').nodeName == 'LABEL' && self.element.prop('children').length == 0){
                    self.setChecked(true);
                }

                this.element.on('click', function () {
                    self.checkChildren(self.isChecked());
                });

                this.unbindRootScopeWatch = $rootScope.$watch(function () {
                    return self.isChecked();
                }, function () {
                    self.fireStateUpdate();
                });
            }

            Checkbox.prototype.checkChildren = function (checked) {
                this.setChecked(checked);
                for (var attribute in this.children) {
                    var child = this.children[attribute];
                    child.checkChildren(checked);
                }
            };

            Checkbox.prototype.areAllChildrenChecked = function () {
                if (this.isLeaf()) {
                    return this.isChecked();
                }

                for (var attribute in this.children) {
                    var child = this.children[attribute];
                    if (!child.areAllChildrenChecked()) {
                        return false;
                    }
                }

                return true;
            };

            Checkbox.prototype.setChecked = function (checked) {
                this.ngModel.$setViewValue(checked);
                this.element.prop('checked', checked);
            };

            Checkbox.prototype.isChecked = function () {
                return this.element.prop('checked');
            };

            Checkbox.prototype.isLeaf = function () {
                return Object.keys(this.children).length <= 0;
            };

            Checkbox.prototype.get = function (childId) {
                return this.children[childId];
            };

            Checkbox.prototype.add = function (child) {
                child.parent = this;
                this.children[child.id] = child;
                this.updateState();
            };

            Checkbox.prototype.remove = function () {
                this.unbindWatches();
                if (this.parent) {
                    return delete this.parent.children[this.id];
                }
            };

            Checkbox.prototype.unbindWatches = function () {
                this.unbindRootScopeWatch();
                angular.forEach(this.children, function (child) {
                    child.unbindWatches();
                });
            };

            Checkbox.prototype.updateState = function () {
                this.setChecked(this.areAllChildrenChecked());
                this.fireStateUpdate();
            };

            Checkbox.prototype.fireStateUpdate = function () {
                if (this.parent) {
                    this.parent.updateState();
                }
            };

            var checkboxes = new CheckboxCollection();

            this.register = function (ascendants, id, element, ngModel) {
                var checkbox = new Checkbox(id, element, ngModel);

                if (ascendants) {
                    ascendants = ascendants.split(',');
                } else {
                    ascendants = [];
                }

                var parent = checkboxes;
                for (var i = 0; i < ascendants.length; i++) {
                    parent = parent.get(ascendants[i]);
                }
                
                if (undefined !== parent){
                    parent.add(checkbox);
                }

                return checkbox;
            };

            this.unregister = function (checkbox) {
                checkbox.remove();
                checkboxes.remove(checkbox);
            };
        })

        .directive('selectAllCheckbox', function (SelectAllService) {
            return {
                require: '^ngModel',
                restrict: 'A',
                link: function (scope, element, attrs, ngModel) {
                    scope.$on('$destroy', onDestroy);
                    var checkbox = SelectAllService.register(attrs.cbAscendants,
                        attrs.cbId || attrs.id,
                        element,
                        ngModel);

                    function onDestroy () {
                        SelectAllService.unregister(checkbox);
                    }
                }
            };
        });

})();
