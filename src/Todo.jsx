import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

function Todo() {
  // create state for the tasks array
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  // const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  let getTask = (e) => {
    setInput(e.target.value);
  };
  const isEmptyOrWhitespace = (text) => {
    const regex = /^\s*$/;
    return regex.test(text);
  };

  let pushTask = () => {
    let newTask = { description: input, id: Math.random() };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    let data = [...tasks];
    data.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(data));
    setInput("");
  };

  let addTask = () => {
    if (!isEmptyOrWhitespace(input)) {
      let IsNew = tasks.find((task) => task.description == input);
      if (!IsNew) {
        pushTask();
      } else {
        setShowModal(true);
      }
    } else {
      // setShowModal(true);
      alert("Empty task!!");
    }
  };

  let deleteTask = (id) => {
    // update local storage after delete
    let data = [...tasks];
    let updatedData = data.filter((item) => item.id != id);
    localStorage.setItem("tasks", JSON.stringify(updatedData));
    setTasks(updatedData);
  };
  let editTastk = () => {
    let updateData = tasks.map((task) => {
      if (task.id == selectedId) {
        return { ...task, description: editValue };
      } else {
        return task;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(updateData));
    setTasks(updateData);
    setShowEdit(false);
  };
  // create the add function
  // // in the add function we will push the new item to the tasks state
  // create the update function
  // adding the update function as onclick to each
  return (
    <>
      {/* get the input from the user */}

      <input type="text" value={input} onChange={getTask} />
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
          {showEdit ? <button onClick={editTastk}>Save</button> : null}
          <button onClick={() => deleteTask(item.id)}>Delete</button>{" "}
        </div>
      ))}
      {showModal ? (
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal">
            <p>Same Item!!!</p>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={pushTask}>Ok</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Todo;
