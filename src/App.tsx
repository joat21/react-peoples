import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import User from "./pages/User";
import "./App.scss";

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:user" element={<User />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
