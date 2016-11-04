Ext.define('Dash.view.alertgrid.AlertGrid', {
    extend: 'Ext.grid.Grid',

    requires: [
        'Dash.view.alertgrid.AlertGridController',
        'Ext.grid.plugin.Exporter'
    ],

    xtype: 'alertgrid',
    controller: 'alertgrid',

    bind: {
        store: '{Alerts}'
    },

    plugins: [{
        type: 'gridexporter'
    }],

    /**
     * On phones just show one column with a custom renderer.
     */
    platformConfig: {
        phone: {
            hideHeaders: true,
            
            columns: [{
                text: 'Alert Description',
                dataIndex: 'value',
                sortable: false,
                flex: 1,

                cell: {
                    renderer: 'onPhoneValueRender',
                    encodeHtml: false
                }
            }]
        }
    },

    grouped: true,

    columns: [{
        text: 'Alert',
        dataIndex: 'text',
        renderer: 'onTextValueRender',
        cell: {
            encodeHtml: false
        },
        minWidth: 200,
        flex: 1
    }, {
        xtype: 'datecolumn',
        format: 'd M y \\a\\t H:i:s',
        text: 'Date',
        dataIndex: 'date',
        width: 190,
        exportStyle: {
            format: 'dd mmm yyyy, h:mm AM/PM'
        }
    }, {
        text: 'Value',
        dataIndex: 'value',
        width: 190,
        renderer: 'onValueRender'
    }]
});