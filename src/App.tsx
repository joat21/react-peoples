import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import User from "./pages/User";
import "./App.scss";

export const DataContext = React.createContext({});

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="wrapper">
      <div className="content">
        <DataContext.Provider value={{ data, setData }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:user" element={<User />} />
          </Routes>
        </DataContext.Provider>
      </div>
    </div>
  );
}

export default App;
