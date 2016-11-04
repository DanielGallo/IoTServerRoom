/**
 * Model for an individual Sensor value.
 */
Ext.define('Dash.model.Sensor', {
    extend: 'Ext.data.Model',

    identifier: 'sequential',

    fields: [{
        name: 'value'
    }, {
        name: 'text'
    }, {
        name: 'timestamp',
        type: 'date'
    }]
});