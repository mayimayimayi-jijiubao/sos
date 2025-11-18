import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmergencyFormPage from "./pages/EmergencyFormPage";
import QRCodeResultPage from "./pages/QRCodeResultPage";
import EmergencyInfoPage from './pages/EmergencyInfoPage'; // ← 新增导入

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<EmergencyFormPage />} />
      <Route path="/qrcode" element={<QRCodeResultPage />} />
       <Route path="/emergency" element={<EmergencyInfoPage />} />  {/* ← 新增路由 */}
    </Routes>
  </Router>
);

export default App;
