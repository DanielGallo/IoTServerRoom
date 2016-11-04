"use strict";

module.exports = class Sensors {
    
    constructor () {
        // Stores a reference to all of the instantiated sensors in one object
        this.sensors = {};
    }
    
    /**
    * Adds a new Sensor object to the collection
    */
    add (sensor) {
        this.sensors[sensor.sensorName.toLowerCase()] = sensor;
    }
    
    /**
    * Retrieves an object containing all sensors and their current values.
    */
    getData() {
        var data = {};
        
        for(var sensor in this.sensors) {
            data[sensor.toLowerCase()] = this.sensors[sensor].getData();
        }
        
        return data;
    }
}