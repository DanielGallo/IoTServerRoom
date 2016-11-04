"use strict";

var Sensor = require('./Sensor');

module.exports = class Uv extends Sensor {
    constructor() {
        super();
        
        var me = this,
            jfive = me.jfive,
            sensor;
        
        me.sensorName = 'Uv';
        
        me.sensor = sensor = new jfive.Sensor({
            pin: 'A3',
            freq: me.frequency
        });

        sensor.on('change', function() {
            me.setData({
                value: this.value
            });
        });
    } 
}