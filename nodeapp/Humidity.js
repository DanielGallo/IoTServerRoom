"use strict";

var Sensor = require('./Sensor');

module.exports = class Humidity extends Sensor {
    constructor() {
        super();
        
        var me = this,
            jfive = me.jfive,
            sensor;
        
        me.sensorName = 'Humidity';
        
        me.sensor = sensor = new jfive.Multi({
            controller: 'TH02',
            freq: me.frequency
        });

        sensor.on('change', function() {
            me.setData({
                value: this.hygrometer.relativeHumidity
            });
        });
    } 
}