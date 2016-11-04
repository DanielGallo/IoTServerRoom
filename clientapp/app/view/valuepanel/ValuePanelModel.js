Ext.define('Dash.view.valuepanel.ValuePanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.valuepanel',

    data: {
        AlertCount: null
    },
    
    updateView: function(view) {
        if (view) {
            var sensorName = view.getSensorName();

            this.setFormulas({
                /**
                 * The current numeric sensor value.
                 */
                value: {
                    bind: {
                        bindTo: '{' + sensorName + 'CurrentValue}'
                    },
                    get: function(data) {
                        return Ext.util.Format.number(data, view.getNumberFormatter());
                    }
                },

                /**
                 * The Value panel can show an optional text label. For example, the Air Quality sensor will return a 
                 * label such as "Low pollution", along with the numeric value. The text value, if present, will show 
                 * up underneath the Value panel.
                 */
                sensorText: {
                    bind: {
                        bindTo: '{' + sensorName + 'CurrentText}'
                    }, 
                    get: function(data) {
                        return data;
                    }
                },

                /**
                 * If the Value panel doesn't have a maximum threshold value specified, we can just hide the toolbar
                 * that contains the "Alerts" button.
                 */
                hideAlertBar: {
                    get: function() {
                        return view.getMaxValue() === null;
                    }
                },

                /**
                 * When two different shades of background colors are used in a dashboard panel (e.g. left and right),
                 * use "backgroundColorLeft" and "backgroundColorRight".
                 */
                backgroundColorLeft: {
                    get: function (get) {
                        return view.getBackgroundColorLeft();
                    }
                },

                backgroundColorRight: {
                    get: function (get) {
                        return view.getBackgroundColorRight();
                    }
                },

                title: { 
                    get: function () {
                        return view.getTitle();
                    }
                },

                /**
                 * The minimum value to show on the Y axis. Used for initial scaling of the chart based on the possible
                 * range of values it may show.
                 */
                chartMin: {
                    get: function() {
                        return view.getChartMin();
                    }
                },

                /**
                 * The maximum value to show on the Y axis. Used for initial scaling of the chart based on the possible
                 * range of values it may show.
                 */
                chartMax: {
                    get: function() {
                        return view.getChartMax();
                    }
                },

                /**
                 * The measurement that is appended after the numeric value on the dashboard panel, e.g. "%" or
                 * "Celsius".
                 */
                measurement: {
                    get: function() {
                        return view.getMeasurement();
                    }
                }
            });
        }
    }
});