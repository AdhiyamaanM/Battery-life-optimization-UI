import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/Reusable Components/Navbar"; // Import Navbar component
import Home from "./Components/Home";
import DataExplorer from "./Components/DataExplorer";
import Plot from "./Components/Plot";
import Prediction from "./Components/Prediction";
import ModelComparison from "./Components/ModelComparison";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-explorer" element={<DataExplorer />} />
        <Route path="/plot" element={<Plot />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/model-comparison" element={<ModelComparison />} />
      </Routes>
    </Router>
  );
}

export default App;
