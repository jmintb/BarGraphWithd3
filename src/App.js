import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery";
const d3 = require("d3");

const convertToArray = ((accumulator, currentValue, index) => (accumulator.push(currentValue)));
const extractYear = ((item => item[0].slice(0, 4)));
const filterYears = ((item, position, array) => (
                item[item.length-1] === '0' 
                || item[item.length-1] === '5') 
                && position === array.indexOf(item));

const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let xAxisTicks = [];
let dates = [];

let data;

function drawChart(data) {

  xAxisTicks = data.map(extractYear).filter(filterYears)

  dates = data.map((item) => new Date(item[0]));

  const svg = d3.select('svg'),
                margin = {top: 20, right: 20, bottom: 30, left: 80},
                width = + svg.attr('width') - margin.left - margin.right,
                height = +svg.attr('height') - margin.top - margin.bottom;

  let xBars = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      xBars.domain(data.map(item => item[0]));

  let x = d3.scaleBand().rangeRound([0,  width]).padding(-10).domain(xAxisTicks.map((item => item))),
      y = d3.scaleLinear().rangeRound([height, 0]);

  let g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top +')');

  y.domain([0, d3.max(data, (d) => (d[1]))]);

  let infoBox = d3.select('.chart').append('div')
                  .attr('class', 'tooltip')
                  .style('opacity', 1);
                  
  g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(9,' + height +')')
        .call(d3.axisBottom(x).ticks(10));

  g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(10))
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
        .attr('x', (d) => xBars(d[0]))
        .attr('y', (d) => y(d[1]))
        .attr('width', 5)
        .attr('height', (d) => height - y(d[1]))
        .on('mouseover', (d) => {
           infoBox.transition()		
                .duration(200)		
                .style("opacity", .9);		
          let date = new Date(d[0]);
          infoBox.html('<span class="dollar-style">' + '$' + d[1] + '</span>' + "<br/>" 
          + 	'<span class="year-style">' + date.getFullYear() + ' ' + months[date.getMonth()] + '</span>')
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })
        .on("mouseout", function(d) {		
            infoBox.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
  
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

  render() {
    return (
      <div className="chart"></div>
    );
  }
}
  
export default App;
