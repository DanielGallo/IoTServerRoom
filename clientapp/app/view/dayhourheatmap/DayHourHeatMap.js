Ext.define('Dash.view.dayhourheatmap.DayHourHeatMap', {
    extend: 'Dash.view.dashboard.Panel',

    requires: [
        'Dash.view.dayhourheatmap.DayHourHeatMapModel',
		'Dash.view.dayhourheatmap.DayHourHeatMapController'
    ],

    xtype: 'dayhourheatmap',

    viewModel: {
        type: 'dayhourheatmap'
    },

    controller: 'dayhourheatmap',

    layout: 'fit',

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

    bind: {
        style: 'background: {backgroundColor}'
    },

    items: [{
        xtype: 'titlebar',
        docked: 'top',

        bind: {
            title: '{title}',
            style: '{style}'
        }
    }, {
        xtype: 'd3',
        height: '100%',
        width: '100%',
        bind: {
            style: 'background: {backgroundColor}'
        },
        padding: '15 4 0 30',
        listeners: {
            sceneresize: 'onSceneResize'
        }
    }]
});