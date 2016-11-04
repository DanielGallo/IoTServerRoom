Ext.define('Dash.view.scatterchart.ScatterChart', {
    extend: 'Dash.view.dashboard.Panel',

    requires: [
        'Dash.view.scatterchart.ScatterChartController',
        'Dash.view.scatterchart.ScatterChartModel',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.layout.VBox'
    ],

    xtype: 'scatterchart',

    viewModel: {
        type: 'scatterchart'
    },

    controller: 'scatterchart',

    header: {
        hidden: true
    },
    
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
            xtype: 'cartesian',

            bind: {
                background: '{backgroundColor}'
            },

            width: '100%',
            height: '100%',

            insetPadding: {
                left: 19,
                right: 10
            },

            axes: [{
                type: 'numeric',
                position: 'left',
                fields: ['value'],
                style: {
                    strokeStyle: '#fff'
                },
                label: {
                    color: '#fff'
                },
                grid: false,
                minimum: 0,
                maximum: 40,
                increment: 10
            }, {
                type: 'category',
                hidden: true,
                position: 'bottom',
                fields: ['id']
            }],
            series: [{
                type: 'line',
                smooth: true,
                style: {
                    stroke: '#fff',
                    lineWidth: 2
                },
                marker: {
                    radius: 2
                },
                xField: 'id',
                yField: 'value'
            }]
        }]
    }]
});