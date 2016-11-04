"use strict";

var Sensor = require('./Sensor');

module.exports = class Moisture extends Sensor {
    constructor() {
        super();
        
        var me = this,
            jfive = me.jfive,
            sensor;
        
        me.sensorName = 'Moisture';
        
        me.sensor = sensor = new jfive.Sensor({
            pin: 'A1',
            freq: me.frequency
        })

        sensor.scale(0, 100).on('change', function() {
            me.setData({
                value: this.value
            });
        });
    } 
}