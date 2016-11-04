Ext.define('Dash.view.alarmstatus.AlarmStatus', {
    extend: 'Dash.view.dashboard.Panel',

    requires: [
        'Dash.view.alarmstatus.AlarmStatusModel',
        'Dash.view.alarmstatus.AlarmStatusController'
    ],

    xtype: 'alarmstatus',

    viewModel: {
        type: 'alarmstatus'
    },

    controller: 'alarmstatus',

    platformConfig: {
        phone: {
            height: 260
        },
        tablet: {
            height: 260
        },
        desktop: {
            height: 380
        }
    },

    cls: 'alarmpanel',

    header: {
        hidden: true
    },

    layout: 'card',

    bind: {
        style: 'background: {backgroundColor}'
    },

    items: [{
        xtype: 'titlebar',
        docked: 'top',

        bind: {
            title: '{title}',
            style: 'background: {backgroundColor}'
        },

        items: [{
            xtype: 'button',
            align: 'right',
            width: 24,
            height: 24,
            iconCls: 'x-fa fa-camera',
            reference: 'photoButton',
            bind: {
                hidden: '{!photo}'
            },
            handler: 'onTogglePhoto'
        }, {
            xtype: 'button',
            align: 'right',
            width: 24,
            height: 24,
            iconCls: 'x-fa fa-repeat',
            reference: 'resetButton',
            bind: {
                hidden: '{!alarm}'
            },
            handler: 'onAlarmReset'
        }]
    }, {
        xtype: 'container',
        height: '100%',
        width: '100%',
        bind: {
            style: 'background: {backgroundColor}',
            html: '<div class="alarmContainer">' +
                    '<span class="alarm x-fa {alarmCssClass}"></span><br>' +
                    '<span class="alarmMessage">{alarmMessage}</span>' +
                  '</div>'
        }
    }, {
        xtype: 'container',
        height: '100%',
        width: '100%',
        bind: {
            style: 'background: {backgroundColor}',
            html: '<div class="alarmContainer">' +
                    '<a href="{photoUrl}" target="_blank"><img style="width: 90%;" src="{photoUrl}" /></a>' +
                  '</div>'
        }
    }]
});