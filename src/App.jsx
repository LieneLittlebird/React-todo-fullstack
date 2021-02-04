/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import { EXPRESS_API } from "./constants";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`${EXPRESS_API}/tasks`);
    const data = await res.json();
    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${EXPRESS_API}/task/${id}`);
    const data = await res.json();
    return data;
  };
  // UseEffect izmanto, ja grib, lai kaut kas notiek, ielādējot lapu
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`${EXPRESS_API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const id = await res.json();

    setTasks([...tasks, { ...task, _id: id }]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    console.log(id, tasks);
    // const id = Math.floor(Math.random() * 10000) + 1;

    await fetch(`${EXPRESS_API}/tasks/${id}`, {
      method: "DELETE",
    });

    // eslint-disable-next-line no-underscore-dangle
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Toggle Reminder. PUT - update
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`${EXPRESS_API}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        // eslint-disable-next-line no-underscore-dangle
        task._id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task tracker"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          exact
          path="/"
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No Tasks to Show"
              )}
            </>
          )}
        />

        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};
export default App;
