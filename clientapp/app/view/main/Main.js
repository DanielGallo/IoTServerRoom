Ext.define('Dash.view.main.Main', {
    extend: 'Ext.Panel',
    xtype: 'app-main',

    requires: [
        'Dash.view.main.MainController',
        'Dash.view.main.MainModel',
        'Dash.ux.data.Lifx',
        'Ext.MessageBox',
        'Ext.plugin.Responsive'
    ],

    controller: 'main',
    viewModel: 'main',
    layout: 'card',

    items: [{
        xtype: 'toolbar',
        cls: 'mainHeader',
        docked: 'top',
        items: [{
            xtype: 'button',
            cls: 'menubutton',
            align: 'left',
            iconCls: 'x-fa fa-bars',
            handler: 'onShowHideMenuClick'
        }, {
            xtype: 'container',
            reference: 'title',
            html: 'Dashboard'
        }, {
            xtype: 'spacer'
        }, {
            xtype: 'button',
            hidden: true,
            reference: 'download',
            iconCls: 'x-fa fa-download',
            handler: 'onExportClick'
        }]
    }, {
        xtype: 'mainmenu',
        reference: 'mainmenu',
        docked: 'left',
        mode: 'micro',
        zIndex: 4,
        plugins: 'responsive',
        responsiveConfig: {
            'phone': {
                hidden: true
            }
        }
    }, {
        xtype: 'container',
        reference: 'dashboard',
        cls: 'dashboard',
        scrollable: 'vertical',

        items: [{
            xtype: 'temperaturegauge',
            title: 'Temperature',
            backgroundColor: '#78909C',
            channel: 'iot-sensor-temperature',
            sensorName: 'Temperature',

            // 25% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-25 medium-50 small-100 dashboard-item shadow'
        }, {
            xtype: 'valuepanel',
            title: 'Temperature',
            measurement: '°C',
            maxValue: 25,
            numberFormatter: '0.0',
            chartMin: 10,
            chartMax: 30,
            channel: 'iot-sensor-temperature',
            sensorName: 'Temperature',
            backgroundColorLeft: '#7CB13B',
            backgroundColorRight: '#89C540',

            // 25% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-25 medium-50 small-100 dashboard-item shadow'
        }, {
            xtype: 'valuepanel',
            title: 'Humidity',
            measurement: '%',
            maxValue: 90,
            numberFormatter: '0.0',
            chartMin: 0,
            chartMax: 100,
            channel: 'iot-sensor-humidity',
            sensorName: 'Humidity',
            backgroundColorLeft: '#A95BB6',
            backgroundColorRight: '#BB65CA',

            // 25% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-25 medium-50 small-100 dashboard-item shadow'
        }, {
            xtype: 'valuepanel',
            title: 'Moisture',
            measurement: '',
            maxValue: 20,
            chartMin: 0,
            chartMax: 100,
            channel: 'iot-sensor-moisture',
            sensorName: 'Moisture',
            backgroundColorLeft: '#E88A00',
            backgroundColorRight: '#FF9900',

            // 25% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-25 medium-50 small-100 dashboard-item shadow'
        }, {
            xtype: 'valuepanel',
            title: 'Air Quality',
            measurement: ' ppm',
            maxValue: 400,
            chartMin: 50,
            chartMax: 1000,
            channel: 'iot-sensor-air',
            sensorName: 'Air',
            backgroundColorLeft: '#2196F3',
            backgroundColorRight: '#03A9F4',

            // 25% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-25 medium-50 small-100 dashboard-item shadow'
        }, {
            xtype: 'valuepanel',
            title: 'Light Level',
            measurement: ' lx',
            numberFormatter: '0,000',
            chartMin: 0,
            chartMax: 130000,
            channel: 'iot-sensor-light',
            sensorName: 'Light',
            backgroundColorLeft: '#546E7A',
            backgroundColorRight: '#607D8B',

            // 25% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-25 medium-50 small-100 dashboard-item shadow'
        }, {
            xtype: 'valuepanel',
            title: 'UV Level',
            bindParam: 'Sensor.uv',
            measurement: ' mV',
            chartMin: 0,
            chartMax: 40,
            channel: 'iot-sensor-uv',
            sensorName: 'Uv',
            backgroundColorLeft: '#00838F',
            backgroundColorRight: '#0097A7',

            // 25% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-25 medium-50 small-100 dashboard-item shadow'
        }, {
            xtype: 'dayhourheatmap',
            title: 'Average Temperatures by Day and Hour',
            backgroundColor: '#78909C',

            // 50% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-50 medium-50 small-100 dashboard-item shadow'
        }, {
            xtype: 'alarmstatus',
            title: 'Panic Alarm',
            channel: 'iot-sensor-panicbutton',
            sensorName: 'Panic Alarm',

            // 25% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-25 medium-50 small-100 dashboard-item shadow'
        }, {
            xtype: 'alarmstatus',
            title: 'Motion Sensor',
            channel: 'iot-sensor-motion',
            sensorName: 'Motion',

            // 25% width when viewport is big enough (desktop)
            // 50% width when viewport has a medium size (tablet)
            // 100% width when viewport is small (phone)
            userCls: 'big-25 medium-50 small-100 dashboard-item shadow'
        }]
    }, {
        xtype: 'alertgrid',
        reference: 'alerts'
    }, {
        xtype: 'about',
        reference: 'about'
    }]
});
