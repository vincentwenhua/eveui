(function() {

    'use strict';
    angular.module('iaBreadcrumb',[])

        .directive('iaBreadCrumb', ['$compile', '$breadcrumb', 'locale', 'localeEvents', function($compile, $breadcrumb, locale, localeEvents) {
            return {
                restrict: 'EA',
                link: function(scope, element, attrs) {
                    var translation,
                        string;

                    var viewScope = $breadcrumb.$getLastViewScope();
                    var token = attrs['token'];

                    tranlate();

                    scope.$on(localeEvents.localeChanges, function (event, data) {
                        tranlate();
                    });

                    function tranlate() {
                        if (locale.isToken(token)) {
                            locale.ready(locale.getPath(token)).then(function () {
                                translation = locale.getString(token, {});

                                string = $compile('<span>' + translation + '</span>')(viewScope);

                                element.html(string);
                            });
                        }
                    }
                }
            };
        }]);

})();
