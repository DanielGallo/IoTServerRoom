var jfive = require('johnny-five'),
    Edison = require('edison-io'),
    aws = require('aws-sdk'),
    uuid = require('node-uuid'),
    fs = require('fs'),
    childProcess = require('child_process'),
    s3bucketName = 'danieljgallo-iot-data',
    board, s3bucket;

board = new jfive.Board({
    io: new Edison({
        i2c: {
            bus: 6
        }
    })
});

// Captured photos from the USB webcam will be published to Amazon S3
s3bucket = new aws.S3({
    params: {
        Bucket: s3bucketName
    }
});

board.on('ready', function() {
    var lcd = new jfive.LCD({
        controller: 'JHD1313M1'
    });
    
    var startupMessage = 'Monitoring...   ';
    var redBackground = false;
    
    // "box1" is similar to a "degree" symbol. Require this for use when showing temperature.
    lcd.useChar('box1');
    
    // Default background color on startup will be green
    lcd.bgColor('#00ff00');
    
    // Show the startup message on the LCD
    lcd.home().print(startupMessage);
    
    var Sensors = require('./Sensors'),
        Temperature = require('./Temperature'),
        Humidity = require('./Humidity'),
        Moisture = require('./Moisture'),
        Light = require('./Light'),
        Uv = require('./Uv'),
        Air = require('./Air'),
        Motion = require('./Motion'),
        PanicButton = require('./PanicButton'),
        sensors;

    sensors = new Sensors();
    
    sensors.add(new Temperature());
    sensors.add(new Humidity());
    sensors.add(new Moisture());
    sensors.add(new Light());
    sensors.add(new Uv());
    sensors.add(new Air());
    sensors.add(new Motion());
    sensors.add(new PanicButton());
    
    // Update the LCD display every second
    var timer = setInterval(function() {
        var sensorData = sensors.getData();
        
        if (sensorData.temperature && sensorData.humidity
           && sensorData.temperature.value && sensorData.humidity.value) {
            lcd.cursor(1, 0).print(sensorData.temperature.value.toFixed(1) + ':box1:C | ' + sensorData.humidity.value.toFixed(1) + '%');
        }
        
        if ((sensorData.motion && sensorData.motion.alarm) 
            || (sensorData.panicbutton && sensorData.panicbutton.alarm)) {
            redBackground = !redBackground;

            // If there is an alarm, alternate every second between a red and white backlit screen
            if (redBackground) {
                lcd.bgColor('#ff0000');
            } else {
                lcd.bgColor('#ffffff');
            }
            
            if (sensorData.motion && sensorData.motion.alarm) {
                lcd.home().print('Motion detected ');
            } else {
                lcd.home().print('Panic alarm     ');
            }
        } else {
            // When any alarm is reset, show the default startup message and revert to green backlit screen
            lcd.home().print(startupMessage);
            lcd.bgColor('#00ff00');
        }
    }, 1000);
});