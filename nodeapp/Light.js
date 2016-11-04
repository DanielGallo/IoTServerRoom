"use strict";

var Sensor = require('./Sensor');
var groveSensor = require('jsupm_grove');

module.exports = class Light extends Sensor {
    constructor() {
        super();
        
        var me = this,
            jfive = me.jfive,
            sensor;
        
        me.sensorName = 'Light';
        
        me.sensor = sensor = new groveSensor.GroveLight(2);
        
        var readValue = function() {
            var sensorValue = sensor.raw_value();
            
            // Need to set an upper limit on the raw value if reading is really bright
            if (sensorValue > 1022) {
                sensorValue = 1022;
            }
            
            // Equivalent Excel formula, where A1 refers to the raw sensor value:
            // =10000/POWER(((1023-A1)*10/A1)*15,4/3)
            // Still not sure this is correct, as getting some really high values returned in fairly low light.
            sensorValue = 10000 / Math.pow(((1023 - sensorValue) * 10 / sensorValue) * 15, 4 / 3);
            
            me.setData({
                value: sensorValue
            });
        }
        
        setInterval(readValue, me.frequency);
    } 
}