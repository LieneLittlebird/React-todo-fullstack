/* eslint-disable react/prop-types */
import React from "react";
import Task from "./Task";

const Tasks = ({ tasks }) => (
  <div>
    {tasks.map((task) => (
      <Task key={task.id} task={task} />
    ))}
  </div>
);

export default Tasks;
