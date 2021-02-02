/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => (
  <div
    key={task.id}
    className={`task ${task.reminder ? "reminder" : ""}`}
    onDoubleClick={() => onToggle(task.id)}
  >
    <h3 key="task-title">
      {task.text}{" "}
      <FaTimes
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => onDelete(task.id)}
      />
    </h3>
    <p key="task-day">{task.day}</p>
  </div>
);
export default Task;
