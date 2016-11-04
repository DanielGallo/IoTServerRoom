Ext.define('Dash.view.about.About', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.TitleBar'
    ],

    xtype: 'about',

    bodyPadding: 16,

    scrollable: true,

    html: '<h1>About Sencha</h1><br/>' +
            'More than 10,000 customers and 60% of the Fortune 100 rely on Sencha solutions to deliver innovative ' +
            'applications that drive their businesses. With a longstanding commitment to web technologies, Sencha ' +
            'dramatically reduces the cost and complexity of developing and delivering enterprise applications ' +
            'across multiple device types.<br/><br/>' +
            '<h2>Create feature-rich HTML5 applications using JavaScript</h2><br/>' +
            'Sencha Ext JS is the most comprehensive MVC/MVVM JavaScript framework for building feature-rich, ' +
            'cross-platform web applications targeting desktops, tablets, and smartphones. Ext JS leverages HTML5 ' +
            'features on modern browsers while maintaining compatibility and functionality for legacy browsers.<br/>' +
            '<br/>Ext JS features hundreds of high-performance UI widgets that are meticulously designed to fit the ' +
            'needs of the simplest as well as the most complex web applications. Ext JS templates and layout manager ' +
            'give you full control over your display irrespective of devices and screen sizes. An advanced charting ' +
            'package allows you to visualize large quantities of data. The framework includes a robust data package ' +
            'that can consume data from any backend data source. Ext JS also offers several out-of-the-box themes, ' +
            'and complete theming support that lets you build applications that reflect your brand. It also includes ' +
            'an accessibility package (ARIA) to help with Section 508 compliance.<br/><br/>' +
            '<div style="width: 100%; text-align: center;">' +
            '<img style="width: 200px;" src="resources/images/sencha.png">' +
            '</div>'
});