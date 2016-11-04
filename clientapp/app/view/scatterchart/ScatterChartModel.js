Ext.define('Dash.view.scatterchart.ScatterChartModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.scatterchart',

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