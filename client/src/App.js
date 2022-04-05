import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreatedDog from "./components/CreatedDog";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} /> //en esta version
          de react se usa element en vez de component
          <Route path="/home" element={<Home />} />
          <Route path="/dog" element={<CreatedDog />} />
          {/* <Route path="/home/:id" element={Detail} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
