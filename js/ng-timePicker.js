(function () {
    angular
        .module('timePicker', [])
        .directive('timePicker', timePicker);

    function timePicker($rootScope, $compile, $timeout) {
        return {
            restrict: 'A',
            scope   : {
                ngModel: '='
            },
            link    : linkFunc
        };

        function linkFunc(scope, element, attrs, ctrl) {
            var id     = 'time-' + Date.now()
            var handle = null

            scope.ngModel = scope.ngModel || '12:00';
            element.addClass(id)
            element.attr('value', scope.ngModel)
            handle = new TimePicker('.' + id) 

            // view to model
            handle.on('change', function () {
                scope.ngModel = element.val();
                scope.$applyAsync()
            });


            // model to view
            scope.$watch('ngModel', function (newVal) {
              element.attr('value', newVal);
            })
        }
    }
})();
