
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

  // Fetch Tasks GET

  const fetchTasks = async () => {
    const res = await fetch(`${EXPRESS_API}/tasks`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 
    }});
    const data = await res.json();
    return data;

  };

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
    await fetch(`${EXPRESS_API}/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Toggle Reminder. PUT - update
  const toggleReminder = async (taskToToggle) => {
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    await fetch(`${EXPRESS_API}/tasks/${taskToToggle._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });


    setTasks(
      tasks.map((task) =>
        task._id === taskToToggle._id
          ? updTask
          : task
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
          render={() => (
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
