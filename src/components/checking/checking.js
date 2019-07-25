import React, { Component } from "react";
// import _ from "lodash"

import "./checking.css";

export default class Checking extends Component {
  state = {
    tasks: [
      { name: "Learn React", status: "wip", color: "blue", id: 1 },
      { name: "Feed Diana", status: "done", color: "green", id: 2 },
      { name: "Go in for sports", status: "wip", color: "red", id: 3 }
    ]
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDragStart = (e, name) => {
    console.log(name);
    e.dataTransfer.setData("name", name);
  };

  onDrop = (e, status) => {
    let name = e.dataTransfer.getData("name");

    let tasks = this.state.tasks.filter(task => {
      if (task.name === name) {
        task.status = status;
        console.log(this.state.tasks);
      }
      return task;
    });

    this.setState({
      tasks
    });
  };

  render() {
    const tasks = {
      wip: [],
      done: []
    };

    this.state.tasks.forEach(task => {
      tasks[task.status].push(
        <div
          draggable
          onDragStart={e => this.onDragStart(e, task.name)}
          onDrop={e => this.onDrop(e, "done")}
          key={task.name}
          className="draggable"
          style={{ backgroundColor: task.color }}
        >
          {task.name}
        </div>
      );
    });

    return (
      <div className="drag-container">
        {/* <h3>Drag n' Drop Area</h3> */}
        <div
          className="wip"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "wip")}
        >
          <span className="group-header">In Progress</span>
          {tasks.wip}
        </div>
        <div
          className="done droppable"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "done")}
        >
          <span className="group-header">Done</span>
          {tasks.done}
        </div>
      </div>
    );
  }  
}

const onHover = id => {
  console.log(id);
  if (id < 55) return true;
};

export { onHover };

// const f = [[{"x": 4}, {"Z" : "hush"}], [{"x": 4}, {"Z" : "her"}]]
// const fraka = [[{"x": 4}, {"Z" : "hush"}], [{"x": 4}, {"Z" : "her"}]]

// const areEqual = _(f).differenceWith(fraka, _.isEqual).isEmpty()

// console.log('Checking arrays');
// console.log(areEqual);
