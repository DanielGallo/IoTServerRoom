Ext.define('Dash.view.scatterchart.ScatterChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scatterchart',

    bindStore: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            sensorName = view.getSensorName(),
            chart = view.down('chart');

        chart.bindStore(viewModel.get(sensorName));
    }
});