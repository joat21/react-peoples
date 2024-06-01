import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setIsAuthorized } from "./redux/slices/currentUserSlice";
import { setCurrentUser } from "./redux/slices/currentUserSlice";

import Header from "./components/Header";
import Home from "./pages/Home";
import User from "./pages/User";
import Registration from "./pages/Registation";
import Authorization from "./pages/Authorization";

import "./scss/App.scss";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  async function fetchUser() {
    if (!token) return;

    try {
      const { data, status } = await axios.get(
        "https://8aacc4e8fbc52395.mokky.dev/auth_me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        dispatch(setCurrentUser(data));
        dispatch(setIsAuthorized(true));
      }
    } catch (error) {
      dispatch(setIsAuthorized(false));
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
