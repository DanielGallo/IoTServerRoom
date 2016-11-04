Ext.define('Dash.view.dayhourheatmap.DayHourHeatMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dayhourheatmap',

    // Static data for this demo
    dataset: 'resources/data/heatmapdata.tsv',

    onSceneResize: function (component, scene, size) {
        var me = this,
            width = size.width,
            height = size.height,
            gridSize = Math.floor(width / 26),
            buckets = 3,
            fontSize = '9pt',
            colors = ['#1565C0', '#F8710F', '#CF3A3D'],
            days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            times;

        if (Ext.platformTags.desktop) {
            // For desktop, show longer time formats.
            times = ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p', '12a'];
        } else {
            // Mobile and tablet device screens are too small, so decrease text size and show shorter time format
            fontSize = '7pt';
            times = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        }

        scene.classed('d3-heatmap', true);

        // On resize, remove the existing scene elements
        scene.selectAll('*').remove();

        var dayLabels = scene.selectAll('.dayLabel')
            .data(days)
            .enter().append('text')
            .text(function (d) { return d; })
            .attr('x', 12)
            .attr('y', function (d, i) { return (i * gridSize) + 8; })
            .style('text-anchor', 'end')
            .style('font-size',  fontSize)
            .attr('transform', 'translate(-6,' + gridSize / 1.5 + ')')
            .attr('class', function (d, i) { return ((i >= 0 && i <= 4) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis'); });

        var timeLabels = scene.selectAll('.timeLabel')
            .data(times)
            .enter().append('text')
            .text(function (d) { return d; })
            .attr('x', function (d, i) { return (i * gridSize) + 12; })
            .attr('y', 8)
            .style('text-anchor', 'middle')
            .style('font-size',  fontSize)
            .attr('transform', 'translate(' + gridSize / 2 + ', -6)')
            .attr('class', function (d, i) { return ((i >= 7 && i <= 16) ? 'timeLabel mono axis axis-worktime' : 'timeLabel mono axis'); });

        this.heatmapChart = function (tsvFile) {
            d3.tsv(tsvFile,
                function (d) {
                    return {
                        day: +d.day,
                        hour: +d.hour,
                        value: +d.value
                    };
                },
                function (error, data) {
                    var colorScale = d3.scale.quantile()
                        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
                        .range(colors);

                    var cards = scene.selectAll('.hour')
                        .data(data, function (d) {return d.day+':'+d.hour;});

                    cards.append('title');

                    cards.enter().append('rect')
                        .attr('x', function (d) { return ((d.hour - 1) * gridSize) + 12; })
                        .attr('y', function (d) { return ((d.day - 1) * gridSize) + 8; })
                        .attr('class', 'hour bordered')
                        .attr('width', gridSize)
                        .attr('height', gridSize)
                        .style('fill', colors[0]);

                    cards.transition().duration(500)
                        .style('fill', function (d) { return colorScale(d.value); });

                    cards.select('title').text(function (d) { return d.value; });

                    cards.exit().remove();
                });
        };

        this.heatmapChart(this.dataset);
    }
});