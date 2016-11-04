Ext.define('Dash.view.temperaturegauge.TemperatureGaugeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.temperaturegauge',

    bindStore: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            sensorName = view.getSensorName(),
            chart = view.down('polar');

        // Bind this to a Store that only holds a single record (the very latest sensor value)
        chart.bindStore(sensorName + 'Single');
    }
});