/**
 * Store that contains the application's navigation menu items
 */
Ext.define('Dash.store.Menu', {
    extend: 'Ext.data.Store',
    alias: 'store.menu',

    data: [{
        id: 'dashboard',
        xtype: 'panel',
        text: 'Server Room Dashboard',
        icon: 'dashboard'
    }, {
        id: 'alerts',
        xtype: 'panel',
        text: 'Alerts',
        icon: 'bell-o'
    }, {
        id: 'about',
        xtype: 'panel',
        text: 'About',
        icon: 'info-circle'
    }]
});