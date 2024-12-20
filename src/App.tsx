import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityList from "./components/CityList/CityList";
import CityDetail from "./components/CityDetail/CityDetail";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CityList />} />
        <Route path="/city/:cityName" element={<CityDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
