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

            scope.ngModel = scope.ngModel || {
                    hours  : 12,
                    minutes: 0,
                    seconds: 0
                }
            element.addClass(id)
            element.attr('value', '12:00:00')
            handle = new TimePicker('.' + id)

            // view to model
            handle.on('change', function () {
                scope.ngModel.hours   = this.value.hours
                scope.ngModel.minutes = this.value.minutes
                scope.ngModel.seconds = this.value.seconds
                scope.ngModel.all     = element.val()

                scope.$applyAsync()
            });


            // model to view
            scope.$watch('ngModel', function (newVal) {
                handle.value = newVal
                handle.refreshInputs()
            })
        }
    }
})();
