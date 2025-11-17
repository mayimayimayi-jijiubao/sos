import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmergencyFormPage from "./pages/EmergencyFormPage";
import QRCodeResultPage from "./pages/QRCodeResultPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<EmergencyFormPage />} />
      <Route path="/qrcode" element={<QRCodeResultPage />} />
    </Routes>
  </Router>
);

export default App;
