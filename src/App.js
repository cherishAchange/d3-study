import React from "react";
import * as d3 from "d3";
import 'antd/dist/antd.css';
import "./App.css";

// socket
import IO from 'socket.io-client';

// antd
import { message, Button, Input } from 'antd';
const { TextArea } = Input;

class App extends React.PureComponent {

  socket = null

  state = {
    message: ''
  }

  componentDidMount() {
    this.renderForceDirectedGraph();
    this.renderBar();
    this.connetListen();
  }

  connetListen() {
    this.socket = IO.connect(`/chat_test`);
    this.socket.on('people-join', (data) => {
      message.info(data.message);
    });
    this.socket.on('response-all', (data) => {
      message.info(data.message);
    })
  }

  renderForceDirectedGraph() {
    const nodes = [
      { name: "桂林" },
      { name: "广州" },
      { name: "厦门" },
      { name: "杭州" },
      { name: "上海" },
      { name: "青岛" },
      { name: "天津" }
    ];
    const edges = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 1, target: 4 },
      { source: 1, target: 5 },
      { source: 1, target: 6 }
    ];

    const width = 600,
      height = 600;
    const svg = d3
      .select("#Force")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var force = d3.layout
      .force()
      .nodes(nodes) //指定节点数组
      .links(edges) //指定连线数组
      .size([width, height]) //指定作用域范围
      .linkDistance(150) //指定连线长度
      .charge([-400]); //相互之间的作用力

    force.start(); //开始作用

    console.log(nodes, edges);

    //添加连线
    var svg_edges = svg
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .style("stroke", "#ccc")
      .style("stroke-width", 1);

    var color = d3.scale.category20();

    //添加节点
    var svg_nodes = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .style("fill", function(d, i) {
        return color(i);
      })
      .call(force.drag); //使得节点能够拖动

    //添加描述节点的文字
    var svg_texts = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .style("fill", "black")
      .attr("dx", 20)
      .attr("dy", -10)
      .text(function(d) {
        return d.name;
      });

    force.on("tick", function() {
      //对于每一个时间间隔
      //更新连线坐标
      svg_edges
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      //更新节点坐标
      svg_nodes
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });

      //更新文字坐标
      svg_texts
        .attr("x", function(d) {
          return d.x;
        })
        .attr("y", function(d) {
          return d.y;
        });
    });
  }

  renderBar() {
    const width = 300,
      height = 300;
    const dataset = [250, 210, 170, 130, 90];
    const rectHeight = 25;

    const min = d3.min(dataset);
    const max = d3.max(dataset);
    const linear = d3
      .scale.linear()
      .domain([min, max])
      .range([0, 300]);

    const svg = d3
      .select("#Bar")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .text(function(d) {
        return d;
      })
      .attr("x", 0)
      .attr("y", function(d, i) {
        return rectHeight * i + 2;
      })
      .attr("width", function(d, i) {
        return linear(d);
      })
      .attr("height", rectHeight - 2)
      .attr("fill", "steelblue");
  }

  messageChange = (e) => {
    this.setState({ message: e.target.value });
  }

  sendMessage = () => {
    const { message } = this.state;
    this.socket.emit('one-request', { message });
  }

  render() {
    const { message } = this.state;

    return [
      <div key="1">
        <TextArea value={message} onChange={this.messageChange} rows={4} />
        <Button type="primary" onClick={this.sendMessage}>发送</Button>
      </div>,
      <div key="2" className="App" id="Force" />,
      <div key="3" className="App" id="Bar" />,
    ];
  }
}

export default App;
