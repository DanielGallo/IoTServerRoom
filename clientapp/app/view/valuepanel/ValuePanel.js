Ext.define('Dash.view.valuepanel.ValuePanel', {
    extend: 'Dash.view.dashboard.Panel',

    requires: [
        'Dash.view.valuepanel.ValuePanelModel',
        'Dash.view.valuepanel.ValuePanelController',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line'
    ],

    xtype: 'valuepanel',

    viewModel: {
        type: 'valuepanel'
    },

    controller: 'valuepanel',

    platformConfig: {
        phone: {
            height: 100
        },
        tablet: {
            height: 120
        },
        desktop: {
            height: 180
        }
    },

    layout: 'card',

    header: {
        docked: 'right',

        title: {
            hidden: true
        },

        bind: {
            style: 'background: {backgroundColorRight}',
            hidden: '{hideAlertBar}'
        },

        items: [{
            xtype: 'button',
            reference: 'alertsButton',
            cls: 'alert',
            iconCls: 'x-fa fa-bell-o',
            handler: 'onShowAlerts',
            bind: {
                badgeText: '{AlertCount}'
            }
        }]
    },

    items: [{
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'container',
            platformConfig: {
                phone: {
                    width: 120
                },
                tablet: {
                    width: 120
                },
                desktop: {
                    width: 180
                }
            },

            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },

            bind: {
                style: 'background: {backgroundColorLeft}'
            },

            items: [{
                xtype: 'cartesian',

                bind: {
                    background: '{backgroundColorLeft}'
                },

                platformConfig: {
                    phone: {
                        height: '80%'
                    },
                    tablet: {
                        height: '70%'
                    },
                    desktop: {
                        height: '70%'
                    }
                },

                width: '100%',

                // Curves at the bottom and top of the chart may disappear,
                // so add some inner padding to ensure their visibility
                innerPadding: {
                    top: 12,
                    left: 2,
                    right: 2,
                    bottom: 12
                },

                axes: [{
                    type: 'numeric',
                    position: 'left',
                    bind: {
                        fields: ['value']
                    },
                    grid: false,
                    hidden: true
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
                        lineWidth: 1
                    },
                    marker: {
                        radius: 1
                    },
                    xField: 'id',
                    bind: {
                        yField: 'value'
                    }
                }]
            }, {
                xtype: 'container',
                reference: 'sensortext',
                style: 'color: #fff',
                bind: {
                    html: '{sensorText}'
                }
            }]
        }, {
            xtype: 'container',
            flex: 2,
            bind: {
                html: '<div class="title">{title}</div>' +
                      '<span class="value">{value}</span><span class="measurement">{measurement}</span>',
                style: 'background: {backgroundColorRight}'
            },
            reference: 'content',
            cls: 'valuePanel'
        }]
    }]
});