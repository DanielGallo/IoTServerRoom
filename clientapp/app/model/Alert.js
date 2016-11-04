/**
 * New Alerts are created when values from the sensors exceed a defined threshold.
 */
Ext.define('Dash.model.Alert', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'text'
    }, {
        name: 'value',
        type: 'number',
        allowNull: true
    }, {
        name: 'date',
        type: 'date'
    }, {
        name: 'sensorName'
    }, {
        name: 'numberFormatter',
        type: 'string',
        defaultValue: ''
    }, {
        name: 'measurement',
        type: 'string',
        defaultValue: ''
    }, {
        name: 'photoUrl'
    }]
});