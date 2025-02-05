import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const addPost = () => {
    if (!taskName.trim() || !taskDescription.trim()) return;

    const newTask = {
      name: taskName,
      description: taskDescription
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setTaskDescription("");
  };

  return (
    <div className="post-content">
      <h3>Title</h3>
      <div className="title-content">
        <input
          type="text"
          placeholder="Enter your title"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <h3>Post Content(Text Area) </h3>
      <div className="description-content">
        <textarea
          placeholder="Enter your description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>

      <div className="post-button">
        <button onClick={addPost}>Add Post</button>
      </div>

      <div className="list-of-tasks">
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.name}</strong>: 
              <ReactMarkdown>{task.description}</ReactMarkdown>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
