/*global m, Calendar, window*/
(function(m, Calendar) {
    var module = {};

    module.controller = function() {
        module.vm.init();
        this.calendar = new Calendar({

        });
    };

    module.vm = {};
    module.vm.init = function(data) {
        this.customers = data;
        this.rowsperpage = 10;
        this.filter = m.prop('');
    };

    module.view = function(ctrl) {
        return m('', [
            m('.ui.grid.page', [
                ctrl.calendar.view(),
            ]),
        ]);
    };
    m.module(window.document.getElementById("mySegment"), module);
}(m, Calendar));
