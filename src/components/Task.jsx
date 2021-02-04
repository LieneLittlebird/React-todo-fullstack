/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => (
  <div
    // eslint-disable-next-line no-underscore-dangle
    key={task._id}
    className={`task ${task.reminder ? "reminder" : ""}`}
    // eslint-disable-next-line no-underscore-dangle
    onDoubleClick={() => onToggle(task._id)}
  >
    <h3 key="task-title">
      {task.text}{" "}
      <FaTimes
        style={{ color: "red", cursor: "pointer" }}
        // eslint-disable-next-line no-underscore-dangle
        onClick={() => onDelete(task._id)}
      />
    </h3>
    <p key="task-day">{task.day}</p>
  </div>
);
export default Task;
