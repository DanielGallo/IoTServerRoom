Ext.define('Dash.view.temperaturegauge.TemperatureGauge', {
    extend: 'Dash.view.dashboard.Panel',

    requires: [
        'Dash.view.temperaturegauge.TemperatureGaugeController',
        'Dash.view.temperaturegauge.TemperatureGaugeModel',
        'Ext.chart.PolarChart',
        'Ext.chart.series.Gauge',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.layout.Fit'
    ],

    xtype: 'temperaturegauge',

    viewModel: {
        type: 'temperaturegauge'
    },

    controller: 'temperaturegauge',

    platformConfig: {
        phone: {
            height: 180
        },
        tablet: {
            height: 260
        },
        desktop: {
            height: 380
        }
    },
    
    layout: 'fit',

    header: {
        hidden: true
    },

    items: [{
        xtype: 'titlebar',
        docked: 'top',

        bind: {
            title: '{title}',
            style: '{style}'
        }
    }, {
        xtype: 'container',
        layout: 'fit',
        width: '100%',
        height: '100%',
        bind: {
            style: 'background: {backgroundColor}'
        },
        items: [{
            xtype: 'polar',
            innerPadding: 10,
            width: '100%',
            height: '100%',
            flex: 1,
            bind: {
                background: '{backgroundColor}'
            },
            series: [{
                type: 'gauge',
                angleField: 'value',
                donut: 30,
                value: 60,
                minimum: 0,
                maximum: 45,
                needle: true,
                needleLength: 95,
                needleWidth: 2,
                totalAngle: Math.PI,
                label: {
                    fontSize: 14,
                    color: '#fff'
                },
                colors: ['white'],
                sectors: [{
                    end: 15,
                    label: 'Cold',
                    color: '#1565C0'
                }, {
                    end: 15,
                    style: {
                        strokeStyle: '#5F7D8C',
                        strokeOpacity: .3,
                        lineWidth: 3
                    }
                }, {
                    end: 30,
                    label: 'Warm',
                    color: '#F8710F'
                }, {
                    end: 30,
                    style: {
                        strokeStyle: '#5F7D8C',
                        strokeOpacity: .3,
                        lineWidth: 3
                    }
                }, {
                    end: 45,
                    label: 'Hot',
                    color: '#CF3A3D'
                }]
            }]
        }]
    }]
});