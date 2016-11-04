Ext.define('Dash.view.alertgrid.AlertGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.alertgrid',

    onValueRender: function(value, record) {
        if (record.get('numberFormatter') != '') {
            return Ext.util.Format.number(value, record.get('numberFormatter')) + record.get('measurement');
        } else {
            return value;
        }
    },

    onTextValueRender: function(value, record) {
        var me = this,
            alert;

        alert = value;

        if (record.get('photoUrl')) {
            alert += ' (<a href="' + record.get('photoUrl') + '" target="_blank">Photo</a>)';
        }

        return alert;
    },

    /**
     * Renderer used on phones. Only one column is visible when using a phone, so we combine multiple values in to
     * that one column.
     *
     * @param value
     * @param record
     * @returns {string}
     */
    onPhoneValueRender: function(value, record) {
        var me = this,
            alertValue;

        if (record.get('numberFormatter') != '') {
            alertValue = Ext.util.Format.number(value, record.get('numberFormatter')) + record.get('measurement');
        } else {
            alertValue = value;
        }

        return record.get('text') + '<br><span style="font-weight: bolder">' + alertValue + '</span> on ' +
            Ext.Date.format(record.get('date'), 'd M y \\a\\t H:i:s');
    },

    /**
     * Exports the Alerts data to XLSX format.
     */
    exportData: function() {
        var me = this;

        me.getView().saveDocumentAs({
            type: 'excel07',
            title: 'Dashboard Alerts',
            fileName: 'IoT-Alert-Export.xlsx'
        });
    }
});