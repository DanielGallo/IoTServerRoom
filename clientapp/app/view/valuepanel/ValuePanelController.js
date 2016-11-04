Ext.define('Dash.view.valuepanel.ValuePanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.valuepanel',

    init: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            maxValue = view.getMaxValue(),
            alertsButton = me.lookupReference('alertsButton');

        // If we're restricting to a maximum value, then start capturing alerts.
        // "maxValue" is optional on each instance of the panel. If it isn't specified, then alerts won't be captured
        // for that panel.
        if (maxValue) {
            alertsButton.show();

            viewModel.set('AlertCount', 0);
        }
    },

    bindStore: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            maxValue = view.getMaxValue(),
            sensorName = view.getSensorName(),
            chart = view.down('chart'),
            yAxis = chart.getAxes()[0],
            store = viewModel.get(sensorName);

        chart.bindStore(store);

        if (maxValue) {
            store.on('add', me.onLatestSensorData, me);
        }

        // Can't seem to set these without a slight delay. Timing issue.
        Ext.defer(function() {
            yAxis.setMinimum(viewModel.get('chartMin'));
            yAxis.setMaximum(viewModel.get('chartMax'));
            chart.redraw();
        }, 10);
    },

    onLatestSensorData: function(store, records) {
        if (!store) {
            return;
        }

        var me = this,
            view = me.getView(),
            title = view.getTitle(),
            viewModel = view.getViewModel(),
            maxValue = view.getMaxValue(),
            newAlerts = [],
            alertStore = Ext.getStore('Alerts');
        
        for (var i = 0; i < records.length; i ++) {
            if (records[i].get('value') > maxValue) {
                newAlerts.push(Ext.create('Dash.model.Alert', {
                    text: title + ' sensor threshold exceeded',
                    value: records[i].get('value'),
                    date: records[i].get('timestamp'),
                    sensorName: view.getSensorName(),
                    numberFormatter: view.getNumberFormatter(),
                    measurement: view.getMeasurement()
                }));
            }
        }

        alertStore.add(newAlerts);
    },

    onShowAlerts: function() {
        var me = this;

        me.redirectTo('alerts');
    }
});