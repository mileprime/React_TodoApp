import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Todo from "./Todo.jsx";

function App() {
  let data = ["800", "801", "802"];
  return (
    <>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/" target="">
              Home
            </Link>
          </li>
          <li>
            {data.map((item) => (
              <Link to={`/todo/${item}`} target="">
                Todo
              </Link>
            ))}
          </li>
        </ul>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/todo/:id" element={<Todo />} />
        </Routes>
        <footer>this is footer</footer>
      </BrowserRouter>
    </>
  );
}

export default App;
