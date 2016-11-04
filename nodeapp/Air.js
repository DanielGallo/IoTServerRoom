"use strict";

var Sensor = require('./Sensor');

module.exports = class Air extends Sensor {
    constructor() {
        super();
        
        var me = this,
            jfive = me.jfive,
            sensor;
        
        me.sensorName = 'Air';
        
        me.sensor = sensor = new jfive.Sensor('A0');

        // When the sensor first initialized
        me.startTime = Date.now();
        
        // When the last sensor reading was published to PubNub
        me.lastReadingTime = Date.now();

        sensor.on('change', function() {
            var sensorMeaning = '';
            
            if (me.isWarming() || me.isTooSoon()) {
                return;
            }

            me.lastReadingTime = Date.now();
            
            // Along with the numerical sensor value, return a textual meaning to display on the dashboard
            if(this.value < 200) {
                sensorMeaning = 'Normal';
            } else if (this.value < 400) {
                sensorMeaning = 'Low Pollution';
            } else if (this.value < 600) {
                sensorMeaning = 'High Pollution';
            } else {
                sensorMeaning = 'Very High Pollution';
            }
            
            me.setData({
                value: this.value,
                text: sensorMeaning
            });
        });
    } 
    
    /**
    * The Air Quality sensor can take a while to warm up
    */
    isWarming() {
        var me = this,
            diff = (Date.now() - me.startTime) < 10000;
        
        return diff;
    }
    
    /**
    * Don't read values from the sensor too often
    */
    isTooSoon() {
        var me = this;
        
        return Date.now() - me.lastReadingTime < 1000;
    }
}