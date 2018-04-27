(function () {
    angular
        .module('timePicker', [])
        .directive('timePicker', timePicker);

    function timePicker($rootScope, $compile, $timeout) {
        return {
            restrict: 'A',
            require: '^ngModel',
            // scope   : {
            //     ngModel: '='
            // },
            link    : linkFunc
        };

        function linkFunc(scope, element, attrs, ctrl) {
            var id     = 'time-' + Date.now()
            var handle = null

            scope.ngModel = scope.ngModel;
            element.addClass(id)
            element.attr('value', scope.ngModel)
            handle = new TimePicker('.' + id)

            // view to model
            handle.on('change', function () {
                scope.ngModel = element.val();
                ctrl.$setViewValue(scope.ngModel);
                scope.$applyAsync();
            });

            ctrl.$render = function () {
                 handle.setValue(ctrl.$viewValue);
                 handle.refreshInputs();
             };

        }
    }
})();
