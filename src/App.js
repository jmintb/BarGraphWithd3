import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery";
const d3 = require("d3");

const dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
var data;

function drawChart(data) {

  const svg = d3.select('svg'),
                margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = + svg.attr('width') - margin.left - margin.right,
                height = +svg.attr('height') - margin.top - margin.bottom;

  let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  let g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top +')');

  x.domain(data.map((d) => (d[0])));
  y.domain([0, d3.max(data, (d) => (d[1]))]);

  g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(9,' + height +')')
        .call(d3.axisBottom(x));

  g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency')

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d[0]))
        .attr('y', (d) => y(d[1]))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d[1]));
  
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
