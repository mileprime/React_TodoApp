import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  //create state for the tasks array
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  let getTask = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  let addTask = () => {
    if (input.length !== 0) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { description: input, id: Math.random() },
      ]);
    } else {
      alert("Empty task");
    }
  };

  let deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => {
        if (task.id != id) {
          return task;
        }
      })
    );
  };

  //map through the tasks state to show it in the return
  //create the add function
  // In th eadd function, we will push the new item to th etasks state
  // create the update function
  //adding the update function as onclick to each
  return (
    <>
      {/* get the input from the user */}
      <input type="text" onChange={getTask} />
      <button onClick={addTask}>Add</button>
      {/* map through the tasks state to show it in the return */}
      {tasks.map((item) => (
        <div key={item.id}>
          {showEdit && item.id == selectedId ? (
            <input
              type="text"
              onChange={(e) => setEditValue(e.target.value)}
              value={editValue}
            />
          ) : (
            item.description
          )}
          <button
            onClick={() => {
              setEditValue(item.description);
              setShowEdit(true);
              setSelectedId(item.id);
            }}
          >
            Edit
          </button>
          {showEdit ? <button>Save</button> : null}
          <button onClick={() => deleteTask(item.id)}>Delete</button>{" "}
        </div>
      ))}
    </>
  );
}

export default App;
