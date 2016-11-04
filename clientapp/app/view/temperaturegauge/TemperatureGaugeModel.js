Ext.define('Dash.view.temperaturegauge.TemperatureGaugeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.temperaturegauge',

    formulas: {
        backgroundColor: {
            get: function (get) {
                return this.getView().getBackgroundColor();
            }
        },

        style: {
            get: function () {
                return 'color: white; background-color: ' + this.getView().getBackgroundColor();
            }
        },

        title: {
            get: function () {
                return this.getView().getTitle();
            }
        }
    }
});