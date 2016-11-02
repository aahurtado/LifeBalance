/*global m, Calendar, window*/
(function(m, Calendar) {
    var module = {};

    module.controller = function() {
        module.vm.init();
        this.calendar = new Calendar({
            mindate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
            maxdate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000 + 10000000)
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
