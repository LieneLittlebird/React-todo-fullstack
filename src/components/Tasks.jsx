/* eslint-disable react/prop-types */
import React from "react";
import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => (
  <div>
    {tasks.map((task) => (
      <Task
        // eslint-disable-next-line no-underscore-dangle
        key={task._id}
        task={task}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    ))}
  </div>
);

export default Tasks;
