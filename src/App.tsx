import Header from "./components/Header";
import Home from "./pages/Home";
import "./App.scss";

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <Home />
      </div>
    </div>
  );
}

export default App;
