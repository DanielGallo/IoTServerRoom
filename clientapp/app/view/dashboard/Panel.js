Ext.define('Dash.view.dashboard.Panel', {
    extend: 'Ext.Panel',

    xtype: 'dashboardpanel',

    config: {
        /**
         * Some dashboard panels might just have one background color, in which case "backgroundColor" is set.
         */
        backgroundColor: '#FFFFFF',

        /**
         * When two different shades of background colors are used in a dashboard panel (e.g. left and right), use
         * "backgroundColorLeft" and "backgroundColorRight".
         */
        backgroundColorLeft: '#7CB13B',
        backgroundColorRight: '#89C540',

        /**
         * Name of the Sensor.
         */
        sensorName: null,

        /**
         * The name of the PubNub Channel that this panel will be subscribed.
         */
        channel: null,

        /**
         * The minimum value to show on the Y axis. Used for initial scaling of the chart based on the possible
         * range of values it may show.
         */
        chartMin: 0,

        /**
         * The maximum value to show on the Y axis. Used for initial scaling of the chart based on the possible
         * range of values it may show.
         */
        chartMax: 40,

        /**
         * An optional maximum allowed numeric value for this particular sensor. If the value exceeds this defined
         * threshold, this will trigger an alert to be logged.
         */
        maxValue: null,

        /**
         * The default formatter that is applied to the numeric value. Allows specification of decimal formatting,
         * or showing of the thousand separator.
         */
        numberFormatter: '0',

        /**
         * The measurement that is appended after the numeric value on the dashboard panel, e.g. "%" or "Celsius".
         */
        measurement: null
    }
});