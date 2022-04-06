import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreatedDog from "./components/CreatedDog";
import Details from "./components/Details";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dog" element={<CreatedDog />} />
          <Route exact path="/home/:id" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
