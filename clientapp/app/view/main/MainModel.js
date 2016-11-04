Ext.define('Dash.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        LastSensorResponse: null,
        AlertCount: null
    },

    stores: {
        Alerts: {
            storeId: 'Alerts',
            model: 'Dash.model.Alert',
            groupField: 'sensorName',
            sorters: [{
                property: 'date',
                direction: 'DESC'
            }],
            listeners: {
                add: 'updateAlertCounts'
            }
        }
    }
});