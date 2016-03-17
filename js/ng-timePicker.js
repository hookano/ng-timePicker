(function () {
    angular
        .module('timePicker', [])
        .directive('timePicker', timePicker);

    function timePicker($rootScope, $compile, $timeout) {
        return {
            restrict: 'A',
            scope   : {
                model: '='
            },
            link    : linkFunc
        };

        function linkFunc(scope, element, attrs, ctrl) {
            var id     = 'time-' + Date.now()
            var handle = null

            scope.model = scope.model || {
                    hours  : 12,
                    minutes: 0
                }
            element.addClass(id)
            element.attr('value', '12:00:00')
            handle = new TimePicker('.' + id)

            // view to model
            handle.on('change', function () {
                scope.model.hours   = this.value.hours
                scope.model.minutes = this.value.minutes
                scope.model.all     = element.val()

                scope.$applyAsync()
            });


            // model to view
            scope.$watch('model', function (newVal) {
                handle.value = newVal
                handle.refreshInputs()
            })
        }
    }
})();