/* eslint-disable react/prop-types */
import React from "react";

const Task = ({ task }) => (
  <div className="task">
    <h3>{task.text}</h3>
  </div>
);
export default Task;
