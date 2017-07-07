import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery";
const d3 = require("d3");

const dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
var data;



function drawChart(data) {
  d3.select('.chart')
      .selectAll('div')
      .data(data)
        .enter()
        .append('div')
        .style('width', d => d[1] + 'px')
        .text((d) => d[1]);
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getDataSet();
  }

  getDataSet() {
    $.get(dataUrl, (jsonData) => {
      data = JSON.parse(jsonData).data
      drawChart(data);
    });
  }

  componentDidMount() {
    console.log('data ' + data);
    
  }

  render() {
    return (
      <div className="chart"></div>
    );
  }
}
  

export default App;
