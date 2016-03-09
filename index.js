d3.json('data.json', function(data) {
  nv.addGraph(function() {
    const chart = nv.models.stackedAreaChart()
                  .margin({right: 100})
                  .x(function(d) { return d[0]; })
                  .y(function(d) { return d[1]; })
                  .rightAlignYAxis(true);

    // Format x-axis labels with custom function.
    chart.xAxis
        .tickFormat( function(d) {
          return d3.time.format('%x')(new Date(d));
        });

    var y = d3.scale.linear().range([100, 80]);

    chart.yAxis
      .scale(y)
      .tickFormat(d3.format(',.2f'));

    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const height = 500 - margin.top - margin.bottom;

    d3.select('#stacked-chart')
      .attr("height", height + margin.top + margin.bottom)
      .attr('style', 'height:500px;')
      .datum(data)
      .call(chart);

    nv.utils.windowResize(chart.update);
  });
});
