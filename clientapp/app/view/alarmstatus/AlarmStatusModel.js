Ext.define('Dash.view.alarmstatus.AlarmStatusModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.alarmstatus',

    data: {
        alarm: false,
        alarmTime: null,
        photo: false,
        photoUrl: null
    },

    formulas: {
        /**
         * The backgroundColor will vary based on whether the panic alarm has been activated.
         * Green for off. Red for on.
         */
        backgroundColor: {
            get: function(get) {
                if (get('alarm')) {
                    return '#F54532';
                } else {
                    return '#47B04B';
                }
            }
        },

        /**
         * When the alarm is activated, return the Font Awesome code for an exclamation, otherwise return a check.
         */
        alarmCssClass: {
            get: function(get) {
                if (get('alarm')) {
                    return 'fa-exclamation-circle';
                } else {
                    return 'fa-check-circle';
                }
            }
        },

        /**
         * When the alarm is activated, this message shows below the exclamation, detailing to the user when the
         * alarm was activated.
         */
        alarmMessage: {
            get: function(get) {
                var alarmTime = get('alarmTime'),
                    message = '&nbsp;',
                    date, time;

                if (alarmTime) {
                    message = 'Alarm activated on <span style="font-weight: bolder;">{0}' +
                        '</span> at <span style="font-weight: bolder;">{1}</span>';
                    
                    date = Ext.Date.format(alarmTime, 'F j');
                    time = Ext.Date.format(alarmTime, 'g:i a');
                    
                    message = Ext.String.format(message, date, time);
                }

                return message;
            }
        },

        title: {
            get: function () {
                return this.getView().getTitle();
            }
        }
    }
});