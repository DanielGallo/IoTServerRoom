"use strict";

var Sensor = require('./Sensor'),
    Uuid = require('node-uuid'),
    aws = require('aws-sdk'),
    fs = require('fs'),
    childProcess = require('child_process');

module.exports = class Motion extends Sensor {
    constructor() {
        super();
        
        var me = this,
            jfive = me.jfive,
            sensor;
        
        me.sensorName = 'Motion';
        
        me.sensor = sensor = new jfive.Motion({
            pin: 7 
        });
        
        sensor.on('motionstart', function() {
            // Image capture can take a couple of seconds to invoke, so image will come through later than motion sensor activation.
            me.captureImage();
            
            me.setData({
                alarm: true,
                text: 'Motion detected'
            });
        });
        
        // Listen for a reset of the motion sensor from the web app
        me.pubnub.subscribe({
            channel: me.getChannel() + '-reset',
            message: function() {
                me.setData({
                    alarm: false,
                    text: 'Motion sensor reset'
                });
            }
        });
        
        // Not worried about capturing motionend for now - just capture start of motion.
        /*sensor.on('motionend', function() {
            me.setData({
                alarm: false
            });
        });*/
    }
    
    /**
    * Captures a single photo from the connected USB webcam and uploads it to Amazon S3.
    * This photo is then shown in the dashboard application.
    */
    captureImage() {
        var me = this,
            imageName = Uuid.v4() + '.jpg',     // Generate a random filename
            decodedImage,
            s3bucketName = 'danieljgallo-iot-data',
            s3bucket;
        
        s3bucket = new aws.S3({
            params: {
                Bucket: s3bucketName
            }
        });
        
        // Requires ffmpeg be installed on the Intel Edison.
        // Switch "ss" specifies the number of seconds to skip before capturing a frame. This time should
        // allow the camera to focus properly before capturing an image.
        childProcess.exec('/home/ffmpeg/ffmpeg -f video4linux2 -ss 3 -video_size 1280x720 -i /dev/video0 -vframes 1 ' + imageName, function(error, stdout, stderr) {
            if (error !== null) {
                console.log('Camera capture error.');
                return;
            }

            // Read the captured image
            fs.readFile(imageName, function(err, originalData) {
                fs.writeFile('OriginalImage.jpg', originalData, function(err) {});
                
                var base64Image = originalData.toString('base64');
                decodedImage = new Buffer(base64Image, 'base64');
                fs.writeFile('DecodedImage.jpg', decodedImage, function(err) {});

                var params = {
                    Key: imageName, 
                    Body: decodedImage, 
                    ContentType: 'image/jpeg'
                };

                s3bucket.upload(params, function(err, data) {
                    if (err) {
                        console.log('Error uploading image:', err);
                    } else {
                        console.log('Uploaded image to Amazon S3', data);

                        // Delete the locally created file.
                        fs.unlink(imageName);

                        // After the image has been uploaded to S3, send through a subsequent alert to the web app with the image URL.
                        me.setData({
                            alarm: true,
                            photo: true,
                            photoUrl: 'https://s3-us-west-1.amazonaws.com/danieljgallo-iot-data/' + data.key,
                            text: 'Motion detected - picture captured'
                        });
                    }
                });
            });
        });
    }
}