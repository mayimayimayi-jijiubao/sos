import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";  // 按钮样式
import "../styles/animate.css"; // fade-in 动画

const QRCodeResultPage = () => {
  const qrRef = useRef(null);
  const navigate = useNavigate();
  const [qrInstance, setQrInstance] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const phone = params.get("phone");
    const url = window.location.origin + "/qrcode?phone=" + phone;

    // 屏幕宽度 60%
    const size = Math.round(window.innerWidth * 0.6);

    const qr = new QRCodeStyling({
      width: size,
      height: size,
      data: url,
      image: "/logo.png",
      qrOptions: { errorCorrectionLevel: "Q" },
      imageOptions: { imageSize: 0.33, margin: 0 },
    });

    qr.append(qrRef.current);
    setQrInstance(qr);
  }, []);

  const downloadQR = () => {
    qrInstance?.download({ name: "Jiujiubao_QR", extension: "png" });
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="fade-in"
    >
      <h2>我的急救信息二维码</h2>

      {/* 按钮放在二维码上方 */}
{/* 下载二维码按钮 */}
<button
  className="enabled"
  style={{ maxWidth: 300, width: "90%", marginBottom: 10, cursor: "pointer" }}
  onClick={downloadQR}
>
  下载二维码
</button>

{/* 返回首页按钮 */}
<button
  style={{ maxWidth: 300, width: "90%", background: "#555", marginBottom: 20, cursor: "pointer" }}
  onClick={() => navigate("/")}
>
  返回首页
</button>

      {/* 二维码 */}
      <div
        ref={qrRef}
        style={{
          marginTop: 0,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      />
    </div>
  );
};

export default QRCodeResultPage;
