/**
 * Utility class to interact with a LIFX light bulb - turn on/off and flash a bulb.
 */
Ext.define('Dash.ux.data.Lifx', {
    singleton: true,

    requires: [
        'Ext.Ajax'
    ],

    url: 'https://api.lifx.com/v1/lights/all',

    token: Ext.manifest.lifx.token,

    pulse: function(config) {
        var me = this,
            data;

        data = {
            power_on: true,
            from_color: 'white',
            color: config.color,
            period: config.period,
            cycles: config.cycles,
            persist: false
        };

        me.sendRequest('/effects/pulse', 'POST', data);
    },

    setState: function(config) {
        var me = this,
            data;

        data = {
            power: config.state,
            color: config.color,
            brightness: 1,
            duration: 0
        };

        me.sendRequest('/state', 'PUT', data);
    },

    privates: {
        sendRequest: function(endpoint, method, data) {
            var me = this;
            
            Ext.Ajax.request({
                url: me.url + endpoint,
                cors: true,
                method: method,
                jsonData: data,

                headers: {
                    'Authorization': 'Bearer ' + me.token
                }
            });
        }
    }
});