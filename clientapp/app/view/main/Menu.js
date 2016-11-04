Ext.define('Dash.view.main.Menu', {
    extend: 'Dash.view.widgets.Sidebar',
    xtype: 'mainmenu',

    config: {
        selection: null
    },

    controller: 'mainmenu',
    cls: 'main-menu',
    layout: 'vbox',
    ui: 'dark',

    items: [{
        xtype: 'list',
        reference: 'menu',
        scrollable: 'y',
        store: 'Menu',
        flex: 1,
        itemTpl: '<i class="fa fa-{icon}"></i>{text}',
        itemConfig: {
            ui: 'large flat dark'
        },
        listeners: {
            itemtap: 'onMenuItemTap'
        }
    }],

    updateSelection: function(value) {
        this.lookup('menu').setSelection(value);
    }
});