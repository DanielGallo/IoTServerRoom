Ext.define('Dash.view.widgets.Sidebar', {
    extend: 'Ext.Panel',
    xtype: 'sidebar',

    config: {
        expanded: false,

        mode: 'slide' // 'slide' or 'micro'
    },

    baseCls: 'sidebar',

    initialize: function() {
        var me = this;

        me.callParent();

        me.el.insertFirst({
            cls: me.getBaseCls() + '-mask',
            tag: 'div'
        }).on({
            tap: 'onMaskTap',
            scope: me
        });
    },

    updateExpanded: function(value) {
        this.toggleCls('expanded', value);
    },

    updateMode: function(curr, prev) {
        this.replaceCls(prev, curr);
    },

    toggleExpanded: function() {
        this.setExpanded(!this.getExpanded());
    },

    privates: {
        onMaskTap: function() {
            this.setExpanded(false);
        }
    }
});