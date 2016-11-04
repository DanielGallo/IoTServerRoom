"use strict";

var jfive = require('johnny-five'),
    PubNub = require('pubnub'),
    fs = require('fs');

module.exports = class Sensor {
    constructor() {
        // Retrieve the PubNub publish/subscribe keys from the app.json file
        var config = JSON.parse(
            fs.readFileSync(__dirname + '/App.json')
        );

        this.jfive = jfive;
        
        this.data = {};
        
        this.sensorName = null;
        
        // Have an onChange event that can optionally be used
        this.onChangeCallback = null;
        
        // Publish sensor value every 1.5 seconds
        this.frequency = 1500;
        
        this.pubnub = new PubNub({
            ssl: true,
            subscribe_key: config.pubnub.subscribekey,
            publish_key: config.pubnub.publishkey
        });
    }
    
    /**
    * Return current data for the individual sensor
    */
    getData() {        
        return this.data;
    }
    
    onChange(callback) {
        var me = this;
        
        me.onChangeCallback = callback;
    }
    
    /**
    * Set the Sensor data to an internal object.
    * If the Sensor data has changed from its previous value, post the data.
    */
    setData(data) {
        var me = this,
            previousData = me.data;
        
        me.data = data;
        
        // Do a quick check to see if the Sensor's data is different from its previous value.
        if (JSON.stringify(previousData) != JSON.stringify(data)) {
            me.postData();
            
            if (me.onChangeCallback != null) {
                me.onChangeCallback.call(me, me.data);
            }
        }
    }
    
    /**
    * Return the PubNub channel name for this sensor.
    * This is the channel to which the sensor values will be published.
    */
    getChannel() {
        var me = this,
            sensorName = me.sensorName;
        
        return 'iot-sensor-' + sensorName.toLowerCase();
    }
    
    /**
    * Post the Sensor's value to PubNub
    */
    postData() {
        var me = this,
            message = me.data,
            sensorName = me.sensorName;

        message.timestamp = new Date();
        message.sensorName = sensorName;
        
        //Publish messages to their own sensor-specific channel.
        this.pubnub.publish({
            channel: me.getChannel(),
            message: message
        }); 
    }
}