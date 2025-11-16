import React, { useState } from "react";
import QRCodeGenerator from "../components/QRCodeGenerator";

const EmergencyQRCodePage = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const encodedData = encodeURIComponent(JSON.stringify({ name, contact }));
  const dataUrl = `https://jiujiubao.vercel.app/?data=${encodedData}`;

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>急救宝信息卡生成器</h2>
      <input
        type="text"
        placeholder="姓名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "5px 0" }}
      />
      <input
        type="text"
        placeholder="紧急联系人"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "5px 0" }}
      />
      <QRCodeGenerator dataUrl={dataUrl} />
    </div>
  );
};

export default EmergencyQRCodePage;
