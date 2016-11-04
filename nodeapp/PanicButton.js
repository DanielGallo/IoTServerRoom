"use strict";

var Sensor = require('./Sensor');

module.exports = class PanicButton extends Sensor {
    constructor() {
        super();
        
        var me = this,
            jfive = me.jfive,
            pubnub = me.pubnub,
            sensor;
        
        me.sensorName = 'PanicButton';
        
        me.sensor = sensor = new jfive.Button(2);

        sensor.on('press', function() {
            me.setData({
                alarm: true,
                text: 'Panic button activated'
            });
        });
        
        // Listen for a reset of the panic button from the web app
        pubnub.subscribe({
            channel: me.getChannel() + '-reset',
            message: function() {
                me.setData({
                    alarm: false,
                    text: 'Panic button reset'
                });
            }
        });
    } 
}