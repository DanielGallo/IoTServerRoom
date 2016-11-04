Ext.define('Dash.view.alarmstatus.AlarmStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.alarmstatus',

    alarmPubNub: null,

    init: function() {
        var me = this,
            view = me.getView(),
            channel = view.getChannel();

        me.alarmPubNub = PUBNUB.init({
            ssl: true,
            publish_key: Ext.manifest.pubnub.publishkey,
            subscribe_key: Ext.manifest.pubnub.subscribekey,
            error: function (error) {
                console.error('Error connecting to PubNub service');
            }
        });

        // Get historic data, so the dashboard shows some recent data on initialization, rather than
        // wait for new data.
        me.alarmPubNub.history({
            channel: channel,
            callback: function(history){
                me.processHistoryCallback(history);
            },
            count: 25
        });

        // Subscribe to new messages for this alarm panel
        me.alarmPubNub.subscribe({
            channel: channel,
            message: function(message) {
                me.processSubscribeCallback(message);
            } 
        });
    },

    /**
     * Callback function for Historic data provided by PubNub.
     *
     * @param {Object} history An object containing the array of the most recent historic data, along with timestamps.
     */
    processHistoryCallback: function(history) {
        var me = this,
            record;

        if (history[0]
            && history[0].length) {
            for (var i = 0; i < history[0].length; i ++) {
                record = history[0][i];

                me.addAlert(record);
            }
        }
    },

    /**
     * Callback function for any new Alarm data received.
     *
     * @param {Object} record An individual sensor record, containing the value, timestamp, and an optional photo URL.
     */
    processSubscribeCallback: function(record) {
        var me = this,
            viewModel = me.getViewModel();

        viewModel.set('alarm', record.alarm);

        if (record.alarm) {
            Dash.ux.data.Lifx.pulse({
                color: 'red',
                period: 0.75,
                cycles: 10
            });

            viewModel.set('photo', record.photo);
            viewModel.set('photoUrl', record.photoUrl);
            viewModel.set('alarmTime', new Date(record.timestamp));
        }

        me.addAlert(record);
    },

    /**
     * Resets the associated alarm flag to "off". This publishes a message via PubNub, to which the Intel Edison device
     * subscribes. The Edison device then updates the LCD display to reflect the reset of the alarm.
     */
    onAlarmReset: function() {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel(),
            photoButton = me.lookup('photoButton');

        // Return to the Alarm Status card
        view.setActiveItem(0);
        view.activeItemIndex = 0;
        photoButton.setIconCls('x-fa fa-camera');

        // Notify any other potential clients that the alarm has been reset
        me.alarmPubNub.publish({
            channel: view.getChannel() + '-reset',
            message: {
                alarm: false
            }
        });

        // Turn off the LIFX bulb if it's still on
        Dash.ux.data.Lifx.setState({
            state: 'off'
        });

        viewModel.set('alarm', false);
        viewModel.set('alarmTime', null);
        viewModel.set('photo', false);
        viewModel.set('photoUrl', null);
    },

    /**
     * Adds a new Alert to the Alerts Store.
     *
     * @param {Object} record The record object provided by PubNub, containing the sensor values.
     */
    addAlert: function(record) {
        var me = this,
            view = me.getView(),
            sensorName = view.getSensorName(),
            alertStore = Ext.getStore('Alerts');

        alertStore.add(Ext.create('Dash.model.Alert', {
            text: record.text,
            value: null,
            date: record.timestamp,
            sensorName: sensorName,
            photoUrl: record.photoUrl
        }));
    },

    /**
     * Switches between the alarm summary view and the photo view.
     *
     * @param button Reference to the Button being clicked.
     */
    onTogglePhoto: function(button) {
        var me = this,
            view = me.getView();

        if (!view.activeItemIndex) {
            view.activeItemIndex = 0;
        }

        view.activeItemIndex = view.activeItemIndex === 0 ? 1 : 0;

        if (view.activeItemIndex === 0) {
            button.setIconCls('x-fa fa-camera');
        } else {
            button.setIconCls('x-fa fa-exclamation-circle');
        }

        view.setActiveItem(view.activeItemIndex);
    }
});