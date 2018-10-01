import React, { Component } from "react";
import "./Home.css";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";

class Home extends Component {
  pieData = [
    {
      type: "DOT In-House Crew",
      value: 326
    },
    {
      type: "DDC Contracts",
      value: 311
    },
    {
      type: "Others",
      value: 74
    },
    {
      type: "Utility Companies",
      value: 33
    }
  ];

  render() {
    return (
      <div>
        <div className="pie-div">
          <div className="pie-chart">
            <PieChart piedata={this.pieData} chartid="pie1" />
          </div>
          <div className="pie-chart">
            <PieChart piedata={this.pieData} chartid="pie2" />
          </div>
        </div>
        <div className="line-chart">
          <LineChart />
        </div>
      </div>
    );
  }
}

export default Home;
