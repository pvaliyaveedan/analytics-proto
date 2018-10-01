import React, { Component } from "react";
import "./Index.css";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import { Button } from 'antd';

class Index extends Component {
  subMenu = [
    {
      name: "Corners"
    },
    {
      name: "Ramps"
    },
    {
      name: "Performance"
    }
  ];

  render() {
    return (
      <div className="index-layout">
        <div className="submenu-layout">
        {this.subMenu.map(menu=>(
            <Button type="primary">{menu.name}</Button>
        ))}
            </div>
      </div>
    );
  }
}

export default Index;
