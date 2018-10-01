import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class PieChart extends Component {
  componentDidMount() {
    var data=this.props.piedata;
    var chartObj={
      "radius":am4core.percent(70),
      "innerRadius":am4core.percent(40),

      // Create pie series
      "series": [{
        "type": "PieSeries",
        "dataFields": {
          "value": Object.keys(data[0])[1],
          "category": Object.keys(data[0])[0]
        },
        "slices": {
            "cornerRadius":3,
            "innerCornerRadius":3,
        }
      }],
    
      // Add data
      "data": data,
    
      // And, for a good measure, let's add a legend
      "legend": {}
    
    };
    var slices={
      "cornerRadius":10,
      "innerCornerRadius":10,
    }
    // chartObj.series.push(slices);
   chartObj.series[0].slices.cornerRadius = 3;
   chartObj.series[0].slices.innerCornerRadius=3;

    this.chart = am4core.createFromConfig(chartObj, this.props.chartid, am4charts.PieChart);
    // this.chart.series.slices.cornerRadius = 15;
    // this.chart.series.slices.innerCornerRadius = 15;

    console.log(this.chart);
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id={this.props.chartid} style={{ width: "100%", height: "100%" }} />
    );
  }
}

export default PieChart;
