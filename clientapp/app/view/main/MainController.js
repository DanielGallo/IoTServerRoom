Ext.define('Dash.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    routes: {
        ':type(/.*)?': {
            action: 'handleNavigationRoute',
            conditions: {
                ':type': '(dashboard|alerts|about)'
            }
        }  
    },
    
    respondInterval: 1000,
    maxRecordBuffer: 25,
    iterator: 0,
    charts: null,
    valuePanels: [],
    previousCallbackTime: null,

    init: function() {
        var me = this,
            viewModel = me.getViewModel(),
            stores = {},
            dashboard = me.lookup('dashboard'),
            channels = {},
            channel, childController, i, xtype;

        var pubnub = PUBNUB.init({
            subscribe_key: Ext.manifest.pubnub.subscribekey,
            ssl: true,
            windowing: 1500
        });

        for (i = 0; i < dashboard.items.length; i ++) {
            // Dynamically create Stores for the sensor data, based on the dashboard panels
            if (dashboard.items.items[i].getSensorName) {
                sensorName = dashboard.items.items[i].getSensorName();

                if (!stores[sensorName]) {
                    stores[sensorName] = {
                        storeId: sensorName,
                        model: 'Dash.model.Sensor'
                    };
                    
                    stores[sensorName + 'Single'] = {
                        storeId: sensorName + 'Single',
                        model: 'Dash.model.Sensor'
                    };
                }
            }

            xtype = dashboard.items.items[i].xtype;

            if (xtype != 'alarmstatus' && xtype != 'dayhourheatmap') {
                channel = dashboard.items.items[i].getChannel();

                if (! channel) {
                    channel = '';
                }

                // If we've already setup this Channel, move to the next one
                if (! channels[channel]) {
                    channels[channel] = {};

                    // Get historic data, so the dashboard shows some recent data on initialization, rather than
                    // wait for new data.
                    pubnub.history({
                        channel: channel,
                        callback: function(history){
                            me.processHistoryCallback(history);
                        },
                        count: 25
                    });

                    // Setup subscriptions to the different sensor channels (each sensor publishes values to a
                    // separate channel)
                    pubnub.subscribe({
                        channel: channel,
                        error: function (error) {
                            console.error('Error connecting to PubNub service');
                        },
                        callback: function(record) {
                            me.processSubscribeCallback(record);
                        }
                    });
                }
            }
        }

        // Add the new Store definitions to the View Model
        viewModel.setStores(stores);

        // Now bind any charts in dashboard panels to these new Stores. If there is a "bindStore" method on the
        // panel's Controller, call it.
        for (i = 0; i < dashboard.items.length; i ++) {
            childController = dashboard.items.items[i].getController();

            if (childController &&
                childController.bindStore) {
                childController.bindStore();
            }
        }
    },

    /**
     * Callback function for Historic data provided by PubNub.
     *
     * @param {Object} history An object containing the array of the most recent historic data, along with timestamps.
     */
    processHistoryCallback: function(history) {
        var me = this,
            viewModel = me.getViewModel(),
            store, record;

        // If there's a valid object returned from PubNub, and it contains an array of records, process the data
        if (history[0]
            && history[0].length) {
            for (var i = 0; i < history[0].length; i ++) {
                record = history[0][i];

                // Locate the store for this particular sensor
                if (!store) {
                    store = viewModel.getStore(record.sensorName);
                }

                // Add the individual sensor value to the store
                store.add(Ext.create('Dash.model.Sensor', record));
            }

            // For the final record in the resultset, use this as the current (most recent) value.
            // Set the most recent value on the View Model, which the individual dashboard panel will bind to.
            if (record) {
                viewModel.set(record.sensorName + 'CurrentValue', record.value);
                viewModel.set(record.sensorName + 'CurrentText', record.text);

                // Add the very latest sensor record to a Store that only holds one record.
                // This is required when binding a Chart to a single record, like a gauge showing current temperature.
                store = viewModel.getStore(record.sensorName + 'Single');
                store.loadData([Ext.create('Dash.model.Sensor', record)], false);

                // After all the records have been added to the Store, "scroll" the Charts for this particular sensor.
                // This animates and shifts the data points along the Y-axis, in order to show the latest batch of data.
                me.limitChartView(record.sensorName);
            }
        }
    },

    /**
     * Callback function for any new Sensor data received.
     *
     * @param {Object} record An individual sensor record, containing the sensor's name, value and timestamp.
     */
    processSubscribeCallback: function(record) {
        var me = this,
            viewModel = me.getViewModel(),
            sensorName = record.sensorName,
            store;

        if (sensorName &&
            viewModel.getStore(sensorName)) {

            store = viewModel.getStore(sensorName);
            store.add(Ext.create('Dash.model.Sensor', record));

            viewModel.set(sensorName + 'CurrentValue', record.value);
            viewModel.set(sensorName + 'CurrentText', record.text);

            // Add the very latest sensor record to a Store that only holds one record
            store = viewModel.getStore(sensorName + 'Single');
            store.loadData([Ext.create('Dash.model.Sensor', record)], false);

            me.limitChartView(sensorName);
        }
    },

    /**
     * Reanimate the charts by setting the min and max ranges on the X Axis. This "animates" the new chart data
     * in to view.
     *
     * @param {String} sensorName The sensor name
     */
    limitChartView: function(sensorName) {
        var me = this,
            view = me.getView(),
            dashboard, charts, chart, portlet, axis, store, start, end;

        if (!me.charts) {
            me.charts = {};
            dashboard = me.lookup('dashboard');

            for (var i = 0; i < dashboard.items.length; i ++) {
                portlet = dashboard.items.items[i];

                if (portlet.getSensorName) {
                    if (!me.charts[portlet.getSensorName()]) {
                        me.charts[portlet.getSensorName()] = [];
                    }

                    chart = portlet.down('cartesian');

                    if (chart) {
                        me.charts[portlet.getSensorName()].push(chart);
                    }
                }
            }
        }

        // Get all charts that get data for this particular Sensor
        charts = me.charts[sensorName];

        // Update each of the charts and restrict them to show the latest X number of records
        for (var i = 0; i < charts.length; i ++) {
            store = charts[i].getStore();

            if (store &&
                store.getCount() > me.maxRecordBuffer) {
                axis = charts[i].getAxes()[1];
                start = store.data.items.length - me.maxRecordBuffer;
                end = store.data.items.length + 1;

                if (start < 1) {
                    start = 1;
                }

                // For each chart that uses this Sensor data, set the minimum and maximum ranges on the Y Axis,
                // which animates the latest data in to view
                axis.setMinimum(start);
                axis.setMaximum(end);
            }
        }
    },

    /**
     * When new Alerts get added to the Alerts Store, update the badge text on each of the dashboard panels.
     * 
     * @param store
     */
    updateAlertCounts: function(store) {
        var me = this,
            view = me.getView(),
            valuePanels = me.valuePanels,
            sensorName, counter;

        if (me.valuePanels.length === 0) {
            // Locate value panels that have a max threshold value specified.
            // We will then update the badgeText on those panels.
            valuePanels = me.valuePanels = view.query('valuepanel[maxValue != null]');
        }

        for (var i = 0; i < valuePanels.length; i ++) {
            counter = 0;
            sensorName = valuePanels[i].getSensorName();

            // Get a total number of alerts related to each panel
            for (var r = 0; r < store.data.items.length; r ++) {
                if (store.data.items[r].get('sensorName') === sensorName) {
                    counter ++;
                }
            }

            // Set the total alert count on the view model for each of the individual panels
            if (counter == 0) {
                valuePanels[i].getViewModel().set('AlertCount', '');
            } else {
                valuePanels[i].getViewModel().set('AlertCount', Ext.util.Format.number(counter, '0,000'));
            }
        }
    },

    handleNavigationRoute: function(type, args) {
        var me = this,
            view = me.getView(),
            store = Ext.getStore('Menu'),
            entry = store.getById(type),
            title = me.lookup('title'),
            downloadBtn = me.lookup('download');

        me.lookup('mainmenu').setSelection(entry);
        
        if (!entry) {
            return null;
        }

        view.setActiveItem(view.lookup(type));

        title.setHtml(entry.get('text'));

        if (type === 'alerts' && Ext.platformTags.desktop) {
            downloadBtn.show();
        } else {
            downloadBtn.hide();
        }
    },

    onShowHideMenuClick: function(button) {
        var me = this,
            menu = me.lookup('mainmenu');

        if (menu.isHidden()) {
            menu.show();
        } else {
            menu.hide();
        }
    },

    onExportClick: function(button) {
        var me = this,
            view = me.lookup('alerts'),
            controller = view.getController();
        
        controller.exportData();
    }
});
