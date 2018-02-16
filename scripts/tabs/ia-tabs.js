
(function(angular) {

  // 'use strict';

  angular.module('iaTabs', []);

     angular.module('iaTabs')
    .directive('tabs', tabsDirective);

      function tabsDirective() {
        return {
          scope: true,
          restrict: 'A',
          controller: tabsController
        };
      }

      function tabsController($scope) {

            $scope.tabs = [];

            this.addTab = function(tab) {
              $scope.tabs.push(tab);
            };

            this.isTabActive = function(link) {
              for (var i = 0; i < $scope.tabs.length; i++) {
                if ($scope.tabs[i].link === link) {
                  return $scope.tabs[i].active;
                }
              }
              return false;
            };

            this.setTabToActive = function(link) {

              for (var i = 0; i < $scope.tabs.length; i++) {
                $scope.tabs[i].active = $scope.tabs[i].link === link;
              }
            };
      }

     tabsController.$inject = ['$scope'];

       angular.module('iaTabs')
    .directive('tabsLink', tabsLinkDirective);

      function tabsLinkDirective() {
        return {
          scope: false,
          restrict: 'A',
          require: '^tabs',
          link: function(scope, element, attributes, controller) {

            var tab = {
              link: attributes.tabsLink,
              active: false
            };

            controller.addTab(tab);

            element.bind('click', function() {
              scope.$apply(function() {
                controller.setTabToActive(tab.link);
              });
            });

            scope.$watch('tabs', function() {
              element.toggleClass('active', controller.isTabActive(tab.link));
            }, true);
          }
        };
      }

        angular.module('iaTabs')
            .directive('tabsPane', tabsPaneDirective);

          function tabsPaneDirective() {
            return {
              scope: false,
              restrict: 'A',
              require: '^tabs',
              link: function(scope, element, attributes, controller) {

                if (element.hasClass('active')) controller.setTabToActive(attributes.tabsPane);

                scope.$watch('tabs', function() {
                  element.toggleClass('active', controller.isTabActive(attributes.tabsPane));
                }, true);
              }
            };
          }



})(angular);
